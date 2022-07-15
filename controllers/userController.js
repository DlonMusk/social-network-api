const {User} = require('../models');


module.exports = {
    // Get all users
    getUsers(req, res){
        User.find()
            .select('-__v')
            .populate({path: 'friends', select: '-thoughts'})
            .then(users => res.json(users))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Get single user
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(user => res.json(user))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Create a new User
    createUser(req, res){
        User.create(req.body)
            .then(user => res.status(200).json(user))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Update User
    updateUser(req, res){
        User.findByIdAndUpdate(
                req.params.userId,
                req.body,
                {runValidators: true, new: true})
            .then(updatedUser => res.status(200).json(updatedUser))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Delete User
    deleteUser(req, res){
        User.findByIdAndDelete({_id: req.params.userId}, {runValidators: true, new: true})
            .then(deletedUser => res.status(200).json(deletedUser))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Add new friend
    async addNewFriend(req, res){
        const currentId = await User.findById(req.params.userId)
                         .then(user => user.id);

        // cannot add yourself
        if(currentId === req.params.userId){
            res.json('cannot add yourself as a friend')
            return;
        }

        User.findByIdAndUpdate(
            req.params.userId,
            {$addToSet: {friends: req.params.friendId}}, {runValidators: true, new: true})
            .then(friend => res.status(200).json(friend))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Remove friend
    removeFriend(req, res){
        User.findByIdAndUpdate(
            req.params.userId,
            {$pull: {friends: req.params.friendId}}, {runValidators: true, new: true})
            .then(friend => res.status(200).json(friend))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }

}