import Comment from '../model/commentModel.js';

export default {
    findAll(blogId) {
        return Comment.find({ blog: blogId });
    },

    find(blogId, commentId) {
        return Comment.findOne({ _id: commentId, blog: blogId });
    },

    create(blogId, comment) {
        comment.blog = blogId;
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
