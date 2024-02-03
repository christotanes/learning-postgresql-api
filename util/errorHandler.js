export function errorHandler(error, res) {
    if (error.message === "Invalid input") {
        res.status(400).send("Invalid input");

    } else if (error.message === "Shop not found") {
        res.status(404).send("Shop not found");

    } else if (error.message === "Update unsuccessful") {
        res.status(400).send("Update unsuccessful");

    } else if (error.message === "Create Unsuccessful") {
        res.status(400).send("Create Unsuccessful");

    } else if (error.code === "23505") {
        res.status(409).send("Username or Email already exists");
        
    } else {
        res.status(500).send("Internal Server Error");
    }
};
