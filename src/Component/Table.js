import * as React from 'react';
import http from '../config/http';
import { Modal, Typography, Button, Box, Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomizedSnackbars from './Snackbar';
import {BasicTextFields, UpdateTextFields} from './Form';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicTable() {
    const [rows, setRows] = React.useState([]);
    const [snack, setSnack] = React.useState(false);
    const [message, setMessage] = React.useState({});
    const [openbasicForm, setBasicForm] = React.useState(false);
    const [openUpdateForm, setUpdateForm] = React.useState(false);
    const [data, setData] = React.useState('');

    const handlebasicOpen = () => setBasicForm(true);
    const handlebasicClose = (val) => {
        setSnack(true);
        setMessage(val)
        setBasicForm(false);
        getData();
    };

    const handleUpdateClose = (val) => {
        setSnack(true);
        setMessage(val);
        setUpdateForm(false);
        getData();
    };
    const getData = () => {
        return http.get("user/get_all?page=1&limit=20").then((response) => {
            if (response.status !== 200) {
                console.log('error response', response);
            } else {
                setRows(response.data.data);
            }
        })
    }
    React.useEffect(() => {
        getData();
    }, []);


    const removeRow = (id) => {
        http.delete(`user/remove/${id}`).then((response) => {
            if (response.status !== 200) {
                console.log('error response', response);
            } else {
                setSnack(true);
                setMessage({type: 'success', message: response.data.message});
            }
            setTimeout(() => {
                getData();
            }, [1000]);
        })
    }

    return (
        <>
            <Button variant="contained" onClick={handlebasicOpen}>Add User</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell >Designation</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Phone</TableCell>
                            <TableCell >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell >{row.designation}</TableCell>
                                <TableCell >{row.email}</TableCell>
                                <TableCell >{row.phone}</TableCell>
                                <TableCell >
                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                        <Fab size="small" color="primary" aria-label="edit" >
                                            <EditIcon onClick={() => {
                                                setUpdateForm(true)
                                                setData(row)
                                            }} />
                                        </Fab>

                                        <Fab size="small" color="danger" aria-label="add" onClick={() => removeRow(row._id)}>
                                            <DeleteIcon />
                                        </Fab>

                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={openbasicForm}
                onClose={handlebasicClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add a user
                    </Typography>
                    <BasicTextFields modelClose={handlebasicClose} />
                </Box>
            </Modal>

            <Modal
                open={openUpdateForm}
                onClose={handleUpdateClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit a user
                    </Typography>
                    <UpdateTextFields modelClose={handleUpdateClose} data={data} />
                </Box>
            </Modal>

            <CustomizedSnackbars open={snack} message={message} snackClose={() => setSnack(false)} />
        </>
    );
}
