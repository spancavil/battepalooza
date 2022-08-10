import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import NftProvider from "./Context/NftProvider";
import UserProvider from "./Context/UserProvider";
import { initAmplitude } from "./Utils/amplitude";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import PackDataProvider from "./Context/PackProvider";


initAmplitude();

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <NftProvider>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
          language="en"
          scriptProps={{
            async: false, // optional, default to false,
            defer: false, // optional, default to false
            appendTo: "head", // optional, default to "head", can be "head" or "body",
            nonce: undefined, // optional, default undefined
          }}
          >
          <PackDataProvider>
            <App />
          </PackDataProvider>
        </GoogleReCaptchaProvider>
      </NftProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
