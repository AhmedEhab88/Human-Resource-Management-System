import { Card } from "@mui/material";
import classes from './Modal.module.css';

function ViewEmployeeModal(props) {
    return (
        <Card className={classes.modal}>
            <div className={classes.content}>
                <h3>{props.firstName} {props.lastName}</h3>
                <p>SSN: {props.ssn}</p>
                <p>Phone Number: {props.phoneNumber}</p>
                <p>Department: {props.department}</p>
                <p>Position: {props.position}</p>
                <p>Salary: {props.salary}</p>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel}>Done</button>
            </div>
        </Card>
    )
}

export default ViewEmployeeModal;