import {useState, useContext, useEffect, useCallback} from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import logo from "../../assets/images/magniva_logo_no_bg.png";
import styled from "styled-components";
import { useMutation} from 'react-query';
import {Context}  from '../../context';
import makeRequest from '../../utils/fetch-request';
import { setLocalStorage }  from '../../utils/local-storage';

const LoginForm = () => {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const[modalTitle, setModalTitle] = useState("Create Attendee");
    const[submitTitle, setSubmitTitle] = useState("Create an Attendee");

    const [state, dispatch] = useContext(Context);

      
    const showModalForm = (show:boolean, 
        title='Create Invite', 
        submitTitle='Create Record') =>{
        setModalTitle(title);
        setSubmitTitle(submitTitle);
        setShowModal(show);
      }
      const goHome = () => {
        navigate('/home')
      }
  

    const handleSubmitUserLogin = (values:any) => {                                            
        let endpoint = '/auth/login';                                             
        setLoading(true)                                                      
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setLoading(false)                                                 
            if(status === 200 ){               
                setLocalStorage('user', response.data);
                dispatch({type:'SET', key:'user', payload:response.data});
                navigate('/home')
            } else {             
                console.log("Response error", response, status);
                setError(response.message)
            }                                                                   
        })                                                                      
    } 

    const { register, handleSubmit, formState: { errors } } = useForm();

    return(
        <Card>
            <h5 className='login-text'>Login</h5>
            <span role="alert" className="form-alert bigger">{error}</span>
            <div className="form-container ">
                <form onSubmit={goHome}>
                    <div className="form-group">
                        <input type="text" 
                            className="form-control un" 
                            id="email" 
                            placeholder="Enter email"
                            aria-invalid={errors.email ? "true" : "false"}
                            {...register('username', { required: true})}
                        />
                        {errors.email && (
                            <span role="alert" className="form-alert">Check your email</span>
                        )}
                    </div>
                    <div className="form-group">
                        <input 
                        type="password" 
                        className="form-control pass" 
                        id="password" 
                        placeholder="Password"
                        aria-invalid={errors.password ? "true" : "false"}
                        {...register('password', { required: true})}/>
                        {errors.password && (
                            <span role="alert" className="form-alert">Check your password</span>
                        )}
                    </div>
                    <div className="">
                        {!loading?
                            <button type="submit" className="submit">   Login  </button>
                            :
                            <button type="button" className="submit" style={{ color: "" }}>   Please wait...  </button>
                        }
                    </div>
                    <a href="" onClick = { () => {console.log(" Nothing") }} className="register"> Register Here</a>
                </form>
            </div>
        </Card>
        
    )
}

const Card = styled.div`
    padding-top: 2rem;
    width: 500px;
    text-align: center;
    margin-top: 0rem auto;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color : rgba(221, 228, 220, 1);
    border-radius: 2.5em;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);

    .imglogo{
        width:300px;
        height:50px;
    }
    .login-text {
        color : #000;
    }
    .un {
        width: 88%;
        color: rgb(50, 50, 20);
        font-weight: 400;
        font-size: 14px;
        letter-spacing: 1px;
        background: rgba(136, 126, 126, 0.04);
        padding: 10px 40px;
        border: none;
        border-radius: 20px;
        outline: none;
        box-sizing: border-box;
        border: 1px solid rgba(50, 0, 60, 0.2);
        margin-bottom: 50px;
        margin-left: 46px;
        text-align: center;
        margin-bottom: 27px;
        font-family: 'Poppins', sans-serif;
        }
    .pass{
    width: 88%;
    color: rgb(50, 50, 20);
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
    padding: 10px 40px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: 1px solid rgba(50, 0, 60, 0.2);
    margin-bottom: 50px;
    margin-left: 46px;
    text-align: center;
    margin-bottom: 27px;
    font-family: 'Poppins', sans-serif;
    }
    .submit {
          cursor: pointer;
          border-radius: 5em;
          color: #fff;
          background: #006666;
          border: 0;
          padding-left: 60px;
          padding-right: 60px;
          padding-bottom: 10px;
          padding-top: 10px;
          font-family: 'Poppins', sans-serif;
          margin-left: 15%;
          font-size: 14px;
          box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
      }
      
      
      .register {
          text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
          color: #006666;
          margin-left: 15%;
          font-family: 'Poppins', sans-serif;
          paddind-top : 40px;
      }
      
      a {
          text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
          color: #E1BEE7;
          text-decoration: none
      }
      
      @media (max-width: 600px) {
          .main {
              border-radius: 0px;
          }
    
   
    .un:focus, .pass:focus {
        border: 2px solid rgba(0, 0, 0, 0.18) !important;
        
    }


    .form-group{
        text-align: left
    }
    .login-form-wrapper img{
        width: 150px;
        height: 50px;
        object-fit: contain;
    }
    .form-container{
        border: 1px solid #333;
        padding: 30px;
        width: 100%;
        border-radius: 5px;
    }
    .bigger{
        font-size:15px;
        margin-bottom:7px;
    }`

export default LoginForm;
