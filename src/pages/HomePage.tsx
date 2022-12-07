import styled from "styled-components";
import { AdminLayout, BookingSummary} from "../components";
import React, { useContext, useEffect, useState, useCallback, } from "react";
import {Context}  from '../context';
import { Doughnut, Bar } from "react-chartjs-2";
import makeRequest from "../utils/fetch-request";
import CustomModalPane , { GenericDeleteModal } from "../utils/_modal";
import CustomModalPaneNotify from "../utils/_modal";
import { MagnivaEventsForm } from "../components";
import Clock from "../components/shared/Clock";
import Events from "../components/shared/Events";
import { RiRadioButtonLine } from 'react-icons/ri';
import { MdUpcoming } from 'react-icons/md'





const HomePage = (user: any) => {
    console.log("Home page receive user ", user);
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sent Invites",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "#931a1d66",
            borderColor: "#274156"
          },
          {
            label: "Attendance ",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            backgroundColor: "rgba(40, 150, 150, 0.8)",            
            borderColor: "#130302"
          }
        ]
    };

    const [showModal, setShowModal] = useState(false); // showModal variable that's set to false.
    const [error, setError] = useState(null);
    const [message, setMessage] = useState();
    const [classname, setClassname] = useState('success');
    const [page, setPage] = useState(0);
    const [state, dispatch ] =  useContext(Context);
    const[modalTitle, setModalTitle] = useState("Create Attendee");
    const[submitTitle, setSubmitTitle] = useState("Create an Attendee");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [showHotelsModal, setShowHotelsModal] = useState(false);
    

    // For Notification Modal
    const [showNofitication, setShowNotification] = useState(false);
    let notificationTitle = "We're Under Construction... Come around in a short moment";
    let messageTitle = "Just a Minute, We in Construction";

  
    useEffect(() => {
        dispatch({type:"SET", key:'context', payload:'homepage'});
    }, [])
  
    useEffect(() => {
      if(state?.context){
        let status = state[state.context]?.status;
        let message = state[state.context]?.message;
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
      title='Create Event', 
      submitTitle='Create Record') =>{
      setModalTitle(title);
      setSubmitTitle(submitTitle);
      setShowModal(show);
    }
    const showInConstructionModal = (show:boolean) => {
        setShowNotification(show)

    }


const [invites, setInvites] = useState([]);
const [upcomingEvents, setUpcomingEvents]  = useState([]);
const[allUpcomingEvents, setAllComingEvents] = useState([]);
const fetchUpcomingEvents = useCallback(() => {
    let endpoint = "/magniva-events/get"
    makeRequest({url:endpoint, method:"get",data:null}).then(([status, result]) => {
        if(status == 200){
            setAllComingEvents(result?.data);
            let theResult = result?.data;
            theResult.length = 5;
            setUpcomingEvents(theResult);
        }
    })

}, []);


useEffect(() =>{
     fetchUpcomingEvents();

}, [fetchUpcomingEvents])

    return(
        <AdminLayout showSideMenu={true}>
        <div className="container-fluid top-info">
                <div className="row">
                    <div className="col-lg-2 clock-div">
                        <Clock />
                    </div>
                    <div className="col-lg-3">
                        <Events />
                    </div>     
                </div>
      
            </div>  
        <Home>

            <div className="container-fluid py-5 px-4">
                <div className="row">
                    <div className="col-lg-2">
                       <div className="home-stat-wrapper">
                           <div className="stat-icon">
                               <i className="fa fa-bed"></i>
                           </div>
                           <div className="stat-top-wrapper">
                                <p className="stat-title"> Total Events</p>
                                <p className="stat-total">11</p>
                           </div>
                           <div className="stat-bottom-wrapper">
                               <p><span className="text-success fw-bold">+5% </span>increase since last month</p>
                           </div>
                       </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="home-stat-wrapper">
                            <div className="stat-icon">
                               <i className="fa fa-bed"></i>
                            </div>
                            <div className="stat-top-wrapper">
                                <p className="stat-title">Ongoing Events</p>
                                <p className="stat-total"> 1</p>
                           </div>
                           <div className="stat-bottom-wrapper">
                               <p><span className="text-danger fw-bold">-5% </span>decrease since last month</p>
                           </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="home-stat-wrapper">
                            <div className="stat-icon">
                               <i className="fa fa-users"></i>
                           </div>
                            <div className="stat-top-wrapper">
                                <p className="stat-title">Total Customers</p>
                                <p className="stat-total">100</p>
                            </div>
                            <div className="stat-bottom-wrapper">
                               <p><span className="text-success fw-bold">+5% </span>increase since last month</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="home-stat-wrapper">
                            <div className="stat-icon">
                               <i className="fa fa-calendar"></i>
                           </div> 
                            <div className="stat-top-wrapper">
                                <p className="stat-title">Cancelled Events</p>
                                <p className="stat-total"> 0 </p>
                            </div>
                            <div className="stat-bottom-wrapper">
                               <p><span className="text-danger fw-bold">-5% </span>decrease since last month</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div>
                            <Button>
                            <ul>
                                <a href="#" className='link-text' id = 'create-event' onClick = {()=>showModalForm(!showModal)}> Create an Event </a>
                                <hr></hr>
                                <a href="#" className='link-text' onClick = {()=>showInConstructionModal(true)}> Check In / Out </a>
                            </ul>
                        </Button>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="container-fluid pb-5 px-4">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="graph-containers">
                           <Bar data={data}/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="graph-containers upcoming">
                             <div className="row p-2">
                                 <div className="col-lg-12">
                                    <h6 className="mb-3 fs-6 " style={{ color : "#006666" }}> <RiRadioButtonLine /> Happening Now !</h6>
                                    <div className="bookings">
                                       <BookingSummary/>
                                    </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
            <div className="col-lg-12">
                        <div className="graph-containers">
                             <div className="row p-2">
                                 <div className="col-lg-12">
                                    <h6 className="mb-3 fs-6" style={{ color : '#182C4E' }}> <MdUpcoming /> Upcoming ...</h6>
                                    <div className="bookings">
                                       <BookingSummary/>
                                    </div>
                                 </div>
                             </div>
                        </div>
                    </div>
            </div>

            {/* <div className="container-fluid px-4 pb-5">
                <div className="row">
                    <div className="col-lg-4">
                       <div className="home-stat-wrapper"></div>
                    </div>
                    <div className="col-lg-4">
                        <div className="home-stat-wrapper"></div>
                    </div>
                    <div className="col-lg-4">
                        <div className="home-stat-wrapper"></div>
                    </div>
                </div>
            </div>*/}
            
<CustomModalPaneNotify show ={showNofitication} title = {notificationTitle} hideThisModal = { () =>setShowNotification(false)}/>
        <CustomModalPane show={showModal}
           title = {modalTitle}
           target = "create-magniva-events"
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
font-size: 13px;
padding: 10px 5px 5px 5px;
border-radius: 5px;
margin: 0px 0px;
cursor: pointer;
display: flex;
align-items: center ;
&:disabled {

};
.link-text {
    background-color:#;
    font-weight : bold;
    color: #1F271B;
    text-decoration: none;
    &:hover{
             font-weight : bold;
             font-size : 14px;
             cursor:pointer;
             color: #000;
             }
}
.checkin{
    padding : 10px; 10px 10px;

}
.upcoming{
    color : green;
    font-size: 50px;
}
`;


const Home = styled.div`
    width: 100%;
    height: auto; 
    .graph-containers{
        background-color: #fff;
        height:460px;
        width:100%;
    }
    .clock-div {
        border-right: 1px solid #ccc;
        }
    `

export default HomePage;
