import React, { useContext, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import { API_URL, AUTH_TOKEN } from "../config";
import SnackbarComponent from "./SnackbarComponent";
import { GlobalContext } from "../context/global.context";

function CreateTask() {
  const [updateData, setUpdateData] = useContext(GlobalContext);

  const [snackMsg, setSnackMsg] = useState("");
  const classes = useStyles();
  const [data, setData] = useState({
    message: "",
    priority: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleCreateTask = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("AuthToken", AUTH_TOKEN);
    var formdata = new FormData();
    formdata.append("message", data.message);
    formdata.append("due_date", "");
    formdata.append("priority", data.priority);
    formdata.append("assigned_to", "");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(`${API_URL}/create`, requestOptions);
    const result = await response.json();
    if (result.status == "success") {
      setSnackMsg("Task added successfully");
      setUpdateData((prev) => !prev);
      setData({
        priority: "",
        message: "",
      });
    } else {
      setSnackMsg("Please Enter Task..");
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ position: "absolute" }}>
        <SnackbarComponent setSnackMsg={setSnackMsg} snackMsg={snackMsg} />
      </div>
      <FormControl className={classes.formControl}>
        <TextField
          id="standard-basic"
          name="message"
          value={data.message}
          onChange={handleChange}
          label="New Task.."
          variant="outlined"
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="status-label">Priority</InputLabel>
        <Select
          labelId="status-label"
          id="demo-simple-select-standard"
          value={data.priority}
          name="priority"
          onChange={handleChange}
          label="Priority"
        >
          <MenuItem value="1">High</MenuItem>
          <MenuItem value="2">Medium</MenuItem>
          <MenuItem value="3">Low</MenuItem>
        </Select>
      </FormControl>
      <Button
        style={{
          backgroundColor: "#1DB9C3",
          color: "#fff",
        }}
        className={classes.btn}
        variant="outlined"
        onClick={handleCreateTask}
      >
        <AddIcon />
      </Button>
    </div>
  );
}

export default CreateTask;
const useStyles = makeStyles({
  container: {
    width: "100%",
    padding: "10px 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  formControl: {
    width: "40%",
  },
  btn: {
    border: "1px solid red",
    backgroundColor: "#2C2891",
  },
});
