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

function setSelectedTab(tab) {
  return {
    type: "SET-SELECTED-TAB",
    payload: tab,
  };
}

function setSearchAndEditState(tab) {
  return {
    type: "SET-SEARCH-AND-EDIT-STATE",
    payload: tab,
  };
}

function openSheetModal() {
  return (dispatch, state) => {
    dispatch(setModalOpen());
  };
}

function closeSheetModal() {
  return (dispatch, state) => {
    dispatch(setModalClose());
  };
}

function changeSelectedTab(tab) {
  return (dispatch, state) => {
    dispatch(setSelectedTab(tab));
  };
}

function changeSearchAndEditState(tab) {
  return (dispatch, state) => {
    dispatch(setSearchAndEditState(tab));
  };
}

export {
  openSheetModal,
  closeSheetModal,
  changeSelectedTab,
  changeSearchAndEditState,
};
