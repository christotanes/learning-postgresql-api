export function errorHandler(error, res) {
    let statusCode = 500;
    let errorMessage = "";

    switch (error.message) {
        case "Invalid input":
        case "Unidentified field":
        case "Incorrect id":
        case "Update unsuccessful":
        case "Create Unsuccessful":
        case "Input empty":
        case "Max length reached":
        case "Input is Null or Undefined":
            statusCode = 400;
            errorMessage = error.message;
            break;
        
        case "Unauthorized access":
            statusCode = 401;
            errorMessage = error.message;
            break;

        case "User not found":
        case "Shop not found":
            statusCode = 404;
            errorMessage = error.message;
            break;
        
        case "Same password":
            statusCode = 409;
            errorMessage = error.message;
            break;
    
        default:
            if (error.code === "23505") {
                statusCode = 409;
                errorMessage = "Username or Email already registered";
            } else {
                errorMessage = `Internal Server Error: ${error.message}`;
            }
            break;
    }

    res.status(statusCode).send({ error: errorMessage });
};
