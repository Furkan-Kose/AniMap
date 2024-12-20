import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false, 
      message: "User already exists" 
    });
  }

  const user = await User.create({ email, password, username });

  generateToken(res, user._id);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false, 
      message: 'User not found' 
    });
  }

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false, 
      message: 'Incorrect email or password' 
    });
  }

  generateToken(res, user._id);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
  });
};


export const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
};


export const getMe = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({
    success: true,
    user,
  });
};

