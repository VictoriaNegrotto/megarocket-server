import mongoose from 'mongoose';
import '../models/Admins';

const Admin = mongoose.model('Admin');

const handleError = (res, error, adminId) => {
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
  return undefined;
};

const handleSuccess = (res, message, data) => {
  res.status(200).json({
    message,
    data,
    error: false,
  });
};

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
    handleSuccess(res, 'Admin found', foundAdmin);
  } catch (error) {
    handleError(res, error, adminId);
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
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: 'Request body is empty',
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
    const changesMade = Object.entries(req.body)
      .some(([key, value]) => existingAdmin[key] !== value);
    if (!changesMade) {
      return res.status(200).json({
        message: 'No changes have been made',
        data: undefined,
        error: false,
      });
    }

    await Admin.findOneAndUpdate({ _id: adminId }, req.body);
    handleSuccess(res, 'Admin updated', req.body);
  } catch (error) {
    handleError(res, error, adminId);
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
    handleSuccess(res, 'Admin deleted', undefined);
  } catch (error) {
    handleError(res, error, adminId);
  }
  return undefined;
};
