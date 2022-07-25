
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

const HotelsForm = (props: Props) => {
    const [state, dispatch] = useContext(Context);
    const {setShowModal, selectedRecord, submitTitle } = props;


    const schema = {
        event_id : {
            type: 'db_select',
            label : ' Event Title ',
            model : 'magniva-events',
            model_display_col : ['event_title'],
            placeholder : 'Choose Event\'s Title',
         },
         invite_message : {
            type: 'textarea',
            label : ' Invite Message ',
            placeholder : 'Write Your invite Message ',
            required : true
         },

    }

    const [label, setLabel] = useState(submitTitle);
    const [endpoint, setEndpoint] = useState("/invites/create");
    const [hotelsFormSchema, setHotelsFormSchema] = useState(schema);

    

    useEffect(() => {
        
        if(selectedRecord){
           
            setLabel('Update Record');
            setEndpoint('/invites/update/' + selectedRecord.id)
           
            let editSchema : any = Object.assign({}, schema);
            Object.entries(selectedRecord).map(([key, value]) => {

                if(editSchema[key]){
                    editSchema[key].value = value;
                } else {
                    console.log('Edit form schema missing key', key);
                }
            })
            setHotelsFormSchema(editSchema);
        } else {
            setLabel(submitTitle);
        }
    },[selectedRecord])


    return(
        <FormWrapper>
            { LoadForm(hotelsFormSchema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default HotelsForm;