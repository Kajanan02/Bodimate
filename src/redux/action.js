export const toggleLoader = (view) => {
    return {
        type: "TOGGLE_LOADER",
        payload: view
    };
};

export const toggleConfirmationDialog = (view) => {
    return {
        type: "CONFIRMATION_DIALOG",
        payload: view
    };
};

