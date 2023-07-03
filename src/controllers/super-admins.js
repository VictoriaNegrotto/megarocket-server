import SuperAdmin from '../models/Super-admin';
import firebaseApp from '../helper/firebase';

const getAllSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.find({ isActive: true });
    if (!superAdmin.length) {
      return res.status(404).json({
        message: 'SuperAdmin list not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'SuperAdmin list',
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPERADMIN' });
    const member = new SuperAdmin(
      {
        firebaseUid: newFirebaseUser.uid,
        email: req.body.email,
      },
    );
    const memberSaved = await member.save();

    return res.status(201).json({
      message: 'Register successfully',
      data: memberSaved,
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

const getSuperAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdminById = await SuperAdmin.findOne({ _id: id, isActive: true });

    if (!superAdminById) {
      return res.status(404).json({
        message: 'Super Admin not found!',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Super Admin found!',
      data: superAdminById,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const newSuperAdminData = req.body;

    const existSuperAdmin = await SuperAdmin.findOne({ _id: id });

    if (!existSuperAdmin || !existSuperAdmin.isActive) {
      return res.status(404).json({
        message: 'SuperAdmin not found',
        data: undefined,
        error: true,
      });
    }

    const updatedSuperAdmin = await SuperAdmin
      .findByIdAndUpdate(id, newSuperAdminData, { new: true, runValidators: true });

    return res.status(200).json({
      message: 'SuperAdmin Updated!',
      data: updatedSuperAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const getSuperAdminByEmail = async (req, res) => {
  try {
    const { emailFilter } = req.params;
    const filterSuperAdmin = await SuperAdmin.find({ email: emailFilter, isActive: true });

    if (!filterSuperAdmin.length) {
      return res.status(404).json({
        message: 'SuperAdmins not found',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'SuperAdmins found!',
      data: filterSuperAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const existSuperAdmin = await SuperAdmin.findOne({ _id: id });

    if (!existSuperAdmin || !existSuperAdmin.isActive) {
      return res.status(404).json({
        message: 'Super Admin not found!',
        data: undefined,
        error: true,
      });
    }

    const superAdminDelete = await SuperAdmin
      .findByIdAndUpdate(id, { isActive: false }, { new: true });

    return res.status(200).json({
      message: 'Super Admin deleted!',
      data: superAdminDelete,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const superAdminController = {
  getAllSuperAdmin,
  createSuperAdmin,
  getSuperAdminById,
  updateSuperAdmin,
  deleteSuperAdmin,
  getSuperAdminByEmail,
};

export default superAdminController;
