import { dbPool } from "../dbconfig.js";

class UserModel {
  static async getAllUsers() {
    try {
      const users = await dbPool.query("SELECT * FROM user");
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async createUser(newUser) {
    try {
      await dbPool.query("INSERT INTO user SET ?", newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(user_id) {
    try {
      await dbPool.query("DELETE FROM user WHERE user_id = ?", [user_id]);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(user_id, updatedUser) {
    try {
      await dbPool.query("UPDATE user SET ? WHERE user_id = ?", [
        updatedUser,
        user_id,
      ]);
    } catch (error) {
      throw error;
    }
  }
}

export default UserModel;
