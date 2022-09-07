import { useState, useEffect, useContext } from "react";
import Poster from "../assets/images/cover_photo.jpg";
import { LoginForm } from "../components";
import logo from "../assets/images/maniva_no_bg.png";
import styled from "styled-components";
import CustomModalPane from "../utils/_modal";
import UsersForm from "../components/forms/UsersForm";
import { Context } from "../context";

const LoginPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [state, dispatch] = useContext(Context);
  const [classname, setClassname] = useState("");

  useEffect(() => {
    if (state?.context) {
      let status = state[state.context].status;
      let message = state[state.context].message;
      let data = state[state.context]?.data || {};

      if (status === true) {
        setClassname("alert alert-success");
      } else {
        setClassname("alert alert-danger");
      }
      setMessage(message);
    }
  }, [state?.eventspage]);

  return (
    <div className="container-fluid">
      <div className="row">
      <div className="col-lg-12 section-two">
                <img src={logo} alt="magniva_logo" className="magniva-logo"></img>

              <section className="centered">
                <LoginForm />
              </section>
              <button onClick={() => setShowModal(true)} className="register">
                {" "}
                Create Account Here
              </button>

              <CustomModalPane
                show={showModal}
                title=" Create User"
                target="create-user"
                hideThisModal={() => setShowModal(false)}
              >
                {message && <div className={classname}>{message}</div>}
                <UsersForm setShowModal={showModal} />
              </CustomModalPane>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
