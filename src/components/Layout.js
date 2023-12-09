import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import MainForm from "./MainForm";
import ModalBox from "./ModalBox";
import { Modal, Box, Typography } from "@mui/material";
import { closeSheetModal } from "../actions/drive-actions";

function Layout() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalOpen && state.modalOpen);

  return (
    <Grid container spacing={2} padding="40px">
      <Grid item lg={2}>
        <Sidebar />
      </Grid>

      <Grid item lg={10}>
        <Modal open={modalState} onClose={() => dispatch(closeSheetModal())}>
          <ModalBox />
        </Modal>
        <MainForm />
      </Grid>
    </Grid>
  );
}

export default Layout;
