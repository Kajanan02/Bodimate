export function validateLogin(values) {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email) {
        errors.email = "Email is Required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid Email Format";
    } else {
        const rejectedEmails = ["example@rejected.com", "another@rejected.com"];
        if (rejectedEmails.includes(values.email)) {
            errors.email = "This Email address is Not Allowed";
        }
    }
    if (!values.password) {
        errors.password = "Password is Required"
    }
    return errors;
}

export function validateRegister(values) {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email) {
        errors.email = "Email is Required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid Email Format";
    } else {
        const rejectedEmails = ["example@rejected.com", "another@rejected.com"];
        if (rejectedEmails.includes(values.email)) {
            errors.email = "This Email address is Not Allowed";
        }
    }
    if (!values.contactNo) {
        errors.contactNo = "Contact Number is Required";
    } else if (!/^([+]\d{2})?\d{10}$/.test(values.contactNo)) {
        errors.contactNo = "Contact Number is Not Valid";
    }
    if (!values.firstName) {
        errors.firstName = "First Name is Required";
    }
    if (!values.lastName) {
        errors.lastName = "Last Name is Required";
    }
    if (!values.address) {
        errors.address = "Address is Required";
    }
    if (!values.password) {
        errors.password = "Password is Required"
    }
    return errors;
}

export function validateForgotPassword(values) {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email) {
        errors.email = "Email is Required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid Email Format";
    } else {
        const rejectedEmails = ["example@rejected.com", "another@rejected.com"];
        if (rejectedEmails.includes(values.email)) {
            errors.email = "This Email address is Not Allowed";
        }
    }

    return errors;
}

export function validateAddBoarding(values) {
    let errors = {};

    if (!values.boardingName) {
        errors.boardingName = "Boarding Name is Required";
    }
    if (!values.boardingNo) {
        errors.boardingNo = "Boarding No is Required";
    }
    if (!values.street) {
        errors.street = "Street is Required";
    }
    if (!values.city) {
        errors.city = "City is Required";
    }
    if (!values.district) {
        errors.district = "District is Required";
    }
    if (!values.province) {
        errors.province = "Province is Required";
    }
    if (!values.noOfRooms) {
        errors.noOfRooms = "Room Count is Required";
    }
    if (!values.pricePerMonth) {
        errors.pricePerMonth = "Price Per Month is Required";
    } else if (!/^\d{0,8}(\.\d{1,4})?$/.test(values.pricePerMonth)) {
        errors.pricePerMonth = 'Price per Month is not valid';
    }
    if (!values.distance) {
        errors.distance = "Distance is Required";
    } else if (!/^\d{0,8}(\.\d{1,4})?$/.test(values.distance)) {
        errors.distance = 'Distance is not valid';
    }
    if (!values.nearestUniversity) {
        errors.nearestUniversity = "Nearest University is Required";
    }
    if (!values.advancedPayment) {
        errors.advancedPayment = "Advanced Payment is Required";
    } else if (!/^\d{0,8}(\.\d{1,4})?$/.test(values.advancedPayment)) {
        errors.advancedPayment = 'Advanced Payment is not valid';
    }
    if (!values.membersCount) {
        errors.membersCount = "Members is Required";
    }
    if (!values.boardingType) {
        errors.boardingType = "Boarding Type is Required";
    }
    if (!values.stayPreference) {
        errors.stayPreference = "Stay Preference is Required";
    }
    if (!values.facilities) {
        errors.facilities = "Facilities is Required";
    }
    if (!values.boardingImage) {
        errors.boardingImage = "Boarding Image is Required";
    }
    return errors;
}

export function validatePersonalSettings(values) {
    let errors = {};

    if (!values.firstName) {
        errors.firstName = "First Name is Required";
    }
    if (!values.lastName) {
        errors.lastName = "Last Name is Required";
    }
    if (!values.userName) {
        errors.userName = "User Name is Required";
    }
    if (!values.email) {
        errors.email = "Email is Required";
    } else if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is not valid';
    }
    if (!values.nicNo) {
        errors.nicNo = "NIC No is Required";
    }
    if (!values.phoneNo) {
        errors.phoneNo = 'Contact No is required';
    } else if (!/^([+]\d{2})?\d{10}$/.test(values.phoneNo)) {
        errors.phoneNo = 'Contact No is not valid';
    }
    if (!values.dob) {
        errors.dob = "Date of Birth is Required";
    }
    if (!values.homeNo) {
        errors.homeNo = "Home No is Required";
    }
    if (!values.street) {
        errors.street = "Street is Required";
    }
    if (!values.city) {
        errors.city = "City is Required";
    }
    if (!values.district) {
        errors.district = "District is Required";
    }
    if (!values.province) {
        errors.province = "Province is Required";
    }
    if (!values.postalCode) {
        errors.postalCode = "Postal Code is Required";
    }
    // if (!values.nicFront) {
    //     errors.nicFront = "NIC Front Image is Required";
    // }
    // if (!values.nicBack) {
    //     errors.nicBack = "NIC Back Image is Required";
    // }

    return errors;
}

