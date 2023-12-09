import React, { useState, useEffect } from "react";
import { setCurrAccessToken, openSheetModal } from "./actions/drive-actions";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";

const DriveInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash);
    const accessTokenCurr = urlParams.get("access_token");
    if (accessTokenCurr) {
      console.log("Access Token:", accessTokenCurr);
      dispatch(setCurrAccessToken(accessTokenCurr));
      dispatch(openSheetModal());
    }
  }, []);

  function handleLogin() {
    let client_id = process.env.REACT_APP_CLIENT_ID;
    let redirect_uri = "http://localhost:3000/";

    const url =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `scope=https%3A//www.googleapis.com/auth/drive&` +
      `include_granted_scopes=true&` +
      `response_type=token&` +
      `state=state_parameter_passthrough_value&` +
      `redirect_uri=${redirect_uri}&` +
      `client_id=${client_id}`;

    console.log(url);
    window.location.href = url;
  }

  useEffect(() => {}, []);

  return (
    <div
      onClick={handleLogin}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "fit-content",
        cursor: "pointer",
      }}
    >
      <Typography variant="body1" fontSize={20}>
        Select File
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src="drive_logo.png" alt="drive logo" height={60} width={60} />
        <Typography variant="h6">Drive</Typography>
      </div>
    </div>
  );
};
export default DriveInit;
