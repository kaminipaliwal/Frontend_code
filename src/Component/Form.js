import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import http from '../config/http';

const BasicTextFields = (props) => {
    const [formdata, setFormdata] = React.useState()

    const handleChange = (e) => {
        let data = { ...formdata }
        data[e.target.id] = e.target.value;
        setFormdata(data);
    }
    const handleSubmit = () => {
        http.post('user/create', formdata)
            .then((res) => {
                if ([200, 201].includes(res.status)) {
                    setFormdata({
                        ...formdata,
                        name: "",
                        designation: '',
                        email: '',
                        phone: 0
                    })
                    props.modelClose({ type: "success", message: res.data.message });
                }
                else {
                    console.log('else res---->', res.data);
                }
            }).catch((err) => {
                props.modelClose({ type: "error", message: "Phone no. is not valid!" });
            })

    }

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField inputProps={{
                    autocomplete: 'name',
                    form: {
                        autocomplete: 'off',
                    }
                }} id="name" label="Name" variant="standard" onChange={handleChange} />
                <TextField id="designation" label="Designation" variant="standard" onChange={handleChange} />
                <TextField id="email" label="Email" variant="standard" onChange={handleChange} />
                <TextField type="number" id="phone" label="Phone" variant="standard" onChange={handleChange} />
            </Box>

            <Button variant="contained" onClick={handleSubmit}>Submit</Button>{' '}
            <Button variant="outlined" onClick={() => props.modelClose({type:"success", message: "Data Retrieved Successfully" })}>Cancel</Button>
        </>
    );
}

const UpdateTextFields = (props) => {
    let data = props.data;
    const [formdata, setFormdata] = React.useState(props.data ? data : {
        name: '',
        designation: '',
        email: '',
        phone: ''
    });
    const handleChange = (e) => {
        let data = { ...formdata }
        data[e.target.id] = e.target.value;
        setFormdata(data);
    }
    const handleSubmit = () => {
        http.patch(`user/update/${data._id}`, formdata)
            .then((res) => {
                if ([200, 201].includes(res.status)) {
                    setFormdata({
                        ...formdata,
                        name: "",
                        designation: '',
                        email: '',
                        phone: 0
                    })
                    props.modelClose({type:"success", message: res.data.message });
                }
                else {
                    console.log('res---->', res.data);
                }
            }).catch((err) => {
                props.modelClose({ type: "error", message: "Phone no. is not valid!" });
            })
        
    }

    return (<>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="name" label="Name" variant="standard" value={formdata.name} onChange={handleChange} />
            <TextField id="designation" label="Designation" variant="standard" value={formdata.designation} onChange={handleChange} />
            <TextField id="email" label="Email" variant="standard" value={formdata.email} onChange={handleChange} />
            <TextField type="number" id="phone" label="Phone" variant="standard" value={formdata.phone} onChange={handleChange} />
        </Box>

        <Button variant="contained" onClick={handleSubmit}>Submit</Button>{' '}
        <Button variant="outlined" onClick={() => props.modelClose({type:"success", message: "Data Retrieved Successfully" })}>Cancel</Button>

    </>

    );
}
export { BasicTextFields, UpdateTextFields }

