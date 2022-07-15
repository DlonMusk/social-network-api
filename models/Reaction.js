const { Schema } = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const moment = require('moment');


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
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')

        }
    },
    {
        toJson: {
            getters: true
        }
    }
);

module.exports = reactionSchema;


