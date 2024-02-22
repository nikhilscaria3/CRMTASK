import React, { useState, useEffect } from "react"
import '../Styles/AccountInfo.css'
import Navbar from "./GlobalComponent/NavbarComponent/navbarcomponent"
import { axiosInstance, setAuthToken } from "../util/baseurl";

const AccountInfo = () => {
    const [accountType, setAccountType] = useState("")
    const [data, setData] = useState(null);


    const handleAccountType = (e) => {
        setAccountType(e.target.value)
    }



    useEffect(() => {
        setAuthToken();
    }, []);

    useEffect(() => {
        setAuthToken();
    
        const fetchData = async () => {
            const email = localStorage.getItem("userEmail");
            try {
                const response = await axiosInstance.get("/api/accountinfo", {
                    params: { email }  // Use the params property to pass the email parameter
                });
    
                const data = response.data;
                console.log(data.userdata);
                setData(data.userdata);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, []);
    

    const renderForm = () => {
        switch (accountType) {
            case "employer":
                return <EmployerForm />;
            case "employee":
                return <EmployeeForm />;
            default:
                return null;
        }
    }


    return (
        <div>
            <Navbar />
            <div className="switchcontainer">
                <button value="employer" onClick={handleAccountType}>
                    I am Employer
                </button>
                <button value="employee" onClick={handleAccountType}>
                    I am Employee
                </button>
            </div>
            {renderForm()}
            {data && (
                <div className="saved-data-container">
                    <h2>Saved Data:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                    <p>{data.name}</p>
                </div>
            )}
        </div>
    )
};

const EmployerForm = () => {
    const [message, setmessage] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        place: "",
        description: "",
        company: "",
        logo: null,
        about: "",
        contact: "",
        website: "",
        industry: "",
        size: "",
        location: "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            logo: e.target.files[0],
        });
    };

    const email = localStorage.getItem("userEmail")
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, place, description, company, logo, about, contact, website, industry, size, location } = formData
        try {
            const response = await axiosInstance.post('/api/accountinfo', {
                email, name, place, description, company, logo, about, contact, website, industry, size, location
            })

            const data = response.data
            setmessage(data.message)
        } catch (error) {

        }
    }

    useEffect((req, res) => {
        if (message) {
            setTimeout(() => {
                setmessage(null)
            }, 3000);
        }
    })


    return (
        <div className="employercontainer">
            <p>{email}</p>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label for="name" className="employer-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="employer-name-input"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <label for="place" className="employer-label">
                        Place:
                    </label>
                    <input
                        type="text"
                        id="place"
                        name="place"
                        className="employer-place-input"
                        value={formData.place}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="row">
                    <label for="description" className="employer-label">
                        Description:
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="employer-description-input"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="row">
                    <label for="company" className="employer-label">
                        Company Name:
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        className="employer-company-input"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="row">
                    <label for="logo" className="employer-label">
                        Logo:
                    </label>
                    <input
                        type="file"
                        id="logo"
                        name="logo"
                        className="employer-logo-input"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="row">
                    <label for="about" className="employer-label">
                        About Us:
                    </label>
                    <textarea
                        id="about"
                        name="about"
                        rows="4"
                        cols="50"
                        className="employer-about-input"
                        value={formData.about}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="row">
                    <label for="contact" className="employer-label">
                        Contact Information:
                    </label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        className="employer-contact-input"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="row">
                    <label for="website" className="employer-label">
                        Website:
                    </label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        className="employer-website-input"
                        value={formData.website}
                        onChange={handleInputChange}
                        required
                    />
                    <label for="industry" className="employer-label">
                        Industry:
                    </label>
                    <input
                        type="text"
                        id="industry"
                        name="industry"
                        className="employer-industry-input"
                        value={formData.industry}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="row">
                    <label for="size" className="employer-label">
                        Size:
                    </label>
                    <input
                        type="text"
                        id="size"
                        name="size"
                        className="employer-size-input"
                        value={formData.size}
                        onChange={handleInputChange}
                        required
                    />
                    <label for="location" className="employer-label">
                        Location:
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="employer-location-input"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <p>{message}</p>
                <button type="submit" className="btn btn-primary submit-button">Submit</button>
            </form>
        </div>
    );
};

const EmployeeForm = () => {
    return (
        <form>
            <label for="name" className="employee-name-label">Name:</label><br />
            <input type="text" id="name" name="name" className="employee-name-input" required ></input>
            <label for="place" className="employee-place-label">Place:</label><br />
            <input type="text" id="place" name="place" className="employee-place-input" required ></input>
            <label for="description" className="employee-description-label">Description:</label><br />
            <input type="text" id="description" name="description" className="employee-description-input" required ></input>
            <label for="company" className="employee-company-label">Company:</label><br />
            <input type="text" id="company" name="company" className="employee-company-input" required ></input>

        </form>
    )

}

export default AccountInfo