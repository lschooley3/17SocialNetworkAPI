import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

/**
 * GET All Courses /courses
 * @returns an array of Courses
*/
export const getThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET Course based on id /course/:id
 * @param string id
 * @returns a single Course object
*/
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId);
      if(thought) {
        res.json(thought);
      } else {
        res.status(404).json({
          message: 'Thought not found!'
        });
      }
    } catch (error: any) {
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
export const createThought = async (req: Request, res: Response) => {
    const { thought } = req.body;
    try {
      const newThought = await Thought.create({
        thought
      });
      res.status(201).json(newThought);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT Course based on id /courses/:id
 * @param object id, username
 * @returns a single Course object
*/
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No course with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
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
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
      
      if(!thought) {
        res.status(404).json({
          message: 'No thought with that ID'
        });
      } else {
        await User.deleteMany({ _id: { $in: thought.username } });
        res.json({ message: 'Thoughts Deleted' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
