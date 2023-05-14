import SuperAdmin from '../models/Super-admin';

const getAllSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.find({ isActive: true });
    return res.status(200).json({
      message: 'SuperAdmin List',
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
  try {
    const { email, password } = req.body;
    const newSuperAdmin = await SuperAdmin.create({ email, password });
    return res.status(200).json({
      message: 'New SuperAdmin created!',
      data: newSuperAdmin,
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
  getAllSuperAdmin, createSuperAdmin,
};

export default superAdminController;
