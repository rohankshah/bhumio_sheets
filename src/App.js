import React from "react";
import Layout from "./components/Layout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Layout />
      </div>
    </LocalizationProvider>
  );
}

export default App;
