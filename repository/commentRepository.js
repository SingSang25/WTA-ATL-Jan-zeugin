import Comment from '../model/commentModel.js';

export default {
    /**
     * Gibt alle Kommentare zu einem Blog zurück
     * @param {string} commentId Die ID des Blogs
    * @returns {Array<Comment>}  Liste aller Kommentare
     */
    findAll(blogId) {
        return Comment.find({ blogId: blogId });
    },

    /**
     * Gibt einen einzelnen Kommentar zurück
     * @param {string} commentId Die ID des Kommentars
     * @returns {Comment} Der Kommentar
     */
    find(commentId) {
        return Comment.findOne({ _id: commentId });
    },

    /**
     * Legt einen neuen Kommentar an
     * @param {Comment} comment Der Kommentar, der angelegt werden soll
     * @returns {Comment} Der erstellte Kommentar
     */
    create(comment) {
        const newComment = new Comment(comment);
        return newComment.save();
    },

    /**
     * Aktualisiert einen Kommentar
     * @param {string} blogId Die ID des Blogs
     * @param {string} commentId Die ID des Kommentars
     * @param {Comment} comment Die Daten, mit denen der Kommentar aktualisiert werden soll
     * @returns {Comment} Der aktualisierte Kommentar
     */
    update(commentId, comment) {
        return Comment.findOneAndUpdate({
            _id: commentId,
        }, comment);
    },

    /**
     * Löscht einen Kommentar
     * @param {string} blogId Die ID des Blogs
     * @param {string} commentId Die ID des Kommentars
     * @returns {Comment} Der gelöschte Kommentar
     */
    remove(commentId) {
        return Comment.findOneAndDelete({
            _id: commentId
        });
    },
}
