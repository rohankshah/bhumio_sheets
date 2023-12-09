import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import {
  fetchSpreadSheets,
  setCurrSpreadsheetId,
  closeSheetModal,
  fetchSpreadSheetData,
} from "../actions/drive-actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalBox() {
  const dispatch = useDispatch();
  const accSpreadsheets = useSelector(
    (state) => state.spreadSheets && state.spreadSheets
  );

  const [spreadsheetList, setSpreadsheetList] = useState([]);

  useEffect(() => {
    dispatch(fetchSpreadSheets());
  }, []);

  useEffect(() => {
    if (accSpreadsheets && accSpreadsheets.length > 0) {
      setSpreadsheetList(accSpreadsheets);
    }
  }, [accSpreadsheets]);

  function selectSpreadsheet(id) {
    dispatch(setCurrSpreadsheetId(id));
    dispatch(fetchSpreadSheetData(id));
    dispatch(closeSheetModal());
  }

  return (
    <>
      <Box sx={style}>
        {spreadsheetList.length > 0 ? (
          <div>
            {spreadsheetList.map((sheet, itr) => {
              return (
                <div
                  key={sheet.id}
                  style={{
                    padding: "10px 20px",
                    border: "1px solid black",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => selectSpreadsheet(sheet.id)}
                >
                  {itr + 1} {". "} {sheet.name}
                </div>
              );
            })}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </Box>
    </>
  );
}

export default ModalBox;
