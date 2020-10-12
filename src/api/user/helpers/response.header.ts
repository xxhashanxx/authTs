// failed response format
function failed(message) {
    return {
        success: false,
        message: message
    }
};

// success response format
function success(message) {
    return {
        success: true,
        message: message
    }
};

// success response format
function successWithPayload(message, data) {
    return {
        success: true,
        data: data,
        message: message
    }
};


export { failed, success, successWithPayload };