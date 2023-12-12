function setAccessToken(token) {
  return {
    type: "SET-ACCESS-TOKEN",
    payload: token,
  };
}

function setSpreadsheetList(spreadsheets) {
  return {
    type: "SET-SPREADSHEET-LIST",
    payload: spreadsheets,
  };
}

function setSpreadsheetId(id) {
  return {
    type: "SET-SPREADSHEET-ID",
    payload: id,
  };
}

function setSpreadsheetData(data) {
  return {
    type: "SET-SPREADSHEET-DATA",
    payload: data,
  };
}

function addNewSpreadsheetData(updatedObj) {
  return {
    type: "ADD-NEW-SPREAD-SHEET-DATA",
    payload: updatedObj,
  };
}

function setCurrAccessToken(token) {
  return (dispatch, state) => {
    dispatch(setAccessToken(token));
  };
}

function fetchSpreadSheets() {
  return (dispatch, state) => {
    let accessToken = state().accessToken;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://www.googleapis.com/drive/v3/files?key=" +
        process.env.REACT_APP_API_KEY,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        result.files.filter((ele) => ele.mimeType.includes("spreadsheet"))
      )
      .then((res) => dispatch(setSpreadsheetList(res)))
      .catch((error) => console.log("error", error));
  };
}

function setCurrSpreadsheetId(id) {
  return (dispatch, state) => {
    dispatch(setSpreadsheetId(id));
  };
}

function fetchSpreadSheetData(spreadSheetId) {
  return (dispatch, state) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + state().accessToken);
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/" +
        spreadSheetId +
        "/values:batchGet?ranges=appointment&ranges=prescribes&ranges=patient&ranges=physician&ranges=medication&valueRenderOption=FORMATTED_VALUE&key=" +
        process.env.REACT_APP_API_KEY,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => dispatch(setSpreadsheetData(result.valueRanges)))
      .then((res) => console.log(res, state().spreadSheetId))
      .catch((error) => console.log("error", error));
  };
}

function appendSpreadSheetData(appendParams) {
  console.log(appendParams);
  return (dispatch, state) => {
    let updatedObj = state().spreadSheetData;
    if (appendParams && appendParams.appointmentData) {
      updatedObj[0].values.push(appendParams.appointmentData);
    }
    if (appendParams && appendParams.prescribesData) {
      updatedObj[1].values.push(appendParams.prescribesData);
    }
    if (appendParams && appendParams.patientData) {
      updatedObj[2].values.push(appendParams.patientData);
    }
    if (appendParams && appendParams.physicianData) {
      updatedObj[3].values.push(appendParams.physicianData);
    }
    var myHeadersAppointment = new Headers();
    myHeadersAppointment.append(
      "Authorization",
      "Bearer " + state().accessToken
    );
    myHeadersAppointment.append("Accept", "application/json");
    myHeadersAppointment.append("Content-Type", "application/json");

    var rawAppointment = JSON.stringify({
      range: "appointment!A1:AA1000",
      majorDimension: "ROWS",
      values: [appendParams.appointmentData],
    });

    var requestOptionsAppointment = {
      method: "POST",
      headers: myHeadersAppointment,
      body: rawAppointment,
      redirect: "follow",
    };

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/" +
        state().spreadSheetId +
        "/values/appointment!A1%3AAA1000:append?insertDataOption=INSERT_ROWS&valueInputOption=USER_ENTERED&key=" +
        process.env.REACT_APP_API_KEY,
      requestOptionsAppointment
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    var myHeadersPrescribes = new Headers();
    myHeadersPrescribes.append(
      "Authorization",
      "Bearer " + state().accessToken
    );
    myHeadersPrescribes.append("Accept", "application/json");
    myHeadersPrescribes.append("Content-Type", "application/json");

    var rawPrescribes = JSON.stringify({
      range: "prescribes!A1:Z1000",
      majorDimension: "ROWS",
      values: [appendParams.prescribesData],
    });

    var requestOptionsPrescribes = {
      method: "POST",
      headers: myHeadersPrescribes,
      body: rawPrescribes,
      redirect: "follow",
    };

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/" +
        state().spreadSheetId +
        "/values/prescribes!A1%3AZ1000:append?insertDataOption=INSERT_ROWS&valueInputOption=USER_ENTERED&key=" +
        process.env.REACT_APP_API_KEY,
      requestOptionsPrescribes
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    var myHeadersPatient = new Headers();
    myHeadersPatient.append("Authorization", "Bearer " + state().accessToken);
    myHeadersPatient.append("Accept", "application/json");
    myHeadersPatient.append("Content-Type", "application/json");

    var rawPatient = JSON.stringify({
      range: "patient!A1:AC1000",
      majorDimension: "ROWS",
      values: [appendParams.patientData],
    });

    var requestOptionsPatient = {
      method: "POST",
      headers: myHeadersPatient,
      body: rawPatient,
      redirect: "follow",
    };

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/" +
        state().spreadSheetId +
        "/values/patient!A1%3AAC1000:append?insertDataOption=INSERT_ROWS&valueInputOption=USER_ENTERED&key=" +
        process.env.REACT_APP_API_KEY,
      requestOptionsPatient
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    var myHeadersPhysician = new Headers();
    myHeadersPhysician.append("Authorization", "Bearer " + state().accessToken);
    myHeadersPhysician.append("Accept", "application/json");
    myHeadersPhysician.append("Content-Type", "application/json");

    var rawPhysician = JSON.stringify({
      range: "physician!A1:Z1000",
      majorDimension: "ROWS",
      values: [appendParams.physicianData],
    });

    var requestOptionsPhysician = {
      method: "POST",
      headers: myHeadersPhysician,
      body: rawPhysician,
      redirect: "follow",
    };

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/" +
        state().spreadSheetId +
        "/values/physician!A1%3AZ1000:append?insertDataOption=INSERT_ROWS&valueInputOption=USER_ENTERED&key=" +
        process.env.REACT_APP_API_KEY,
      requestOptionsPhysician
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => dispatch(addNewSpreadsheetData(updatedObj)))
      .catch((error) => console.log("error", error));
  };
}

function updateSpreadSheetData(
  updateParams,
  appointmentRow,
  prescribesRow,
  physicianRow,
  patientRow
) {
  return (dispatch, state) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + state().accessToken);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      valueInputOption: "USER_ENTERED",
      data: [
        {
          majorDimension: "ROWS",
          range: "Appointment!" + appointmentRow + ":" + appointmentRow,
          values: [updateParams.appointmentData],
        },
        {
          majorDimension: "ROWS",
          range: "Prescribes!" + prescribesRow + ":" + prescribesRow,
          values: [updateParams.prescribesData],
        },
        {
          majorDimension: "ROWS",
          range: "Patient!" + patientRow + ":" + patientRow,
          values: [updateParams.patientData],
        },
        {
          majorDimension: "ROWS",
          range: "Physician!" + physicianRow + ":" + physicianRow,
          values: [updateParams.physicianData],
        },
      ],
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/" +
        state().spreadSheetId +
        "/values:batchUpdate?key=" +
        process.env.REACT_APP_API_KEY,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
}

export {
  setCurrAccessToken,
  fetchSpreadSheets,
  setCurrSpreadsheetId,
  fetchSpreadSheetData,
  appendSpreadSheetData,
  updateSpreadSheetData,
};
