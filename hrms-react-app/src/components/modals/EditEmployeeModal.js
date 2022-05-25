import { useRef } from 'react';

import Card from "../ui/Card";
import classes from "./EditEmployeeModal.module.css";


function EditEmployeeModal(props) {

    //useRef for reading user input from the forms
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const ssnInputRef = useRef();
    const phoneNoInputRef = useRef();
    const departmentInputRef = useRef();
    const positionInputRef = useRef();
    const salaryInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredSSN = ssnInputRef.current.value;
        const enteredPhoneNumber = phoneNoInputRef.current.value;
        const enteredDepartment = departmentInputRef.current.value;
        const enteredPosition = positionInputRef.current.value;
        const enteredSalary = salaryInputRef.current.value;

        const meetupData = {
            SSN: enteredSSN,
            FirstName: enteredFirstName,
            LastName: enteredLastName,
            PhoneNumber: enteredPhoneNumber,
            Department: enteredDepartment,
            Position: enteredPosition,
            Salary: enteredSalary
        };

        props.onEditEmployee(meetupData);
    }

    return (
        <Card>
            <div className={classes.modal}>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor='first-name'>First Name</label>
                        <input type="text" defaultValue={props.firstName} required id="first-name" ref={firstNameInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='last-name'>Last Name</label>
                        <input type="text" defaultValue={props.lastName} required id="last-name" ref={lastNameInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='ssn'>SSN</label>
                        <input type="text" defaultValue={props.ssn} required id="ssn" ref={ssnInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='phone-number'>Phone Number</label>
                        <input type="tel" defaultValue={props.phoneNumber} required id="phone-number" ref={phoneNoInputRef} placeholder="01234567890" pattern="[0]{1}[1]{1}[0-9]{1}[0-9]{8}" />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='department'>Department</label>
                        <input type="text" defaultValue={props.department} required id="department" ref={departmentInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='position'>Position</label>
                        <input type="text" defaultValue={props.position} required id="position" ref={positionInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='salary'>Salary</label>
                        <input type="number" defaultValue={props.salary} min="0" required id="salary" ref={salaryInputRef} />
                    </div>
                    <div className={classes.actions}>
                        <button>Confirm</button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

export default EditEmployeeModal;