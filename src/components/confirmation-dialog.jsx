import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FeatherIcon from "feather-icons-react";
import {toggleConfirmationDialog} from "../redux/features/confirmationDialogSlice.js";


const ConfirmationDialog = () => {
    const dispatch = useDispatch();

    const confirmationDialog = useSelector(state => state.confirmationDialog.confirmationDialog);



    function hideDialog() {
        dispatch(toggleConfirmationDialog({isVisible: false}));
    }


    function confirmationSuccess() {
        dispatch(toggleConfirmationDialog({isVisible: false, onSuccess: true}));
    }

    return (
        confirmationDialog &&
        <div className={"sa-popup-bg " + (!confirmationDialog.isVisible && 'hide')}>
            <div className="sa-popup">
                <div className={'sa-modal-box-style'}  noValidate>
                    <div className="sa-popup-header">
                        <span
                            className={'sa-model-heading'}>{confirmationDialog?.confirmationMainHeading || "CONFIRMATION"}</span>
                        <div className="sa-popup-close-icon" onClick={hideDialog}><FeatherIcon
                            className={"sa-modal-close-icon"}
                            icon={"x"}/>
                        </div>
                    </div>
                    <div className="sa-modal-content p-l-16 pr-4">
                        <div
                            className={"warning-heading text-red"}>{confirmationDialog.confirmationHeading || "Are you sure you want to delete this?"}</div>
                        <div
                            className={"warning-text"}>{confirmationDialog.confirmationDescription || "The delete action can't be undone and the content will be permanently gone."}
                        </div>
                    </div>

                        <div>

                            <div className="m-3 text-end">
                                <button className="sa-popup-secondary-btn-style sa-popup-cancel-btn-style"
                                        type={"button"}
                                        onClick={hideDialog}>{"Cancel"}</button>
                                <button onClick={confirmationSuccess}
                                    className={confirmationDialog.successButtonClass ? "btn w-120p " + confirmationDialog.successButtonClass : "sa-popup-secondary-btn-style btn-sa-danger w-120p"}
                                >{confirmationDialog.successButtonText || "DELETE"}</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>


    );

};

export default ConfirmationDialog
