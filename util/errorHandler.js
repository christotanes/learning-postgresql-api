export function errorHandler(error, res) {
    if (error.message === "Invalid input") {
        res.status(400).send("Invalid input");

    } else if (error.message === "Unidentified field") {
        res.status(400).send("Unidentified field");

    } else if (error.message === "User not found") {
        res.status(404).send("User not found");

    } else if (error.message === "Unauthorized access") {
        res.status(403).send("Unauthorized access");

    } else if (error.message === "Incorrect id") {
        res.status(400).send("Incorrect id");

    } else if (error.message === "Same password") {
        res.status(409).send("Same password");

    } else if (error.message === "Shop not found") {
        res.status(404).send("Shop not found");

    } else if (error.message === "Update unsuccessful") {
        res.status(400).send("Update unsuccessful");

    } else if (error.message === "Create Unsuccessful") {
        res.status(400).send("Create Unsuccessful");

    } else if (error.code === "23505") {
        res.status(409).send("Username or Email already exists");
        
    } else if (error.message === "Input empty") {
        res.status(400).send("Input empty");

    } else if (error.message === "Max length reached") {
        res.status(400).send("Max length reached");

    } else if (error.message === "Input is Null or Undefined") {
        res.status(400).send("Input is Null or Undefined");

    } else {
        res.status(500).send("Internal Server Error");
        
    } 
};
