import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {toast} from "react-toastify";
import axios from 'axios';
import PaymentsForm from "./paymentsForm.jsx";
import {toggleConfirmationDialog, toggleLoader} from "../../../redux/action.js";
import {useDispatch, useSelector} from "react-redux";
import {filter, pick, values} from "underscore";

function AdminPayments() {
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [selectedPayments, setSelectedPayments] = useState(null)
    const [deletedId, setDeletedId] = useState(null);
    const [paymentsAllList, setPaymentsAllList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [paymentsList, setPaymentsList] = useState([
        {
            id: 0o1,
            paymentNo: "PAY/12345",
            studentName: "Kasun Fernando",
            membersCount: 1,
            paymentAmount: 3500,
            paymentDate: "2023-05-15",
            status: "Paid",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o2,
            paymentNo: "PAY/12346",
            studentName: "Nishan Perera",
            membersCount: 2,
            paymentAmount: 7000,
            paymentDate: "2023-04-20",
            status: "Pending",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o3,
            paymentNo: "PAY/12347",
            studentName: "Chamari Silva",
            membersCount: 3,
            paymentAmount: 10500,
            paymentDate: "2023-03-18",
            status: "Decline",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o4,
            paymentNo: "PAY/12348",
            studentName: "Dulani Jayawardena",
            membersCount: 4,
            paymentAmount: 14000,
            paymentDate: "2023-02-22",
            status: "Paid",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o5,
            paymentNo: "PAY/12349",
            studentName: "Mahesh Kumara",
            membersCount: 5,
            paymentAmount: 17500,
            paymentDate: "2023-01-30",
            status: "Pending",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o6,
            paymentNo: "PAY/12350",
            studentName: "Sajith Weerasinghe",
            membersCount: 6,
            paymentAmount: 21000,
            paymentDate: "2022-12-25",
            status: "Decline",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o7,
            paymentNo: "PAY/12351",
            studentName: "Harsha Rathnayake",
            membersCount: 7,
            paymentAmount: 24500,
            paymentDate: "2022-11-20",
            status: "Paid",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o10,
            paymentNo: "PAY/12352",
            studentName: "Ruwan Bandara",
            membersCount: 8,
            paymentAmount: 28000,
            paymentDate: "2022-10-15",
            status: "Pending",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o11,
            paymentNo: "PAY/12353",
            studentName: "Sanduni Jayasinghe",
            membersCount: 9,
            paymentAmount: 31500,
            paymentDate: "2022-09-10",
            status: "Decline",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o12,
            paymentNo: "PAY/12354",
            studentName: "Tharindu Gamage",
            membersCount: 10,
            paymentAmount: 35000,
            paymentDate: "2022-08-05",
            status: "Paid",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o13,
            paymentNo: "PAY/12355",
            studentName: "Nadeeka Rathnayake",
            membersCount: 1,
            paymentAmount: 3500,
            paymentDate: "2022-07-01",
            status: "Pending",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o14,
            paymentNo: "PAY/12356",
            studentName: "Shanika De Silva",
            membersCount: 2,
            paymentAmount: 7000,
            paymentDate: "2022-06-26",
            status: "Decline",
            paymentReceipt: "https://www.jfn.ac.lk/wp-content/uploads/2022/10/bank-slip.png"
        },
        {
            id: 0o15,
            paymentNo: "PAY/12357",
            studentName: "Dinuka Abeywardena",
            membersCount: 3,
            paymentAmount: 10500,
            paymentDate: "2022-05-21",
            status: "Paid",
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

        axios.delete(`http://localhost:3000/admin/payments/${deletedId}`)
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
            let res = filter(paymentsAllList, function (item) {
                return values(pick(item, 'paymentNo', 'studentName', 'paymentAmount', 'paymentDate')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase())
            });
            setPaymentsList(res);
            console.log(res)
        } else {
            setPaymentsList(paymentsAllList);
        }
    }

    // useEffect(() => {
    //     dispatch(toggleLoader(true));
    //     axios.get(`http://localhost:3000/getAllPayments`)
    //         .then((res) => {
    //             setPaymentsList(res.data)
    //             setPaymentsAllList(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //         .finally(() => {
    //             dispatch(toggleLoader(false));
    //         });
    // }, [update]);

    function colorChange(status) {
        switch (status) {
            case "Paid":
                return "booking-state"
            case "Pending":
                return "pending-state"
            case "Decline":
                return "decline-state"
            default:
                return ""
        }
    }

    return (
        <div className={"container mb-4 p-5"}>
            <div className={""}>
                <div className={"listings-container"}>
                    <div><h3 className={"content-heading"}>Payments</h3></div>
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
                            <th scope="col">Payment No</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Members</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {paymentsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (
                            <tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.paymentNo}</td>
                                <td>{data.studentName}</td>
                                <td>{data.membersCount}</td>
                                <td>{data.paymentAmount}</td>
                                <td>{data.paymentDate}</td>
                                <td>
                                    <div
                                        className={"booking-state " + colorChange(data.status)}
                                        onClick={() => {
                                            if (data.status === "PAID") {
                                                return
                                            }
                                            let temp = {...data}
                                            temp.date = data.date?.slice(0, 10)
                                            setSelectedPayments(temp)
                                            setModalShow(true)
                                            setModalType("State");
                                        }
                                        }>{data.status}
                                    </div>
                                </td>
                                <td>
                                    <FeatherIcon className={"admin-action-icons"} icon={"eye"}
                                                 onClick={() => {
                                                     setModalType("View");
                                                     setSelectedPayments(data)
                                                     setModalShow(true)
                                                 }}/>
                                    <FeatherIcon className={"admin-action-icons"} icon={"edit"}
                                                 onClick={() => {
                                                     setSelectedPayments(data)
                                                     setModalType("Edit");
                                                     setModalShow(true)
                                                 }}/>

                                    {/*<FeatherIcon className={"admin-action-icons text-red"} icon={"trash-2"}*/}
                                    {/*             onClick={() => handleDelete(data.id)}*/}
                                    {/*/>*/}
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                    {paymentsList.length === 0 &&
                        <div className={"text-center py-5 fw-bold"}>No Payments Data Found, Please Add</div>
                    }
                </div>
            </div>
            <PaymentsForm
                show={modalShow}
                type={modalType}
                selectedPayments={selectedPayments}
                update={() => setUpdate(!update)}
                onHide={() => {
                    setModalShow(false);
                    setSelectedPayments(null)
                }}
            />
        </div>
    )
}

export default AdminPayments;
