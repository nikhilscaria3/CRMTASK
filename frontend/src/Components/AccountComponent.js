import React, { useState, useEffect } from "react";
import '../Styles/AccountInfo.css'; // Import your stylesheet
import Navbar from "./GlobalComponent/NavbarComponent/navbarcomponent";
import { axiosInstance, setAuthToken } from "../util/baseurl";

const AccountInfo = () => {

    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Get user data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem("userEmail");
            try {
                const response = await axiosInstance.get("/api/accountinfo", {
                    params: { email }
                });

                const data = response.data;
                console.log(data.userdata);
                setUserData(data.userdata);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                {isLoading ? (
                    <p className="loading">Loading...</p>
                ) : (
                    <div className="user-info">
                        <h1>Email: {userData.email}</h1>
                        {/* Render other user data as needed */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountInfo;
