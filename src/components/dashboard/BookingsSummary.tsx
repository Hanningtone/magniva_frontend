import styled from "styled-components";
import makeRequest from "../../utils/fetch-request"
import {useEffect, useState, useCallback } from "react";
import DataTable from "../../utils/table";

interface Props {
    users?: string,
}



const BookingSummary= (props: Props) => {

    const [upcomingEvents, setUpcomingEvents]  = useState(null);

    const fetchUpcomingEvents = useCallback(() => {
        let endpoint = "/magniva-events/get?limit=5"
        makeRequest({url:endpoint, method:"get",data:null}).then(([status, result]) => {
            if(status == 200){
                setUpcomingEvents(result?.data);
            }
        })

    }, []);

    useEffect(() =>{
         fetchUpcomingEvents();

    }, [fetchUpcomingEvents])

    return(
        <Booking>
            <div className="no-bookings">
                  <DataTable data={upcomingEvents} />
            </div>
        </Booking>
    )
}

const Booking = styled.div`
    width: 100%;
    height: auto;    
    .no-bookings{
        background-color: #fff;
    
        border:1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
    }`

export default BookingSummary;
