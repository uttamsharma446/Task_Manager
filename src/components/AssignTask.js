import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";

import ListUsers from "./ListUsers";
function AssignTask() {
  const [users, setUsers] = useState(null);
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(users);
  return (
    <div>
      <Button onClick={handleOpen}> Assign</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ListUsers users={users} setUsers={setUsers} />
        </Box>
      </Modal>
    </div>
  );
}

export default AssignTask;
