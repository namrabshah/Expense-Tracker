import axios from "axios";
import './App.css'
import { useState, useEffect } from 'react';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Expenss() {
    const [expenssData, setExpenss] = useState([]);
    const [editId, seteditId] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [deleteId, setDeleteId] = useState(null);


    const handleClickOpen = (id) => {
        setDeleteId(id);
        setOpen2(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [data, setData] = useState({
        name: "",
        price: "",
        cd: "",
        dec: ""
    })
    let sum = 0;
    expenssData.forEach((val) => {
        if (val.cd === "debit") {
            sum -= val.price
        }
        else {
            sum += val.price
        }
    })

    const onChangeInput = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    const fetchExpense = () => {
        axios.get("http://localhost:5000/expenss/getData")
            .then((res) => {
                console.log(res.data)
                setExpenss([
                    ...res.data.data
                ])
            })
            .catch((err) => {
                console.error("Error:", err)
            });

    }
    useEffect(() => {
        axios.get("http://localhost:5000/expenss/getData")
            .then((res) => {
                console.log(res.data)
                setExpenss([
                    ...res.data.data
                ])
            })
            .catch((err) => {
                console.error("Error:", err)
            });

    }, [])
    const addExpense = () => {
        setOpen(true);
        console.log("Added")
        axios.post("http://localhost:5000/expenss/addExpenss", data)
            .then((res) => {
                console.log(res.data)
                setExpenss([...expenssData, data]);
                setData({
                    name: "",
                    price: "",
                    cd: "",
                    dec: ""
                });
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const updateExpense = () => {
        setOpen1(true);
        console.log("Updated")
        axios.put(`http://localhost:5000/expenss/putExpness?_id=${editId}`, data)
            .then((res) => {
                console.log(res)
                fetchExpense()
                seteditId(null)
                setData({
                    name: "",
                    price: "",
                    cd: "",
                    dec: ""
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const deleteExpense = (id) => {

        console.log("Deleted")
        axios.delete(`http://localhost:5000/expenss/deleteExpenss?_id=${id}`)
            .then((res) => {    
                console.log(res)
                fetchExpense()
            })
            .catch((err) => {
                console.log(err)
            })
        setOpen2(false);
    }
    console.log(sum)
    return (
        <div className="dynamic-bg" style={{ minHeight: "100vh" }}>
            <nav className="navbar" style={{ backgroundColor: "#A6ACAF", color: "#333" }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">ExpenseTracker</span>
                </div>
            </nav>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div className="card" style={{ width: "50rem", minHeight: "30rem" }}>
                    <div className="card-body d-flex justify-content-center align-items-center" style={{ backgroundColor: "#A6ACAF" }}>
                        <div className="container-fluid text-center">
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="expenseTitle"
                                            placeholder="Enter Expense Name : "
                                            style={{ color: "#17202A" }}
                                            name='name'
                                            value={data.name}
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="expensePrice"
                                            placeholder="Enter Expense Price : "
                                            style={{ color: "#17202A" }}
                                            name='price'
                                            value={data.price}
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <select
                                            className="form-control"
                                            id="expenseCD"
                                            name="cd"
                                            value={data.cd}
                                            onChange={onChangeInput}
                                            style={{ color: "#17202A" }}
                                        >
                                            <option value="">Select Credit/Debit</option>
                                            <option value="credit">Credit</option>
                                            <option value="debit">Debit</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            id="expenseDescription"
                                            placeholder="Enter Expense Description : "
                                            rows="3"
                                            style={{ color: "#17202A" }}
                                            name='dec'
                                            value={data.dec}
                                            onChange={onChangeInput}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <button type="button" className="btn btn-success" style={{ color: "#17202A" }} onClick={addExpense}>Add Expense</button>
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert
                                        onClose={handleClose}
                                        severity="success"
                                        variant="filled"
                                        sx={{ width: '20%' }}
                                    >
                                        Data add successfully!
                                    </Alert>
                                </Snackbar>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <button type="button" className="btn btn-secondary" style={{ color: "#17202A" }} onClick={updateExpense}>Update</button>
                                    <Snackbar
                                        open={open1}
                                        autoHideDuration={5000}
                                        onClose={handleClose1}
                                        message="Data update successfully"
                                    />
                                </div>
                                {/* <div className="col-6">
                                    <button type="button" className="btn btn-danger" style={{ color: "#17202A" }} onClick={deleteExpense}>Delete</button>
                                </div> */}
                            </div>
                            <div className="row mt-5">
                                <table className="table table-success table-striped-columns">
                                    <thead>
                                        <tr>
                                            <th scope="col">Expense Name</th>
                                            <th scope="col">Expense Price</th>
                                            <th scope="col">Expense Credit/Debit</th>
                                            <th scope="col">Expense Description</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            expenssData.map((value, index) => (
                                                <tr key={index}>
                                                    <td>{value.name}</td>
                                                    <td>{value.price}</td>
                                                    <td>{value.cd}</td>
                                                    <td>{value.dec}</td>
                                                    <td>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <button type="button" className="btn btn-secondary" style={{ color: "#17202A" }} onClick={() => {
                                                                    seteditId(value._id)
                                                                    setData({
                                                                        name: value.name,
                                                                        price: value.price,
                                                                        cd: value.cd,
                                                                        dec: value.dec
                                                                    })
                                                                }}>Update</button>
                                                            </div>
                                                            <div className="col-6">
                                                                <React.Fragment>
                                                                    <button type="button" className="btn btn-danger" style={{ color: "#17202A" }} onClick={() => handleClickOpen(value._id)}>Delete</button>
                                                                    <Dialog
                                                                        open={open2}
                                                                        onClose={() => setOpen2(false)}
                                                                        aria-labelledby="alert-dialog-title"
                                                                        aria-describedby="alert-dialog-description"
                                                                    >
                                                                        <DialogTitle id="alert-dialog-title">
                                                                            {"Confirm Deletion"}
                                                                        </DialogTitle>
                                                                        <DialogContent>
                                                                            <DialogContentText id="alert-dialog-description">
                                                                                Are you sure you want to delete this expense?
                                                                            </DialogContentText>
                                                                        </DialogContent>
                                                                        <DialogActions>
                                                                            <Button onClick={() => setOpen2(false)}>Cancel</Button>
                                                                            <Button onClick={() => deleteExpense(deleteId)} autoFocus>
                                                                                Delete
                                                                            </Button>
                                                                        </DialogActions>
                                                                    </Dialog>
                                                                </React.Fragment>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    <tr>
                                        <th scope="col">Net expenss</th>
                                        <th scope="col">{sum}</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Expenss