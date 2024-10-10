export function loadCredential(credential) {
    localStorage.setItem('ACCESS_TOKEN', credential.token);
    localStorage.setItem('EMAIL', credential.email);
    localStorage.setItem('FIRST_NAME', credential.firstName);
    localStorage.setItem('LAST_NAME', credential.lastName);
    localStorage.setItem('IS_VERIFIED', credential.isVerified);
    localStorage.setItem('IS_EMAIL_VERIFIED', credential.isEmailVerified);
    localStorage.setItem('ROLE', credential.role);
    localStorage.setItem('ADDRESS', credential.address);
    localStorage.setItem('PROFILE_PIC', credential.profilePic);
    localStorage.setItem('USER_ID', credential._id);
    localStorage.setItem('NAME', credential.username);
}

export function signOut() {
    localStorage.clear();
    console.log("Sign out")
}

export function getAccessToken() {
    return localStorage.getItem('ACCESS_TOKEN');
}

export function getUserId() {
    return localStorage.getItem('USER_ID');
}


export function getName() {
    return localStorage.getItem('NAME');
}

