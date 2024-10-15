import React from 'react'
import "./EmployeeForm.css"

const EmployeeForm = ({addEmployee, employee, setEmployee, employees, isEditing}) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEmployee({ ...employee, profilePicture: reader.result });
            };
            reader.readAsDataURL(file); // Convert file to Base64 string
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isEditing){
            const getId = employees.filter((emp, index)=> {
                return emp.id === employee.id;
            })
            if(getId.length > 0){
                alert("This employee Id is already exists, Please use another Id.");
                return;
            }
        }
        addEmployee(employee);
        setEmployee({
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
        document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = false;
    };

    const handleReset = ()=> {
        setEmployee({
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
    }

  return (
    <form onSubmit={handleSubmit} className='form-box'>
        <div className="box1">
            <input type="text" name="id" value={employee.id} onChange={handleChange} placeholder="Employee ID" required />
            <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
        </div>
        <div className="box2">
            <textarea name="address" value={employee.address} onChange={handleChange} placeholder="Address" required></textarea>
            <div className="box2_1">
                <input type="tel" name="contactNumber" value={employee.contactNumber} onChange={handleChange} pattern="\d{10}" placeholder="Contact Number" required />
                <input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} required />
            </div>
        </div>
        <div className='radio-box'>
            <label>
                <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
            </label>
            <label>
                <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
            </label>
            <label>
                <input type="radio" name="gender" value="Other" onChange={handleChange} required /> Other
            </label>
        </div>
        <div className="box3">
            <input type="number" name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" required />
            <select name="department" value={employee.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
            </select>
            <input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" required/>
        </div>
        <div className="box4">
            <button type="submit">Submit</button>
            <button type="reset" onClick={handleReset}>Clear</button>
        </div>
    </form>
  )
}

export default EmployeeForm
