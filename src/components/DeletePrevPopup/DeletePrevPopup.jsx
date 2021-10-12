import React, {useContext} from "react";
import "./deleteprevpopup.css"
import EmployeesContext from "../EmployeesContext";
import PreviousEmployeeContext from "../PreviousEmployeeContext";

export default function DeletePrevPopup(props){
    const {employees, setEmployees} = useContext(EmployeesContext)
    const {prevEmployee, setPrevEmployee} = useContext(PreviousEmployeeContext)

    const _handleDeletePrevEmploye = () => {
        let indexToDelete = -1

        const aux = employees.map((employee, index) => {
            if (prevEmployee === employee.email) { return indexToDelete = index }
        })
        
        employees.splice(indexToDelete, 1)
        const newEmployeeArray = employees
        setEmployees(newEmployeeArray)

        props.onDelete(prevEmployee)
        props.setTrigger(false)
    }

    return (props.trigger) ? (
        <section className="deletePrevPopup">
            <div className="deletePrevPopup_content">
                <p>Are you sure?</p>
                <div className="deletePrevPopup_buttonsArea">
                    <button className="deletePrevPopup_button deletePrevPopup_confirm"
                    onClick={() => _handleDeletePrevEmploye()}>Confirm</button>
                    <button className="deletePrevPopup_button deletePrevPopup_cancel" 
                    onClick={() => props.setTrigger(false)}>Cancel</button>
                </div>
            </div>            
        </section>
    ) : ""
}