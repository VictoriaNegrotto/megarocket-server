import mongoose from 'mongoose';
import firebaseApp from '../helper/firebase';
import Admins from '../models/Admins';

const Admin = mongoose.model('Admin');

const getAdmins = async (req, res) => {
  try {
    const foundAdmins = await Admin.find({ isActive: true });
    if (!foundAdmins) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: foundAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const createAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });
    const admin = new Admins(
      {
        firebaseUid: newFirebaseUser.uid,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dni: req.body.dni,
        phone: req.body.phone,
        city: req.body.city,
      },
    );
    const adminSaved = await admin.save();

    return res.status(201).json({
      message: 'Register successfully',
      data: adminSaved,
    });
  } catch (error) {
    if (firebaseUid) {
      await firebaseApp.auth().deleteUser(firebaseUid);
    }

    return res.status(400).json({
      message: error.toString(),
    });
  }
};

const getAdminById = async (req, res) => {
  const adminId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return res.status(404).json({
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
    res.status(500).json({
      message: `${error.message} (Admin ID: ${adminId})`,
      data: undefined,
      error: true,
    });
  }
  return undefined;
};

const updateAdmin = async (req, res) => {
  const adminId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return res.status(404).json({
      message: 'Invalid admin ID',
      data: undefined,
      error: true,
    });
  }
  try {
    const existingAdmin = await Admin.findOne({ _id: adminId });
    if (!existingAdmin || !existingAdmin.isActive) {
      return res.status(404).json({
        message: 'Cannot update inactive admin',
        data: undefined,
        error: true,
      });
    }
    if (req.body.email) {
      const emailExists = await Admin.findOne({
        _id: { $ne: adminId },
        email: req.body.email,
        isActive: { $ne: false },
      });
      if (emailExists) {
        return res.status(400).json({
          message: 'Email already registered',
          data: undefined,
          error: true,
        });
      }
    }
    await Admin.findOneAndUpdate({ _id: adminId }, req.body, { runValidators: true });
    res.status(200).json({
      message: 'Admin updated',
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `${error.message} (Admin ID:${adminId})`,
      data: undefined,
      error: true,
    });
  }
  return undefined;
};

const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return res.status(404).json({
      message: 'Invalid admin ID',
      data: undefined,
      error: true,
    });
  }
  try {
    const existingAdmin = await Admin.findOne({ _id: adminId });
    if (!existingAdmin || !existingAdmin.isActive) {
      return res.status(404).json({
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
    res.status(500).json({
      message: `${error.message} (Admin ID:${adminId})`,
      data: undefined,
      error: true,
    });
  }
  return undefined;
};

const adminsControllers = {
  getAdmins,
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};

export default adminsControllers;
