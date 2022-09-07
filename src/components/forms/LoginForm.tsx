import {useState, useContext, useEffect, useCallback, useTransition} from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import logo from "../../assets/images/maniva_no_bg.png";
import styled from "styled-components";
import { useMutation} from 'react-query';
import {Context}  from '../../context';
import makeRequest from '../../utils/fetch-request';
import { setLocalStorage }  from '../../utils/local-storage';
import CustomModalPane from "../../utils/_modal";
import UsersForm from "./UsersForm";

const LoginForm = (props:any) => {
    const { hideRegisterModal } = props;

    
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const[modalTitle, setModalTitle] = useState("Create Account");
    const[submitTitle, setSubmitTitle] = useState("Create an Account");
    const [state, dispatch] = useContext(Context);
    const [classname, setClassname] = useState('');

    useEffect(() => {
        dispatch({type:"SET", key:'context', payload:'eventspage'});
    }, [])
  
    useEffect(() => {
      if(state?.context){
        let status = state[state.context].status;
        let message = state[state.context].message;
        let data = state[state.context]?.data || {};
  
        if(status === true){
          setClassname('alert alert-success');     
        } else {
          setClassname('alert alert-danger');
        }
        setMessage(message);
      }
  
    }, [state?.eventspage])

      const goHome = () => {
        navigate('/home')
      }
    const handleSubmitUserLogin = (values:any) => {                                            
        let endpoint = '/auth/login';
        console.log(" Values Passed ", values);                                       
        setLoading(true)                                                      
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            console.log(" Response Status", response, status);
            setLoading(false)                                                 
            if(status === 200 ){
                setLocalStorage('user', response.data);
                dispatch({type:'SET', key:'user', payload:response.data});
                navigate('/home')
                console.log(" Response on 200", response, status)
            } else {             
                console.log("Response error", response, status);
                setError(response.message)
            }                                                                   
        })                                                                      
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    return(
        <>
        <Card>

            <h5 className='login-text'>Login</h5>


            <span role="alert" className="form-alert bigger">{error}</span>
            <div className="form-container ">
                <form onSubmit={ handleSubmit(handleSubmitUserLogin) }>
                    <div className="form-group">
                        <input type="text" 
                            className="form-control un" 
                            id="email" 
                            placeholder="Enter Email"
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
                        {!loading ?
                            <button type="submit" className="submit">   Login  </button>
                            :
                            <button type="button" className="submit">   Please wait...  </button>
                        }
                    </div>
                </form>
            </div>
        </Card>
        <CustomModalPane show={showModal}
           title = {modalTitle}
           target = "create-user"
           hideThisModal={() => setShowModal(true)}
           >
            { message && <div className={classname}>{message}</div> }
            <UsersForm 
                setShowModal={showModal}
                />
        </CustomModalPane>
        </>
        
    )
}

const Card = styled.div`
    padding-top: 2rem;
    width: 500px;
    text-align: center;
    margin-top: 0rem auto;
    height: 380px;
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
      
      
      .reg {
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
