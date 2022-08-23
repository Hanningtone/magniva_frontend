import { useEffect, useCallback, useState, useContext } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import {
  AdminLayout,
  SubHeader,
  MagnivaModal,
  TableLoaders,
  SettingsForm,
} from "../components";
import makeRequest from "../utils/fetch-request";
import { Context } from "../context";
import { FcServices } from 'react-icons/fc'

const PerformancePage = (user: any) => {
  const [showModal, setShowModal] = useState(false); // showModal variable that's set to false.
  const [settings, setSettings] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState();
  const [classname, setClassname] = useState("success");
  const [page, setPage] = useState(0);
  const [state, dispatch] = useContext(Context);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalTitle, setModalTitle] = useState("Create Setting");
  const [submitTitle, setSubmitTitle] = useState("Create Setting");

  useEffect(() => {
    dispatch({ type: "SET", key: "context", payload: "settingspage" });
  }, []);

  useEffect(() => {
    if (state?.context) {
      let status = state[state.context].status;
      let message = state[state.context].message;
      let data = state[state.context]?.data || {};

      console.log(
        "state context ",
        state.context,
        "has data",
        state[state.context]
      );

      if (status === true) {
        setClassname("alert alert-success");
      } else {
        setClassname("alert alert-danger");
      }
      setMessage(message);
    }
  }, [state?.settingspage]);

  const showModalForm = (
    show: boolean,
    title = "Create Settings",
    submitTitle = "Create Record"
  ) => {
    setModalTitle(title);
    setSubmitTitle(submitTitle);
    setShowModal(show);
  };

  useEffect(() => {
    if (!showModal) {
      setSelectedRecord(null);
    }
  }, [showModal]);

  const fetchSettings = useCallback(() => {
    let _url = "/settings/get";

    makeRequest({ url: _url, method: "get", data: null }).then(
      ([status, result]) => {
        if (status !== 200) {
          setError(result?.message || "Error, could not fetch records");
        } else {
          setSettings(result?.data || []);
        }
      }
    );
  }, [state?.page]);

  useEffect(() => {
    if (state?.updaterecord) {
      let id = state.updaterecord.id;
      let model = state.updaterecord.model;
      console.log("Found Record and Model", state.updaterecord);

      let data_url = "/" + model + "/get?id=" + id;
      makeRequest({ url: data_url, method: "get", data: null }).then(
        ([status, response]) => {
          if (status !== 200) {
            dispatch({
              type: "SET",
              key: "server_error",
              payload: response.message,
            });
          } else {
            console.log("Get Data ", response);
            setSelectedRecord(response.data.shift());
          }
          setModalTitle("Update setting Details");
          setShowModal(true);
        }
      );
    }
  }, [state?.updaterecord]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <AdminLayout showSideMenu={true}>
      <Home>
        <div  className="in__construction">
          <FcServices/>
          <h1>Performance In Construction </h1>
        </div>
      </Home>
    </AdminLayout>
  );
};

const Home = styled.div`
  width: 100%;
  height: auto;
  .bg-white {
    background-color: #fff;
    padding: 10px;
  }
  .in__construction {
    font-size : 30px;
    text-align : center;
    position : absolute;
    top : 40%;
    left: 40%;
    font-family: 'Poppins', san-serif;
  }
  .col-lg-12 {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    padding: 0;
    .booking-tab {
      flex: 0.2;
      background-color: #fff;
      padding: 30px 20px;
      position: relative;
      p {
        cursor: pointer;
      }
      .fa {
        font-size: 1.1rem;
        padding-right: 20px;
      }
      a {
        text-decoration: none;
        color: #000;
      }
    }
    .booking-details {
      flex: 0.78;
      height: 100%;
      background-color: #f1f1f1;
    }
  }
  .booking-container {
    margin: 20px 0px 100px 0px;
  }
`;
export default PerformancePage;
