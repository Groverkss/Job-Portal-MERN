import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

import JobService from '../../services/jobs'

export const SopDialogForm = ({ jobId, setData }) => {
  const [ open, setOpen ] = useState(false);
  const [ sop, setSop ] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSop("");
    setOpen(false);
  }

  const handleApply = async event => {
    await JobService.applyJob(jobId, sop);
    setData();
    handleClose();
  }

  const handleSopChange = async event => {
    setSop(event.target.value);
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
      >
        Apply
      </Button>
      <Dialog open={open}>
        <DialogTitle id="form-dialog-title">Apply to Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a Statement Of Purpose
          </DialogContentText>
          <TextField
            multiline
            rows={5}
            id="sop"
            autoFocus
            variant="outlined"
            margin="dense"
            name="sop"
            value={sop}
            onChange={handleSopChange}
            label="Statement Of Purpose"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApply} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
