const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'An email address is required'],
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: [true, 'A password is required']
  },
  role: {
    type: String,
    default: 'employee'
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  imageUrl:{
    type: String
  }
});


UserSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) return next()

  try{
    user.password = await bcrypt.hash(user.password,10)
    next();
  } catch (ex) {
    console.log(ex)
    return next(ex)
  }

});

UserSchema.statics.getAuthenticated = async function(email, password) {
  try{
    const user = await this.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      return user;
    }
  }catch(ex){
    throw new Error(ex);
  }
};


const User = mongoose.model('user', UserSchema);
