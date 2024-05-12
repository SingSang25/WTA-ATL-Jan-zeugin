import Comment from '../model/commentModel.js';

export default {
    findAll(blogId, commentId) {
        return Comment.find({ blog: blogId, _id: commentId });
    },

    find(blogId, commentId) {
        return Comment.findOne({ _id: commentId, blog: blogId });
    },

    create(comment) {
        const newComment = new Comment(comment);
        return newComment.save();
    },

    update(blogId, commentId, comment) {
        return Comment.findOneAndUpdate({
            _id: commentId,
            blog: blogId
        }, comment);
    },

    remove(blogId, commentId) {
        return Comment.findOneAndDelete({
            _id: commentId,
            blog: blogId
        });
    },
}
