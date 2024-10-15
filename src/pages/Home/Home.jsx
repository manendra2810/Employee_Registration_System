import React from 'react'
import './Home.css'
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm'
import EmployeeList from '../../components/EmployeeList/EmployeeList'
import { useState, useEffect } from 'react'

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [employee, setEmployee] = useState({
        id: '',
        name: '',
        address: '',
        contactNumber: '',
        joiningDate: '',
        gender: '',
        salary: '',
        department: '',
        profilePicture: null,
    });


    // Get employee Data from the local sotorage--------------------------------------------------
    useEffect(()=>{
        let employeeData = localStorage.getItem("employees")
        if(employeeData){
          let employeeList = JSON.parse(localStorage.getItem("employees")); 
          setEmployees(employeeList);
          setFilteredEmployees(employeeList);
        }
    },[]);


    //code for filter data between to dates -------------------------------------------
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const filterEmployees = () => {
        let filteredData = employees.filter(emp => {
            const joiningDate = new Date(emp.joiningDate);
            return joiningDate >= new Date(fromDate) && joiningDate <= new Date(toDate);
        });
        setFilteredEmployees(filteredData);
    };
    
    
    // code for add employee into storage---------------------------------------
    const addEmployee = (employee) => {
        if (isEditing) {
            const updatedEmployees = employees.map((emp, index) =>
                index === currentIndex ? employee : emp
            );
            setEmployees(updatedEmployees);
            localStorage.setItem("employees", JSON.stringify(updatedEmployees));
            setFilteredEmployees(updatedEmployees)
            setIsEditing(false);
        } 
        else {
            setEmployees([...employees, employee]);
            localStorage.setItem("employees", JSON.stringify([...employees, employee]));
            setFilteredEmployees([...employees, employee]);
        }
    };


    // code to edit existing employee data-----------------------------------------
    const editEmployee = (index) => { 
        setCurrentIndex(index);
        const employeeToEdit = employees[index];
        setEmployee({ 
            id: employeeToEdit.id,
            name: employeeToEdit.name,
            address: employeeToEdit.address,
            contactNumber: employeeToEdit.contactNumber,
            joiningDate: employeeToEdit.joiningDate,
            gender: employeeToEdit.gender,
            salary: employeeToEdit.salary,
            department: employeeToEdit.department,
            profilePicture: employeeToEdit.profilePicture,
        });
        document.querySelector(`input[name="gender"][value="${employeeToEdit.gender}"]`).checked = true;
        setIsEditing(true);
    };


    // Delete employee from storage-------------------------------------------------------------------
    const deleteEmployee = (index) => {
        let restData = employees.filter((_, i) => i !== index);
        setEmployees(restData);
        localStorage.setItem("employees", JSON.stringify(restData));
        setFilteredEmployees(restData)
    };




  return (
    <div className='home'>
        <h1>Employee Registration System</h1>
        <hr/>
        <EmployeeForm addEmployee={addEmployee} employee={employee} setEmployee={setEmployee} employees={employees} isEditing={isEditing}/>
        <div className='serch-btn-box'>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            <button onClick={filterEmployees}>Filter</button>
            <button onClick={()=>{setFromDate(""), setToDate(""), setFilteredEmployees(employees);}}>Show All</button>
        </div>
        <EmployeeList employees={filteredEmployees} editEmployee={editEmployee} deleteEmployee={deleteEmployee} />
    </div>
  )
}

export default Home
