const express = require("express");
const characterService = require("../services/characterService");
const Success = require("../handlers/successHandler");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
/*const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.findAll(req.query.filter, req.query.optiones);
        res.json(new Success(users));
    }catch (err) {
        next(err);
    }
};*/

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createCharacter = async (req, res, next) => {
  try {
    let c = req.body;
    c = await characterService.save(c);

    res.status(201).json(new Success(c));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let user = req.body;

    const userUpdated = await userService.update(id, user);

    res.status(200).json(new Success(userUpdated));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
/*const getById = async (req, res, next) => {
    try {
        const user = await userService.findById(req.params.id);
        res.json(new Success(user));
    }catch (err) {
        next(err);
    }
};*/

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
/*const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.remove(id);
        
        
        const result = {
            messsage: `User with id: ${id} deleted`,
            user
        }
        res.json(new Success(user));
    } catch (err) {
        next(err);
    }
};*/

module.exports = {
  //getAllUsers,
  createCharacter,
  //updateUser,
  //getById,
  //deleteUser
};
