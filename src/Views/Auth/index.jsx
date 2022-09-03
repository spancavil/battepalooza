import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { UserData } from "../../Context/UserProvider";
import LeftBanner from "../../Global-Components/LeftBanner";
import authService from "../../Services/auth.service";
import { sendAmplitudeData, setAmplitudeUserId } from "../../Utils/amplitude";
import { fireAlert, fireAlertAsync } from "../../Utils/sweetAlert2";
import Background from "./components/Background";
import Dialog from "./components/Dialog";

const Auth = () => {
    let menu2 = true;

    const [email, setEMail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [formSend, setFormSend] = useState(false);
    const [code, setCode] = useState("code");

    const { 
      setUserSignUp, 
      setCodeVerification,
      userSignup,
      setDataUser, 
      navigation,
      firstLogin,
    } = useContext(UserData);

    const history = useHistory();

    const { type } = useParams();

    const changeEmail = (email) => {
        setEMail(email);
    };

    const changeVerification = (code) => {
      setCode(code)
    }

    const onLogin = async (e) => {
        e.preventDefault();

        if (formSend !== true) {
            if (!/\S+@\S+\.\S+/.test(email)) {
                setErrorEmail("Input a valid email");
            } else {
                setErrorEmail("");
                setUserSignUp({
                    email: email.toLowerCase(),
                });
                setLoading(true);
                setFormSend(true);

                const response = await authService.getVerificationCode(email);

                if (response.success === false) {
                    fireAlert(
                        "Oops, an error ocurred",
                        response.message,
                        "500px"
                    );
                    setLoading(false);
                } else {
                    history.push("/auth/verification");
                    setLoading(false);
                }
            }
        }
    };

    const onConfirm = async () => {
      if (!/^\d{6}$/.test(code)) {
        // setErrorCode("Input a valid code");
        return
      } else {
        setLoading(true);
        setCodeVerification(code);
        const response = firstLogin
          ? await authService.login(
              userSignup.email,
              code,
              "/first-login",
              userSignup
            )
          : await authService.login(email, code, "");
        //Envío de datos de tracking a Amplitude
  
        const respuesta = response.data.response;
  
        if (respuesta && respuesta.error?.num !== 0) {
          console.log(respuesta);
          await fireAlertAsync(
            `Error ${respuesta.error.num}`,
            respuesta.error.text
            );
            setLoading(false)
          /* if (respuesta.error.num === 3003) setModalNotRegistered(true);
          else if (respuesta.error.num === 401) setModalUserNotFound(true);
          else fireAlert(`Error ${respuesta.error.num}`, respuesta.error.text); */
        } else {
          //Send tracking data to amplitude
          if (firstLogin) {
            setAmplitudeUserId(response.data.pid);
            sendAmplitudeData("Registration/Sign Up");
          } else {
            setAmplitudeUserId(response.data.pid);
            sendAmplitudeData("Registration/Log in");
          }
  
          setDataUser(response);
          history.push(navigation);
        }
      }
    }

    const handleSignup = async () => {
      history.push('/signup');
    }

    if (menu2) {
        return (
            <Background>
                <LeftBanner/>
                <Dialog
                    setEmail={changeEmail}
                    errorEmail={errorEmail}
                    sendCode={onLogin}
                    loading={loading}
                    type={type}
                    handleChangeVerificationCode={changeVerification}
                    handleConfirmCode = {onConfirm}
                    handleSignup = {handleSignup}
                />
            </Background>
        );
    }
};

export default Auth;
