import React, {useContext, useState} from "react";
import "./editprevpopup.css"
import EmployeesContext from "../EmployeesContext";
import PreviousEmployeeContext from "../PreviousEmployeeContext";

export default function EditPrevPopup(props){
    const {employees, setEmployees} = useContext(EmployeesContext)
    const {prevEmployee, setPrevEmployee} = useContext(PreviousEmployeeContext)
    let employeeToEdit = {}
    const [name, setName] = useState("")
    const [birth, setBirth] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [start, setStart] = useState("")
    const [team, setTeam] = useState("")

    const _findEmployee = () => {
        employees.map((employee) => {
            if(employee.email === prevEmployee){
                employeeToEdit = employee
            }
        })
    }

    const _handleInputForm = () => {
        const newEmployee = {
            name: (name === "") ? employeeToEdit.name : name,
            birth: (birth === "") ? employeeToEdit.birth : birth,
            gender: (gender === "") ? employeeToEdit.gender : gender,
            email: (email === "") ? employeeToEdit.email : email,
            cpf: (cpf === "") ? employeeToEdit.cpf : cpf,
            start: (start === "") ? employeeToEdit.start : start,
            team: (team === "") ? employeeToEdit.team : team
        }
        
        const newEmployeeArray = employees.map((employee) => {
            return (employee.email === employeeToEdit.email) ? newEmployee : employee
        })
        setEmployees(newEmployeeArray)
        
        props.setTrigger(false)
    }

    _findEmployee()

    return (props.trigger) ? (
        <section className="editPrevPopup">
            <div className="editPrevPopup_content">
                <form action="">
                    <input type="text" placeholder="Your Name" defaultValue={employeeToEdit.name} onChange={event => setName(event.target.value)}/>
                    <input type="date" placeholder="Birth Date" defaultValue={employeeToEdit.birth} onChange={event => setBirth(event.target.value)}/>
                    <select name="gender" required defaultValue={'default'} onChange={event => setGender(event.target.value)}>
                        <option value="default" disabled>{employeeToEdit.gender}</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non Binary">Non Binary</option>
                    </select>
                    <input type="email" placeholder="Your Best E-mail" defaultValue={employeeToEdit.email} onChange={event => setEmail(event.target.value)}/>
                    <input type="number" placeholder="CPF" defaultValue={employeeToEdit.cpf} onChange={event => setCpf(event.target.value)}/>
                    <input type="date" placeholder="Start Date" defaultValue={employeeToEdit.start} onChange={event => setStart(event.target.value)}/>
                    <select name="team" required defaultValue={'default'} onChange={event => setTeam(event.target.value)}>
                        <option value="default" disabled>{employeeToEdit.team}</option>
                        <option value="None">None</option>
                        <option value="Mobile Team">Mobile Team</option>
                        <option value="Backend Team">Backend Team</option>
                        <option value="Frontend Team">Frontend Team</option>
                    </select>
                </form>
                <div className="editPrevPopup_buttonsArea">
                    <button className="editPrevPopup_button editPrevPopup_create"
                    onClick={() => _handleInputForm()}>Edit</button>
                    <button className="editPrevPopup_button editPrevPopup_cancel" 
                    onClick={() => props.setTrigger(false)}>Cancel</button>
                </div>
            </div>            
        </section>
    ) : ""
}