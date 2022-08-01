import { useEffect, useCallback, useState, useContext  } from 'react';
import styled from "styled-components";
import { useQuery} from 'react-query';
import { AdminLayout, 
    SubHeader,
    MagnivaModal,
    MagnivaEventsForm,
    TableLoaders
 } from "../components";
import makeRequest from "../utils/fetch-request";
import DataTable from "../utils/table"
import CustomModalPane, { GenericDeleteModal } from '../utils/_modal';
import { Context } from "../context";


const MagnivaEvents = (user) => {
  const [showModal, setShowModal] = useState(false); // showModal variable that's set to false.
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState();
  const [classname, setClassname] = useState('success');
  const [page, setPage] = useState(0);
  const [state, dispatch ] =  useContext(Context);
  const[selectedRecord, setSelectedRecord] = useState(null);
  const[modalTitle, setModalTitle] = useState("Create Event");
  const[submitTitle, setSubmitTitle] = useState("Create an Event");

  useEffect(() => {
      dispatch({type:"SET", key:'context', payload:'eventspage'});
  }, [])

  useEffect(() => {
    if(state?.context){
      let status = state[state.context].status;
      let message = state[state.context].message;
      let data = state[state.context]?.data || {};

      if(status === true){
        setClassname('alert alert-success');     
      } else {
        setClassname('alert alert-danger');
      }
      setMessage(message);
    }

  }, [state?.eventspage])


  const showModalForm = (show, 
    title='Create Event', 
    submitTitle='Create Record') =>{
    setModalTitle(title);
    setSubmitTitle(submitTitle);
    setShowModal(show);
  }

  useEffect(()=> {
    if(!showModal) {
      setSelectedRecord(null);
    }

  }, [showModal])

  const fetchEvents = useCallback(() => {
    let _url = "/magniva-events/get";

    makeRequest({ url: _url, method: "get", data: null }).then(
      ([status, result]) => {
        if (status !== 200) {
          setError(result?.message || "Error, could not fetch records");
        } else {
          setEvents(result?.data || []);
        }
      }
    );
    
  }, [state?.page]);



  useEffect(() => {
    
    if(state?.updaterecord){
        let id = state.updaterecord.id;
        let model = state.updaterecord.model;
        let data_url = '/'+model+'/get?id=' + id;
        makeRequest({url:data_url, method:'get', data:null}).then(([status, response])=> {
            if(status !== 200){
                dispatch({type:'SET', key:'server_error', payload:response.message})

            } else {
                setSelectedRecord(response.data.shift());
            }
            setModalTitle('Update Event Details');
            setShowModal(true);
        })
    }
},[state?.updaterecord])

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

    return (
        <AdminLayout showSideMenu={true}>
        <Home>
            <SubHeader
             pageTitle="Events"
             pageSubTitle="100 Active Events"
             btnTxt="Create new Event"
             onPress = {()=>showModalForm(!showModal)}
             showCreateButton = {true}
            />
            <div className="container-fluid">
                <div className="row px-3">

                    <div className="col-lg-8 bg-c">
                    <DataTable data={events} 
                      showActions = {{
                        model: "magniva-events",
                         actions : {
                                      edit: "#update-business-branches",
                                      delete: "#generic-delete-modal",
                                      relations: "theme,attendance"
                                    }
                                  }
                    }/>
                    </div>
                    <div className="col-lg-4">
                        <div className="ms-3">

                            <Sidebar>
                                <div className="field-wrapper">
                                    <div>
                                       <span><strong>Active Events</strong></span>
                                    </div>
                                </div>
                            </Sidebar>
                        </div>  
                    </div>
                </div>
            </div>
        <GenericDeleteModal />
        <CustomModalPane show={showModal}
           title = {modalTitle}
           target = "create-magniva-events"
           hideThisModal={() => setShowModal(false)}
           >
            { message && <div className={classname}>{message}</div> }
            <MagnivaEventsForm 
                setShowModal={setShowModal}
                selectedRecord={selectedRecord}
                submitTitle={submitTitle}
                />
        </CustomModalPane>
        </Home>
        </AdminLayout>
    )
}

const Home = styled.div`
    width: 100%;
    height: auto;
    .bg-c{
        padding:10px ;
    }
    .bg-white{
        border:1px solid #ccc;
        background-color:#fff;
        padding:10px ;
    }
    .col-lg-8,.col-lg-4{
        padding:0px;
    }
    `
const Sidebar = styled.div`
    width:100%;
    border:1px solid #ccc;
    background-color:#fff;
    padding:10px;
    margin-bottom:20px;
    .field-wrapper{
        display:flex;
        justify-content:space-between;
        align-items:center;
        .btnwrapper button{
            border:none;
            outline:none;
            margin-left:20px;
            padding:3px 7px;
        }
        span{
            font-size:.75rem
        }
        .color{
            background-color:orange;
            padding:3px 7px;
            border-radius:5px;
            text-align:center;
        }
    }
    hr{
        background-color:#ccc;
    }
    hr.firstchild{
        background-color:#666
    }
`

export default MagnivaEvents;