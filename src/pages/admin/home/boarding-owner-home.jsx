import React, {useState} from 'react';
import BoardingCard from "../../home/boarding-card/boarding-card.jsx";
import ListingsForm from "../listings/listingsForm.jsx";
import {useSelector} from "react-redux";

function BoardingOwnerHome(props) {

    const [boardingList, setBoardingList] = useState([]);
    const [isOpened, setIsOpened] = useState(false);
    const [update, setUpdate] = useState(false);
    const [modalType, setModalType] = useState("Add");
    const [selectedListings, setSelectedListings] = useState(null);
    const userDetail = useSelector(state => state.userData.userDetails);


    return (
        <div className={"p-5"}>
            {boardingList.length > 0 ? boardingList.map((data) => <BoardingCard data={data}/>) :
                <div>
                    <h1>No Boarding Available</h1>
                    <button onClick={()=>setIsOpened(true)} className={"login-btn btn-primary p-2 rounded px-3 mt-3"}>Add Boarding</button>
                </div>

            }
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
