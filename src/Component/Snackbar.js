import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    
      <Snackbar open={props.open} autoHideDuration={2000} 
      onClose={()=>props.snackClose()}
      >
        <Alert onClose={()=>props.snackClose()} severity={props.message.type} sx={{ width: '100%' }}>
          {props.message.message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}
