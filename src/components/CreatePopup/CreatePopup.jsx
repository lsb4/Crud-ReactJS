import React, { useState, useContext} from "react";
import "./createpopup.css"
import EmployeesContext from "../EmployeesContext";
import PreviousEmployeeContext from "../PreviousEmployeeContext";

export default function CreatePopup(props){
    const {employees, setEmployees} = useContext(EmployeesContext)
    const {prevEmployee, setPrevEmployee} = useContext(PreviousEmployeeContext)
    const [name, setName] = useState("")
    const [birth, setBirth] = useState(new Date())
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [start, setStart] = useState(new Date())
    const [team, setTeam] = useState("")

    let validator = [
        {
            id: "name",
            labelID: "nameLabel",
            isOk: 1
        },
        {
            id: "birth",
            labelID: "birthLabel",
            isOk: 1
        },
        {
            id: "gender",
            labelID: "genderLabel",
            isOk: 1
        },
        {
            id: "email",
            labelID: "emailLabel",
            isOk: 1
        },
        {
            id: "cpf",
            labelID: "cpfLabel",
            isOk: 1,
            hint: "This field must have 11(eleven) digits"
        },
        {
            id: "start",
            labelID: "startLabel",
            isOk: 1
        },
    ]

    const needField = "This field is obrigatory"

    const _formValidation = () => {

        let flag = 1

        const gender = document.getElementById("gender")
        const team = document.getElementById("team")
        if(document.getElementById("name").value === "") { validator[0].isOk = 0 }
        if(document.getElementById("birth").value === "") { validator[1].isOk = 0 }
        if(gender.options[gender.selectedIndex].value === "default") { validator[2].isOk = 0 }
        if(document.getElementById("email").value === "") { validator[3].isOk = 0 }
        if(document.getElementById("cpf").value === "") { validator[4].isOk = 0 }
        else if(document.getElementById("cpf").value.length < 11) { validator[4].isOk = 2 }
        if(document.getElementById("start").value === "") { validator[5].isOk = 0 }
        
        validator.forEach((element) => {
            if(element.isOk === 0){
                document.getElementById(element.labelID).textContent = needField
                document.getElementById(element.id).style.borderColor = "rgb(190, 29, 29)"
                flag = 0
            }else if(element.isOk === 2){
                document.getElementById(element.labelID).textContent = element.hint
                document.getElementById(element.id).style.borderColor = "rgb(190, 29, 29)"
                flag = 0
            }else if(element.isOk === 1){
                document.getElementById(element.labelID).textContent = ""
                document.getElementById(element.id).style.borderColor = "#ccc"
            }
        });

        return flag
    } 

    const _handleInputForm = () => {

        const go = _formValidation()
        
        validator.forEach((element) => {
            element.isOk = 0;
        })

        if(go === 1){
            const newEmployee = {
                name: name,
                birth: birth,
                gender: gender,
                email: email,
                cpf: cpf,
                start: start,
                team: team
            }

            const newEmployeesArray = [newEmployee, ...employees]
            setEmployees(newEmployeesArray)
            setPrevEmployee(newEmployee.email)
            
            props.setTrigger(false)
        }
    }

    return (props.trigger) ? (
        <section className="createPopup">
            <div className="createPopup_content">
                <form className="createPopup_form">
                    <input id="name" type="text" placeholder="Your Name" onChange={event => setName(event.target.value)}/>
                    <label id="nameLabel" for="name"></label>
                    <input id="birth" type="date" placeholder="Birth Date" onChange={event => setBirth(event.target.value)}/>
                    <label id="birthLabel" for="birth"></label>
                    <select id="gender" name="gender" required defaultValue={'default'} onChange={event => setGender(event.target.value)}>
                        <option value="default" disabled>Select Your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non Binary">Non Binary</option>
                    </select>
                    <label id="genderLabel" for="gender"></label>
                    <input id="email" type="email" placeholder="Your Best E-mail" onChange={event => setEmail(event.target.value)}/>
                    <label id="emailLabel" for="email"></label>
                    <input id="cpf" type="number" placeholder="CPF" onChange={event => setCpf(event.target.value)}/>
                    <label id="cpfLabel" for="cpf"></label>
                    <input id="start" type="date" placeholder="Start Date" onChange={event => setStart(event.target.value)}/>
                    <label id="startLabel" for="start"></label>
                    <select id="team" name="team" required defaultValue={'default'} onChange={event => setTeam(event.target.value)}>
                        <option value="default" disabled>Select Your Team</option>
                        <option value="None">None</option>
                        <option value="Mobile Team">Mobile Team</option>
                        <option value="Backend Team">Backend Team</option>
                        <option value="Frontend Team">Frontend Team</option>
                    </select>
                    <label id="team Label" for="team"></label>
                </form>
                <div className="createPopup_buttonsArea">
                    <button className="createPopup_button createPopup_create"
                    onClick={() => _handleInputForm()}>Create</button>
                    <button className="createPopup_button createPopup_cancel" 
                    onClick={() => props.setTrigger(false)}>Cancel</button>
                </div>
            </div>            
        </section>
    ) : ""
}