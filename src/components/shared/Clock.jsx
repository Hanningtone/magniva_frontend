import { useState } from 'react';

import './clockstyles.css';

const Clock = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  function getDateAndTime() {
    const d = new Date();

    let hours = d.getHours();
    let minutes = d.getMinutes();
    if (minutes === 0) minutes ='00';

    setDate(d.toDateString());
    setTime(`${hours}:${minutes}`);
  }

  setInterval(getDateAndTime, 1000);

  return (
    <div className="clock">
      <h3>Today</h3>
      <h2 className='thedate'>{date}</h2>
      <h1 className='time'>{time}</h1>
    </div>
  );
}
export default Clock;
