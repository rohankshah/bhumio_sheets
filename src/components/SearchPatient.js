import React, { useState } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { Grid, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { updateSpreadSheetData } from "../actions/drive-actions";

function SearchPatient() {
  const dispatch = useDispatch();
  const spreadSheetData = useSelector(
    (state) => state.spreadSheetData && state.spreadSheetData
  );
  const searchAndEditState = useSelector(
    (state) => state.searchAndEditState && state.searchAndEditState
  );
  const [formValues, setFormValues] = useState({
    appointmentId: "",
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
    physicianPos: "",
    bill: "",
  });
  const [visitDate, setVisitDate] = useState();
  const [nextVisit, setNextVisit] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [patientRow, setPatientRow] = useState(0);
  const [appointmentRow, setAppointmentRow] = useState(0);
  const [prescribesRow, setPrescribesRow] = useState(0);
  const [physicianRow, setPhysicianRow] = useState(0);

  function performSearch() {
    if (spreadSheetData.length > 0) {
      handleSearch();
    }
  }

  async function handleSearch() {
    setPatientRow(0);
    setAppointmentRow(0);
    setPrescribesRow(0);
    setPhysicianRow(0);
    await resetValues();
    let patientSearch, appointmentSearch, prescribesSearch, physicianSearch;
    let searchHeaders = spreadSheetData[2].values[0];
    let searchData = spreadSheetData[2].values.slice(1);

    let nameIndex = searchHeaders.indexOf("first_name");
    let lastNameIndex = searchHeaders.indexOf("last_name");
    let address = searchHeaders.indexOf("address");
    let location = searchHeaders.indexOf("location");
    let email = searchHeaders.indexOf("email");
    let phone = searchHeaders.indexOf("phone");

    let final = searchData.filter(
      (row) =>
        row[nameIndex].toLowerCase().includes(searchQuery.toLowerCase()) ||
        row[lastNameIndex].toLowerCase().includes(searchQuery.toLowerCase()) ||
        row[address].toLowerCase().includes(searchQuery.toLowerCase()) ||
        row[location].toLowerCase().includes(searchQuery.toLowerCase()) ||
        row[email].toLowerCase().includes(searchQuery.toLowerCase()) ||
        row[phone].toLowerCase().includes(searchQuery.toLowerCase())
    );
    patientSearch = final[0];
    setPatientRow(searchData.indexOf(patientSearch) + 2);
    if (final && final[0]) {
      let appointmentSearchData = spreadSheetData[0].values.slice(1);
      appointmentSearch = appointmentSearchData.filter(
        (ele) => ele[1] === final[0][0]
      )[0];
      if (appointmentSearch) {
        setAppointmentRow(appointmentSearchData.indexOf(appointmentSearch) + 2);
      }

      let prescribesSearchData = spreadSheetData[1].values.slice(1);
      prescribesSearch = prescribesSearchData.filter(
        (ele) => ele[1] === final[0][0]
      )[0];
      if (prescribesSearch) {
        setPrescribesRow(prescribesSearchData.indexOf(prescribesSearch) + 2);
      }
    }
    if (appointmentSearch && appointmentSearch[2]) {
      let physicianSearchData = spreadSheetData[3].values.slice(1);
      physicianSearch = physicianSearchData.filter(
        (ele) => ele[0] === appointmentSearch[2]
      )[0];
      if (prescribesSearch) {
        setPhysicianRow(physicianSearchData.indexOf(physicianSearch) + 2);
      }
      console.log(patientRow, appointmentRow, physicianRow, prescribesRow);
    }
    setFormValues({
      appointmentId: appointmentSearch && appointmentSearch[0],
      patientId: patientSearch && patientSearch[0],
      patientName: patientSearch && patientSearch[1] + " " + patientSearch[2],
      location: patientSearch && patientSearch[4],
      age: patientSearch && patientSearch[7],
      gender: patientSearch && patientSearch[8],
      phone: patientSearch && patientSearch[6],
      address: patientSearch && patientSearch[3],
      prescription: prescribesSearch && prescribesSearch[2],
      dose: prescribesSearch && prescribesSearch[3],
      physicianId: physicianSearch && physicianSearch[0],
      physicianName: physicianSearch && physicianSearch[1],
      physicianPhone: physicianSearch && physicianSearch[3],
      bill: physicianSearch && physicianSearch[4],
    });

    if (appointmentSearch && appointmentSearch[3]) {
      const [monthVisit, dayVisit, yearVisit] = appointmentSearch[3].split("/");
      const dateVisitFormat = dayjs(`${dayVisit}-${monthVisit}-${yearVisit}`);
      setVisitDate(appointmentSearch && dayjs(dateVisitFormat));
    }

    if (appointmentSearch && appointmentSearch[4]) {
      const [monthNext, dayNext, yearNext] = appointmentSearch[4].split("/");
      const dateNextFormat = dayjs(`${dayNext}-${monthNext}-${yearNext}`);
      setNextVisit(appointmentSearch && dayjs(dateNextFormat));
    }
  }

  function handleEdit() {
    const updateParams = {
      appointmentData: [
        formValues.appointmentId ? formValues.appointmentId : "",
        formValues.patientId ? formValues.patientId : "",
        formValues.physicianId ? formValues.physicianId : "",
        visitDate ? visitDate.format("DD/MM/YY") : null,
        nextVisit ? nextVisit.format("DD/MM/YY") : null,
      ],
      prescribesData: [
        formValues.physicianId ? formValues.physicianId : "",
        formValues.patientId ? formValues.patientId : "",
        formValues.prescription ? formValues.prescription : "",
        formValues.dose ? formValues.dose : "",
      ],
      patientData: [
        formValues.patientId ? formValues.patientId : "",
        formValues.patientName.split(" ")[0]
          ? formValues.patientName.split(" ")[0]
          : "",
        formValues.patientName.split(" ")[1]
          ? formValues.patientName.split(" ")[1]
          : "",
        formValues.address ? formValues.address : "",
        formValues.location ? formValues.location : "",
        "",
        formValues.phone ? formValues.phone : "",
      ],
      physicianData: [
        formValues.physicianId ? formValues.physicianId : "",
        formValues.physicianName ? formValues.physicianName : "",
        formValues.physicianPos ? formValues.physicianPos : "",
        formValues.physicianPhone ? formValues.physicianPhone : "",
        formValues.bill ? formValues.bill : "",
      ],
    };
    dispatch(
      updateSpreadSheetData(
        updateParams,
        appointmentRow,
        prescribesRow,
        physicianRow,
        patientRow
      )
    );
    resetValues();
  }

  function resetValues() {
    setFormValues({
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
    setNextVisit(null);
    setVisitDate(null);
    setSearchQuery("");
  }

  return (
    <>
      <Grid item lg={10}>
        <Grid container direction="row" alignItems={"center"}>
          <Grid item>
            <InputLabel>Search</InputLabel>
            <TextField
              variant="outlined"
              sx={{ width: "100%", marginBottom: "20px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item>
            <div
              style={{
                padding: "10px 20px",
                border: "1px solid black",
                marginLeft: "20px",
              }}
              onClick={() => performSearch()}
            >
              Search
            </div>
          </Grid>
          <Grid item>
            <div
              style={{
                padding: "10px 20px",
                border: "1px solid black",
                marginLeft: "20px",
                display: searchAndEditState === "edit" ? "block" : "none",
              }}
              onClick={() => handleEdit()}
            >
              Edit
            </div>
          </Grid>
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
          <Grid item lg={2}>
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
          <Grid item lg={2}>
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
            <DatePicker value={visitDate} onChange={setVisitDate} />
          </Grid>
          <Grid item lg={3}>
            <InputLabel>Next Visit</InputLabel>
            <DatePicker value={nextVisit} onChange={setNextVisit} />
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
