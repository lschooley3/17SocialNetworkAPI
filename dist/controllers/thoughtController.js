import { User, Thought } from '../models/index.js';
/**
 * GET All Courses /courses
 * @returns an array of Courses
*/
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find().populate("reactions");
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET Course based on id /course/:id
 * @param string id
 * @returns a single Course object
*/
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'Thought not found!'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
* POST Course /courses
* @param object username
* @returns a single Course object
*/
export const createThought = async (req, res) => {
    try {
        console.log(req.body);
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        return res.json('Created the thought');
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
/**
 * PUT Course based on id /courses/:id
 * @param object id, username
 * @returns a single Course object
*/
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: 'No course with this id!' });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
* DELETE Course based on id /courses/:id
* @param string id
* @returns string
*/
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        ;
        const user = await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        return res.json({ message: 'Deleted the thought' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// create a Reaction to a Thought
export const createReaction = async (req, res) => {
    try {
        console.log(req.body);
        // const reaction = await Reaction.create(req.body);
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.json('Created the reaction');
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
/**
* DELETE Course based on id /courses/:id
* @param string id
* @returns string
*/
export const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, 
        // { reactions: req.params.reactionId },
        { $pull: { reactions: req.params.reactionId } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.json({ message: 'Deleted the reaction' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
