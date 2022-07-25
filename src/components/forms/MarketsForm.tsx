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

const MarketsForm = (props: Props) => {
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
    const [marketsFormSchema, setMarketsFormSchema] = useState(schema);

    

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
            setMarketsFormSchema(editSchema);
        } else {
            setLabel(submitTitle);
        }
    },[selectedRecord])


    return(
        <FormWrapper>
            { LoadForm(marketsFormSchema, label, endpoint) }
        </FormWrapper>
    )
}


const FormWrapper = styled.div`
`
export default MarketsForm;