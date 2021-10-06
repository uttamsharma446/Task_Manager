import React from "react";
import CreateTask from "../components/CreateTask";
import ListTasks from "../components/ListTasks";
import { makeStyles } from "@mui/styles";
import { Divider } from "@mui/material";

function TaskManager() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 className={classes.title}>Task Manager</h1>
        <div className={classes.createTask}>
          <CreateTask />
        </div>
        <Divider />
        <div className={classes.listTask}>
          <ListTasks />
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "",
    display: "flex",
    padding: "10px 0",
    justifyContent: "center",
  },
  container: {
    maxWidth: "900px",
    width: "100%",
  },

  createTask: {
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    boxShadow: "0px 5px 10px 2px #888888",

    marginBottom: "20px",
  },
  listTask: {
    padding: "10px 10px",
    boxShadow: "0px 5px 10px 2px #888888",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  title: {
    color: "#1DB9C3",
    fontWeight: "bold",
    textDecoration: "underline",
    textTransform: "capitalize",
  },
});
