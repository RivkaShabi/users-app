const axios = require('axios');
const User = require('../models/userModel');
const NodeCache = require('node-cache');

const userCache = new NodeCache();

// Auto-refresh cache every 5 minutes
setInterval(async () => {
  const keys = userCache.keys();
  for (const key of keys) {
    if (key.startsWith('users-page-')) {
      const page = key.split('-').pop();
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      userCache.set(key, response.data.data);
      console.log(`Refreshed cache for page ${page}`);
    }
  }
}, 5 * 60 * 1000);

// GET /getUsers - fetch users from local DB and external API
const getUsers = async (req, res, next) => {
  const page = req.query.page || 1;
  try {
    const username = req.body.username;
    console.log(`[getUsers] Fetching users for username: ${username}, page: ${page}`);

    const localUsers = await User.find({ createdBy: username });
    const key = `users-page-${page}`;
    const cached = userCache.get(key);

    if (cached) {
      console.log(`[getUsers] Returning users from cache for page ${page}`);
      res.status(200).json({
        localUsers,
        externalUsers: cached,
      });
      return;
    }
    // Fetch users from external API
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`, {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    });

    userCache.set(key, response.data.data);

    const externalUsers = response.data.data;

    res.status(200).json({
      localUsers,
      externalUsers,
    });
  } catch (error) {
    console.error('[getUsers] Error:', error);
    next(error);
  }
};

// GET /getUser/:id - fetch user by ID from local DB or external API
const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    console.log(`[getUserById] Fetching user by id: ${id}`);
    const localUser = await User.findOne({ id });
    if (localUser) {
      return res.status(200).json({ source: 'local', user: localUser });
    }

    const response = await axios.get(`https://reqres.in/api/users/${id}`);
    if (response.data && response.data.data) {
      return res.status(200).json({ source: 'external', user: response.data.data });
    }

    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  } catch (error) {
    console.error('[getUserById] Error:', error);
    next(error);
  }
};

// POST /createUser - create a new user in local DB
const createUser = async (req, res, next) => {
  const { first_name, last_name, email, avatar, createdBy } = req.body;

  if (!first_name || !last_name || !email) {
    const err = new Error('Missing required fields');
    err.status = 400;
    return next(err);
  }

  try {
    console.log(`[createUser] Creating user: ${first_name} ${last_name}, by: ${createdBy}`);
    const newUser = await User.create({
      id: new Date().getTime(),
      first_name,
      last_name,
      email,
      avatar: avatar || '',
      createdBy,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('[createUser] Error:', error);
    next(error);
  }
};

// PUT /updateUser/:id - update user in local DB
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { first_name, last_name, email, avatar } = req.body;

  if (!first_name || !last_name || !email) {
    const err = new Error('Missing required fields');
    err.status = 400;
    return next(err);
  }

  try {
    console.log(`[updateUser] Updating user id: ${id}`);
    const user = await User.findOne({ id });
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.avatar = avatar || '';

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('[updateUser] Error:', error);
    next(error);
  }
};

// DELETE /deleteUser/:id - delete user from local DB
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`[deleteUser] Deleting user id: ${id}`);
    const user = await User.findOne({ id });
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    await user.deleteOne();

    const localUsers = await User.find();

    res.status(200).json({
      localUsers,
    });
  } catch (error) {
    console.error('[deleteUser] Error:', error);
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
