import React, { useState, useEffect, useRef } from 'react'
import Navbar from "./GlobalComponent/NavbarComponent/navbarcomponent"
import { axiosInstance, setAuthToken } from "../util/baseurl"
import '../Styles/Company.css'

const Company = () => {
    const [CompanyList, setCompanyList] = useState([])
    const [selectedcompany, setSelectedcompany] = useState(null)
    const [operation, setoperation] = useState(null)
    const [message, setmessage] = useState(null)
    const [newcompany, setNewcompany] = useState({
        companyName: '',
        industry: '',
        size: '',
        location: "",
        revenue: ''
    })
    const modalRef = useRef(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewcompany(prevcompany => ({ ...prevcompany, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            if (selectedcompany) {
                // Update company
                const response = await axiosInstance.put(`/api/Company/${selectedcompany._id}`, {
                    ...newcompany
                });

                if (response.ok) {
                    const updatedcompany = await response.json();
                    const updatedCompanyList = CompanyList.map(company => {
                        if (company._id === updatedcompany._id) {
                            return updatedcompany;
                        } else {
                            return company;
                        }
                    });
                    setmessage(response.data.message)
                    setCompanyList(updatedCompanyList);
                    setSelectedcompany(null);
                    if (modalRef.current) {
                        modalRef.current.handleClose();
                    }
                }
            } else {
                // Create company
                const {
                    companyName,
                    industry,
                    size,
                    location,
                    revenue } = newcompany

                const response = await axiosInstance.post('/api/Company', {

                    companyName,
                    industry,
                    size,
                    location,
                    revenue
                });

                if (response) {
                    const createdcompany = await response.json();
                    setCompanyList([...CompanyList, createdcompany]);
                }
                setmessage(response.data.message)
            }
        } catch (error) {
            console.error('Error creating/updating company:', error);
        }
    }

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchCompany = async () => {
        try {
            const response = await axiosInstance.get(`/api/companies?page=${page}&limit=${limit}`);
            const data = response.data;

            // Reverse the companyData array
            const reversedcompanyData = data.companyData;

            // Set the reversed companyData in the state
            setCompanyList(reversedcompanyData);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching Company:', error);
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
        fetchCompany();
    }, [page, limit]);



    const handleDelete = async (company) => {
        try {
            const response = await axiosInstance.delete(`/api/deletecompany/${company.emailAddress}`);

            if (response) {
                const updatedCompanyList = CompanyList.filter(cust => cust._id !== company._id);
                setCompanyList(updatedCompanyList);
                setSelectedcompany(null);
                setSelectedcompany(null);
                if (modalRef.current) {
                    modalRef.current.handleClose();
                }
                setmessage(response.data.message)
            } else {
                console.error('Error deleting company:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };


    const handleAddUserClick = () => {
        setNewcompany({

            companyName: '',
            industry: '',
            size: '',
            location: "",
            revenue: ''
        })
        setoperation("Add User")
    }


    return (
        <div>
            <Navbar /><br />
            <button type="button" class="btn btn-primary mx-auto d-block" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleAddUserClick}>
                ADD USER
            </button>
            {message ? <p>{message}</p> : null}

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
                                    <input type='text' class="form-input" name='fullName' onChange={handleInputChange} placeholder='Name' value={newcompany.fullName} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="address">Address</label>
                                    <input type='text' class="form-input" name='address' onChange={handleInputChange} placeholder='Address' value={newcompany.address} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="phoneNumber">Phone Number</label>
                                    <input type='text' class="form-input" name='phoneNumber' onChange={handleInputChange} placeholder='Phone Number' value={newcompany.phoneNumber} />
                                    <label class="form-label" for="emailAddress">Email Address</label>
                                    <input type='text' class="form-input" name='emailAddress' onChange={handleInputChange} placeholder='Email Address' value={newcompany.emailAddress} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="companyName">Company Name</label>
                                    <input type='text' class="form-input" name='companyName' onChange={handleInputChange} placeholder='Company Name' value={newcompany.companyName} />
                                    <label class="form-label" for="size">Size</label>
                                    <input type='text' class="form-input" name='size' onChange={handleInputChange} placeholder='Size' value={newcompany.size} />
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="industry">Industry</label>
                                    <input type='text' class="form-input" name='industry' onChange={handleInputChange} placeholder='Industry' value={newcompany.industry} />
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="size">Location</label>
                                    <input type='text' class="form-input" name='location' onChange={handleInputChange} placeholder='Location' value={newcompany.location} />
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
                            <th>Company Name</th>
                            <th>Industry</th>
                            <th>Size</th>
                            <th>Location</th>
                            <th>Assigned Project</th>
                            <th>Revenue</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CompanyList.map((company, index) => (
                            <tr key={company._id}>
                                <td>{(page - 1) * limit + index + 1}</td>
                                <td>{company.companyName}</td>
                                <td>{company.industry}</td>
                                <td>{company.size}</td>
                                <td>{company.location}</td>
                                <td>{company.project}</td>
                                <td>{company.projectcost}</td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => {
                                            setSelectedcompany(company);
                                            setNewcompany({
                                                fullName: company.fullName,
                                                address: company.address,
                                                phoneNumber: company.phoneNumber,
                                                emailAddress: company.emailAddress,
                                                companyName: company.companyName,
                                                industry: company.industry,
                                                size: company.size,
                                                location: company.location,
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
                                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleDelete(company)}>Delete</button>
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

export default Company