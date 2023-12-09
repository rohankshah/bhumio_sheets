import React from "react";
import { Grid, Typography } from "@mui/material";
import DriveInit from "../DriveInit";

function Sidebar() {
  return (
    <Grid container direction="column" spacing="24" paddingLeft="20px">
      <Grid item>
        <Typography variant="body1" fontSize={20}>
          Add Patient
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" fontSize={20}>
          Edit Patient
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" fontSize={20}>
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
