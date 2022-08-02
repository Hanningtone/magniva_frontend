import React, {useState, useContext } from 'react';
import styled from "styled-components";
import {
    AdminLayout,
} from "../components";
import * as XLSX from 'xlsx';
import DataTable from '../utils/table';
import { Context } from "../context";
import makeRequest from "../utils/fetch-request";


const UploadExcel = (props) => {
    const {eventId, user} = props;

    const [items, setItems] = useState([]);
    const [ state, dispatch ] =  useContext(Context);

    const readExcel = (file) => {

        const promise = new Promise((resolve, reject) => {

            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferedArray = e.target.result;
                const wb = XLSX.read(bufferedArray, { type: 'buffer' });
                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data)

            };

            fileReader.onerror = (error) => {

                reject(error);
            };

        });

        promise.then((d) => {
            let payload = {event_id:eventId, data:d}
            setItems(payload);
            console.log(d);
            console.log("Logging the Data", items)
        });
    }

    const onSubmit = ({ setSubmitting,  resetForm, setStatus, setErrors}) => {

        let endpoint = "/attendees/create";
        makeRequest({url:endpoint, method:"post", data:items}).then(([status, result]) => {
            if(status > 299){
                if(status < 500) { 
                    const field_errors = {};
                    Object.entries(result?.data).forEach( ([key, value]) =>  {
                        field_errors[key] = value[0];
                    });
                    setErrors(field_errors);
                    dispatch({type:"SET", key:state?.context, payload:{"status":false, "message":result.message}});
                } else {
                    dispatch({type:"SET", key:state?.context, payload:{"status":false, "message":"Internal server error"}});
                }
            } else {
                console.log("Dispatching state", state?.context,{"status":true, message:result.message, data:result} )
                dispatch({type:"SET", key:state?.context, payload:{"status":true, message:result.message, data:result}});
                dispatch({type:"SET", key:"page", payload:state?.page === 0 ? 1: 0 });
            }   
            setSubmitting(false);
        });
    }






    return (
        <AdminLayout showSideMenu={true}>
            <Home>
                <div className="container-fluid py-5 px-4">
                    <div className='row'>
                        <div className="col-lg-3">

                        </div>
                        <div className="col-lg-3">

                        </div>
                        <div className="col-lg-3">

                        </div>
                        <div className="col-lg-3">
                            <div className="user-profile">
                                <input className='inputfile' type='file' id='file' onChange={(e) => {
                                    const file = e.target.files[0];
                                    readExcel(file);
                                }} />
                                <label for='file' > Upload Excel File</label>

                            </div>

                        </div>

                    </div>
                    <DataTable data ={items}/>
                </div>
                <button onClick={onSubmit}> Submit </button>
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
    .inputfile {
        opacity: 0;
        width: 0.1px;
        height: 0.1px;
        position: absolute;
    }
    .inputfile + label {

    display: block;
  position: relative;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  background: linear-gradient(#2E766D, #45B0A4, #B6E2DD);
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: transform .2s ease-out;
    }
    
    .inputfile:focus + label,
    .inputfile + label:hover {
        background-color: red;
    }
    .
    .row{
        padding-top : 50px;
        
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

export default UploadExcel;
