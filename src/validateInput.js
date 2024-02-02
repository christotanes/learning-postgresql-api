function validateNumInput(num) {
	if (isNaN(num) || num < 1) {
		return res.status(400).json({ error: "Invalid input" });
	} else {
		return
	}
};

// function validateStringInput(input) {
// 	if 
// }
export default validateNumInput;