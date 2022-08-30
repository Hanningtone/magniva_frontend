import Poster from "../assets/images/cover_photo.jpg";
import { LoginForm } from "../components";
import logo from "../assets/images/maniva_no_bg.png";
import styled from "styled-components";

const LoginPage = () => {

    return (
        <div className='login-page'>
           <img src= {logo} alt=" Magniva Logo" className="magniva-logo" />

            <div className='section-two'>

                <section className='centered'>
                     <LoginForm/>
                </section>
            </div>
        </div>
    )
}

export default LoginPage;
