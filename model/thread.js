const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const ThreadSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    content: {
        type: String,
        required: [true, 'Content is required.']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Who wrote this?']
  
    },
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

ThreadSchema.pre('remove', function(next) {
    const Comment = mongoose.model('comment');
    Comment.remove({ _id: { $in: this.comments } })
        .then(() => next());
});

const Thread = mongoose.model('thread', ThreadSchema);

module.exports = Thread;