export function validatePasswordSettings(values) {
    let errors = {}
    if (!values.currentPassword) {
        errors.currentPassword = "Current Password is Required";
    }
    if (!values.newPassword) {
        errors.newPassword = "New Password is Required";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is Required";
    }
    return errors;
}

export function validateListings(values) {
    console.log(values)
    let errors = {};

    if (!values.boardingName) {
        errors.boardingName = "Boarding Name is Required"
    }
    if (!values.ownerName) {
        errors.ownerName = "Boarding Owner Name is Required"
    }
    if (!values.ownerNIC) {
        errors.ownerNIC = "Boarding Owner NIC No is Required"
    }
    if (!values.street) {
        errors.street = "Street Address is Required"
    }
    if (!values.city) {
        errors.city = "City is Required"
    }
    if (!values.district) {
        errors.district = "District is Required"
    }
    if (!values.province) {
        errors.province = "Province is Required"
    }
    if (!values.nearestUniversity) {
        errors.nearestUniversity = "Near By University is Required"
    }
    if (!values.boardingType) {
        errors.boardingType = "Boarding Type is Required"
    }
    if (!values.stayPreference) {
        errors.stayPreference = "Stay Preference is Required"
    }
    if (!values.facilities) {
        errors.facilities = "Facilities is Required"
    }
    if (!values.membersCount) {
        errors.membersCount = "Members Count is Required"
    }
    if (!values.noOfRooms) {
        errors.noOfRooms = "No of Rooms is Required"
    }
    if (!values.distance) {
        errors.distance = "Distance is Required"
    }
    if (!values.advancedPayment) {
        errors.advancedPayment = "Advance Payment is Required"
    }
    if (!values.pricePerMonth) {
        errors.pricePerMonth = "Price Per Month is Required"
    }
    return errors;
}

export function validateListingsBoardingOwner(values) {
    console.log(values)
    let errors = {};

    if (!values.boardingName) {
        errors.boardingName = "Boarding Name is Required"
    }
    if (!values.street) {
        errors.street = "Street Address is Required"
    }
    if (!values.city) {
        errors.city = "City is Required"
    }
    if (!values.district) {
        errors.district = "District is Required"
    }
    if (!values.province) {
        errors.province = "Province is Required"
    }
    if (!values.nearestUniversity) {
        errors.nearestUniversity = "Near By University is Required"
    }
    if (!values.boardingType) {
        errors.boardingType = "Boarding Type is Required"
    }
    if (!values.stayPreference) {
        errors.stayPreference = "Stay Preference is Required"
    }
    if (!values.facilities) {
        errors.facilities = "Facilities is Required"
    }
    if (!values.membersCount) {
        errors.membersCount = "Members Count is Required"
    }
    if (!values.noOfRooms) {
        errors.noOfRooms = "No of Rooms is Required"
    }
    if (!values.distance) {
        errors.distance = "Distance is Required"
    }
    if (!values.advancedPayment) {
        errors.advancedPayment = "Advance Payment is Required"
    }
    if (!values.pricePerMonth) {
        errors.pricePerMonth = "Price Per Month is Required"
    }
    return errors;
}

export function validateContactUs(values){
    let errors = {}

    if (!values.name) {
        errors.name = "Name is Required";
    }
    if (!values.email) {
        errors.email = "Email is Required";
    } else if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is not valid';
    }
    if (!values.phoneNo) {
        errors.phoneNo = 'Contact No is required';
    } else if (!/^([+]\d{2})?\d{10}$/.test(values.phoneNo)) {
        errors.phoneNo = 'Contact No is not valid';
    }
    if (!values.messageTopic) {
        errors.messageTopic = "Message Topic is Required";
    }
    if (!values.message) {
        errors.message = "Message is Required";
    }
    return errors;
}

