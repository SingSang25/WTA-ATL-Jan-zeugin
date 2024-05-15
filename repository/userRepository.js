import User from '../model/userModel.js';

export default {
  /**
   * Alle Benutzer finden
   * @returns {Array<User>} Liste aller Benutzer
   */
  async findAll() {
    return User.find();
  },

  /**
   * Gibt einen einzelnen Benutzer anhand seiner ID zurück
   * @param {string} id Die ID des zu suchenden Benutzers
   * @returns {User} Der Benutzer
   */
  async find(id) {
    const user = await User.findOne({ _id: id });
    return user;
  },

  /**
   * Findet einen einzelnen Benutzer per Filter
   * @param {object} filter Der anzuwendende Filter
   * @returns {User|null} Der Benutzer oder null
   */
  async findBy(filter) {
    const user = await User.findOne(filter);
    return user;
  },

  /**
   * Legt einen neuen Benutzer an
   * @param {User} user Der Benutzer, der angelegt werden soll
   * @returns {User} Der erstellte Benutzer
   */
  async create(user) {
    const newUser = new User(user);
    return newUser.save();
  },

  /**
   * Aktualisiert einen Benutzer nach ID
   * @param {string} id Die ID des zu aktualisierenden Benutzers
   * @param {User} user Die Daten, mit denen der Benutzer aktualisiert werden soll
   * @returns {User} Der aktualisierte Benutzer
   */
  async update(id, user) {
    return User.findByIdAndUpdate(id, user);
  },

  /**
   * Löscht einen Benutzer nach ID
   * @param {string} id Die ID des zu löschenden Benutzers
   * @returns {User} Der gelöschte Benutzer
   */
  async remove(id) {
    return User.findByIdAndDelete(id);
  },
};