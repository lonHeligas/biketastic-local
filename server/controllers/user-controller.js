const { User } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = {
  
  async createUser({ body }, res) {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(body.password, salt)

    const userToInsert = {
      first_name: body.first_name,
      last_name: body.last_name,
      city: body.city,
      state: body.state,
      email: body.email,
      password: password,
    }
    const user = await User.create(userToInsert);

    if (!user) return res.status(400).json({ message: 'Unable to create user' });
    res.status(200).json(user);
  },


  async updateUser({ body, params }, res) {
    let userToUpdate = {
      first_name: body.first_name,
      last_name: body.last_name,
      city: body.city,
      state: body.state,
      email: body.email
    }

    if (body.orders?.length) {
      userToUpdate = { ...userToUpdate, orders: body.orders };
    }

    if( body.password?.length ){
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(body.password, salt)
      userToUpdate = {...userToUpdate, password: password }
    }

    const user = await User.updateOne(
      { _id: params.id },
      userToUpdate,
      { new: true }
    );

    if (!user) return res.status(400).json({ message: 'Unable to update user' });
    res.status(200).json(user);
  },


  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate({ path: 'orders', populate: { path: 'product_id' }});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).populate({ path: 'orders', populate: { path: 'product_id' } });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async authUser({ body }, res) {

    // Find the user by the email address
    const user = await User.findOne({ email: body.email }).populate({ path: 'orders', populate: { path: 'product_id' }});

    if (!user) return res.status(400).json({ message: 'Unable to authenticate user' });

    // We want to verify the password & kick them out if it fails
    const isValid = await bcrypt.compare(body.password, user.password)
    if( !isValid ) return res.status(400).json({ message: 'Unable to authenticate user' });

    const token = jwt.sign({
      email: user.email,
      id: user._id
    }, process.env.JWT_SECRET)

    res.header("auth-token", token).json({ error: null, data: { user, token }})
  },


  async verifyUser(req, res){
    const token = req.headers["auth-token"]

    if( !token ) return res.status(401).json({msg: "un-authorized"})

    const isVerified = jwt.verify(token, process.env.JWT_SECRET)
    if( !isVerified ) return res.status(401).json({msg: "un-authorized"})

    const user = await User.findById(isVerified.id).populate({ path: 'orders', populate: { path: 'product_id' }})
    if( !user ) return res.status(401).json({msg: "authorized"})
    
    return res.status(200).json(user)
  },


  async removeUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.id });

      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(deletedUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

};
