import React, { useState, useEffect, useRef } from 'react'
import Navbar from "./GlobalComponent/NavbarComponent/navbarcomponent"
import { axiosInstance, setAuthToken } from "../util/baseurl"
import '../Styles/Customers.css'
import { useNavigate } from 'react-router-dom'

const Customers = () => {
    const [customersList, setCustomersList] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [operation, setoperation] = useState(null)
    const [newCustomer, setNewCustomer] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        emailAddress: '',
        companyName: '',
        industry: '',
        size: '',
        location: "",
        project: '',
        projectcost: ""
    })
    const modalRef = useRef(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer(prevCustomer => ({ ...prevCustomer, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            if (selectedCustomer) {
                // Update customer
                const response = await axiosInstance.put(`/api/customers/${selectedCustomer._id}`, {
                    ...newCustomer
                });

                if (response.ok) {
                    const updatedCustomer = await response.json();
                    const updatedCustomersList = customersList.map(customer => {
                        if (customer._id === updatedCustomer._id) {
                            return updatedCustomer;
                        } else {
                            return customer;
                        }
                    });
                    setCustomersList(updatedCustomersList);
                    setSelectedCustomer(null);
                    if (modalRef.current) {
                        modalRef.current.handleClose();
                    }
                }
            } else {
                // Create customer
                const { fullName,
                    address,
                    phoneNumber,
                    emailAddress,
                    companyName,
                    industry,
                    size,
                    project,
                    projectcost,
                    location } = newCustomer

                const response = await axiosInstance.post('/api/customers', {
                    fullName,
                    address,
                    phoneNumber,
                    emailAddress,
                    companyName,
                    industry,
                    size,
                    project,
                    projectcost,
                    location
                });

                if (response) {
                    const createdCustomer = await response.json();
                    setCustomersList([...customersList, createdCustomer]);
                }
            }
        } catch (error) {
            console.error('Error creating/updating customer:', error);
        }
    }

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchCustomers = async () => {
        try {
            const response = await axiosInstance.get(`/api/customers?page=${page}&limit=${limit}`);
            const data = response.data;

            // Reverse the customerData array
            const reversedCustomerData = data.customerData;

            // Set the reversed customerData in the state
            setCustomersList(reversedCustomerData);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching customers:', error);
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
        fetchCustomers();
    }, [page, limit]);



    const handleDelete = async (customer) => {
        try {
            const response = await axiosInstance.delete(`/api/deletecustomer/${customer.emailAddress}`);

            if (response) {
                const updatedCustomersList = customersList.filter(cust => cust._id !== customer._id);
                setCustomersList(updatedCustomersList);
                setSelectedCustomer(null);
                setSelectedCustomer(null);
                if (modalRef.current) {
                    modalRef.current.handleClose();
                }
            } else {
                console.error('Error deleting customer:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };


    const handleAddUserClick = () => {
        setNewCustomer({
            fullName: '',
            address: '',
            phoneNumber: '',
            emailAddress: '',
            companyName: '',
            industry: '',
            size: '',
            project: '',
            projectcost: "",
            location: ""
        })
        setoperation("Add User")
    }

    const navigate = useNavigate()
    const handlcontactclick = (email, phoneNumber) => {
        navigate('/dialer', { state: { employeeemail: email, employeephoneNumber: phoneNumber } });
    }
    return (
        <div>
            <Navbar /><br />
            <button type="button" class="btn btn-primary mx-auto d-block" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleAddUserClick}>
                ADD CLIENT
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
                                    <input type='text' class="form-input" name='fullName' onChange={handleInputChange} placeholder='Name' value={newCustomer.fullName} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="address">Address</label>
                                    <input type='text' class="form-input" name='address' onChange={handleInputChange} placeholder='Address' value={newCustomer.address} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="phoneNumber">Phone Number</label>
                                    <input type='text' class="form-input" name='phoneNumber' onChange={handleInputChange} placeholder='Phone Number' value={newCustomer.phoneNumber} />
                                    <label class="form-label" for="emailAddress">Email Address</label>
                                    <input type='text' class="form-input" name='emailAddress' onChange={handleInputChange} placeholder='Email Address' value={newCustomer.emailAddress} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="companyName">Company Name</label>
                                    <input type='text' class="form-input" name='companyName' onChange={handleInputChange} placeholder='Company Name' value={newCustomer.companyName} />
                                    <label class="form-label" for="size">Size</label>
                                    <input type='text' class="form-input" name='size' onChange={handleInputChange} placeholder='Size' value={newCustomer.size} />
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="industry">Industry</label>
                                    <input type='text' class="form-input" name='industry' onChange={handleInputChange} placeholder='Industry' value={newCustomer.industry} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="size">Location</label>
                                    <input type='text' class="form-input" name='location' onChange={handleInputChange} placeholder='Location' value={newCustomer.location} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="project">Project</label>
                                    <input type='text' class="form-input" name='project' onChange={handleInputChange} placeholder='Project' value={newCustomer.project} />

                                    <label class="form-label" for="projectcost">Project Cost</label>
                                    <input type='text' class="form-input" name='projectcost' onChange={handleInputChange} placeholder='Project Cost' value={newCustomer.projectcost} />
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
                            <th>Project</th>
                            <th colSpan={3}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersList.map((customer, index) => (
                            <tr key={customer._id}>
                                <td>{(page - 1) * limit + index + 1}</td>
                                <td>{customer.fullName}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phoneNumber}</td>
                                <td>{customer.emailAddress}</td>
                                <td>{customer.companyName}</td>
                                <td>{customer.project}</td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => {
                                            setSelectedCustomer(customer);
                                            setNewCustomer({
                                                fullName: customer.fullName,
                                                address: customer.address,
                                                phoneNumber: customer.phoneNumber,
                                                emailAddress: customer.emailAddress,
                                                companyName: customer.companyName,
                                                industry: customer.industry,
                                                size: customer.size,
                                                location: customer.location,
                                                project: customer.project,
                                                projectcost: customer.projectcost,
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
                                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleDelete(customer)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td><button type="button" class="btn btn-warning" onClick={() => handlcontactclick(customer.emailAddress, customer.phoneNumber)}>Contact</button></td>
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

export default Customers