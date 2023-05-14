import Activity from '../models/Activity';

const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const idActivity = await Activity.findOne({ $and: [{ _id: id }, { isActive: true }] });
    if (idActivity) {
      return res.status(200).json({
        message: `Activity with ID ${id} was found`,
        data: idActivity,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Activity with ID ${id} was not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred while trying to get an activity by id:\n ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAct = await Activity.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (deleteAct) {
      return res.status(200).json({
        message: `Activity with ID ${id} was successfully deleted`,
        data: deleteAct,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Activity with ID ${id} was not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred while trying to delete this activity:\n ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const existActivity = await Activity.findOne({ _id: id });
    if (!existActivity || !existActivity.isActive) {
      return res.status(404).json({
        message: `Activity with ID ${id} is inactive or does not exist and cannot be updated`,
        data: undefined,
        error: false,
      });
    }
    const { name, description } = req.body;
    const updateAct = await Activity.findByIdAndUpdate(id, { name, description }, { new: true });
    if (updateAct) {
      return res.status(200).json({
        message: `Activity with ID ${id} was successfully updated`,
        data: updateAct,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Activity with ID ${id} was not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred while trying to update this activity:\n ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getActivityByName = async (req, res) => {
  try {
    const { name } = req.params;
    const nameLC = name.toLowerCase();
    const filterAct = await Activity.find({ name: nameLC, isActive: true });
    if (filterAct) {
      return res.status(200).json({
        message: `Activity ${name} was successfully found`,
        data: filterAct,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Activity ${name} was not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred while trying to get an activity by name:\n ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const activityController = {
  getActivityById,
  deleteActivity,
  updateActivity,
  getActivityByName,
};

export default activityController;
