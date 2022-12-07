import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {FcHome} from 'react-icons/fc'
import {FcCalendar} from 'react-icons/fc'
import {FcInvite} from 'react-icons/fc'
import {FcManager} from 'react-icons/fc'
import {FcApproval} from 'react-icons/fc'
import {FcStatistics} from 'react-icons/fc'
import {FcServices} from 'react-icons/fc'

const SideMenu = (props: any) => {
    
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState((location.pathname.substring(1)));

    return(
        <Wrapper>
            <ul>
                <li className={currentRoute === "home"?"active":""}><a href="/home" className={currentRoute === "home"?"active":""}><i> <FcHome/> </i> Home</a></li>
                <li className={currentRoute === "magniva-events"?"active":""}><a href="/magniva-events" className={currentRoute === "magniva-events"?"active":""}><i> <FcCalendar/> </i> Events</a></li>
                <li className={currentRoute === "invites"?"active":""}><a href="/invites"  className={currentRoute === "invites"?"active":""}><i> <FcInvite /> </i> Invites</a></li>
                <li className={currentRoute === "attendees"?"active":""}><a href="/attendees"  className={currentRoute === "attendees"?"active":""}><i> <FcManager /> </i> People</a></li>
                <li className={currentRoute === "attendance"?"active":""}><a href="/attendance"  className={currentRoute === "attendance"?"active":""}><i> <FcApproval /> </i> Attendance</a></li>
                <li className={currentRoute === "performance"?"active":""}><a href="/performance"  className={currentRoute === "performance"?"active":""}><i> <FcStatistics /> </i> Performance </a></li>
                
                <li className={currentRoute === "settings"?"active":""}><a href="/settings" className={currentRoute === "settings"?"active":""}><i> <FcServices /> </i> Settings</a></li>{/* users, app settings, booking window, ranking algorithm*/}
                {/*<li><a href="/alerts"><i className="fa fa-bell-o"></i> Alerts <span className="count">2</span></a></li>*/}
            </ul>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: rgba(117, 5, 5, 0.9);
    height: 100%;
    width:120px;
    position:fixed;
    top:78px;
    text-color: #fff;
    border-right: 1px solid #ccc;
    z-index: 10;
    ul{
        padding:0;
        margin:0;
        li{
            text-align:center;
            list-style:none;
            padding:15px;
            border-top: 0.5px solid #848482;
            border-bottom: 0.5px solid #848482;
            a{
                color:#fff;
                text-decoration:none;
                font-family : 'Poppins', sans-serif;
                i{
                    font-size: 25px;
                    display: block;
                    margin-bottom:5px;
                }
            }
            a:hover, li.active{
              color: #fff
              cursor:pointer;
            }
            span.count{
                background-color: red;
                color: #fff;
                padding: 1px 5px;
                font-size:12px;
            }
        }
        li:hover, li.active{
            background-color: rgba(40, 150, 150, 0.8);           
            color: #fff;
            a{
                color: #fff;
            }
        }
        
    }
`
export default SideMenu;
