import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const CustomerDelete = ({ id, stateRefresh }) => {
  const [open, setOpen] = useState(false); //dialog 창이 열려있는지 체크

  const initState = () => {
    setOpen(false);
  };

  //고객 추가 모달 창이 열리면
  const handleClickOpen = () => {
    setOpen(true);
  };

  //고객 추가 모달 창이 닫히면
  const handleClose = () => {
    initState();
  };

  const deleteCustomer = (id) => {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    });
    stateRefresh();
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Warning Delete!</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>Delete Selected Customer</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => deleteCustomer(id)}
          >
            Delete
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerDelete;
