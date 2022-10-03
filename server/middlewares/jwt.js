import jwt from 'jsonwebtoken';
// models
import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';
const SECRET_KEY = 'some-secret-key';

export const encode = async (req, res, next) => {
  try {
    const users = await UserModel.findOne({email:req.body.email});
    if(!users) return res.status(200).json({
      success: false,
      message: 'No Account with this email exists',
    })
    
    //Password Validation
    const validPass = await bcrypt.compare(req.body.password,users.password);
    if(!validPass) return res.status(200).json({
      success: false,
      message: 'Please Enter Correct Passowrd',
    })
    // const { email } = req.params;
    const user = await UserModel.findOne({email:req.body.email});
    const payload = {
      userId: user._id,
      userType: user.type,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    req.authToken = 'Bearer '+authToken;
    req.user=user;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.error });
  }
}

export const decode = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    req.userType = decoded.type;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
}