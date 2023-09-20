const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const http_code = require('http-status-codes');
const User = require('../models/Users');

router.get('/', async (req, res) => {

    try {
        const getUsers = await Users.find();

        if(getUsers.length === 0) {
            return res.status(http_code.NOT_FOUND).json({
                message: 'No users found'
            });
        }
        res.status(http_code.OK).json({
            count: getUsers.length,
            data: getUsers
        });
    } catch(err) {
        console.error('Error getting users: ' + err);
        res.status(500).json({
            erro: 'Internal server error',
            message: err.message
        });
    }
});

router.post('/', async (req, res) => {
    const { name, age, username } = req.body;

    if(!name || !age || !username) {
        return res.status(http_code.BAD_REQUEST).json({
            error: 'Please enter all rerquired fields'
        })
    }

    try {
        const checkUsername = await User.findOne({ username: username });
        if(checkUsername) {
            return res.status(http_code.CONFLICT).json({
                error: 'User with this username already exist',
                message: 'Username already exists'
            });
        }

        const newUser = await User.create({
            name: name,
            age: age,
            username: username
        });


        res.status(http_code.CREATED).json({
            message: 'New user created',
            data: newUser
        });
    } catch(err) {
        console.error('Error creating user: ' + err);
        res.status(http_code.INTERNAL_SERVER_ERROR).json({
            error: 'Internl server error',
            message: err.message
        });
    }
});

// router.post('/', async (req, res) => {
//     const user = req.body;
//     const newUser = new User(user);
//     await newUser.save();

//      res.json(user);
// });

// Get user by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if(!user) {
            console.log(`User with ID ${id} not found`);
            return res.status(http_code.NOT_FOUND).json({
                error: 'User not found',
                message: 'User with this id not found'
            });
        }

        res.status(http_code.OK).json({
            message: 'Succesfully got user by id',
            data: user
        });
    } catch(err) {
        console.error('Error getting user by id: ' + err);
        res.status(http_code.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});

router.put('/:id', async (req, res) => {
    const { name, age, username } = req.body;
    const id = req.params.id;

    try {
        const userId = await User.findById(id);
        if(!userId) {
            return res.status(http_code.NOT_FOUND).json({
                error: 'User not found',
                message: 'No user with this id'
            });
        }

        const updateUser = await User.findByIdAndUpdate(id, {
            name: name,
            age: age,
            username: username
        });
        res.status(http_code.OK).json({
            message: 'User updated successfully',
            data: updateUser
        });
    } catch(err) {
        console.error('Error updating user: ' + err);
        res.status(http_code.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(http_code.OK).json({
            message: 'User is deleted',
            data: deleteUser
        });
    } catch(err) {
        console.error('Error deleting user: ' + err);
        res.status(http_code.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});

module.exports = router;