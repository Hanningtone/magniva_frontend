import React, {useState} from 'react' 
import './nav.css' 
import { AiOutlineHome } from 'react-icons/ai' 
import { AiOutlineUser } from 'react-icons/ai' 
import { BiBook } from 'react-icons/bi' 
import { RiServiceLine } from 'react-icons/ri' 
import { BiMessageSquareDetail } from 'react-icons/bi' 
 
const EventsNavigation = (props) => { 
const [activeNav, setActiveNav] = useState('#'); 
console.log("Who the Fuck is Active? ", activeNav)
 
 
  return ( 
    <nav> 
      <a href='#' onClick={ () => props.showModalFileUploadForm(true) }> Upload members </a> 
      <a href='#about' onClick={ () => setActiveNav('#about') } className={activeNav === '#about' ? 'active' : ''} >  Add one by one </a> 
      <a href='#experience' onClick={ () => setActiveNav('#experience') } className={activeNav === '#experience' ? 'active' : ''}> Check-in & Check-out</a> 
      <a href='#services' onClick={ () => setActiveNav('#services') }className={activeNav === '#services' ? 'active' : ''}> Filter Visitors Checked-in</a> 
      <a href='#contact' onClick={ () => setActiveNav('#contact') } className={activeNav === '#contact' ? 'active' : ''}> Filter Visitors checked-out</a> 
    </nav> 
  ) 
} 
 
export default EventsNavigation;