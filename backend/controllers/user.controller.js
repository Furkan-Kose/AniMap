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
    user
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


export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
}

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json(user);
}

export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;
  user.password = req.body.password || user.password;

  await user.save();
  res.status(200).json({
    success: true,
    user
  });
}


export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  await user.remove();
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
}

