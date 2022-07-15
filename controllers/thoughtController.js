const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then(thoughts => res.status(200).json(thoughts))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Get single thought
    getSingleThought(req, res) {
        Thought.findById(req.params.thoughtId)
            .populate('reactions')
            .select('-__v')
            .then(thought => res.status(200).json(thought))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Create new thought
    createNewThought(req, res) {
        const newThought = {
            thoughtText: req.body.thoughtText,
            username: req.body.username
        }
        Thought.create(newThought)
            .then(async thought => {
                console.log(thought)
                await User.findByIdAndUpdate(
                    req.body.userId,
                    { $addToSet: { thoughts: thought.id } },
                    { runValidators: true, new: true });
                res.status(200).json(thought);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Update thought
    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { runValidators: true, new: true })
            .then(updatedThought => res.status(200).json(updatedThought))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Delete thought
    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.thoughtId, { runValidators: true, new: true })
            .then(deletedThought => res.status(200).json(deletedThought))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addNewReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true })
            .then(reaction => res.status(200).json(reaction))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    removeReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } })
            .then(thought => res.status(200).json(thought))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }

}