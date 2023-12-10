import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Modal } from "@mui/material";

import Sidebar from "./Sidebar";
import MainForm from "./MainForm";
import ModalBox from "./ModalBox";
import SearchPatient from "./SearchPatient";

import { closeSheetModal } from "../actions/app-actions";

function Layout() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalOpen && state.modalOpen);
  const selectedTab = useSelector(
    (state) => state.selectedTab && state.selectedTab
  );

  function currentTab() {
    if (selectedTab && selectedTab === "add") {
      return <MainForm />;
    } else if (selectedTab && selectedTab === "search") {
      return <SearchPatient />;
    } else {
      return <MainForm />;
    }
  }

  return (
    <Grid container spacing={2} padding="40px">
      <Grid item lg={2}>
        <Sidebar />
      </Grid>

      <Grid item lg={10}>
        <Modal open={modalState} onClose={() => dispatch(closeSheetModal())}>
          <ModalBox />
        </Modal>
        {currentTab()}
      </Grid>
    </Grid>
  );
}

export default Layout;
