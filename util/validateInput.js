class Validate {
  static async isInputValid(input) {
    if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (this.#columnList.includes(key)) {
          if (key === "shop_id") {
            this.#isNumValid(parseInt(value));
          } else if (key === "price") {
            this.#isNumValid(parseFloat(value));
          } else if (typeof value === "string") {
            this.#isInputEmptyAndMaxLength(value);
          } else {
            this.#isInputNullOrUndefined(value);
          }
        } else {
          throw new Error("Unidentified field");
        }
      }
    } else if (typeof input === "string") {
      this.#isInputEmptyAndMaxLength(input);
    } else if (typeof input === "number") {
      this.#isNumValid(input);
    } else {
      this.#isInputNullOrUndefined(input);
    }
  }

  static #isNumValid(num) {
    if (isNaN(num) || num < 1) {
      throw new Error("Invalid input");
    } else if (num.length > 4) {
      throw new Error("Max length reached");
    } else {
      return;
    }
  }

  static #isInputEmptyAndMaxLength(value) {
    if (value === "") {
      throw new Error("Input empty");
    } else if (value.length > 250) {
      throw new Error("Max length reached");
    } else {
      return;
    }
  }

  static #isInputNullOrUndefined(value) {
    if (value === null || value === undefined) {
      throw new Error("Input is Null or Undefined");
    } else {
      return;
    }
  }

  static #columnList = [
    "username",
    "password",
    "email",
    "full_name",
    "contact_number",
    "confirmPassword",
    "name",
    "description",
    "price",
    "shop_id",
    "category",
  ];
}

export default Validate;
