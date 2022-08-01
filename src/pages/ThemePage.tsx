import { useEffect, useCallback, useState, useContext  } from 'react';
import styled from "styled-components";
import { useQuery} from 'react-query';
import { AdminLayout, 
    SubHeader,
    MagnivaModal,
    TableLoaders
 } from "../components";
import makeRequest from "../utils/fetch-request";
import DataTable from "../utils/table"
import CustomModalPane, { GenericDeleteModal } from '../utils/_modal';
import { Context } from "../context";
import ThemeForm from '../components/forms/ThemeForm';


const ThemePage = (user: any) => {

  const [showModal, setShowModal] = useState(false); // showModal variable that's set to false.
  const [theme, setTheme] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState();
  const [classname, setClassname] = useState('success');
  const [page, setPage] = useState(0);
  const [state, dispatch ] =  useContext(Context);
  const[selectedRecord, setSelectedRecord] = useState(null);
  const[modalTitle, setModalTitle] = useState("Create Theme");
  const[submitTitle, setSubmitTitle] = useState("Create Theme");

  useEffect(() => {
      dispatch({type:"SET", key:'context', payload:'themespage'});
  }, [])

  useEffect(() => {
    if(state?.context){
      let status = state[state.context].status;
      let message = state[state.context].message;
      let data = state[state.context]?.data || {};

      console.log("state context ", state.context, "has data", state[state.context])

      if(status === true){
        setClassname('alert alert-success');     
      } else {
        setClassname('alert alert-danger');
      }
      setMessage(message);
    }

  }, [state?.themespage])


  const showModalForm = (show: boolean, 
    title='Create new Theme', 
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

  const fetchThemes = useCallback(() => {
    let _url = "/theme/get";

    makeRequest({ url: _url, method: "get", data: null }).then(
      ([status, result]) => {
        if (status !== 200) {
          setError(result?.message || "Error, could not fetch records");
        } else {
          setTheme(result?.data || []);
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
                console.log("Get Data ", response);
                setSelectedRecord(response.data.shift());
            }
            setModalTitle('Update Theme Details');
            setShowModal(true);
        })
    }
},[state?.updaterecord])

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

    return(
        <AdminLayout showSideMenu={true}>
        <Home>
            <SubHeader
             pageTitle="Theme"
             pageSubTitle="50 Available Event Themes"
             btnTxt="Create new Theme"
             onPress = {()=>showModalForm(!showModal)}
             showCreateButton = {true}
            />
            <div className="container-fluid">
                <div className="row px-3">
                    <div className="col-lg-8 bg-c">
                    <DataTable data={theme} 
                    showActions = {
                      {
                        model: "theme",
                        actions: {
                          edit: "#update-theme",
                          delete: "#generic-delete-modal"
                        }
                      }
                    }

                    />
                    </div>

                    <div className="col-lg-4">
                        <div className="ms-3">
                        <Sidebar>
                               <div className="field-wrapper">
                                    <div>
                                        <span><strong>Theme Statistics</strong></span>
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
           target = "create-theme"
           hideThisModal={() => setShowModal(false)}
           >
            { message && <div className={classname}>{message}</div> }
            <ThemeForm 
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
        padding:10px;
    }
    .bg-white{
        background-color:#fff;
        padding:10px;
        border:1px solid #ccc;
    }
    .col-lg-8,.col-lg-4{
        padding:0px;
    }
    `
    const Sidebar = styled.div`
    width:100%;
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
export default ThemePage;
