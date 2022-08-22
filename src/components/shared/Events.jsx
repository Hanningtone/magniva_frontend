import React, {useState} from 'react'

const Events = ( props ) => {
    const {events} = props;
    const [numOfEvents, setNumOfEvents] = useState(events);
  return (
    <>
    <h3> Events Today: </h3>
    </>
  )
}

export default Events