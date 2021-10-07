import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PRIORITY } from "./CommonData/Priority";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";
import { makeStyles } from "@mui/styles";
import { API_URL, AUTH_TOKEN } from "../config";
import { GlobalContext } from "../context/global.context";

function ListTasks() {
  const [updateData, setUpdateData] = useContext(GlobalContext);
  const classes = useStyles();
  const statusRef = useRef();
  const [filterStatus, setFilterStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(null);

  async function fetchTasks() {
    var myHeaders = new Headers();
    myHeaders.append("AuthToken", AUTH_TOKEN);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(`${API_URL}/list`, requestOptions);
    const data = await response.json();
    setTasks(data.tasks);
    setLoading(false);
  }

  useEffect(() => {
    fetchTasks();
  }, []);
  useEffect(() => {
    fetchTasks();
  }, [updateData]);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFilterStatus((prev) => {
        return [...prev, value];
      });
      setUpdateData((prev) => !prev);
    } else {
      setUpdateData((prev) => !prev);
      setFilterStatus((prev) => {
        return [...prev.filter((d) => d !== value)];
      });
    }
  };
  const ar1 = [];
  const handleFilter = (e) => {
    const ar = filterStatus.map((f) => {
      return tasks.filter((task) => task.priority == f);
    });
    ar.map((d) => {
      d.map((v) => {
        ar1.push(v);
      });
    });
    setTasks(ar1);
  };

  return (
    <div>
      <div className={classes.filterContainer}>
        <label htmlFor="">View As-</label>

        <div className={classes.chkContainer}>
          <small htmlFor="">Priority</small>
          {PRIORITY.map((data, index) => {
            return (
              index != 0 && (
                <div key={index}>
                  <input
                    className={classes.chkbox}
                    type="checkbox"
                    name={data}
                    id=""
                    value={index}
                    onChange={handleChange}
                  />
                  <span>{data}</span>
                </div>
              )
            );
          })}
          <label className={classes.btn} onClick={handleFilter}>
            Apply
          </label>
        </div>
      </div>
      <Divider />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#Id</TableCell>

              <TableCell>Task</TableCell>
              <TableCell align="center">Due Date</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Assigned To</TableCell>

              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              tasks.map((task) => (
                <TableRow
                  key={task.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {task.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {task.message}
                  </TableCell>
                  <TableCell align="center">
                    {task.due_date ? task.due_date : "_"}
                  </TableCell>
                  <TableCell ref={statusRef} align="center">
                    {PRIORITY[parseInt(task.priority)]}
                  </TableCell>
                  <TableCell align="center">
                    {task.assigned_name ? (
                      task.assigned_name
                    ) : (
                      <span style={{ color: "red" }}>Not Assigned</span>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {<DeleteTask taskId={task.id} />}
                    {<UpdateTask tasks={tasks} taskId={task.id} />}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListTasks;
const useStyles = makeStyles({
  filterContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    padding: "10px",
  },
  chkContainer: {
    display: "flex",
    width: "50%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btn: {
    cursor: "pointer",
    color: "#2C2891",
    fontWeight: "bold",
  },
});
