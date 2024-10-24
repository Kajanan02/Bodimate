import React, {useEffect, useState} from 'react';
import BoardingCard from "../../home/boarding-card/boarding-card.jsx";
import ListingsForm from "../listings/listingsForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../../../utils/axiosInstance.js";
import {setLoading} from "../../../redux/features/loaderSlice.js";
import {toast} from "react-toastify";
import {toggleConfirmationDialog} from "../../../redux/features/confirmationDialogSlice.js";
import {pluck} from "underscore";

function Favourite(props) {

    const [boardingList, setBoardingList] = useState([]);
    const [isOpened, setIsOpened] = useState(false);
    const [update, setUpdate] = useState(false);
   const [favouriteList, setFavouriteList] = useState([]);


    const userDetail = useSelector(state => state.userData.userDetails);

    const dispatch = useDispatch();




    useEffect(() => {
        axiosInstance.get("/favourite/getAllFavourite")
            .then((res) => {
                console.log(res.data);
                setFavouriteList(res.data);
            })
            .catch((err) => {
                console.error("Error fetching boardings:", err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [update]);



    useEffect(() => {
        dispatch(setLoading(true));

        axiosInstance.get(`/boardings/getAllBoarding`)
            .then((res) => {
                console.log(res.data);
                let data = res.data.filter((data) => data.boardingOwner && data.boardingOwner === userDetail._id);
                setBoardingList(res.data);

            })
            .catch((err) => {
                console.error("Error fetching boardings:", err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [update]);










    return (
        <div className={"p-5"}>
            <div className={"container"}>
                <div className={"text-end"}>

                </div>
                <div className={"row"}>
                    {boardingList.length > 0 ? boardingList.map((data) =>{

                        if(pluck(favouriteList,"boardingId").includes(data._id)) {
                            return <div className={"col-md-4"} key={data._id}>
                                <BoardingCard data={data} from={"kotta"} update={() => setUpdate(!update)}
                                              favourite={favouriteList}/>

                            </div>
                        }

                    }) : <h1>No Boarding Found</h1>}
                </div>
            </div>

        </div>
    );
}

export default Favourite;
