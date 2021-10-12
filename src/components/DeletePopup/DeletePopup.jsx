import React, {useContext} from "react";
import "./deletepopup.css"
import EmployeesContext from "../EmployeesContext";

export default function DeletePopup(props){
    const {employees, setEmployees} = useContext(EmployeesContext)


    const _handleDeleteEmploye = () => {
        let indexToDelete = -1

        const aux = employees.map((employee, index) => {
            if (employee.email === props.email) { return indexToDelete = index }
        })
        
        employees.splice(indexToDelete, 1)
        const newEmployeeArray = employees
        setEmployees(newEmployeeArray)

        props.onDelete(props.email)
        props.setTrigger(false)
    }

    return (props.trigger) ? (
        <section className="deletePopup">
            <div className="deletePopup_content">
                <p>Are you sure?</p>
                <div className="deletePopup_buttonsArea">
                    <button className="deletePopup_button deletePopup_confirm"
                    onClick={() => _handleDeleteEmploye()}>Confirm</button>
                    <button className="deletePopup_button deletePopup_cancel" 
                    onClick={() => props.setTrigger(false)}>Cancel</button>
                </div>
            </div>            
        </section>
    ) : ""
}