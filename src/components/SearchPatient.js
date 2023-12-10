import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function SearchPatient() {
  const spreadSheetData = useSelector(
    (state) => state.spreadSheetData && state.spreadSheetData
  );
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

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log(formValues);
  }, [formValues, visitDate, nextVisit]);

  function performSearch() {
    if (spreadSheetData.length > 0) {
      handleSearch();
    }
  }

  function handleSearch() {
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
    if (final && final[0]) {
      let appointmentSearchData = spreadSheetData[0].values.slice(1);
      appointmentSearch = appointmentSearchData.filter(
        (ele) => ele[1] === final[0][0]
      )[0];

      let prescribesSearchData = spreadSheetData[1].values.slice(1);
      prescribesSearch = prescribesSearchData.filter(
        (ele) => ele[1] === final[0][0]
      )[0];
    }
    if (appointmentSearch && appointmentSearch[2]) {
      let physicianSearchData = spreadSheetData[3].values.slice(1);
      physicianSearch = physicianSearchData.filter(
        (ele) => ele[1] === appointmentSearch[2]
      )[0];
    }
    console.log(
      patientSearch,
      appointmentSearch,
      prescribesSearch,
      physicianSearch
    );
    setFormValues({
      patientId: patientSearch && patientSearch[0],
      patientName: patientSearch && patientSearch[1] + patientSearch[2],
      location: patientSearch && patientSearch[4],
      // age: patientSearch && patientSearch[0],
      // gender: patientSearch && patientSearch[0],
      phone: patientSearch && patientSearch[6],
      address: patientSearch && patientSearch[3],
      prescription: prescribesSearch && prescribesSearch[2],
      dose: prescribesSearch && prescribesSearch[3],
      physicianId: physicianSearch && physicianSearch[0],
      physicianName: physicianSearch && physicianSearch[1],
      physicianPhone: physicianSearch && physicianSearch[3],
      bill: "",
    });
    setVisitDate(appointmentSearch && dayjs(appointmentSearch[3]));
    setNextVisit(appointmentSearch && dayjs(appointmentSearch[4]));
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
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.age}
              onChange={(e) =>
                setFormValues({ ...formValues, location: e.target.value })
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
