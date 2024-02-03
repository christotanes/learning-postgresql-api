async function validateNumInput(num) {
	if (isNaN(num) || num < 1) {
		throw new Error("Invalid input");
	} else {
		return
	}
};

export default validateNumInput;