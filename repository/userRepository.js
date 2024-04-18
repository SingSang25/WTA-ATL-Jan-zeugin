import User from '../model/userModel.js';

export default {
  /**
   * Find all users
   * @returns {Array<User>} List of all users
   */
  async findAll() {
    return User.find();
  },

  /**
   * Returns a single user by id
   * @param {string} id The id of the user to find
   * @returns {User} The user
   */
  async find(id) {
    const user = await User.findOne({ _id: id });
    return user;
  },

  /**
   * Finds a singe user by filter
   * @param {object} filter The filter to apply
   * @returns {User|null} The user or null
   */
  async findBy(filter) {
    const user = await User.findOne(filter);
    return user;
  },

  /**
   * Creates a new user
   * @param {User} user 
   * @returns {User} The created user
   */
  async create(user) {
    const newUser = new User(user);
    return newUser.save();
  },

  /**
   * Updates a user by id
   * @param {string} id The id of the user to update
   * @param {User} user The data to update the user with
   * @returns {User} The updated user
   */
  async update(id, user) {
    return User.findByIdAndUpdate(id, user);
  },

  /**
   * Deletes a user by id
   * @param {string} id The id of the user to delete
   * @returns {User} The deleted user
   */
  async remove(id) {
    return User.findByIdAndDelete(id);
  },
};