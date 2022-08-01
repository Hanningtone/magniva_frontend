import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from "../../context";
import makeRequest from  '../../utils/fetch-request';

interface Props {
    setShowModal: any,
    selectedRecord : any,
    submitTitle : any

}

const InvitesForm = (props: Props) => {
    const [state, dispatch] = useContext(Context);
    const {setShowModal, selectedRecord, submitTitle } = props;

    const schema = {
        
        theme_title : {
            type: 'text',
            label : 'Theme Name ',
            placeholder : 'Enter Theme Name',
            required : true
         },
         theme_description : {
            type: 'textarea',
            label : 'Theme Description ',
            placeholder : 'Enter Theme Descrption',
            required : true
         },
    }
    const [label, setLabel] = useState(submitTitle);
    const [endpoint, setEndpoint] = useState("/theme/create");
    const [eventsFormSchema, setEventsFormSchema] = useState(schema);

    

    useEffect(() => {
        
        if(selectedRecord){
           
            setLabel('Update Record');
            setEndpoint('/theme/update/' + selectedRecord.id)
           
            let editSchema : any = Object.assign({}, schema);
            Object.entries(selectedRecord).map(([key, value]) => {

                if(editSchema[key]){
                    editSchema[key].value = value;
                } else {
                    console.log('Edit form schema missing key', key);
                }
            })
            setEventsFormSchema(editSchema);
        } else {
            setLabel(submitTitle);
        }
    },[selectedRecord])


    return(
        <FormWrapper>
            { LoadForm(eventsFormSchema, label, endpoint) }
        </FormWrapper>
    )
}


const FormWrapper = styled.div`
`
export default InvitesForm;