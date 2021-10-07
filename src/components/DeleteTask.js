import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import SnackbarComponent from "./SnackbarComponent";
import { GlobalContext } from "../context/global.context";
import { API_URL, AUTH_TOKEN } from "../config";

function DeleteTask({ taskId }) {
  const classes = useStyles();
  const [updateData, setUpdateData] = useContext(GlobalContext);
  const [snackMsg, setSnackMsg] = useState("");

  var myHeaders = new Headers();
  myHeaders.append("AuthToken", AUTH_TOKEN);

  const handleDelete = (id) => {
    var formdata = new FormData();
    formdata.append("taskid", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${API_URL}/delete`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setSnackMsg("Removed Successfully");
        setUpdateData((prev) => !prev);
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
