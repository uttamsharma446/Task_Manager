import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DueDate from "./DueDate";
import { listUser } from "./CommonMethod/listUsers";
import { API_URL, AUTH_TOKEN } from "../config";
import SnackbarComponent from "./SnackbarComponent";
import { GlobalContext } from "../context/global.context";

function UpdateTask({ tasks, taskId }) {
  const classes = useStyles();
  const [updateData, setUpdateData] = useContext(GlobalContext);
  const [snackMsg, setSnackMsg] = useState("");

  const [users, setUsers] = useState(null);
  const [data, setData] = useState({
    message: "",
    due_date: "2020-09-18 12:12:12",
    priority: "",
    assigned_to: "",
  });
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const style = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100vh",
    width: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  var myHeaders = new Headers();
  myHeaders.append("AuthToken", AUTH_TOKEN);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(`${API_URL}/listusers`, requestOptions);
    const result = await response.json();
    setUsers(result.users);
    setLoading(false);
  }

  const handleUpdate = () => {
    var formdata = new FormData();
    formdata.append("message", data.message);
    formdata.append("due_date", dueDate);
    formdata.append("priority", data.priority);
    formdata.append("assigned_to", data.assigned_to);
    formdata.append("taskid", taskId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${API_URL}/update`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setSnackMsg("Updated");
        setUpdateData((prev) => !prev);
        handleClose();
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(async () => {
    fetchUser();
    const task = tasks.filter((task) => task.id === taskId);
    setData((prev) => {
      return {
        message: task[0].message,
        due_date: task[0].due_date,
        priority: task[0].priority,
        assigned_to: task[0].assigned_to,
      };
    });
  }, []);

  return (
    <>
      <div style={{ position: "absolute" }}>
        <SnackbarComponent setSnackMsg={setSnackMsg} snackMsg={snackMsg} />
      </div>
      <EditIcon className={classes.editIcon} onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.box}>
          <div className={classes.input}>
            <TextField
              id="standard-basic"
              name="message"
              label="Task"
              variant="outlined"
              value={data.message}
              name="message"
              onChange={handleChange}
              className={classes.textField}
            />
          </div>
          <div className={classes.input}>
            <FormControl className={classes.selectInput}>
              <InputLabel id="demo-simple-select-standard-label">
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="priority"
                onChange={handleChange}
                label="Priority"
                value={data.priority}
              >
                <MenuItem value="1">High</MenuItem>
                <MenuItem value="2">Medium</MenuItem>
                <MenuItem value="3">Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className={classes.input}>
            <DueDate setDueDate={setDueDate} />
          </div>
          <div className={classes.input}>
            <FormControl className={classes.selectInput}>
              <InputLabel id="demo-simple-select-standard-label">
                Assigned To
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="assigned_to"
                label="Assigned To"
                value={data.assigned_to ? data.assigned_to : ""}
                onChange={handleChange}
              >
                {!loading &&
                  users.map((user) => {
                    return <MenuItem value={user.id}>{user.name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              margin: "10px 0",
              paddingBottom: "10px",
            }}
          >
            <Button
              style={{
                position: "absolute",
                right: "0",
                backgroundColor: "#1DB9C3",
                color: "#fff",
              }}
              className={classes.btn}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default UpdateTask;
const useStyles = makeStyles({
  input: {
    width: "48%",
    margin: "10px 0",
  },
  box: {
    display: "flex",
    position: "relative",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  textField: {
    width: "100%",
    fontSize: "1rem",
    margin: "10px 0",
  },
  selectInput: {
    width: "100%",
    margin: "10px 0",
  },
  btn: {
    position: "absolute",
    right: "0",
  },
  editIcon: {
    color: "#1DB9C3",
    cursor: "pointer",
  },
});
