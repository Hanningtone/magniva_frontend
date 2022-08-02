import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from "../../context";
import makeRequest from  '../../utils/fetch-request';
import * as XLSX from 'xlsx';

const AttendantsUploadForm = (props) => {
    const [state, dispatch] = useContext(Context);
    const {setShowModal, selectedRecord, submitTitle } = props;
    const [items, setItems] = useState([]);

    const readExcel = (e, setFieldValue) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log("Files as posted", file);
        const promise = new Promise((resolve, reject) => {

            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferedArray = e.target.result;
                const wb = XLSX.read(bufferedArray, { type: 'buffer' });
                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, {raw:false});

                resolve(data)

            };

            fileReader.onerror = (error) => {

                reject(error);
            };

        });

        promise.then((d) => {
            setItems(d);
            console.log("Setting field value ...");
            setFieldValue(d);
            console.log(d);
            console.log("Logging the Data", d)
        });
    }
    const schema = {
         event_id : {
            type: 'db_select',
            label : 'Select Event',
            placeholder : 'Event',
            model:"magniva-events",
            model_display_col:['event_title']
         },
         file_upload : {
            type: 'fileupload',
            label : 'Attendants Upload File',
            onChangeFunction:readExcel,
         },
         data : {
            type: 'hidden',
         }
    }
    console.log("Schema", schema)
    const [label, setLabel] = useState("Upload File");
    const [endpoint, setEndpoint] = useState("/attendees/upload-attendance");



    return(
        <FormWrapper>
            {LoadForm(schema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default AttendantsUploadForm;
