import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { API_URL, AUTH_TOKEN } from "../config";

function ListUsers({ users, setUsers }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    var myHeaders = new Headers();
    myHeaders.append("AuthToken", AUTH_TOKEN);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(`${API_URL}/listusers`, requestOptions);
    const data = await response.json();
    console.log(data);
    setUsers(data.users);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [users]);

  return (
    <div>
      <div className={classes.container}>
        {!loading && (
          <FormControl component="fieldset">
            <FormLabel component="legend">Assign To</FormLabel>
            <RadioGroup
              aria-label="gender"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {users.map((user) => {
                return (
                  <>
                    <FormControlLabel
                      value={user.id}
                      control={<Radio />}
                      label={user.name}
                    />
                    <span>fdsdsfa</span>
                  </>
                );
              })}
            </RadioGroup>
          </FormControl>
        )}
        <div></div>
      </div>
    </div>
  );
}

export default ListUsers;
const useStyles = makeStyles({
  root: {
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
});
