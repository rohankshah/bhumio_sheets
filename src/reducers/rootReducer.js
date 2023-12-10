const initialState = {
  accessToken: "",
  modalOpen: false,
  spreadSheets: [],
  spreadSheetId: "",
  spreadSheetData: {},
  selectedTab: "add",
};

function rootReducer(state = initialState, action) {
  if (action.type === "SET-ACCESS-TOKEN") {
    return {
      ...state,
      accessToken: action.payload,
    };
  } else if (action.type === "SET-MODAL-OPEN") {
    return {
      ...state,
      modalOpen: true,
    };
  } else if (action.type === "SET-MODAL-CLOSE") {
    return {
      ...state,
      modalOpen: false,
    };
  } else if (action.type === "SET-SPREADSHEET-LIST") {
    return {
      ...state,
      spreadSheets: action.payload,
    };
  } else if (action.type === "SET-SPREADSHEET-ID") {
    return {
      ...state,
      spreadSheetId: action.payload,
    };
  } else if (action.type === "SET-SPREADSHEET-DATA") {
    return {
      ...state,
      spreadSheetData: action.payload,
    };
  } else if (action.type === "SET-SELECTED-TAB") {
    return {
      ...state,
      selectedTab: action.payload,
    };
  } else {
    return {
      ...state,
    };
  }
}

export default rootReducer;
