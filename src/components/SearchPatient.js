import React, { useEffect, useState } from "react";
import { Grid, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function SearchPatient() {
  const [formValues, setFormValues] = useState({
    patientId: "",
    patientName: "",
    location: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    prescription: "",
    dose: "",
    visitDate: null,
    nextVisit: null,
    physicianId: "",
    physicianName: "",
    physicianPhone: "",
    bill: "",
  });

  const [visitDate, setVisitDate] = useState();
  const [nextVisit, setNextVisit] = useState();

  useEffect(() => {
    console.log(formValues);
  }, [formValues, visitDate, nextVisit]);

  return (
    <>
      <Grid item lg={10}>
        <Grid item>
          <InputLabel>Search</InputLabel>
          <TextField
            variant="outlined"
            sx={{ width: "50%", marginBottom: "20px" }}
          />
        </Grid>
        {/* First row */}
        <Grid container justifyContent="space-between" marginBottom="20px">
          <Grid item lg={3}>
            <InputLabel>Patient Id</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.patientId}
              onChange={(e) =>
                setFormValues({ ...formValues, patientId: e.target.value })
              }
            />
          </Grid>
          <Grid item lg={4}>
            <InputLabel>Patient Name (First, Last Name)</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.patientName}
              onChange={(e) =>
                setFormValues({ ...formValues, patientName: e.target.value })
              }
            />
          </Grid>
          <Grid item lg={4}>
            <InputLabel>Location</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.location}
              onChange={(e) =>
                setFormValues({ ...formValues, location: e.target.value })
              }
            />
          </Grid>
        </Grid>
        {/* Second row */}
        <Grid container justifyContent="space-between" marginBottom="40px">
          <Grid item lg={1}>
            <InputLabel>Age</InputLabel>
            <Select
              label="Age"
              sx={{ width: "100%" }}
              value={formValues.age}
              onChange={(e) =>
                setFormValues({ ...formValues, age: e.target.value })
              }
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
              <MenuItem value={40}>Forty</MenuItem>
              <MenuItem value={50}>Fifty</MenuItem>
              <MenuItem value={60}>Sixty</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={1}>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              sx={{ width: "100%" }}
              value={formValues.gender}
              onChange={(e) =>
                setFormValues({ ...formValues, gender: e.target.value })
              }
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={3}>
            <InputLabel>Phone</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.phone}
              onChange={(e) =>
                setFormValues({ ...formValues, phone: e.target.value })
              }
            />
          </Grid>
          <Grid item lg={3}>
            <InputLabel>Address</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.address}
              onChange={(e) =>
                setFormValues({ ...formValues, address: e.target.value })
              }
            />
          </Grid>
        </Grid>
        {/* Line break */}
        <div
          style={{
            height: "2px",
            width: "100%",
            backgroundColor: "black",
            marginBottom: "40px",
          }}
        ></div>
        {/* Third row */}
        <Grid container justifyContent="space-between" marginBottom="20px">
          <Grid item lg={5}>
            <InputLabel>Prescription</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.prescription}
              onChange={(e) =>
                setFormValues({ ...formValues, prescription: e.target.value })
              }
            />
          </Grid>
          <Grid item lg={5}>
            <InputLabel>Dose</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.dose}
              onChange={(e) =>
                setFormValues({ ...formValues, dose: e.target.value })
              }
            />
          </Grid>
        </Grid>
        {/* Fourth row */}
        <Grid container justifyContent="start" marginBottom="40px" spacing={4}>
          <Grid item lg={3}>
            <InputLabel>Visit Date</InputLabel>
            <DatePicker value={formValues.visitDate} onChange={setVisitDate} />
          </Grid>
          <Grid item lg={3}>
            <InputLabel>Next Visit</InputLabel>
            <DatePicker value={formValues.nextVisit} onChange={setNextVisit} />
          </Grid>
        </Grid>
        {/* Line break */}
        <div
          style={{
            height: "2px",
            width: "100%",
            backgroundColor: "black",
            marginBottom: "40px",
          }}
        ></div>
        {/* Fifth row */}
        <Grid container justifyContent="start" marginBottom="20px" spacing={4}>
          <Grid item lg={3}>
            <InputLabel>Physician ID</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.physicianId}
              onChange={(e) =>
                setFormValues({ ...formValues, physicianId: e.target.value })
              }
            />
          </Grid>
          <Grid item lg={5}>
            <InputLabel>Physician Name (First, Last Name)</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.physicianName}
              onChange={(e) =>
                setFormValues({ ...formValues, physicianName: e.target.value })
              }
            />
          </Grid>
        </Grid>
        {/* Sixth row */}
        <Grid container justifyContent="start" marginBottom="40px" spacing={4}>
          <Grid item lg={3}>
            <InputLabel>Phone</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.physicianPhone}
              onChange={(e) =>
                setFormValues({ ...formValues, physicianPhone: e.target.value })
              }
            />
          </Grid>
          <Grid item lg={3}>
            <InputLabel>Bill</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.bill}
              onChange={(e) =>
                setFormValues({ ...formValues, bill: e.target.value })
              }
            />
          </Grid>
        </Grid>
        {/* Line break */}
        <div
          style={{
            height: "2px",
            width: "100%",
            backgroundColor: "black",
          }}
        ></div>
      </Grid>
    </>
  );
}

export default SearchPatient;
