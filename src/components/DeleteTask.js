import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import SnackbarComponent from "./SnackbarComponent";

function DeleteTask({ taskId }) {
  const classes = useStyles();
  const [snackMsg, setSnackMsg] = useState("");

  var myHeaders = new Headers();
  myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

  const handleDelete = (id) => {
    var formdata = new FormData();
    formdata.append("taskid", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://devza.com/tests/tasks/delete", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setSnackMsg("Removed Successfully");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div style={{ position: "absolute" }}>
        <SnackbarComponent setSnackMsg={setSnackMsg} snackMsg={snackMsg} />
      </div>
      <DeleteIcon className={classes.btn} onClick={() => handleDelete(taskId)}>
        Delete Task
      </DeleteIcon>
    </>
  );
}

export default DeleteTask;
const useStyles = makeStyles({
  root: {
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  btn: {
    color: "#1DB9C3",
    cursor: "pointer",
  },
});
