import memberSchema from '../models/Member';

const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const memberById = await memberSchema.findOne({ _id: id, isActive: true });
    if (!memberById) {
      return res.status(404).json({
        message: 'Member not found!. Id not exists',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Member found! It was ${memberById.firstName}`,
      data: memberById,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred:\n ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const newMemberData = req.body;

    const newMember = await memberSchema.findOne({ _id: id });
    if (!newMember || !newMember.isActive) {
      return res.status(404).json({
        message: 'Member not found!. Id not exists',
        data: undefined,
        error: true,
      });
    }

    const memberUpdated = await memberSchema.findByIdAndUpdate(id, newMemberData, { new: true });

    return res.status(200).json({
      message: 'Member updated!',
      data: memberUpdated,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred:\n ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const filterMember = async (req, res) => {
  try {
    const { nameMember } = req.params;
    const memberFilter = await memberSchema.find({ firstName: nameMember, isActive: true });

    if (memberFilter.length === 0) {
      return res.status(404).json({
        message: 'Member not found!. Name not exists',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Member found!',
      data: memberFilter,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred',
      data: undefined,
      error: true,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const existsMember = await memberSchema.findOne({ _id: id });
    if (!existsMember || !existsMember.isActive) {
      return res.status(404).json({
        message: 'Member not found!',
        data: undefined,
        error: true,
      });
    }

    const memberDelete = await memberSchema
      .findByIdAndUpdate(id, { isActive: false }, { new: true });
    return res.status(200).json({
      message: `Member delete! It was ${memberDelete.firstName}`,
      data: memberDelete,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred:\n ${error}`,
      data: undefined,
      error: true,
    });
  }
};

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
  getMemberById,
  filterMember,
  updateMember,
  deleteMember,
  getMembers,
  createMember,
};

export default memberController;