export function validateBookings(values) {
    console.log(values)
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.studentRegNo) {
        errors.studentRegNo = "Student Registration No is Required"
    }
    if (!values.studentName) {
        errors.studentName = "Student Name is Required"
    }
    if (!values.studentAddress) {
        errors.studentAddress = "Student Address is Required"
    }
    if (!values.studentGender) {
        errors.studentGender = "Student Gender is Required"
    }
    if (!values.studentEmail) {
        errors.studentEmail = "Student Email is Required";
    } else if (!emailRegex.test(values.studentEmail)) {
        errors.studentEmail = "Invalid Email Format";
    } else {
        const rejectedEmails = ["example@rejected.com", "another@rejected.com"];
        if (rejectedEmails.includes(values.studentEmail)) {
            errors.studentEmail = "This Email address is Not Allowed";
        }
    }
    if (!values.studentContactNo) {
        errors.studentContactNo = 'Student Contact No is Required';
    } else if (!/^([+]\d{2})?\d{10}$/.test(values.studentContactNo)) {
        errors.studentContactNo = 'Student Contact No is Not Valid';
    }
    if (!values.nearByUniversity) {
        errors.nearByUniversity = "Student Near By University is Required"
    }
    if (!values.studentNicNo) {
        errors.studentNicNo = "Student NIC No is Required"
    }
    if (!values.boardingOwnerName) {
        errors.boardingOwnerName = "Boarding Owner Name is Required"
    }
    if (!values.boardingOwnerContactNo) {
        errors.boardingOwnerContactNo = 'Student Contact No is Required';
    } else if (!/^([+]\d{2})?\d{10}$/.test(values.boardingOwnerContactNo)) {
        errors.boardingOwnerContactNo = 'Student Contact No is Not Valid';
    }
    // if (!values.boardingRegNo) {
    //     errors.boardingRegNo = "Boarding Registration No is Required"
    // }
    if (!values.noOfRooms) {
        errors.noOfRooms = "No of Rooms is Required"
    }
    if (!values.membersCount) {
        errors.membersCount = "Members Count is Required";
    }
    if (!values.moveInDate) {
        errors.moveInDate = "Move-In Date is Required"
    }
    if (!values.moveOutDate) {
        errors.moveOutDate = "Move-Out Date is Required"
    }
    if (!values.pricePerMonth) {
        errors.pricePerMonth = "Price Per Month is Required"
    }
    return errors;
}

export function validateBoardingOwners(values) {
    console.log(values)
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.boardingOwnerRegNo) {
        errors.boardingOwnerRegNo = "Registration No is Required"
    }
    if (!values.boardingOwnerFirstName) {
        errors.boardingOwnerFirstName = "First Name is Required"
    }
    if (!values.boardingOwnerLastName) {
        errors.boardingOwnerLastName = "Last Name is Required"
    }
    if (!values.boardingOwnerUserName) {
        errors.boardingOwnerUserName = "User Name is Required"
    }
    if (!values.boardingOwnerAddress) {
        errors.boardingOwnerAddress = "Address is Required"
    }
    if (!values.boardingOwnerGender) {
        errors.boardingOwnerGender = "Gender is Required"
    }
    if (!values.boardingOwnerEmail) {
        errors.boardingOwnerEmail = "Email is Required";
    } else if (!emailRegex.test(values.boardingOwnerEmail)) {
        errors.boardingOwnerEmail = "Invalid Email Format";
    } else {
        const rejectedEmails = ["example@rejected.com", "another@rejected.com"];
        if (rejectedEmails.includes(values.boardingOwnerEmail)) {
            errors.boardingOwnerEmail = "This Email address is Not Allowed";
        }
    }
    if (!values.boardingOwnerContactNo) {
        errors.boardingOwnerContactNo = 'Contact No is Required';
    } else if (!/^([+]\d{2})?\d{10}$/.test(values.boardingOwnerContactNo)) {
        errors.boardingOwnerContactNo = 'Contact No is Not Valid';
    }
    if (!values.nearByUniversity) {
        errors.nearByUniversity = "Near By University is Required"
    }
    if (!values.boardingOwnerNicNo) {
        errors.boardingOwnerNicNo = "NIC No is Required"
    }
    if (!values.boardingOwnerDob) {
        errors.boardingOwnerDob = "Date of Birth is Required"
    }
    if (!values.boardingOwnerMarriedStatus) {
        errors.boardingOwnerMarriedStatus = "Married Status is Required"
    }
    if (!values.nicFront) {
        errors.nicFront = "NIC Front is Required"
    }
    if (!values.nicBack) {
        errors.nicBack = "NIC Back is Required"
    }
    return errors;
}

