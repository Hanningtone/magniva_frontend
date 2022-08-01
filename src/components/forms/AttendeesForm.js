import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from "../../context";
import makeRequest from  '../../utils/fetch-request';

const AttendeesForm = (props) => {
    const [state, dispatch] = useContext(Context);
    const {setShowModal, selectedRecord, submitTitle } = props;

    const schema = {
         first_name : {
            type: 'text',
            label : 'Attendee Name',
            placeholder : 'Enter First Name',
            required : true,
         },
         second_name : {
            type: 'text',
            label : 'Attendee Name',
            placeholder : 'Enter Second Name',
            required : true,
         },
         phone_number : {
            type: 'text',
            label : 'Phone Number',
            placeholder : 'Enter Phone Number',
            required : true,
         },
         email_address : {
            type: 'text',
            label : 'Email Address',
            placeholder : 'Enter Email Address',
            required : false,
         },
         designation : {
            type: 'text',
            label : 'Designation',
            placeholder : 'e.g Assistant Manager',
            required : true,
         },
         organization : {
            type: 'text',
            label : 'Organization ',
            placeholder : 'Enter Organization',
            required : true    
         },
    }
    console.log("Schema", schema)
    const [label, setLabel] = useState(submitTitle);
    const [endpoint, setEndpoint] = useState("/attendees/create");
    const [attendeesFormSchema, setAttendeeSchema] = useState(schema);

    

    useEffect(() => {
        
        if(selectedRecord){
           
            setLabel('Update Record');
            setEndpoint('/attendees/update/' + selectedRecord.id)
           
            let editSchema = Object.assign({}, schema);
            Object.entries(selectedRecord).map(([key, value]) => {

                if(editSchema[key]){
                    editSchema[key].value = value;
                } else {
                }
            })
            setAttendeeSchema(editSchema);
        } else {
            setLabel(submitTitle);
        }
    },[selectedRecord])

    return(
        <FormWrapper>
            {LoadForm(attendeesFormSchema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default AttendeesForm;