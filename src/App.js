import React, {useState, Component} from 'react';
import './App.css';
import CrudMenu from "./components/CrudMenu/CrudMenu"
import UsersList from "./components/UsersList/UsersList"
import EmployeesContext from './components/EmployeesContext'
import PreviousEmployeeContext from "./components/PreviousEmployeeContext"
import data from "./components/data.json"

let stop = 1

function App() {
  const [employees, setEmployees] = useState([])
  const [prevEmployee, setPrevEmployee] = useState("")
  
  const baseURL = "https://crudcrud.com/api/c8677ecfc9e845d7ab8aab4f5c9797f1/nutemployee"
  const createNE = () => {
    data.map((nutEmployee) => {
      fetch(baseURL, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: 'POST',
          body: JSON.stringify(nutEmployee)
      })
      .then(response => response.json())
      .then(data => console.log(data))
    })

    document.getElementById("postButton").style.display = "none"
  }

  const showNEs = () => {
    fetch(baseURL) // Get the employees to employees list
    .then(response => response.json())
    .then(data => setEmployees(data))
    
    document.getElementById("showButton").style.display = "none"
  }
  

  const _handleDelete = (email) => {
      const newEmployeeArray = employees.filter(employee => employees.email !== email)
      setPrevEmployee("")
      setEmployees(newEmployeeArray)
  }

  return (
    <EmployeesContext.Provider value={{employees, setEmployees}}>
      <PreviousEmployeeContext.Provider value={{prevEmployee, setPrevEmployee}}>
        <div className="mainDiv">
          <div className="crudcrudArea">
            <button id="postButton" className="" onClick={() => createNE()}>Create NE</button>
            <button id="showButton" className="" onClick={() => showNEs()}>Show NEs</button>
          </div>
          <CrudMenu onDelete={_handleDelete}/>
          <UsersList onDelete={_handleDelete}/>
        </div>
      </PreviousEmployeeContext.Provider>
    </EmployeesContext.Provider>
  );
}

export default App;
