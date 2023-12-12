import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { appendSpreadSheetData } from "../actions/drive-actions";

function MainForm() {
  const dispatch = useDispatch();
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
    physicianId: "",
    physicianName: "",
    physicianPhone: "",
    bill: "",
  });

  const [visitDate, setVisitDate] = useState();
  const [nextVisit, setNextVisit] = useState();

  useEffect(() => {
    setFormValues({ ...formValues, patientId: generateRandomId() });
  }, []);

  useEffect(() => {
    async function dispatchAndReset() {
      handleAdd();
      setFormValues({
        patientId: await generateRandomId(),
        patientName: "",
        location: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        prescription: "",
        dose: "",
        physicianId: "",
        physicianName: "",
        physicianPhone: "",
        bill: "",
      });
    }

    if (checkFormComplete()) {
      dispatchAndReset();
    }
  }, [formValues, visitDate, nextVisit]);

  function handleAdd() {
    const appendParams = {
      appointmentData: [
        generateRandomId(),
        formValues.patientId,
        formValues.physicianId,
        visitDate.format("DD/MM/YY"),
        nextVisit.format("DD/MM/YY"),
      ],
      prescribesData: [
        formValues.physicianId,
        formValues.patientId,
        formValues.prescription,
        formValues.dose,
      ],
      patientData: [
        formValues.patientId,
        formValues.patientName.split(" ")[0],
        formValues.patientName.split(" ")[1],
        formValues.address,
        formValues.location,
        "",
        formValues.phone,
      ],
      physicianData: [
        formValues.physicianId,
        formValues.physicianName,
        "Sr Doctor",
        formValues.physicianPhone,
        formValues.bill,
      ],
    };
    dispatch(appendSpreadSheetData(appendParams));
  }

  function generateRandomId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }

  function checkFormComplete() {
    return (
      formValues.patientName &&
      formValues.location &&
      formValues.age &&
      formValues.gender &&
      formValues.phone &&
      formValues.address &&
      formValues.prescription &&
      formValues.dose &&
      formValues.physicianId &&
      formValues.physicianName &&
      formValues.physicianPhone &&
      formValues.bill &&
      visitDate &&
      nextVisit
    );
  }

  return (
    <>
      <Grid item lg={10}>
        {/* First row */}
        <Grid container justifyContent="space-between" marginBottom="20px">
          <Grid item lg={3}>
            <InputLabel>Patient Id</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.patientId}
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
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.age}
              onChange={(e) =>
                setFormValues({ ...formValues, age: e.target.value })
              }
            />
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
            <DatePicker
              value={visitDate}
              onChange={(newValue) => setVisitDate(newValue)}
            />
          </Grid>
          <Grid item lg={3}>
            <InputLabel>Next Visit</InputLabel>
            <DatePicker
              value={nextVisit}
              onChange={(newValue) => setNextVisit(newValue)}
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
        <button onClick={() => handleAdd()}>Add</button>
      </Grid>
    </>
  );
}

export default MainForm;
