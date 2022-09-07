import React, { useContext, useState, useEffect, useRef } from "react";
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

    const [email, setEMail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [formSend, setFormSend] = useState(false);
    const [code, setCode] = useState("code");

    //Linking flow
    const [notRegistered, setNotRegistered] = useState(false);
    const [linkingMessage, setLinkingMessage] = useState("CREATE");

    const loadingLink = useRef(false);

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

    console.log(type);

    const changeEmail = (email) => {
        setEMail(email);
    };

    const changeVerification = (code) => {
        setCode(code);
    };

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
                    setFormSend(false);
                }
            }
        }
    };

    const onConfirm = async () => {
        if (!/^\d{6}$/.test(code)) {
            // setErrorCode("Input a valid code");
            return;
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
                setLoading(false);
                if (respuesta.error.num === 3003) setNotRegistered(true);
                else if (respuesta.error.num === 401)
                    history.push("/auth/user-not-found");
                else
                    fireAlert(
                        `Error ${respuesta.error.num}`,
                        respuesta.error.text
                    );
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
    };

    const handleSignup = async () => {
        history.push("/signup");
    };

    useEffect(() => {
        if (notRegistered) {
            fireAlertAsync(
                "NOT REGISTERED",
                "The email you entered is not registered to any nWayPlay service. Please create an account"
            ).then(() => history.push("/signup"));
        }
    }, [notRegistered, history]);

    //Handle link debería registrar al usuario por primera vez.
    const handleLink = async () => {
        console.log("Loading:" + loadingLink.current);
        setLinkingMessage("CREATING...");
        if (!loadingLink.current) {
            loadingLink.current = true;
            const response = await authService.login(
                userSignup.email,
                code,
                "/first-login",
                userSignup
            );
            console.log(response);

            if (response.data.message) {
                await fireAlertAsync("Error at linking", response.data.message);
            } else {
                setDataUser(response);
                history.push("/auth/linking-success");
            }

            loadingLink.current = false;
        }
    };

    return (
        <Background>
            <LeftBanner />
            <Dialog
                setEmail={changeEmail}
                errorEmail={errorEmail}
                sendCode={onLogin}
                loading={loading}
                type={type}
                handleChangeVerificationCode={changeVerification}
                handleConfirmCode={onConfirm}
                handleSignup={handleSignup}
                linkingMessage={linkingMessage}
                handleLink={handleLink}
            />
        </Background>
    );
};

export default Auth;
