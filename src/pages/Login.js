import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import logo from "../assets/whitelogo.png";
import vid from "../assets/share.mp4";
import { client } from "../utils/client";

function Login() {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const googleProfile = jwt_decode(response.credential);
    console.log(googleProfile);
    localStorage.setItem("user", JSON.stringify(googleProfile));
    const { name, aud, picture } = googleProfile;

    const doc = {
      _id: aud,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  // 52918031

  return (
    <>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <video
            src={vid}
            type="video/mp4"
            controls={false}
            muted
            autoPlay
            loop
            className="w-full h-full object-cover"
          />
          <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
            <div className="p-5">
              <img src={logo} alt="logo" width="250px" />
            </div>
            <div className="shadow-2xl">
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
