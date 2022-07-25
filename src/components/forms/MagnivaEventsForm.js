import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from "../../context";
import makeRequest from  '../../utils/fetch-request';

const MagnivaEventsForm = (props) => {
    const [state, dispatch] = useContext(Context);
    const {setShowModal, selectedRecord, submitTitle } = props;

    const schema = {
        event_title : {
            type: 'text',
            label : 'Name',
            placeholder : 'Enter New Event',
            required : false
         },
         theme_id : {
            type: 'db_select',
            label : ' Select Theme ',
            model : 'theme',
            model_display_col : ['theme_title'],
            placeholder : 'Choose Event\'s Theme',
         },
         event_minimum_guest : {
            type: 'text',
            label : 'Minimum Guests',
            placeholder : 'Enter number of Mininmum Guests',
            required : false
         },
         event_maximum_guest : {
            type: 'text',
            label : 'Maximum Guests',
            placeholder : 'Enter number of Maximum Guests',
            required : false
         },
         event_location : {
            type: 'text',
            label : 'Event Location',
            placeholder : 'Enter location of the Event',
            required : false
         },
         start_date : {
            type: 'datetime',
            label : 'Start Date',
            placeholder : 'Enter Start Date',
            required : false
         },
         end_date : {
            type: 'datetime',   
            label : 'End Date',
            placeholder : 'Enter End Date',
            required : false
         },
         event_description : {
            type: 'textarea',
            label : ' Event Description ',
            placeholder : 'Enter Event Description',
            required : true
         },
    }
    const [label, setLabel] = useState(submitTitle);
    const [endpoint, setEndpoint] = useState("/magniva-events/create");
    const [categoriesFormSchema, setCategoriesFormSchema] = useState(schema);

    

    useEffect(() => {
        
        if(selectedRecord){
           
            setLabel('Update Record');
            setEndpoint('/magniva-events/update/' + selectedRecord.id)
           
            let editSchema = Object.assign({}, schema);
            Object.entries(selectedRecord).map(([key, value]) => {

                if(editSchema[key]){
                    editSchema[key].value = value;
                } else {
                }
            })
            setCategoriesFormSchema(editSchema);
        } else {
            setLabel(submitTitle);
        }
    },[selectedRecord])


    return(
        <FormWrapper>
            { LoadForm(categoriesFormSchema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default MagnivaEventsForm;