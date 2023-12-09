function setAccessToken(token) {
  return {
    type: "SET-ACCESS-TOKEN",
    payload: token,
  };
}
function setModalOpen() {
  return {
    type: "SET-MODAL-OPEN",
  };
}
function setModalClose() {
  return {
    type: "SET-MODAL-CLOSE",
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

function setCurrAccessToken(token) {
  return (dispatch, state) => {
    dispatch(setAccessToken(token));
  };
}

function openSheetModal() {
  return (dispatch, state) => {
    console.log("hereeeee");
    dispatch(setModalOpen());
  };
}

function closeSheetModal() {
  return (dispatch, state) => {
    dispatch(setModalClose());
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
    console.log(state());
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
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
}

export {
  setCurrAccessToken,
  openSheetModal,
  closeSheetModal,
  fetchSpreadSheets,
  setCurrSpreadsheetId,
  fetchSpreadSheetData,
};
