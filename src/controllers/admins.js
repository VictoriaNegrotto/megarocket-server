import mongoose from 'mongoose';
import '../models/Admins';

const Admin = mongoose.model('Admin');

export const getAdminById = async (req, res) => {
  const adminId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return res.status(400).json({
      message: 'Invalid admin ID',
      data: undefined,
      error: true,
    });
  }
  try {
    const foundAdmin = await Admin.findOne({ _id: adminId, isActive: true });
    if (!foundAdmin) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Admin found',
      data: foundAdmin,
      error: false,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: `Invalid admin ID: ${adminId}`,
        data: undefined,
        error: true,
      });
    }
    res.status(500).json({
      message: `${error.message} (Admin ID: ${adminId})`,
      data: undefined,
      error: true,
    });
  }
  return undefined;
};

export const updateAdmin = async (req, res) => {
  const adminId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return res.status(400).json({
      message: 'Invalid admin ID',
      data: undefined,
      error: true,
    });
  }
  try {
    const existingAdmin = await Admin.findOne({ _id: adminId });
    if (!existingAdmin || !existingAdmin.isActive) {
      return res.status(400).json({
        message: 'Cannot update inactive admin',
        data: undefined,
        error: true,
      });
    }
    if (req.body.email) {
      const emailExists = await Admin.findOne({
        _id: { $ne: adminId },
        email: req.body.email,
      });
      if (emailExists) {
        return res.status(400).json({
          message: 'Email already registered',
          data: undefined,
          error: true,
        });
      }
    }
    await Admin.findOneAndUpdate({ _id: adminId }, req.body);
    res.status(200).json({
      message: 'Admin updated',
      data: req.body,
      error: false,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: `Invalid admin ID: ${adminId}`,
        data: undefined,
        error: true,
      });
    }
    res.status(500).json({
      message: `${error.message} (Admin ID:${adminId})`,
      data: undefined,
      error: true,
    });
  }
  return undefined;
};

export const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return res.status(400).json({
      message: 'Invalid admin ID',
      data: undefined,
      error: true,
    });
  }
  try {
    const existingAdmin = await Admin.findOne({ _id: adminId });
    if (!existingAdmin || !existingAdmin.isActive) {
      return res.status(400).json({
        message: 'Cannot delete inactive admin',
        data: undefined,
        error: true,
      });
    }
    await Admin.findOneAndUpdate({ _id: adminId }, { isActive: false });
    res.status(200).json({
      message: 'Admin deleted',
      data: undefined,
      error: false,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: `Invalid admin ID:${adminId}`,
        data: undefined,
        error: true,
      });
    }
    res.status(500).json({
      message: `${error.message} (Admin ID:${adminId})`,
      data: undefined,
      error: true,
    });
  }
  return undefined;
};
