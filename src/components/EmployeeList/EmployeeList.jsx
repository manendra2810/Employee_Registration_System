import React from 'react'
import './EmployeeList.css'

const EmployeeList = ({ employees, editEmployee, deleteEmployee }) => {
    return (
        <div className='emp-table-div'>
            <table className='employee-list-table'>
                <thead>
                    <tr>
                        <th>E.ID</th>
                        <th>Name</th>
                        <th>Dept.</th>
                        <th>Date</th>
                        <th>Salary</th>
                        <th>Cont. No.</th>
                        <th>Profile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.joiningDate}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.contactNumber}</td>
                            <td className='profile-img'><img src={employee.profilePicture} alt="Profile"/></td>
                            <td>
                                <button className='td-btn' onClick={() => editEmployee(index)}>Edit</button>
                                <button className='td-btn' onClick={() => deleteEmployee(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="table-box">
                {employees.map((employee, index) => (
                    <table className='employee-list-table2' key={index}>
                        <tbody>
                            <tr>
                                <th>E.ID</th>
                                <td>{employee.id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{employee.name}</td>
                            </tr>
                            <tr>
                                <th>Dept.</th>
                                <td>{employee.department}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{employee.joiningDate}</td>
                            </tr>
                            <tr>
                                <th>Salary</th>
                                <td>{employee.salary}</td>
                            </tr>
                            <tr>
                                <th>Cont. No.</th>
                                <td>{employee.contactNumber}</td>
                            </tr>
                            <tr>
                                <th>Profile</th>
                                <td className='profile-img'><img src={employee.profilePicture} alt="Profile"/></td>
                            </tr>
                            <tr>
                                <th>Actions</th>
                                <td>
                                    <button className='td-btn' onClick={() => editEmployee(index)}>Edit</button>
                                    <button className='td-btn' onClick={() => deleteEmployee(index)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    )
}

export default EmployeeList
