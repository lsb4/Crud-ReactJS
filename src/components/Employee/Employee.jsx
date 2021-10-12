import React, { useState } from "react";
import "./employee.css"
import DeletePopup from "../DeletePopup/DeletePopup";
import EditPopup from "../EditPopup/EditPopup";

export default function Employee({onDelete, name, email, start, team}){
    const [confirmButton, setConfirmButton] = useState(false)
    const [editButton, setEditButton] = useState(false)
    const day = start.toString().substring(8,10)
    const month = start.toString().substring(5,7)
    const year = start.toString().substring(0,4)

    return(
        <section className="employee">
            <div className="employee_info">
                <p className="employee_info-name">{name}</p>
                <p className="employee_info-email">{email}</p>
                <p className="employee_info-startDate">{day}/{month}/{year}</p>
                <p className="employee_info-team">{team}</p>
            </div>
            <div className="employee_buttonsArea">
                <button className="employee_button employee_delete"
                 onClick={() => setConfirmButton(true)}>Delete</button>
                <button className="employee_button employee_edit"
                onClick={() => setEditButton(true)}>Edit</button>       
            </div>
            <DeletePopup onDelete={onDelete} email={email} trigger={confirmButton} setTrigger={setConfirmButton}/>
            <EditPopup email={email} trigger={editButton} setTrigger={setEditButton}/>
        </section>
    )
}