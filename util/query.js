class Query {
  static getUsersQuery = `SELECT id, username, email, full_name, contact_number, created_at, is_admin 
							FROM users`;
  static getUserByIdQuery = `SELECT id, username, email, full_name, contact_number, created_at, is_admin 
								FROM users 
								WHERE id = $1`;
  static registerUserQuery = `INSERT INTO users (username, password, email, full_name, contact_number) 
								VALUES ($1, $2, $3, $4, $5)`;
  static loginUserQuery = `SELECT id, username, password, email, is_admin 
								FROM users 
								WHERE email = $1`;
  static changePasswordQuery = `UPDATE users 
									SET password = $1 
									WHERE id = $2 
									RETURNING id, username`;
  static getUserPasswordQuery = `SELECT password 
									FROM users 
									WHERE id = $1`;
  static getAllProductsQuery = `SELECT * 
									FROM products`;
  static getActiveProductsQuery = `SELECT *
									FROM products
									WHERE is_active = true`;
  static getProductsByShopQuery = `SELECT * 
										FROM products p 
										JOIN shops s 
										ON p.shop_id = s.id AND s.id = $1`;
  static checkShopExistsQuery = `SELECT id 
									FROM shops s 
									WHERE s.id = $1`;
  static addProductQuery = `INSERT INTO products (name, description, price, shop_id, category) 
								VALUES ($1, $2, $3, $4, $5) 
								RETURNING id, name, created_at`;

  static async editProductQuery(updates, product_id) {
    const setKeys = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(updates)) {
      setKeys.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }

    const query = `UPDATE products
						SET ${setKeys.join(", ")}
						WHERE id = $${index}
						RETURNING *`;

    values.push(product_id);
    return {
      query: query,
      values: values,
    };
  }

  static changeUserToAdminQuery = `UPDATE users 
										SET is_admin = true 
										WHERE id = $1 
										RETURNING id, username, is_admin`;

  static archiveProductQuery = `UPDATE products 
									SET is_active = false 
									WHERE id = $1
									RETURNING id, name, is_active`;

  static activateProductQuery = `UPDATE products
									SET is_active = true
									WHERE id = $1
									RETURNING id, name, is_active`;

  static getAllShopsQuery = `SELECT *
								FROM shops`;
}

export default Query;
