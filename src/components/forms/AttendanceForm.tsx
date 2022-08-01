
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from "../../context";
import makeRequest from  '../../utils/fetch-request';

interface Props {
    setShowModal: any
    selectedRecord : any
    submitTitle : any
}

const AttendanceForm = (props: Props) => {
    const [state, dispatch] = useContext(Context);
    const {setShowModal, selectedRecord, submitTitle } = props;


    const schema = {
      
         event_id : {
            type: 'db_select',
            label : ' Event ',
            model : 'magniva-events',
            model_display_col : ['event_title'],
            placeholder : 'Select Event',
         },
         invite_id : {
            type: 'db_select',
            label : 'Invites ',
            model : 'invites',
            model_display_col : ['invite_message'],
            placeholder : 'Select Invite Title ',
         },
         attendee_id : {
            type: 'db_select',
            label : 'Name ',
            model : 'attendees',
            model_display_col : ['first_name'],
            placeholder : 'Choose Attendee Name ',
         },
        

    }

    const [label, setLabel] = useState(submitTitle);
    const [endpoint, setEndpoint] = useState("/attendance/create");
    const [attendanceSchema, setAttendanceSchema] = useState(schema);

    

    useEffect(() => {
        
        if(selectedRecord){
           
            setLabel('Update Record');
            setEndpoint('/attendance/update/' + selectedRecord.id)
           
            let editSchema : any = Object.assign({}, schema);
            Object.entries(selectedRecord).map(([key, value]) => {

                if(editSchema[key]){
                    editSchema[key].value = value;
                } else {
                    console.log('Edit form schema missing key', key);
                }
            })
            setAttendanceSchema(editSchema);
        } else {
            setLabel(submitTitle);
        }
    },[selectedRecord])


    return(
        <FormWrapper>
            { LoadForm(attendanceSchema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default AttendanceForm;