export function validateStudents(values) {
    console.log(values)
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.studentRegNo) {
        errors.studentRegNo = "Registration No is Required"
    }
    if (!values.studentFirstName) {
        errors.studentFirstName = "First Name is Required"
    }
    if (!values.studentLastName) {
        errors.studentLastName = "Last Name is Required"
    }
    if (!values.studentUserName) {
        errors.studentUserName = "User Name is Required"
    }
    if (!values.studentAddress) {
        errors.studentAddress = "Address is Required"
    }
    if (!values.studentGender) {
        errors.studentGender = "Gender is Required"
    }
    if (!values.studentEmail) {
        errors.studentEmail = "Email is Required";
    } else if (!emailRegex.test(values.studentEmail)) {
        errors.studentEmail = "Invalid Email Format";
    } else {
        const rejectedEmails = ["example@rejected.com", "another@rejected.com"];
        if (rejectedEmails.includes(values.studentEmail)) {
            errors.studentEmail = "This Email address is Not Allowed";
        }
    }
    if (!values.studentContactNo) {
        errors.studentContactNo = 'Contact No is Required';
    } else if (!/^([+]\d{2})?\d{10}$/.test(values.studentContactNo)) {
        errors.studentContactNo = 'Contact No is Not Valid';
    }
    if (!values.nearByUniversity) {
        errors.nearByUniversity = "Near By University is Required"
    }
    if (!values.studentNicNo) {
        errors.studentNicNo = "NIC No is Required"
    }
    if (!values.studentDob) {
        errors.studentDob = "Date of Birth is Required"
    }
    if (!values.studentMarriedStatus) {
        errors.studentMarriedStatus = "Married Status is Required"
    }
    if (!values.nicFront) {
        errors.nicFront = "NIC Front is Required"
    }
    if (!values.nicBack) {
        errors.nicBack = "NIC Back is Required"
    }
    return errors;
}

export function validatePayments(values) {
    console.log(values)
    let errors = {};

    if (!values.paymentNo) {
        errors.paymentNo = "Payment No is Required"
    }
    if (!values.studentName) {
        errors.studentName = "Student Name is Required"
    }
    if (!values.membersCount) {
        errors.membersCount = "Members Count is Required"
    }
    if (!values.accountNo) {
        errors.accountNo = 'Account No is Required';
    } else if (!/^[0-9-\s]+$/.test(values.accountNo)) {
        errors.accountNo = 'Account No is Not Valid';
    }
    if (!values.paymentAmount) {
        errors.paymentAmount = "Payment Amount is Required"
    }
    if (!values.paymentDate) {
        errors.paymentDate = "Payment Date is Required"
    }
    if (!values.boardingName) {
        errors.boardingName = "Boarding Name is Required"
    }
    if (!values.boardingOwnerName) {
        errors.boardingOwnerName = "Boarding Owner Name is Required"
    }
    if (!values.paymentReceipt) {
        errors.paymentReceipt = "Payment Receipt is Required"
    }
    return errors;
}


export function validateAdminSettings(values) {
    let errors = {};

    if (!values.firstName) {
        errors.firstName = "First Name is Required";
    }
    if (!values.lastName) {
        errors.lastName = "Last Name is Required";
    }
    if (!values.userName) {
        errors.userName = "User Name is Required";
    }
    if (!values.email) {
        errors.email = "Email is Required";
    } else if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is not valid';
    }
    if (!values.nicNo) {
        errors.nicNo = "NIC No is Required";
    }
    if (!values.phoneNo) {
        errors.phoneNo = 'Contact No is required';
    } else if (!/^([+]\d{2})?\d{10}$/.test(values.phoneNo)) {
        errors.phoneNo = 'Contact No is not valid';
    }
    if (!values.dob) {
        errors.dob = "Date of Birth is Required";
    }
    if (!values.address) {
        errors.address = "Address is Required";
    }
    if (!values.gender) {
        errors.gender = "Gender is Required";
    }


    return errors;
}

export function validateAdminPasswordSettings(values) {
    let errors = {}
    if (!values.currentPassword) {
        errors.currentPassword = "Current Password is Required";
    }
    if (!values.newPassword) {
        errors.newPassword = "New Password is Required";
    }

    return errors;
}

export function validateUserRegistration(values) {
    console.log(values);
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const slNICRegExp = /^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$/;


    if (!values.firstName) {
        errors.firstName = "First Name is Required";
    }


    if (!values.lastName) {
        errors.lastName = "Last Name is Required";
    }


    if (!values.email) {
        errors.email = "Email is Required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid Email Format";
    }


    if (!values.password) {
        errors.password = "Password is Required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }


    if (!values.contactNo) {
        errors.contactNo = "Contact Number is Required";
    } else if (!/^([+]\d{2})?\d{10}$/.test(values.contactNo)) {
        errors.contactNo = "Contact Number is Not Valid";
    }


    if (!values.gender) {
        errors.gender = "Gender is Required";
    }


    if (!values.address) {
        errors.address = "Address is Required";
    }


    if (!values.nicNo) {
        errors.nicNo = "NIC Number is Required";
    } else if (!slNICRegExp.test(values.nicNo)) {
        errors.nicNo = "NIC Number is Not Valid";
    }


    // if (!values.nicFront) {
    //     errors.nicFront = "NIC Front is Required";
    // }
    //
    //
    // if (!values.nicBack) {
    //     errors.nicBack = "NIC Back is Required";
    // }
    //
    //
    // if (!values.profilePic) {
    //     errors.profilePic = "Profile Picture is Required";
    // }

    return errors;
}
