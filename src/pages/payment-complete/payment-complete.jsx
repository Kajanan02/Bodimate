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
            </div>
        </div>
    );
}

export default PaymentComplete;