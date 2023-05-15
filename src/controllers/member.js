import memberSchema from '../models/Member';

const getMembers = async (req, res) => {
  try {
    const membersData = await memberSchema.find({ isActive: true });
    if (membersData.length === 0) {
      return res.status(404).json({
        message: 'No members active',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Members found',
      data: membersData,
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

const createMember = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthDate,
      postalCode,
      isActive,
      memberships,
    } = req.body;
    const memberCreate = await memberSchema.create({
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthDate,
      postalCode,
      isActive,
      memberships,
    });
    return res.status(201).json({
      message: 'Member created',
      data: memberCreate,
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
const memberController = {
  getMembers,
  createMember,
};

export default memberController;
