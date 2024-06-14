export function isEmpty(obj) {
    if (!obj) {
        return true;
    }
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function filterDataByKey(array,nearByUniversity,key="nearByUniversity"){
    let filteredData = []
    if(nearByUniversity === "All") {
        filteredData = array
    }else {
        filteredData = array.filter((item) => item[key] === nearByUniversity)
    }
    return filteredData
}