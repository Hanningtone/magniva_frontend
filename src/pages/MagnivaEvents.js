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
  const [searchTerm, setSearchTerm] = useState('');
 
  const filteredEvents = events.filter( (events) => events.event_title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleChange = (event) =>{

    setSearchTerm(event.target.value)
  }

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
    
  }, [state?.eventspage],);
  




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
        <div className="search-wrapper"> 
                    <div className="input-wrapper">
                        <input type="text" 
                            className="form-control py-2" 
                            id="searchTxt" 
                            placeholder="Search Events"
                            onChange = { handleChange }
                        />
                        <i className="search-icon fa fa-search"/>
                    </div>    
                </div>
            <SubHeader
             pageTitle="All Events"
             pageSubTitle= { events.length}
             btnTxt="Create new Event"
             onPress = {()=>showModalForm(!showModal)}
             showCreateButton = {true}
            />
            <div className="container-fluid">
                <div className="row px-3">

                    <div className="col-lg-8 bg-c">
                    <DataTable data={filteredEvents} 
                      showActions = {{
                        model: "magniva-events",
                         actions : {
                                      edit: "#update-business-branches",
                                      delete: "#generic-delete-modal",
                                      relations: "attendance@event_id"
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
    .search-wrapper{
      height: 0px;
      width: 600px;
      display: flex;
      flex-direction: row;
      justify-content: end;
      padding: 20px 0px 0px 0px;
      input{
          width:100%;
          font-size: 14px;
          color:#188754;
      }
      input::placeholder { 
        color: #188754;
      }
      .input-wrapper{
         position: relative;
         width:65%;
      }
      .search-icon{
          position: absolute;
          color: #188754;
          font-size:20px;
          right:12px;
          top:8px;
      }
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
