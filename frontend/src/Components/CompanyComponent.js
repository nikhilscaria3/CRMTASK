import React, { useState, useEffect, useRef } from 'react'
import Navbar from "./GlobalComponent/NavbarComponent/navbarcomponent"
import { axiosInstance, setAuthToken } from "../util/baseurl"
import '../Styles/Company.css'

const Company = () => {
    const [CompanyList, setCompanyList] = useState([])
    const [selectedcompany, setSelectedcompany] = useState(null)
    const [operation, setoperation] = useState(null)
    const [message, setmessage] = useState(null)

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


   

    return (
        <div>
            <Navbar /><br />
            {message ? <p>{message}</p> : null}
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