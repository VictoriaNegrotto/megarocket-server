import Class from '../models/Class';

const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const idClass = await Class.findById(id);
    if (!idClass) {
      return res.status(404).json({
        message: `Class with ID ${id} was not found`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `${idClass.id} class was found!`,
      data: idClass,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'an error has ocurred',
      error,
    });
  }
};

const updateClass = async (req, res) => {
  const { id } = req.params;
  const {
    day, hour, trainer, activity, slots,
  } = req.body;

  try {
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
      return res.status(404).json({
        message: `Class with id: ${id} was not found`,
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

    const classToDelete = await Class.findByIdAndDelete(id);

    if (!classToDelete) {
      return res.status(404).json({
        message: `Class with id: ${id} was not found`,
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({
      message: 'An error occurred',
      error,
    });
  }
};

const classController = {
  updateClass, getClassById, deleteClass,
};

export default classController;
