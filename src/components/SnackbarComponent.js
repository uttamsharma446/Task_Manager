import { Snackbar } from "@mui/material";
import React from "react";

function SnackbarComponent({ snackMsg, setSnackMsg }) {
  return (
    <div>
      <Snackbar
        open={snackMsg ? true : false}
        onClose={() => setSnackMsg("")}
        autoHideDuration={4000}
        message={snackMsg}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      />
    </div>
  );
}

export default SnackbarComponent;
