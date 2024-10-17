import React, {useEffect, useState} from 'react';
import BoardingCard from "../../home/boarding-card/boarding-card.jsx";
import ListingsForm from "../listings/listingsForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../../../utils/axiosInstance.js";
import {setLoading} from "../../../redux/features/loaderSlice.js";

function BoardingOwnerHome(props) {

    const [boardingList, setBoardingList] = useState([]);
    const [isOpened, setIsOpened] = useState(false);
    const [update, setUpdate] = useState(false);
    const [modalType, setModalType] = useState("Add");
    const [selectedListings, setSelectedListings] = useState(null);
    const [isEdit, setIsEdit] = useState({});
    const [isDelete, setIsDelete] = useState(null);

    const userDetail = useSelector(state => state.userData.userDetails);

    const dispatch = useDispatch();


    useEffect(() => {
        if(!userDetail._id){
            return
        }
        dispatch(setLoading(true));

        axiosInstance.get(`/boardings/getAllBoarding`)
            .then((res) => {
                console.log(res.data);
                let data = res.data.filter((data) => data.boardingOwner && data.boardingOwner === userDetail._id);
                setBoardingList(data);

            })
            .catch((err) => {
                console.error("Error fetching boardings:", err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [userDetail,update]);


    return (
        <div className={"p-5"}>
            <div className={"container"}>
                <div className={"text-end"}>
                    <button onClick={() => {setIsOpened(true);
                    setModalType("Add");}}
                            className={"login-btn btn-primary p-2 rounded px-3 mt-3"}>Add Boarding
                    </button>
                </div>
                <div className={"row"}>
                    {boardingList.length > 0 ? boardingList.map((data) =>

                        <div className={"col-md-4"} key={data._id}>
                            <BoardingCard data={data} from={"boardingOwner"} editItem={()=> {
                                setModalType("Edit");
                                setSelectedListings(data);
                                setIsOpened(true);
                            }} deleteItem={()=> setIsDelete(data._id)}/>

                        </div>) : <h1>No Boarding Found</h1>}
                </div>
            </div>
            <ListingsForm
                from={userDetail?.role}
                show={isOpened}
                type={modalType}
                selectedListings={selectedListings}
                update={() => setUpdate(!update)}
                onHide={() => {
                    setIsOpened(false);
                }}
            />
        </div>
    );
}

export default BoardingOwnerHome;
