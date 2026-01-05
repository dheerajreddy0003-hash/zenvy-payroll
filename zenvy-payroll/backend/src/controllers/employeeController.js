
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { SALT_ROUNDS } = require('../config/env');

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const { companyId } = req.user;

    const existingUser = await User.findOne({ email, companyId });
    if (existingUser) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const employee = await User.create({
      companyId,
      name,
      email,
      passwordHash,
      role
    });

    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

exports.getEmployees = async (req, res, next) => {
  try {
    const { companyId } = req.user;

    const employees = await User.find({
      companyId,
      role: 'EMPLOYEE',
      isActive: true
    }).select('-passwordHash');

    res.json(employees);
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const { companyId } = req.user;
    const { id } = req.params;

    const employee = await User.findOne({
      _id: id,
      companyId
    }).select('-passwordHash');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const { companyId } = req.user;
    const { id } = req.params;

    const employee = await User.findOneAndUpdate(
      { _id: id, companyId },
      req.body,
      { new: true }
    ).select('-passwordHash');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const { companyId } = req.user;
    const { id } = req.params;

    const employee = await User.findOneAndUpdate(
      { _id: id, companyId },
      { isActive: false },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deactivated successfully' });
  } catch (err) {
    next(err);
  }
};
