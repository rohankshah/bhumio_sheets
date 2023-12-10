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
      .catch((error) => console.log("error", error));
  };
}

export {
  setCurrAccessToken,
  fetchSpreadSheets,
  setCurrSpreadsheetId,
  fetchSpreadSheetData,
};