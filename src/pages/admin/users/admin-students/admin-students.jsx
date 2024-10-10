import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {toast} from "react-toastify";
import axiosInstance from "../../../../utils/axiosInstance.js";
import StudentsForm from "./studentsForm.jsx";
import {toggleConfirmationDialog} from "../../../../redux/features/confirmationDialogSlice.js";
import {setLoading} from "../../../../redux/features/loaderSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {filter, pick, values} from "underscore";

function AdminStudents() {
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState(null)
    const [deletedId, setDeletedId] = useState(null);
    const [studentsAllList, setStudentsAllList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [studentsList, setStudentsList] = useState([
        {
            id: 0o1,
            studentRegNo: "CBO/ENG/22/001",
            studentFirstName: "Nuwan",
            studentLastName: "Perera",
            studentNicNo: "199812345V",
            studentGender: "Male",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o2,
            studentRegNo: "PDN/MED/21/002",
            studentFirstName: "Kasun",
            studentLastName: "Fernando",
            studentNicNo: "199912345V",
            studentGender: "Male",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o3,
            studentRegNo: "SJP/BUS/20/003",
            studentFirstName: "Chathura",
            studentLastName: "Silva",
            studentNicNo: "200012345V",
            studentGender: "Male",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o4,
            studentRegNo: "KLN/ART/19/004",
            studentFirstName: "Ravindu",
            studentLastName: "Jayasinghe",
            studentNicNo: "199712345V",
            studentGender: "Male",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o5,
            studentRegNo: "MRT/SCI/18/005",
            studentFirstName: "Harsha",
            studentLastName: "Bandara",
            studentNicNo: "199612345V",
            studentGender: "Male",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o6,
            studentRegNo: "UJA/LAW/17/006",
            studentFirstName: "Isuru",
            studentLastName: "Weerasinghe",
            studentNicNo: "199512345V",
            studentGender: "Male",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o7,
            studentRegNo: "OUSL/ENG/16/007",
            studentFirstName: "Tharindu",
            studentLastName: "Gunawardena",
            studentNicNo: "199412345V",
            studentGender: "Male",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o10,
            studentRegNo: "RUH/SCI/15/008",
            studentFirstName: "Amaya",
            studentLastName: "Perera",
            studentNicNo: "199312345V",
            studentGender: "Female",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o11,
            studentRegNo: "EUSL/ART/14/009",
            studentFirstName: "Nadeesha",
            studentLastName: "Fernando",
            studentNicNo: "199212345V",
            studentGender: "Female",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o12,
            studentRegNo: "RUSL/ART/13/010",
            studentFirstName: "Sandun",
            studentLastName: "Silva",
            studentNicNo: "199112345V",
            studentGender: "Male",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o13,
            studentRegNo: "SUSL/BUS/12/011",
            studentFirstName: "Sanjana",
            studentLastName: "Bandara",
            studentNicNo: "199012345V",
            studentGender: "Female",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o14,
            studentRegNo: "SEUSL/SCI/11/012",
            studentFirstName: "Lihini",
            studentLastName: "Jayawardena",
            studentNicNo: "198912345V",
            studentGender: "Female",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o15,
            studentRegNo: "WUSL/BUS/10/013",
            studentFirstName: "Nuwan",
            studentLastName: "Perera",
            studentNicNo: "198812345V",
            studentGender: "Male",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        },
        {
            id: 0o16,
            studentRegNo: "UVPA/MUS/08/014",
            studentFirstName: "Dilanka",
            studentLastName: "Rajapaksha",
            studentNicNo: "198612345V",
            studentGender: "Male",
            nicFront: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU",
            nicBack: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU"
        }
    ]);

    // const confirmationDialog = useSelector(state => {
    //     return state.setting.confirmationDialog
    // });
    const confirmationDialog = useSelector(state => state.setting?.confirmationDialog);

    function handleDelete(id) {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: ('Are you sure you want to delete this listing data'),
            confirmationDescription: ('The delete action will remove the this listing data')
        }));
        setDeletedId(id)
        console.log("ads")
    }


    console.log(confirmationDialog)
    console.log(deletedId)

    useEffect(() => {
        if (!confirmationDialog || !confirmationDialog.onSuccess || !deletedId) {
            console.log("deleted")
            return;
        }
        console.log("deleted")
        dispatch(setLoading(true))

        axiosInstance.delete(`/admin/users-boarding-owner/${deletedId}`)
            .then((res) => {
                setUpdate(!update)
                toast.success(`Successfully Deleted`)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(setLoading(false))
            setDeletedId(null)
        })
    }, [confirmationDialog, deletedId, dispatch])

    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(studentsAllList, function (item) {
                return values(pick(item, 'studentRegNo', 'studentFirstName', 'studentLastName', 'studentNicNo', 'studentGender')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase())
            });
            setStudentsList(res);
            console.log(res)
        } else {
            setStudentsList(studentsAllList);
        }
    }

    // useEffect(() => {
    //     dispatch(setLoading(true));
    //     axiosInstance.get(`/getAllStudents`)
    //         .then((res) => {
    //             setStudentsList(res.data)
    //             setStudentsAllList(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //         .finally(() => {
    //             dispatch(setLoading(false));
    //         });
    // }, [update]);

    return (
        <div className={"container mb-4 p-5"}>
            <div className={""}>
                <div className={"listings-container"}>
                    <div><h3 className={"content-heading"}>Users - Students</h3></div>
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
                        {studentsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (
                            <tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.studentRegNo}</td>
                                <td>{data.studentFirstName}</td>
                                <td>{data.studentLastName}</td>
                                <td>{data.studentNicNo}</td>
                                <td>{data.studentGender}</td>
                                <td>
                                    <FeatherIcon className={"admin-action-icons"} icon={"eye"}
                                                 onClick={() => {
                                                     setModalType("View");
                                                     setSelectedStudents(data)
                                                     setModalShow(true)
                                                 }}/>
                                    <FeatherIcon className={"admin-action-icons"} icon={"edit"}
                                                 onClick={() => {
                                                     setSelectedStudents(data)
                                                     setModalType("Edit");
                                                     setModalShow(true)
                                                 }}/>

                                    <FeatherIcon className={"admin-action-icons text-red"} icon={"trash-2"}
                                                 onClick={() => handleDelete(data.id)}
                                    />
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                    {studentsList.length === 0 &&
                        <div className={"text-center py-5 fw-bold"}>No Boarding Owners Data Found, Please Add</div>
                    }
                </div>
            </div>
            <StudentsForm
                show={modalShow}
                type={modalType}
                selectedStudents={selectedStudents}
                update={() => setUpdate(!update)}
                onHide={() => {
                    setModalShow(false);
                    setSelectedStudents(null)
                }}
            />
        </div>
    )
}

export default AdminStudents;
