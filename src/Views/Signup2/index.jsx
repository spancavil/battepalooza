import React, {useState} from "react";
import LeftBanner from "../../Global-Components/LeftBanner";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import Background from "./components/Background";
import Dialog from "./components/Dialog";

const SignUp = () => {

    const [showInfoSignup, setShowInfoSignup] = useState(false);

    const laptop = useMediaQuery("(max-width: 992px) and (min-width: 767px)");
    const mobile = useMediaQuery("(max-width: 766px)");

    return (
        <Background showInfoSignup={showInfoSignup}>
            {!(laptop || mobile) && <LeftBanner />}
            <Dialog setShowInfoSignUp={setShowInfoSignup}/>
        </Background>
    );
};

export default SignUp;
