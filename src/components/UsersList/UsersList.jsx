import React, {useContext} from "react";
import Employee from "../Employee/Employee"
import "./userslist.css"
import EmployeesContext from "../EmployeesContext";

export default function UsersList(props){
    const {employees, setEmployees} = useContext(EmployeesContext)
    
    return(
        <section className="userList">
            <ul className="userList_list">
                {employees.map((employee, index) => {
                    return (
                        <li className="userList_list-employee" key={index}>
                            <Employee
                            onDelete={props.onDelete}
                            name={employee.name}
                            email={employee.email}
                            start={employee.start}
                            team={employee.team}/>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}