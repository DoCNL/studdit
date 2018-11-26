const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  
    },
    votes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const Thread = mongoose.model('thread', ThreadSchema);

module.exports = Thread;
