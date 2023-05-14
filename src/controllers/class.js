import Class from '../models/Class';

const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const idClass = await Class.findOne({ $and: [{ _id: id }, { isActive: true }] });
    if (!idClass) {
      return res.status(200).json({
        message: `Class with ID ${id} was not found`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Class with ID ${idClass.id} was found!`,
      data: idClass,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'an error has ocurred',
      error,
    });
  }
};

const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = await Class.findById(id);

    if (!isActive) {
      return res.status(200).json({
        message: `Class with ID ${id} is inactive and cannot be updated`,
      });
    }
    const {
      day, hour, trainer, activity, slots,
    } = req.body;
    const result = await Class.findByIdAndUpdate(
      id,
      {
        day,
        hour,
        trainer,
        activity,
        slots,
      },
      { new: true },
    );

    if (!result) {
      return res.status(200).json({
        message: `Class with ID ${id} was not found`,
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classToDelete = await Class.findByIdAndUpdate(id, { isActive: false }, { new: true });

    if (!classToDelete) {
      return res.status(200).json({
        message: `Class with ID ${id} was not found`,
      });
    }

    return res.status(200).json(classToDelete);
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
};

const classController = {
  updateClass, getClassById, deleteClass,
};

export default classController;
