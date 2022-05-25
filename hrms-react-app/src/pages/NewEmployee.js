import { useHistory } from "react-router-dom";

import NewEmployeeForm from "../components/employees/NewEmployeeForm";




function NewEmployeePage() {
    const history = useHistory();

    function addEmployeeHandler(meetupData) {
        fetch(
            'https://localhost:44366/api/Employee', //replace with youssef's api
            {
                method: 'POST',
                body: JSON.stringify(meetupData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(() => {
            history.replace('/');
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }

    return (
        <section>
            <h1>Add New Employee</h1>
            <NewEmployeeForm onAddEmployee={addEmployeeHandler} />
        </section>
    );
}

export default NewEmployeePage;