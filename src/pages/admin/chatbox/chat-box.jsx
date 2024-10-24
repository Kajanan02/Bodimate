import React, {useEffect, useState} from 'react';
import DefaultProfilePic from "../../../assets/admin-chatbox/DefaultProfile.jpg";
import FeatherIcon from 'feather-icons-react';
import axiosInstance from "../../../utils/axiosInstance.js";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../../redux/features/loaderSlice.js";
import {MoonLoader} from "react-spinners";
import {toast} from "react-toastify";


const sampleUsers = [
    {
        id: 1,
        profilePic: DefaultProfilePic,
        name: "User One",
        lastMessage: "Hello, how can I improve my grades?",
        time: "10:00 AM",
        unread: false,
    },
    {
        id: 2,
        profilePic: DefaultProfilePic,
        name: "User Two",
        lastMessage: "Can I get extra credit?",
        time: "10:30 AM",
        unread: false,
    },
    {
        id: 3,
        profilePic: DefaultProfilePic,
        name: "User Three",
        lastMessage: "When is the assignment due?",
        time: "11:00 AM",
        unread: true,
    },
    {
        id: 4,
        profilePic: DefaultProfilePic,
        name: "User Four",
        lastMessage: "I need help with the math problem.",
        time: "11:30 AM",
        unread: false,
    },
    {
        id: 5,
        profilePic: DefaultProfilePic,
        name: "User Five",
        lastMessage: "Do we have a quiz tomorrow?",
        time: "12:00 PM",
        unread: true,
    },
    {
        id: 6,
        profilePic: DefaultProfilePic,
        name: "User Six",
        lastMessage: "Can I change my elective?",
        time: "12:30 PM",
        unread: false,
    },
    {
        id: 7,
        profilePic: DefaultProfilePic,
        name: "User Seven",
        lastMessage: "I missed yesterday's lecture. Can I get the notes?",
        time: "1:00 PM",
        unread: true,
    },
    {
        id: 8,
        profilePic: DefaultProfilePic,
        name: "User Eight",
        lastMessage: "Can I borrow a calculator for the test?",
        time: "1:30 PM",
        unread: false,
    },
    {
        id: 9,
        profilePic: DefaultProfilePic,
        name: "User Nine",
        lastMessage: "I won't be able to attend today's class.",
        time: "2:00 PM",
        unread: true,
    },
    {
        id: 10,
        profilePic: DefaultProfilePic,
        name: "User Ten",
        lastMessage: "Is the library open today?",
        time: "2:30 PM",
        unread: false,
    },
];

const sampleMessages = [
    {id: 1, text: "Hello, how can I improve my grades?", sender: "user"},
    {id: 2, text: "Focus on your homework and attend extra classes.", sender: "admin"},
    {id: 3, text: "Thank you!", sender: "user"}
];


