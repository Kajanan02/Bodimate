import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {toast} from "react-toastify";
import axios from 'axios';
import BoardingOwnerForm from "./boardingOwnerForm.jsx";
import {toggleConfirmationDialog, toggleLoader} from "../../../../redux/action.js";
import {useDispatch, useSelector} from "react-redux";
import {filter, pick, values} from "underscore";

function AdminBoardingOwners() {
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [selectedBoardingOwners, setSelectedBoardingOwners] = useState(null)
    const [deletedId, setDeletedId] = useState(null);
    const [boardingOwnersAllList, setBoardingOwnersAllList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [boardingOwnersList, setBoardingOwnersList] = useState([
        {
            id: '0o1',
            boardingOwnerRegNo: 'BO/KLN/CBO/045',
            boardingOwnerFirstName: 'Kamal',
            boardingOwnerLastName: 'Perera',
            boardingOwnerNicNo: '199012345V',
            boardingOwnerGender: 'Male',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o2',
            boardingOwnerRegNo: 'BO/GAM/PDN/027',
            boardingOwnerFirstName: 'Nuwan',
            boardingOwnerLastName: 'Jayasinghe',
            boardingOwnerNicNo: '198901234V',
            boardingOwnerGender: 'Male',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o3',
            boardingOwnerRegNo: 'BO/KAL/SJP/089',
            boardingOwnerFirstName: 'Sajith',
            boardingOwnerLastName: 'Bandara',
            boardingOwnerNicNo: '198712345V',
            boardingOwnerGender: 'Male',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o4',
            boardingOwnerRegNo: 'BO/GAM/KLN/053',
            boardingOwnerFirstName: 'Chathura',
            boardingOwnerLastName: 'Wickramasinghe',
            boardingOwnerNicNo: '198512345V',
            boardingOwnerGender: 'Female',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o5',
            boardingOwnerRegNo: 'BO/KAL/MRT/012',
            boardingOwnerFirstName: 'Isuru',
            boardingOwnerLastName: 'Weerasinghe',
            boardingOwnerNicNo: '198312345V',
            boardingOwnerGender: 'Female',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o6',
            boardingOwnerRegNo: 'BO/ANU/UJA/076',
            boardingOwnerFirstName: 'Amila',
            boardingOwnerLastName: 'Rathnayake',
            boardingOwnerNicNo: '198112345V',
            boardingOwnerGender: 'Male',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o7',
            boardingOwnerRegNo: 'BO/KAN/OUSL/038',
            boardingOwnerFirstName: 'Nishantha',
            boardingOwnerLastName: 'Abeysekara',
            boardingOwnerNicNo: '197912345V',
            boardingOwnerGender: 'Female',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o8',
            boardingOwnerRegNo: 'BO/MAT/RUH/055',
            boardingOwnerFirstName: 'Tharindu',
            boardingOwnerLastName: 'Perera',
            boardingOwnerNicNo: '197712345V',
            boardingOwnerGender: 'Male',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o9',
            boardingOwnerRegNo: 'BO/BAD/EUSL/033',
            boardingOwnerFirstName: 'Kasun',
            boardingOwnerLastName: 'Samarasinghe',
            boardingOwnerNicNo: '197512345V',
            boardingOwnerGender: 'Female',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o10',
            boardingOwnerRegNo: 'BO/MON/RUSL/065',
            boardingOwnerFirstName: 'Saman',
            boardingOwnerLastName: 'Ekanayake',
            boardingOwnerNicNo: '197312345V',
            boardingOwnerGender: 'Male',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o11',
            boardingOwnerRegNo: 'BO/SAB/SUSL/094',
            boardingOwnerFirstName: 'Dilan',
            boardingOwnerLastName: 'Karunaratne',
            boardingOwnerNicNo: '197112345V',
            boardingOwnerGender: 'Female',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o12',
            boardingOwnerRegNo: 'BO/TRI/SEUSL/021',
            boardingOwnerFirstName: 'Udara',
            boardingOwnerLastName: 'Gunasekara',
            boardingOwnerNicNo: '196912345V',
            boardingOwnerGender: 'Male',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o13',
            boardingOwnerRegNo: 'BO/KUR/WUSL/077',
            boardingOwnerFirstName: 'Ravindu',
            boardingOwnerLastName: 'Madushanka',
            boardingOwnerNicNo: '196712345V',
            boardingOwnerGender: 'Female',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o14',
            boardingOwnerRegNo: 'BO/BAD/UWU/040',
            boardingOwnerFirstName: 'Charith',
            boardingOwnerLastName: 'Fernando',
            boardingOwnerNicNo: '196512345V',
            boardingOwnerGender: 'Male',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
        },
        {
            id: '0o15',
            boardingOwnerRegNo: 'BO/COL/UVPA/083',
            boardingOwnerFirstName: 'Pasindu',
            boardingOwnerLastName: 'Jayawardena',
            boardingOwnerNicNo: '196312345V',
            boardingOwnerGender: 'Female',
            nicFront: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD35-ANjy-2PGvOr1OZOwQR9lF6zfU59qYkWYARxnKiZluFboR4DHshjkU2FnLhktWvs4&usqp=CAU', // Example placeholder for NIC Front image
            nicBack: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLscY3h1M1URtc3CYkyChsQNaJkAOxtpfuEKywmeek2bRyeYUOWNEF4vaCka9mWb7gGs&usqp=CAU'
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
        dispatch(toggleLoader(true))

        axios.delete(`http://localhost:3000/admin/users-boarding-owner/${deletedId}`)
            .then((res) => {
                setUpdate(!update)
                toast.success(`Successfully Deleted`)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
            setDeletedId(null)
        })
    }, [confirmationDialog, deletedId, dispatch])

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

    // useEffect(() => {
    //     dispatch(toggleLoader(true));
    //     axios.get(`http://localhost:3000/getAllBoardingOwners`)
    //         .then((res) => {
    //             setBoardingOwnersList(res.data)
    //             setBoardingOwnersAllList(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //         .finally(() => {
    //             dispatch(toggleLoader(false));
    //         });
    // }, [update]);

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
                                <td>{data.boardingOwnerRegNo}</td>
                                <td>{data.boardingOwnerFirstName}</td>
                                <td>{data.boardingOwnerLastName}</td>
                                <td>{data.boardingOwnerNicNo}</td>
                                <td>{data.boardingOwnerGender}</td>
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
                                                 onClick={() => handleDelete(data.id)}
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
