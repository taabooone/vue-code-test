const mongoose = require('mongoose')
const User = mongoose.model('user')

async function create(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.send({message: 'User was successfully created', success: true, user})
  } catch(ex) {
    console.error(ex)
    // should handle more stuff than the user exist forbidden error in practice
    res.status(403).send('User already exists')
  }
}

async function getUsers (req, res){
  try{
    const users = await User.find({role: 'employee'})
    res.send({message: 'Found all existing employees', success: true, users})
  } catch(ex) {
    console.error(ex)
    res.status(500).send('Something went wrong')
  }
}

async function authUser(req, res){
  const { email, password } = req.body;
  try {
    const user = await User.getAuthenticated(email, password)
    if(!user) throw new Error("User does not exist.")

    const loginData = {
      email: user.email,
      role: user.role,
      token: "sometoken",
      id: user._id
    }
    res.send({success: true, message: "User successfully logged in.", loginData})
  } catch(ex){
    console.error(ex)
    res.send({success: false, message: "error " + ex})
  }
}

async function updateUser(req, res){
  try{
    const id = req.params.id
    const user = await User.findOneAndUpdate({_id: id}, req.body, {new: true})
    res.send(user)
  } catch (ex) {
    console.error(ex)
    res.status(500).send("something went wrong")
  }
}

async function getUser(req, res){
  try{
    const id = req.params.id
    const user = await User.findById(id)
    if(!user) throw new Error()
    res.send(user)
  } catch (ex) {
    console.error(ex)
    res.status(404).send("whatever, It's fine.")
  }
}

module.exports = {
  create,
  getUsers,
  authUser,
  updateUser,
  getUser
}
