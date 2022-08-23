import React, { useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import "./clockstyles.css";

const Events = (props) => {
  const { events } = props;
  const [numOfEvents, setNumOfEvents] = useState(events);
  let percentage = 9;
  let minValue = 0;
  let maxValue = 10.5;
  return (
    <>
    <div>
    <h3 className="clock" > Events</h3>
    <h2 id='today-title'> Today : </h2>
      <div className='enclose_circular_bar'> 

      <div className="events__progresss">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}`}
          minValue={minValue}
          maxValue = {maxValue}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",

            // Text size
            textSize: "40px",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `rgba(140, 100, 30, 0.7`,
            textColor: `rgba(42, 124, 170, 1`,
            trailColor: "#fff",
            backgroundColor: "#390F04",
          })}
        />


      </div>
      </div>

      </div>


      
    </>
  );
};

export default Events;