function ChatBox() {
    const [selectedUser, setSelectedUser] = useState(sampleUsers[0]);
    const [users, setUsers] = useState(sampleUsers);
    const [userList, setUserList] = useState([])
    const [messages, setMessages] = useState(sampleMessages);
    const [allMessages, setAllMessages] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const role = localStorage.getItem("ROLE")
    const name = localStorage.getItem("NAME")
    const userId = localStorage.getItem("USER_ID")
    const adminId = "6706daa45592c323718263b7"

    const userDetail = useSelector(state => state.userData.userDetails);

    const dispatch = useDispatch()

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        // Mark the selected user as read
        const updatedUsers = users.map(u =>
            u.id === user.id ? {...u, unread: false} : u
        );
        setUsers(updatedUsers);
    };

    const handleSendMessage = () => {
        // if (newMessage.trim() || selectedFile) {
        //     const newMsg = {id: messages.length + 1, text: newMessage, sender: "admin", file: selectedFile};
        //     setMessages([...messages, newMsg]);
        //     setNewMessage("");
        //     setSelectedFile(null);
        // }
        sendChatMessage()
    };

    useEffect(() => {
        if(role !=="admin"){
            return
        }

        if(selectedUser){
            let temp = [...allMessages]
            let userMsg = temp.filter(message => message.senderId === selectedUser._id || message.receiverId === selectedUser._id)
            setMessages(userMsg)
        }

    },[selectedUser])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleCancelFile = () => {
        setSelectedFile(null);
    };

    // const filteredUsers = users.filter((user) =>
    //     user.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    function sendChatMessage() {
        setSendingMessage(true)
        let data = {
            name: userDetail.lastName,
            senderId: role==="admin" ? selectedUser._id: adminId,
            receiverId: role==="admin" ? adminId: userId,
            message: newMessage,
            userType: role
        }
        axiosInstance.post("/chat/messages", data).then(res => {
            console.log(res.data)
            setMessages([...messages, {
                id: messages.length + 1,
                text: newMessage,
                userType: role
            }])
            setIsUpdating(!isUpdating)
        }).catch(err => {
            console.log(err.response.data)
        }).finally(() => {
            setSendingMessage(false)
        })
    }

    useEffect(() => {
        dispatch(setLoading(true))
        axiosInstance.get("/users/getAllUsers")
            .then(res => {
                setSelectedUser(res.data[0])
              setUsers(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
                toast.error(err.response.data.message)
            }).finally(() => {
            dispatch(setLoading(false))
        })
    },[])

    useEffect(() => {
        dispatch(setLoading(true))
        axiosInstance.get("/chat/messages")
            // senderId: role==="admin" ? selectedUser._id: adminId,
            //             receiverId: role==="admin" ? adminId: userId,
            .then(res => {
                setAllMessages(res.data)
                let tmp = [...res.data]
                let data = tmp.filter(message => {
                    if (role === "admin") {
                        return message.senderId === selectedUser._id && message.receiverId === adminId || message.senderId === adminId && message.receiverId === selectedUser._id;
                    } else {
                        return [message.senderId,message.receiverId].includes(userId)
                    }
                });
                console.log("data",data)
                setMessages(data)
            }).catch(err => {
            console.log(err.response.data)
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }, [isUpdating]);


    return (
        <div className="container-fluid admin-chatbox-container d-flex flex-column">
            <div className="row">
                {role === "admin" ? <div className="col-md-4 admin-chatbox-user-list-container flex-grow-1">
                    <div className="chat-search-box py-3">
                        <input
                            type="text"
                            className="form-control"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name"
                        />
                    </div>
                    <ul className="chat-user-list px-3 overflow-y-auto">
                        {users.length === 0 && searchQuery && (
                            <li className="text-muted">No matching results</li>
                        )}
                        {users.map((user) => (
                            <li
                                key={user._id}
                                className={`chat-user-item row ${user.unread ? 'unread-message' : ''}`}
                                onClick={() => handleSelectUser(user)}
                            >
                                <div className="d-flex px-2 py-2">
                                    <div className="col-2 d-flex align-items-center">
                                        <img
                                            src={DefaultProfilePic}
                                            className="rounded-circle chat-user-profile"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="col-10 d-flex flex-column">
                                        <div className="d-flex justify-content-between">
                                            <p className="chat-user-heading m-0 fw-medium">{user?.lastName || "Guest"}</p>
                                            {/*<p className="chat-user-time m-0 fw-medium">{user.time}</p>*/}
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            {/*<div className="chat-user-text fw-medium">*/}
                                            {/*    {user.lastMessage.length > 30 ? `${user.lastMessage.slice(0, 35)}...` : user.lastMessage}*/}
                                            {/*</div>*/}
                                            {/*{user.unread && (*/}
                                            {/*    <div className="d-flex align-items-center justify-content-center">*/}
                                            {/*        <div*/}
                                            {/*            className="message-count-circle text-center text-white p-2">1*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div> : null}
                <div
                    className="col-md-8 admin-chatbox-messages-container d-flex flex-column h-100 pt-2 flex-grow-1 overflow-hidden chat-container">
                    <div>
                        <div
                            className="chat-messages-header d-flex align-items-center justify-content-between position-sticky">
                            <div className="d-flex align-items-center">
                                <img src={selectedUser?.profilePic || DefaultProfilePic} className="rounded-circle chat-profile-pic"
                                     alt="Profile"/>
                                <div
                                    className="chat-messages-header-text fw-semibold ps-3">{role !=="admin" ? "Admin": selectedUser.lastName}</div>
                            </div>
                        </div>
                        <div className="chat-messages-body d-flex flex-column overflow-y-auto flex-grow-1">
                            {messages.map((chatMessage) => (
                                <div key={chatMessage._id}
                                     className={`message ${chatMessage.userType === role ? "admin" : "user"}`}>
                                    {chatMessage.userType !== role && (
                                        <>
                                            <img src={selectedUser.profilePic || DefaultProfilePic} className="body-profile-pic"
                                                 alt="Profile"/>
                                            <div>
                                                <div className="chat-message-box mb-2">{chatMessage.message}</div>
                                            </div>
                                        </>
                                    )}
                                    {chatMessage.userType === role && (
                                        <div className="chat-message-box">
                                            {chatMessage.message}
                                            {chatMessage.file && (
                                                <div className="chat-message-file">
                                                    <img src={URL.createObjectURL(chatMessage.file)} alt="File"
                                                         className="chat-file-preview"/>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {selectedFile && (
                                <div
                                    className="chat-file-preview-popup d-flex align-items-center flex-column position-absolute">
                                    <button className="btn-close" onClick={handleCancelFile}>
                                        <FeatherIcon icon="x"/>
                                    </button>
                                    <div className="chat-file-preview-header text-center fw-bold pe-5 w-100 mb-4">
                                        {selectedFile.name}
                                    </div>
                                    <div
                                        className="chat-file-preview-body d-flex justify-content-center align-items-center overflow-hidden flex-grow-1">
                                        <img src={URL.createObjectURL(selectedFile)} alt="File Preview"
                                             className="chat-file-preview"/>
                                    </div>
                                    <div className="chat-file-preview-footer d-flex justify-content-center w-100">
                                        {sendingMessage ?
                                            <MoonLoader size={2}
                                                        color={"#024950"}
                                                        loading={sendingMessage}/> :
                                            <button className="btn chat-send-btn mt-3" onClick={handleSendMessage}>
                                                <FeatherIcon icon="send"/>
                                            </button>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="chat-messages-footer d-flex align-items-center position-sticky bg-white">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control chat-type-input border-none"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message"
                            />
                            <input
                                type="file"
                                id="fileInput"
                                style={{display: 'none'}}
                                onChange={handleFileChange}
                            />
                            <button className="btn border-none"
                                    onClick={() => document.getElementById('fileInput').click()}>
                                <FeatherIcon icon="paperclip" color="#024950"/>
                            </button>
                        </div>
                        {sendingMessage ?
                            <MoonLoader size={30}
                                        color={"#024950"}
                                        loading={sendingMessage}/> :
                            <div className="input-group-append ps-4">

                                <button className="btn chat-send-btn mt-3" onClick={handleSendMessage}>
                                    <FeatherIcon icon="send"/>
                                </button>

                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
