import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography } from "@mui/material";
import DriveInit from "../DriveInit";

import {
  changeSelectedTab,
  changeSearchAndEditState,
} from "../actions/app-actions";

function Sidebar() {
  const dispatch = useDispatch();
  return (
    <Grid container direction="column" spacing="24" paddingLeft="20px">
      <Grid item>
        <Typography
          variant="body1"
          fontSize={20}
          sx={{ cursor: "pointer" }}
          onClick={() => dispatch(changeSelectedTab("add"))}
        >
          Add Patient
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="body1"
          fontSize={20}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(changeSearchAndEditState("edit"));
            dispatch(changeSelectedTab("searchAndEdit"));
          }}
        >
          Edit Patient
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="body1"
          fontSize={20}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(changeSearchAndEditState("search"));
            dispatch(changeSelectedTab("searchAndEdit"));
          }}
        >
          Search
        </Typography>
      </Grid>
      <Grid item>
        <DriveInit />
      </Grid>
    </Grid>
  );
}

export default Sidebar;
