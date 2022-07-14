const { Schema } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const formatTime = function(createdAt) {
    return createdAt.toLocaleString('en-US')
}

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date(),
            get: formatTime
        }
    }
);

module.exports = reactionSchema;


