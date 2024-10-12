import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {toast} from "react-toastify";
import axiosInstance from "../../../../utils/axiosInstance.js";
import BoardingOwnerForm from "./boardingOwnerForm.jsx";
import {setLoading} from "../../../../redux/features/loaderSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {filter, pick, values} from "underscore";
import {toggleConfirmationDialog} from "../../../../redux/features/confirmationDialogSlice.js";

function AdminBoardingOwners() {
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [selectedBoardingOwners, setSelectedBoardingOwners] = useState(null)
    const [deletedId, setDeletedId] = useState(null);
    const [boardingOwnersAllList, setBoardingOwnersAllList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [boardingOwnersList, setBoardingOwnersList] = useState([]);

    const confirmationDialog = useSelector(state => state.confirmationDialog);

    function handleDelete(id) {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: 'ARE YOU SURE YOU WANT TO DELETE THIS STUDENT DATA',
            confirmationDescription: 'THE DELETE ACTION WILL REMOVE THIS STUDENT DATA',
            onSuccess: false // Ensure this is added to track success
        }));
        setDeletedId(id);
        console.log("Delete initiated for ID:", id);
    }

    // Debugging: log the current state of confirmation dialog and deletedId
    console.log("Current Deleted ID:", deletedId);


    useEffect(() => {
        console.log("Checking conditions:", confirmationDialog, deletedId);
        if (!confirmationDialog || !confirmationDialog.confirmationDialog.onSuccess || !deletedId) {
            console.log("Deletion conditions not met");
            return;
        }

        dispatch(setLoading(true)); // Optional: set loading state if needed

        // Axios delete request
        axiosInstance.delete(`/users/deleteUser/${deletedId}`)
            .then((res) => {
                console.log(res.data)
                setUpdate(!update); // Trigger re-render of updated listings
                toast.success('Successfully Deleted'); // Optional: Toast notification
            })
            .catch((err) => {
                console.log("Delete error:", err);
            })
            .finally(() => {
                dispatch(setLoading(false)); // Optional: remove loading state
                setDeletedId(null); // Reset after deletion
            });
    }, [confirmationDialog, deletedId]);

    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(boardingOwnersAllList, function (item) {
                return values(pick(item, 'boardingOwnerRegNo', 'boardingOwnerFirstName', 'boardingOwnerLastName', 'boardingOwnerNicNo', 'boardingOwnerGender')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase())
            });
            setBoardingOwnersList(res);
            console.log(res)
        } else {
            setBoardingOwnersList(boardingOwnersAllList);
        }
    }

    useEffect(() => {
        dispatch(setLoading(true));
        axiosInstance.get(`/users/getBoardingOwners`)
            .then((res) => {
                console.log(res.data)
                setBoardingOwnersList(res.data)
                setBoardingOwnersAllList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [update]);

    return (
        <div className={"container mb-4 p-5"}>
            <div className={""}>
                <div className={"listings-container"}>
                    <div><h3 className={"content-heading"}>Users - Boarding Owners</h3></div>
                    <div className={"table-btn-container d-flex justify-content-end pb-3"}>
                        <div className={"appointment-search"}>
                            <div className="">
                                <form className="d-flex" role="search">
                                    <input className="form-control"
                                           onChange={handleSearch}
                                           type="search"
                                           placeholder="Search"
                                           aria-label="Search"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"table-container admin-table"}>
                    <table className={"table table-hover table-striped"}>
                        <thead className={"top-0 position-sticky h-45"}>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Reg. No</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">NIC No</th>
                            <th scope="col">Gender</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {boardingOwnersList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (
                            <tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>
                                <td>{data._id}</td>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.role}</td>
                                <td>{data.gender}</td>
                                <td>
                                    <FeatherIcon className={"admin-action-icons"} icon={"eye"}
                                                 onClick={() => {
                                                     setModalType("View");
                                                     setSelectedBoardingOwners(data)
                                                     setModalShow(true)
                                                 }}/>
                                    <FeatherIcon className={"admin-action-icons"} icon={"edit"}
                                                 onClick={() => {
                                                     setSelectedBoardingOwners(data)
                                                     setModalType("Edit");
                                                     setModalShow(true)
                                                 }}/>

                                    <FeatherIcon className={"admin-action-icons text-red"} icon={"trash-2"}
                                                 onClick={() => handleDelete(data._id)}
                                    />
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                    {boardingOwnersList.length === 0 &&
                        <div className={"text-center py-5 fw-bold"}>No Boarding Owners Data Found, Please Add</div>
                    }
                </div>
            </div>
            <BoardingOwnerForm
                show={modalShow}
                type={modalType}
                selectedBoardingOwners={selectedBoardingOwners}
                update={() => setUpdate(!update)}
                onHide={() => {
                    setModalShow(false);
                    setSelectedBoardingOwners(null)
                }}
            />
        </div>
    )
}

export default AdminBoardingOwners;
