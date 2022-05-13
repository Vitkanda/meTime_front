import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import LoginForm from "./loginForm";
import Icon from "../icon";
import { LogoWrapper, Motto, Button, Flex } from "../styles/signin";
import { SET_USER, SET_THEME } from "../../redux/actions";
import SignupForm from "./signupForm";
import Modal from "../modal";
import { logo, motto } from "./paths";
import { Row, Col } from "antd";

const URL = process.env.REACT_APP_SERVER_URL;

const SignIn = (props) => {
  const [credentialError, setCredentialError] = useState({
    user: null,
    password: null,
  });
  const [userError, setUserError] = useState({
    username: null,
    email: null,
  });
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const history = useHistory();
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      setLoginDisabled(true);
      const login = await axios.post(`${URL}/user/login-user`, data);
      setCredentialError({ user: null, password: null });
      setLoginDisabled(false);
      dispatch({ type: SET_USER, payload: login.data.user });
      dispatch({ type: SET_THEME, payload: "default" });
      history.push("/home");
    } catch (err) {
      setCredentialError(err.response.data);
      setLoginDisabled(false);
    }
  };

  const handleSignupSubmit = async (data) => {
    try {
      setLoginDisabled(true);
      const signup = await axios.post(`${URL}/user/add-user`, {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: data.password,
        dob: data.dob,
      });
      setUserError({ username: null, email: null });
      setLoginDisabled(false);
      dispatch({ type: SET_USER, payload: signup.data.user });
      history.push("/home");
    } catch (err) {
      setUserError(err.response.data.errors);
      setLoginDisabled(false);
    }
  };

  return (
    <React.Fragment>
      {isModalOpen && (
        <Modal
          children={
            <SignupForm
              onSubmit={handleSignupSubmit}
              userError={userError}
              loginDisabled={loginDisabled}
            />
          }
          handleClose={() => setIsModalOpen(!isModalOpen)}
          padding="15px"
        />
      )}
      <Row>
        <Col
          md={12}
          xs={24}
          style={{ overflow: "hidden", position: "relative" }}
        >
          <LogoWrapper>
            <Icon d={logo} height="130vh" fill="rgb(29,161,242)" />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              {motto.map((item) => (
                <Motto key={item.text}>
                  <Icon
                    d={item.path}
                    width="28.75px"
                    height="28.75px"
                    fill="rgb(114, 91, 222)"
                  />
                  <span>{item.text}</span>
                </Motto>
              ))}
            </div>
          </LogoWrapper>
        </Col>
        <Col md={12} xs={24} style={{ padding: "15px" }}>
          <LoginForm
            onSubmit={handleSubmit}
            credentialError={credentialError}
            loginDisabled={loginDisabled}s
          />
          <Flex>
            <div style={{"textAlign": "center"}}>
              <img src="../../../public/logo.png" alt="logo" width="400" height="400"/>
              <h1>Будь в курсе</h1>
              <p>Присоединяйся к Me Time</p>
              <Button
                bg="rgb(205, 226, 138)"
                color="rgb(165, 133, 212)"
                hovbg="#EEFC9C"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                Регистрация
              </Button>
            </div>
          </Flex>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SignIn;

