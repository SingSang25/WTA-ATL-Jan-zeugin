import Comment from '../model/commentModel.js';

export default {
    findAll(blogId) {
        return Comment.find({ blogId: blogId });
    },

    find(blogId, commentId) {
        return Comment.findOne({ _id: commentId, blogId: blogId });
    },

    create(comment) {
        const newComment = new Comment(comment);
        return newComment.save();
    },

    update(blogId, commentId, comment) {
        return Comment.findOneAndUpdate({
            _id: commentId,
            blogId: blogId
        }, comment);
    },

    remove(blogId, commentId) {
        return Comment.findOneAndDelete({
            _id: commentId,
            blogId: blogId
        });
    },
}
