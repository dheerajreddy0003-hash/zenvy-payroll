
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');
const { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } = require('../config/env');

exports.register = async (req, res, next) => {
  try {
    const { companyName, name, email, password, role } = req.body;

    let company = await Company.findOne({ name: companyName });
    if (!company) {
      company = await Company.create({ name: companyName });
    }

    const existingUser = await User.findOne({ email, companyId: company._id });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      companyId: company._id,
      name,
      email,
      passwordHash,
      role
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, companyName } = req.body;

    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(400).json({ message: 'Invalid company' });
    }

    const user = await User.findOne({
      email,
      companyId: company._id,
      isActive: true
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        companyId: user.companyId
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};
