import { useState, useEffect } from "react";
import { ThreeDots } from 'react-loading-icons';

import DynamicTable from "../components/ui/DynamicTable";
import '../index.css';


function EmployeesPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedEmployees, setLoadedEmployees] = useState([]);
    const [reRender, setReRender] = useState(false);

    function reRenderHandler() {
        setReRender(true);
    }


    useEffect(() => {
        setIsLoading(true);
        fetch(
            'https://localhost:44366/api/Employee',
        ).then(response => {
            return response.json();
        }).then(data => {
            const employees = data.slice();
            setIsLoading(false);
            setLoadedEmployees(employees);
            setReRender(false);
        }).catch(error => {
            alert('There was an error! ' + error);
        });
    }, [reRender]);


    if (isLoading) {
        return (
            <section className="circle">
                <ThreeDots fill="#77002e" />
            </section>
        );
    }


    return (
        <section>
            <h1>All Employees</h1>
            {loadedEmployees.length === 0 ? <h3>No Users Found</h3> : <DynamicTable data={loadedEmployees} onChange={reRenderHandler} />}
        </section>
    );
}

export default EmployeesPage; 