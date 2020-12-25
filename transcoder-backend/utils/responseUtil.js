const getSuccessResponse = (response) => {
    return {
        statusCode: response.statusCode || 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
            response.data
        ),
    };
};
const getErrorResponse = (error) => {
    console.log(error, "IN error.js");
    return {
        statusCode: error.statusCode || 500,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            message: error.message ? error.message : 'Error',
            data: error.data ? error.data : ''
            // data: error.data ? error.data : ''
        }),
    };
};




module.exports = { getErrorResponse, getSuccessResponse };
