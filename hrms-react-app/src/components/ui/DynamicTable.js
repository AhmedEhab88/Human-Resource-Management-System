import { useState } from "react";


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteEmployeeModal from "../modals/DeleteEmployeeModal";
import ViewEmployeeModal from "../modals/ViewEmployeeModal";
import Backdrop from "./Backdrop";
import EditEmployeeModal from "../modals/EditEmployeeModal";


function DynamicTable(props) {
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    const [employeeIDDelete, setEmployeeIDDelete] = useState({});
    const [employeeIDView, setEmployeeIDView] = useState({});
    const [employeeIDEdit, setEmployeeIDEdit] = useState({});
    const [employeeEdit, setEmployeeEdit] = useState({});


    function deleteEmployeeHandler(employeeId) {
        setDeleteModalIsOpen(true);
        setEmployeeIDDelete(employeeId)
    }

    function viewEmployeeHandler(employee) {
        setEmployeeIDView(employee);
        setViewModalIsOpen(true);
    }

    function closeModalHandler() {
        if (deleteModalIsOpen) {
            setDeleteModalIsOpen(false);
        }
        if (viewModalIsOpen) {
            setViewModalIsOpen(false);
        }
        if (editModalIsOpen) {
            setEditModalIsOpen(false);
        }
    }

    function editButtonHandler(employee, employeeId) {
        setEmployeeIDEdit(employeeId);
        setEmployeeEdit(employee);
        setEditModalIsOpen(true);
    }

    function confirmDeleteHandler() {
        fetch(
            `https://localhost:44366/api/Employee/${employeeIDDelete}`,
            { method: 'DELETE' }
        ).then(() => {
            setDeleteModalIsOpen(false);
            props.onChange();
        }).catch(error => {
            console.error('There was an error!', error);
        });;
    }

    function editEmployeeHandler(meetupData) {
        meetupData.employeeId = employeeIDEdit;
        fetch(
            `https://localhost:44366/api/Employee/${employeeIDEdit}`, //replace with youssef's api
            {
                method: 'PUT',
                body: JSON.stringify(meetupData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(() => {
            setEditModalIsOpen(false);
            props.onChange();
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SSN</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Department</TableCell>
                            <TableCell align="right">Position</TableCell>
                            <TableCell align="right">Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((row) => (
                            <TableRow key={row.employeeId}>
                                <TableCell align="right">{row.ssn}</TableCell>
                                <TableCell align="right">{row.firstName}</TableCell>
                                <TableCell align="right">{row.lastName}</TableCell>
                                <TableCell align="right">{row.phoneNumber}</TableCell>
                                <TableCell align="right">{row.department}</TableCell>
                                <TableCell align="right">{row.position}</TableCell>
                                <TableCell align="right">{row.salary}</TableCell>
                                <TableCell><Button size="small" variant="contained" color="error" onClick={() => deleteEmployeeHandler(row.employeeId)}>Delete</Button></TableCell>
                                <TableCell ><Button size="small" variant="outlined" onClick={() => viewEmployeeHandler(row)} >View</Button></TableCell>
                                <TableCell ><Button size="small" color="success" variant="contained" onClick={() => editButtonHandler(row, row.employeeId)} >Edit</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {deleteModalIsOpen ? <DeleteEmployeeModal onCancel={closeModalHandler} onConfirm={confirmDeleteHandler} /> : null}
            {deleteModalIsOpen | viewModalIsOpen | editModalIsOpen ? <Backdrop onCancel={closeModalHandler} /> : null}
            {viewModalIsOpen ?
                <ViewEmployeeModal
                    firstName={employeeIDView.firstName}
                    lastName={employeeIDView.lastName}
                    ssn={employeeIDView.ssn}
                    department={employeeIDView.department}
                    position={employeeIDView.position}
                    phoneNumber={employeeIDView.phoneNumber}
                    salary={employeeIDView.salary}
                    onCancel={closeModalHandler}
                />
                : null}
            {editModalIsOpen ?
                <EditEmployeeModal
                    onEditEmployee={editEmployeeHandler}
                    firstName={employeeEdit.firstName}
                    lastName={employeeEdit.lastName}
                    ssn={employeeEdit.ssn}
                    department={employeeEdit.department}
                    position={employeeEdit.position}
                    phoneNumber={employeeEdit.phoneNumber}
                    salary={employeeEdit.salary}
                />
                : null}

        </div>
    );
}

export default DynamicTable;