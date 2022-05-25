import classes from './Modal.module.css';

function DeleteEmployeeModal(props) {


    return (
        <div className={classes.modal}>
            <p>Are you sure you want to delete this employee?</p>
            <button className={`${classes.btn} ${classes.altbutton}`} onClick={props.onCancel}>Cancel</button>
            <button className={classes.btn} onClick={props.onConfirm} >Delete</button>
        </div>
    );

}

export default DeleteEmployeeModal;