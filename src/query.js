const getUsersQuery = "SELECT id, username, email, full_name, contact_number, created_at, is_admin FROM users";

const getUserByIdQuery = "SELECT id, username, email, full_name, contact_number, created_at, is_admin FROM users WHERE id = $1";

const registerUserQuery = "INSERT INTO users (username, password, email, full_name, contact_number) VALUES ($1, $2, $3, $4, $5) RETURNING id, username";

const loginUserQuery = "SELECT id, username, password, email, is_admin FROM users WHERE email = $1";

export {
	getUsersQuery,
	getUserByIdQuery,
	registerUserQuery,
	loginUserQuery,
};