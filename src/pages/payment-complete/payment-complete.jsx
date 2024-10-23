import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {useLocation} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {setLoading} from "../../redux/features/loaderSlice.js";
import {useDispatch} from "react-redux";

function PaymentComplete(props) {

    const location = useLocation();
    const dispatch = useDispatch()
    const [orderData,setOrderData] = useState()

    const getQueryParams = (search) => {
        const params = new URLSearchParams(search);
        return {
            orderId: params.get('order_id'),
        };
    };

    const { orderId } = getQueryParams(location.search);

    console.log(orderId)


    useEffect(()=>{
        dispatch(setLoading(true));
        axiosInstance.get(`/booking/getOneBoarding/${orderId}`)
            .then((res) => {
                console.log(res)
                setOrderData(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    },[orderId])

    return (
        <div className={"container py-5"}>
            <div className={"shadow-lg py-5 my-5 text-center"}>
                <FeatherIcon icon={"check-circle"} className={"text-success"} size={100}/>
                <h1 className={"my-3 "}>Payment Complete Successfully</h1>
                <div className={"ps-5 ms-5 pt-5 text-start"}>

                    <h5>Student Name : {orderData?.studentId?.lastName}</h5>
                    <h5>Boarding Name : {orderData?.boardingId?.boardingName}</h5>
                    <h5>Boarding Owner Name : {orderData?.ownerId?.lastName}</h5>
                    <h5>Boarding Address : {orderData?.boardingId?.street},{orderData?.boardingId?.city}</h5>
                    <h5>Payment : {orderData?.amount}</h5>
                    <h5>Date : {orderData?.createdAt?.slice(0, 10)}</h5>
                    <h5>Ref.Number : {orderData?._id}</h5>

                </div>
            </div>
        </div>
    );
}

export default PaymentComplete;