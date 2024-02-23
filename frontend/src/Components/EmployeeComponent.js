import React, { useState, useEffect, useRef } from 'react'
import Navbar from "./GlobalComponent/NavbarComponent/navbarcomponent"
import { axiosInstance, setAuthToken } from "../util/baseurl"
import '../Styles/Customers.css'

const Employees = () => {
    const [employeesList, setemployeesList] = useState([])
    const [selectedemployee, setSelectedemployee] = useState(null)
    const [operation, setoperation] = useState(null)
    const [newemployee, setNewemployee] = useState({
        employeename: '',
        address: '',
        phoneNumber: '',
        emailAddress: '',
        companyName: '',
        domain: '',
        wordmode: '',
        salary: '',
        location: "",
        status: ''
    })
    const modalRef = useRef(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewemployee(prevemployee => ({ ...prevemployee, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            if (selectedemployee) {
                // Update employee
                const response = await axiosInstance.put(`/api/employees/${selectedemployee._id}`, {
                    ...newemployee
                });

                if (response.ok) {
                    const updatedemployee = await response.json();
                    const updatedemployeesList = employeesList.map(employee => {
                        if (employee._id === updatedemployee._id) {
                            return updatedemployee;
                        } else {
                            return employee;
                        }
                    });
                    setemployeesList(updatedemployeesList);
                    setSelectedemployee(null);
                    if (modalRef.current) {
                        modalRef.current.handleClose();
                    }
                }
            } else {
                // Create employee
                const {
                    employeename,
                    address,
                    phoneNumber,
                    emailAddress,
                    companyName,
                    domain,
                    wordmode,
                    salary,
                    location,
                    status } = newemployee

                const response = await axiosInstance.post('/api/employees', {
                    employeename,
                    address,
                    phoneNumber,
                    emailAddress,
                    companyName,
                    domain,
                    wordmode,
                    salary,
                    location,
                    status
                });

                if (response) {
                    const createdemployee = await response.json();
                    setemployeesList([...employeesList, createdemployee]);
                }
            }
        } catch (error) {
            console.error('Error creating/updating employee:', error);
        }
    }

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchemployees = async () => {
        try {
            const response = await axiosInstance.get(`/api/employees?page=${page}&limit=${limit}`);
            const data = response.data;
            setemployeesList(data.employeeData);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handlePrevClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        fetchemployees();
    }, [page, limit]);



    const handleDelete = async (employee) => {
        try {
         
            const response = await axiosInstance.delete(`/api/deleteemployee/${employee.emailAddress}`);
            // Use the correct endpoint for deletion and pass the email address as a parameter
    
            if (response) {
                const updatedemployeesList = employeesList.filter(cust => cust._id !== employee._id);
                setemployeesList(updatedemployeesList);
                setSelectedemployee(null);
                if (modalRef.current) {
                    modalRef.current.handleClose();
                }
            } else {
                console.error('Error deleting employee:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };
    

    const handleAddUserClick = () => {
        setNewemployee({
            employeename: '',
            address: '',
            phoneNumber: '',
            emailAddress: '',
            companyName: '',
            domain: '',
            wordmode: '',
            salary: '',
            location: "",
            status: ''
        })
        setoperation("Add User")
    }

    return (
        <div>
            <Navbar /><br />
            <button type="button" class="btn btn-primary mx-auto d-block" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleAddUserClick}>
                ADD USER
            </button>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">{operation}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label class="form-label" for="fullName">Name</label>
                                    <input type='text' class="form-input" name='fullName' onChange={handleInputChange} placeholder='Name' value={newemployee.fullName} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="address">Address</label>
                                    <input type='text' class="form-input" name='address' onChange={handleInputChange} placeholder='Address' value={newemployee.address} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="phoneNumber">Phone Number</label>
                                    <input type='text' class="form-input" name='phoneNumber' onChange={handleInputChange} placeholder='Phone Number' value={newemployee.phoneNumber} />
                                    <label class="form-label" for="emailAddress">Email Address</label>
                                    <input type='text' class="form-input" name='emailAddress' onChange={handleInputChange} placeholder='Email Address' value={newemployee.emailAddress} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="companyName">Company Name</label>
                                    <input type='text' class="form-input" name='companyName' onChange={handleInputChange} placeholder='Company Name' value={newemployee.companyName} />
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="industry">Domain</label>
                                    <input type='text' class="form-input" name='domain' onChange={handleInputChange} placeholder='Domain' value={newemployee.domain} />
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="workmode">Work Mode</label>
                                    <input type='text' class="form-input" name='workmode' onChange={handleInputChange} placeholder='Work Mode' value={newemployee.workmode} />
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="salary">Salary</label>
                                    <input type='text' class="form-input" name='salary' onChange={handleInputChange} placeholder='Salary' value={newemployee.salary} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="location">Location</label>
                                    <input type='text' class="form-input" name='location' onChange={handleInputChange} placeholder='Location' value={newemployee.location} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="status">Status</label>
                                    <input type='text' class="form-input" name='status' onChange={handleInputChange} placeholder='Status' value={newemployee.status} />
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Email Address</th>
                            <th>Company Name</th>
                            <th>Domain</th>
                            <th>WorkMode</th>
                            <th>Salary</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesList.map((employee, index) => (
                            <tr key={employee._id}>
                                <td>{(page - 1) * limit + index + 1}</td>
                                <td>{employee.employeename}</td>
                                <td>{employee.address}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.emailAddress}</td>
                                <td>{employee.companyName}</td>
                                <td>{employee.domain}</td>
                                <td>{employee.workmode}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.location}</td>
                                <td>{employee.status}</td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => {
                                            setSelectedemployee(employee);
                                            setNewemployee({
                                                fullName: employee.employeename,
                                                address: employee.address,
                                                phoneNumber: employee.phoneNumber,
                                                emailAddress: employee.emailAddress,
                                                companyName: employee.companyName,
                                                domain: employee.domain,
                                                workmode: employee.workmode,
                                                salary: employee.salary,
                                                location: employee.location,
                                                status: employee.status
                                            });
                                            setoperation("Update User");
                                        }}
                                    >
                                        Update
                                    </button>
                                </td>

                                <td>

                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" >
                                        Delete
                                    </button>

                                    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Data</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    Are you sure to delete the data ?
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                  
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleDelete(employee)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='paginationbuttoncontainer'>
                    <button onClick={handlePrevClick} disabled={page === 1}>Prev</button>
                    <span>{`Page ${page} of ${totalPages}`}</span>
                    <button onClick={handleNextClick} disabled={page === totalPages}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Employees