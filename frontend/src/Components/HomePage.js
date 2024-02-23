import React, { useEffect, useState } from "react";
import Navbar from "./GlobalComponent/NavbarComponent/navbarcomponent";
import { axiosInstance } from "../util/baseurl";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import "../Styles/homepage.css"; // Import your stylesheet for Homepage

const Homepage = () => {
    const [count, setCount] = useState({
        countofcustomer: 0,
        countofcomplaint: 0,
    });

    const [revenue, setRevenue] = useState(10000);

    const [revenueData, setRevenueData] = useState({
        options: {
            chart: {
                id: "revenue-chart",
            },
            xaxis: {
                categories: ["2023", "2024"],
            },
        },
        series: [
            {
                name: "Revenue",
                data: [5000, revenue],
            },
        ],
        fill: {
            colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
            type: 'solid',
            opacity: 0.8,
        },
        markers: {
            size: [8, 8, 12, 8, 8], // Larger size for the revenue point
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val;
                },
            },
        },
    });


    const fetchCount = async () => {
        try {
            const response = await axiosInstance.get('/api/count');
            const data = response.data;

            setCount({
                countofcustomer: data.countofcustomer[0].countdata,
                countofcomplaint: data.countofcomplaint[0].countdata,
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCount();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="homepage-container">
                <div className="head-title">
                    <div className="left">
                        <h1>Dashboard</h1>
                    </div>
                    <div>
                        <ul className="box-info">
                            <li>
                                <i className='bx bxs-group'></i>
                                <a href="/customers" className="bg-light">
                                    <span className="text">
                                        <h3>
                                            <CountUp end={count.countofcustomer} duration={2} />
                                        </h3>
                                        <p>Customer</p>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <i class='bx bxs-message-alt-edit'></i>
                                <a href="/ticket" className="bg-light">
                                    <span className="text">
                                        <h3>
                                            <CountUp end={count.countofcomplaint} duration={2} />
                                        </h3>
                                        <p>Complaints</p>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="homepage-container">
                <div className="head-title">
                    <div className="left">
                        <h1>Revenue</h1>
                    </div>
                    <div>
                        <ReactApexChart
                            options={revenueData.options}
                            series={revenueData.series}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
