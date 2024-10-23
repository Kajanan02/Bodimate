import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {toast} from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance.js";
import UniversityForm from "./universityForm.jsx";
import {setLoading} from "../../../redux/features/loaderSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {filter, pick, values} from "underscore";
import {toggleConfirmationDialog} from "../../../redux/features/confirmationDialogSlice.js";

function AdminUniversity() {
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [selectedUniversity, setSelectedUniversity] = useState(null)
    const [deletedId, setDeletedId] = useState(null);
    const [universityAllList, setUniversityAllList] = useState([])
    const [universityList, setUniversityList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();


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
    console.log("Current Deleted ID:", deletedId);




    // console.log(confirmationDialog)
    // console.log(deletedId)
    useEffect(() => {
        if (!confirmationDialog || !confirmationDialog.confirmationDialog.onSuccess || !deletedId) {
            console.log("Deletion conditions not met");
            return;
        }

        dispatch(setLoading(true)); // Optional: set loading state if needed

        // Axios delete request
        axiosInstance.delete(`/university/deleteUniversity/${deletedId}`)
            .then((res) => {
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
            let res = filter(universityAllList, function (item) {
                return values(pick(item, 'universityName', 'district')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase())
            });
            setUniversityList(res);
            console.log(res)
        } else {
            setUniversityList(universityAllList);
        }
    }

    useEffect(() => {
        dispatch(setLoading(true));
        axiosInstance.get(`/university/getAllUniversity`)
            .then((res) => {
                setUniversityList(res.data)
                setUniversityAllList(res.data)
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
                    <div><h3 className={"content-heading"}>University</h3></div>
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
                        <button type="button" className={"btn text-white students-dropdown-btn admin-dropdown"}
                                onClick={() => {
                                    setModalType("Add");
                                    setModalShow(true)
                                }}>
                            <FeatherIcon className={"admin-action-icons text-white me-1"} icon={"plus"}/>
                            Add
                        </button>
                    </div>
                </div>
                <div className={"table-container admin-table"}>
                    <table className={"table table-hover table-striped"}>
                        <thead className={"top-0 position-sticky h-45"}>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">University Name</th>
                            {/*<th scope="col">University Logo </th>*/}
                            <th scope="col">District</th>
                            {/*<th scope="col">Move-In</th>*/}
                            {/*<th scope="col">Status</th>*/}
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Array.isArray(universityList) && universityList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (
                                <tr key={data.id || index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.universityName}</td>
                                    {/*<td><img src={data.universityImg}/></td>*/}
                                    <td>{data.district}</td>


                                    <td>
                                        <FeatherIcon className={"admin-action-icons"} icon={"eye"}
                                                     onClick={() => {
                                                         setModalType("View");
                                                         setSelectedUniversity(data);
                                                         setModalShow(true);
                                                     }}
                                        />
                                        <FeatherIcon className={"admin-action-icons"} icon={"edit"}
                                                     onClick={() => {
                                                         setSelectedUniversity(data);
                                                         setModalType("Edit");
                                                         setModalShow(true);
                                                     }}
                                        />
                                        <FeatherIcon className={"admin-action-icons text-red"} icon={"trash-2"}
                                                     onClick={() => handleDelete(data._id)} />
                                    </td>
                                </tr>
                            ))
                        }


                        </tbody>
                    </table>
                    {universityList.length === 0 &&
                        <div className={"text-center py-5 fw-bold"}>No  university Data Found, Please Add</div>
                    }
                </div>
            </div>
            <UniversityForm
                show={modalShow}
                type={modalType}
                selectedUniversity={selectedUniversity}
                update={() => setUpdate(!update)}
                onHide={() => {
                    setModalShow(false);
                    setSelectedUniversity(null)
                }}
            />
        </div>
    )
}

export default AdminUniversity;
