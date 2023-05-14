import activitySchema from '../models/Activity';

const getAllActivity = async (req, res) => {
  try {
    const activity = await activitySchema.find({ isActive: true });
    res.status(200).json({
      message: 'Complete Activity list',
      data: activity,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const activityControllers = {
  getAllActivity,
};

export default activityControllers;
