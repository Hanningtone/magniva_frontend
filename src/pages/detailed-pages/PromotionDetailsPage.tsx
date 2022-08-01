import { useEffect, useCallback, useState, useContext  } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { AdminLayout, 
    SubHeader,
    TableLoaders
 } from "../../components";
import CategoryService from "../../services/CategoryService";
import makeRequest from "../../utils/fetch-request";
import DataTable from "../../utils/table"
import { Context } from "../../context";
import HotelMenu from '../../components/settings/HotelMenu';


const PromotionDetailsPage = (user: any) => {

    const [classname, setClassname] = useState('success');
    const [page, setPage] = useState(0);
    const [state, dispatch ] =  useContext(Context);
    const [error, setError] = useState();
    const [promotionDetails, setPromotionDetails] = useState();
    const { id, relations } = useParams();
  
    const fetchPromotionDetails= useCallback(() => {

      let _url = "/room-amenities/detail/"+id;
      relations && (_url += '?relations='+relations);
  
      makeRequest({ url: _url, method: "get", data: null }).then(
        ([status, result]) => {
          if (status !== 200) {
            setError(result?.message || "Error, could not fetch records");
          } else {
            setPromotionDetails(result?.data || []);
          }
        }
      );
      
    }, []);
  
  
    useEffect(() => {
      fetchPromotionDetails();
    }, [fetchPromotionDetails]);
  

    return(
        <AdminLayout showSideMenu={true}>
        <Home>
     
            <div className="container-fluid">
                <div className="row px-3">
                    <div className="col-lg-12">
                        <div className="stats-wrapper">
                            <div className="row">
                                
                                <div className="col-lg-3">
                                    <div className="home-stat-wrapper">
                                        <div className="stat-icon">
                                            <i className="fa fa-bed"></i>
                                        </div>
                                        <div className="stat-top-wrapper">
                                                <p className="stat-title">Total Hotels</p>
                                                <p className="stat-total">300</p>
                                        </div>
                                        <div className="stat-bottom-wrapper">
                                            <p><span className="text-success fw-bold">+5% </span>increase since last month</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="home-stat-wrapper">
                                        <div className="stat-icon">
                                        <i className="fa fa-bed"></i>
                                        </div>
                                        <div className="stat-top-wrapper">
                                            <p className="stat-title">Rooms Available</p>
                                            <p className="stat-total"></p>
                                    </div>
                                    <div className="stat-bottom-wrapper">
                                        <p><span className="text-danger fw-bold">-5% </span>decrease since last month</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="home-stat-wrapper">
                                        <div className="stat-icon">
                                        <i className="fa fa-users"></i>
                                    </div>
                                        <div className="stat-top-wrapper">
                                            <p className="stat-title">Rooms Booked</p>
                                            <p className="stat-total">300</p>
                                        </div>
                                        <div className="stat-bottom-wrapper">
                                        <p><span className="text-success fw-bold">+5% </span>increase since last month</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="home-stat-wrapper">
                                        <div className="stat-icon">
                                        <i className="fa fa-calendar"></i>
                                    </div> 
                                        <div className="stat-top-wrapper">
                                            <p className="stat-title">Fully Booked Hotels</p>
                                            <p className="stat-total"></p>
                                        </div>
                                        <div className="stat-bottom-wrapper">
                                        <p><span className="text-danger fw-bold">-5% </span>decrease since last month</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                
                    </div>
                    </div>
                    <div className="row px-3" >
                    <div className="col-lg-12">
                        <HotelMenu/>
                        <div className="booking-details bg-c">
                            <div className="booking-wrapper bg-c">
                            <DataTable data={promotionDetails} 
                                showActions = {false} detailedTable={false}
                              />
                        </div>
                        <p className="text-end mt-3 pagination-text">Showing page 1 of 1</p>
                        </div>
                    </div>
                </div>
            </div>
         
        </Home>
        </AdminLayout>
    )
}

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
    .stats-wrapper {
        width:100%;
        margin-bottom:5px;
    }
  }
  .booking-container {
    margin: 20px 0px 100px 0px;
  }
`;
export default PromotionDetailsPage;
