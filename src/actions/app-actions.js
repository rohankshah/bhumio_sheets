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

export { openSheetModal, closeSheetModal, changeSelectedTab };
