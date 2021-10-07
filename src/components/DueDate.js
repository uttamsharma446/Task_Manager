import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { makeStyles } from "@mui/styles";

function DueDate({ dueDate, setDueDate }) {
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        className={classes.datePicker}
        renderInput={(props) => <TextField {...props} />}
        label="Due Date"
        inputFormat="yyyy/MM/dd hh:mm a"
        value={dueDate}
        onChange={(newValue) => {
          console.log(newValue.toDateString());
          setDueDate(
            newValue.toISOString().replace(".000Z", "").replace("T", " ")
          );
        }}
      />
    </LocalizationProvider>
  );
}

export default DueDate;
const useStyles = makeStyles({
  datePicker: {
    width: "48%",
    margin: "10px 0",
  },
});
