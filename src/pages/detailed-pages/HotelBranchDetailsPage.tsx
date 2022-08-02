import { useEffect, useCallback, useState, useContext  } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { AdminLayout, 
    SubHeader,
    TableLoaders
 } from "../../components";
import makeRequest from "../../utils/fetch-request";
import DataTable from "../../utils/table"
import { Context } from "../../context";
import CustomModalPane from '../../utils/_modal';
import { MagnivaEventsForm } from '../../components';


const HotelBranchDetailsPage = (user: any) => {
    const [start_time, setStartTime] = useState();
    const [end_time, setEndTime] = useState();
    const [classname, setClassname] = useState('success');
    const [page, setPage] = useState(0);
    const [state, dispatch ] =  useContext(Context);
    const [error, setError] = useState();
    const [hotelBranchDetails, setHotelBranchDetails] = useState();
    const { id, relations } = useParams();
    const [title, setTitle] = useState("Magniva");
    const [venue, setVenue] = useState(" Magniva");
    const [location, setLocation] = useState("Magniva");
    const[modalTitle, setModalTitle] = useState("Create Attendee");
    const[submitTitle, setSubmitTitle] = useState("Create an Attendee");
    const [message, setMessage] = useState();
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
      dispatch({type:"SET", key:'context', payload:'homepage'});
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

  }, [state?.homepage])


  const showModalForm = (show:boolean, 
    title='Create Invite', 
    submitTitle='Create Record') =>{
    setModalTitle(title);
    setSubmitTitle(submitTitle);
    setShowModal(show);
  }

    const fetchHotelBranchDetails= useCallback(() => {

      let _url = "/magniva-events/detail/"+id;
      relations && (_url += '?relations='+relations);
  
      makeRequest({ url: _url, method: "get", data: null }).then(
        ([status, result]) => {
          if (status !== 200) {
            setError(result?.message || "Error, could not fetch records");
          } else {
            setTitle(result?.data.event_title)
            setVenue(result?.data.venue);
            setLocation(result?.data.event_location);
            setStartTime(result?.data.start_date);
            setEndTime(result?.data.end_date)

            setHotelBranchDetails(result?.data || []);
          }
        }
      );
      
    }, []);
  
  
    useEffect(() => {
      fetchHotelBranchDetails();
    }, [fetchHotelBranchDetails]);
  

    return(
        <AdminLayout showSideMenu={true}>
        <Home>
     
            <div className="container-fluid">

            <div className="row px-3">
                    <div className="col-lg-12 p-6">
                        <div className="stats-wrapper">
                            <div className="row">
                                
                                <div className="col-lg-2 title-c">
                                <div className="stat-top-wrapper">

                                  <p className="stat-title">Title of the Event: </p>
                                  <p className="stat-total">{title}</p>

                                </div>
                                </div>
                                <div className="col-lg-2 title-c">
                                  <div className="stat-top-wrapper">

                                      <p className="stat-title">Location : </p>
                                      <p className="stat-total">{location}</p>

                                  </div>
                                    
                                </div>
                                <div className="col-lg-2 title-c">
                                  <div className="stat-top-wrapper">

                                      <p className="stat-title">Venue : </p>
                                      <p className="stat-total">{venue}</p>

                                  </div>
                                    
                                </div>


                                <div className="col-lg-2 title-c">
                                  <div className="stat-top-wrapper">

                                      <p className="stat-title">Start Day/Time: </p>
                                      <p className="stat-total">{start_time}</p>

                                  </div>  
                                </div>

                                <div className="col-lg-2 title-c">
                                  <div className="stat-top-wrapper">

                                      <p className="stat-title">Stop Day/Time: </p>
                                      <p className="stat-total">{end_time}</p>

                                  </div>  
                                </div>

                              <div className="col-lg-2">
                                  <div>
                                    <Button>
                                      <ul>
                                          <a href="#" className='link-text' id = 'create-event' onClick = {()=>showModalForm(!showModal)}> Invite People </a>

                                      </ul>
                                    </Button>
                                </div>          
                                </div>
                            </div>
                        </div>
                
                    </div>
                    </div>
                    <div className="row px-3" >
                    <div className="col-lg-12">
                        <div className="booking-details bg-c">
                            <div className="booking-wrapper bg-c">
                            <DataTable data={hotelBranchDetails} 
                                showActions = {false} detailedTable={false}
                              />
                        </div>
                        <p className="text-end mt-3 pagination-text">Showing page 1 of 1</p>
                        </div>
                    </div>
                </div>
            </div>
          <CustomModalPane show={showModal}
           title = {modalTitle}
           target = "add-attendees"
           hideThisModal={() => setShowModal(false)}
           >
            { message && <div className={classname}>{message}</div> }
            <MagnivaEventsForm 
                setShowModal={setShowModal}
                submitTitle={submitTitle}
                />
        </CustomModalPane>
         
        </Home>
        </AdminLayout>
    )
}

const Button = styled.div`
background-color : #b7d4fd;
border:1px solid #D3C5C5;
font-size: 14px;
padding: 10px 5px 5px 5px;
border-radius: 5px;
margin: 45px;
cursor: pointer;
display : flex;
width : %;

&:disabled {

};
// &:hover{
//     background-color:#4b5561;
//     cursor:pointer;
//     border:1px solid #4b5561;
// }
.link-text {
    float: right;
    background-color:#;
    font-weight : bold;
    color: #1F271B;
    text-decoration: none;
    &:hover{
             font-weight : bold;
             font-size : 15px;
             cursor:pointer;
             color: #e455636;
             }
}

.checkin{
    padding : 10px; 10px 10px;

}
`
const Wrapper = styled.div`
    padding: 0.5rem 1rem;
    height:100px;
    display: flex;
    justify-content: space-between;
    h3{
        font-size: 20px;
        margin:30px 0px 0px 0px;
        position: absolute;
    }
    h4{
      font-size: 16px;
      margin:60px 0px 0px 0px;
      position: absolute;
  }
    .p{
        color:red,
        margin:40px 0px 0px 0px;
    }
    .set {
      color: ;
    }

    `
const Home = styled.div`
  width: 100%;
  height: auto;
  .bg-white {
    background-color: #fff;
    padding: 10px;
  }
  .col-lg-12 {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    padding: 0;
    .booking-tab {
      flex: 0.2;
      background-color: #fff;
      padding: 30px 20px;
      position: relative;
      p {
        cursor: pointer;
      }
      .fa {
        font-size: 1.1rem;
        padding-right: 20px;
      }
      a {
        text-decoration: none;
        color: #000;
      }
    }
    .booking-details {
      flex: 0.78;
      height: 100%;
      background-color: #f1f1f1;
    }
    .home-stat-wrapper{
      margin-top: 54px;
    }
    .stats-wrapper {
        width:100%;
    }
  }
  .booking-container {
    margin: 20px 0px 100px 0px;
  }
  .top-nav {
    padding-top:30p;
  }
  .stat-title{
    padding : 20px;
    font-size : 14px !important;
    display : flex;
    justify-content : left;
    font-family: 'Quicksand', sans-serif;
    color : #fff !important;
 

    
  }
  .stat-total{
    font-size : 14px !important;
    display : flex;
    justify-content : left;
    margin-left : 15px !important;
    font-family: 'Quicksand', sans-serif;
    color : #fff !important;
    
  }
  .title-c {
    background-color: #7d2727;

  }
`;
export default HotelBranchDetailsPage;
