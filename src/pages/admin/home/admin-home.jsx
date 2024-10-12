import React, {useState} from 'react';
import Chart from 'react-apexcharts';
import FeatherIcon from 'feather-icons-react';
import hotel from "../../../assets/admin-home/hotel.svg";
import income from "../../../assets/admin-home/income.svg";
import boarding from "../../../assets/admin-home/boarding.svg";
import {useSelector} from "react-redux";
import BoardingOwnerHome from "./boarding-owner-home.jsx";

function AdminHome() {
    const [state, setState] = useState({
        options: {
            chart: {
                id: "users-chart",
                background: 'rgba(212,218,211,0.97)',
                foreColor: '#024950',
                toolbar: {
                    show: true,
                },
            },
            title: {
                text: "Total Users",
                align: 'left',
                margin: 30,
                style: {
                    fontSize: '18px',
                    fontFamily: 'Inter',
                    color: '#024950'
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        colors: '#024950',
                        fontFamily: 'Inter'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#024950',
                        fontFamily: 'Inter'
                    }
                }
            },
            legend: {
                labels: {
                    colors: '#024950',
                    useSeriesColors: false,
                    fontFamily: 'Inter'
                }
            },
            colors: ['#504002', '#2200ff'],
            theme: {
                mode: 'dark'
            }
        },
        series: [
            {
                name: "Boarding Owners",
                data: [3000, 4000, 4500, 5000, 4900, 6000, 7000, 9100, 12500, 14000, 16000, 18000]
            },
            {
                name: "Students",
                data: [2000, 3000, 3500, 4000, 4500, 5500, 6500, 7500, 8500, 9500, 10000, 11000]
            }
        ]
    });

    const userDetail = useSelector(state => state.userData.userDetails);


    const pieChartOptions = {
        labels: ['UOM', 'UOJ', 'UOR', 'UWU'],
        colors: ['#cc33ff', '#ffd633', '#3357FF', '#179809'],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            fontFamily: 'Inter',
            markers: {
                width: 10,
                height: 10,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '50%',
                }
            }
        },
        background: {
            enabled: true,
            foreColor: '#024950',
            padding: 0,
            borderRadius: 10,
            opacity: 0.9,
            offsetX: 0,
            offsetY: 0,
            borderWidth: 0,
            borderColor: '#024950',
            dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5
            },
            color: 'rgba(89,86,86,0.25)'
        },
    };

    const pieChartData = [30, 20, 25, 25];

    const topUniversities = [
        {name: 'UOM', percentage: 30, color: '#cc33ff'},
        {name: 'UOJ', percentage: 20, color: '#ffd633'},
        {name: 'UOR', percentage: 25, color: '#3357FF'},
        {name: 'UWU', percentage: 25, color: '#179809'}
    ];

    const barChartOptions = {
        chart: {
            type: 'bar',
            background: 'rgba(212,218,211,0.97)',
            foreColor: '#024950',
            toolbar: {
                show: true,
            },
        },
        title: {
            text: "Monthly Income",
            margin: 30,
            align: 'left',
            style: {
                fontSize: '18px',
                fontFamily: 'Inter',
                color: '#024950'
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: {
                    colors: '#024950',
                    fontFamily: 'Inter'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#024950',
                    fontFamily: 'Inter'
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1
        },
        colors: ['#024950']
    };

    const barChartData = [
        {
            name: 'Income',
            data: [45000, 48000, 47000, 50000, 52000, 53000, 54000, 55000, 57000, 60000, 61000, 62000]
        }
    ];

    return ( userDetail.role === "admin" ?
        <div className="container mt-4 mb-4">
            <div className="row p-4">
                <div className="col-sm-3 mb-3 mb-sm-0">
                    <div className="card admin-home-card mb-4">
                        <div className="card-body">
                            <div>
                                <h5 className="card-title admin-home-card-title mb-3 text-white">Monthly Income</h5>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-8 d-flex align-items-center fw-semibold text-white">
                                    <p className="admin-home-card-text mb-0">Rs. 60000</p>
                                </div>
                                <div className="col-4 d-flex justify-content-end admin-home-icon">
                                    <img src={income} alt="income"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 mb-3 mb-sm-0">
                    <div className="card admin-home-card mb-4">
                        <div className="card-body">
                            <div>
                                <h5 className="card-title admin-home-card-title mb-3 text-white">Monthly Bookings</h5>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-8 fw-semibold text-white">
                                    <p className="admin-home-card-text mb-0">25</p>
                                </div>
                                <div className="col-4 d-flex justify-content-end admin-home-icon">
                                    <img src={hotel} alt={"hotel"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 mb-3 mb-sm-0">
                    <div className="card admin-home-card mb-4">
                        <div className="card-body">
                            <div>
                                <h5 className="card-title admin-home-card-title mb-3 text-white">Total Boardings</h5>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-8 fw-semibold text-white">
                                    <p className="admin-home-card-text mb-0">550</p>
                                </div>
                                <div className="col-4 d-flex justify-content-end admin-home-icon">
                                    <img src={boarding} alt={"boarding"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 mb-3 mb-sm-0">
                    <div className="card admin-home-card mb-4">
                        <div className="card-body">
                            <div className="row d-flex align-items-start">
                                <div className="col-8">
                                    <h5 className="card-title admin-home-card-title mb-3 text-white">Monthly Users</h5>
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    <FeatherIcon className="admin-home-sub-icon" icon="users"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8 fw-semibold text-white">
                                    <p className="admin-home-card-sub-text">Boarding Owners</p>
                                </div>
                                <div className="col-4 fw-semibold text-white text-end">
                                    <p className="admin-home-card-sub-text">25</p>
                                </div>
                                <div className="col-8 fw-semibold text-white">
                                    <p className="admin-home-card-sub-text">Students</p>
                                </div>
                                <div className="col-4 fw-semibold text-white text-end">
                                    <p className="admin-home-card-sub-text">82</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row px-4 mb-4">
                <div className="col-sm-8 mb-sm-0 admin-home-area p-4">
                    <div className="admin-home-chart-one">
                        <Chart
                            options={state.options}
                            series={state.series}
                            type="area"
                            height="auto"
                            width="100%"
                        />
                    </div>
                </div>
                <div className="col-sm-4 mb-sm-0 admin-home-pie p-4">
                    <div className="admin-home-chart-two chart-container p-3">
                        <p className="admin-pie-heading fw-bold mb-0 text-center pb-3">Explore Nearby Universities</p>
                        <Chart
                            options={pieChartOptions}
                            series={pieChartData}
                            type="donut"
                            width="100%"
                        />
                        <div className="top-universities mt-3">
                            {topUniversities.map((uni, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="color-circle" style={{backgroundColor: uni.color}}></div>
                                        <p className="pie-sub-text text-left ms-2">{uni.name}</p>
                                    </div>
                                    <p className="pie-sub-text text-end"
                                       style={{fontFamily: 'Inter'}}>{uni.percentage}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row px-4 mb-4">
                <div className="col-sm-12 mb-sm-0 admin-home-bar px-4">
                    <div className="admin-home-chart-three chart-container pt-3">
                        <Chart
                            options={barChartOptions}
                            series={barChartData}
                            type="bar"
                            width="100%"
                        />
                    </div>
                </div>
            </div>

        </div> : <BoardingOwnerHome/>
    );
}

export default AdminHome;
