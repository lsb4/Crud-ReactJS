import React, { useState, useContext } from "react";
import "./crudmenu.css"
import CreatePopup from "../CreatePopup/CreatePopup";
import DeletePrevPopup from "../DeletePrevPopup/DeletePrevPopup";
import EditPrevPopup from "../EditPrevPopup/EditPrevPopup";
import PreviousEmployeeContext from "../PreviousEmployeeContext";

export default function CrudMenu(props){
    const [addButton, setAddButton] = useState(false)
    const [deletePrevButton, setDeletePrevButton] = useState(false)
    const [editPrevButton, setEditPrevButton] = useState(false)
    const {prevEmployee, setPrevEmployee} = useContext(PreviousEmployeeContext)

    const checkDeletePrevButton = () => {
        if(prevEmployee !== ""){
            return setDeletePrevButton(true)
        }
    }

    const checkEditPrevButton = () => {
        if(prevEmployee !== ""){
            return setEditPrevButton(true)
        }
    }

    return(
        <section className="menu">
            <h1 className="menu_title">Employees List</h1>
            <div className="menu_buttonsArea">
                <button className="menu_button menu_deleteRecent" onClick={() => checkDeletePrevButton()}>Delete Recent</button>
                <DeletePrevPopup onDelete={props.onDelete} trigger={deletePrevButton} setTrigger={setDeletePrevButton}/>
                <button className="menu_button menu_editRecent" onClick={() => checkEditPrevButton()}>Edit Recent</button>
                <EditPrevPopup trigger={editPrevButton} setTrigger={setEditPrevButton}/>
                <button className="menu_button menu_add" onClick={() => setAddButton(true)}>Add Employee</button>
                <CreatePopup trigger={addButton} setTrigger={setAddButton}/>
            </div>
        </section>
    )
}
