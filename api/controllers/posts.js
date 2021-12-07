const { throws } = require('assert');
const { validationResult } = require('express-validator');

const postDAO = require('../DAO/post-DAO');
const post = new postDAO();

exports.listAllPosts = async (req, res, next) => {
    try {
        const [allPosts] = await post.listAll();
        res.status(200).json(allPosts);
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}

exports.listFavorites = async (req, res, next) => {
  try {
      const [postsFavorites] = await post.listFavorites();
      res.status(200).json(postsFavorites);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
}

exports.createPost = async (req, res, next) => {
    const result = await post.createPost(req.body);
}

exports.editPost = async (req, res, next) => {
  const result = await post.editPost(req.body);
}
