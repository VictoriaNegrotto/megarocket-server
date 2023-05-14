import Subscription from '../models/Subscription';

const updateSuscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { classInSuscription, members, date } = req.body;
    const { isActive } = await Subscription.findById(id);

    if (!isActive) {
      return res.status(200).json({
        message: `Suscription Id: ${id} inactive, can not be updated`,
        data: undefined,
        error: false,
      });
    }
    const result = await Subscription.findByIdAndUpdate(
      id,
      {
        classInSuscription,
        members,
        date,
      },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `Suscription Id: ${id} was not found`,
        data: undefined,
        error: false,
      });
    }

    return res.status(200).json({
      message: `Suscription Id: ${id} Updated!`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: \n ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const subscriptionControllers = {
  updateSuscription,
};

export default subscriptionControllers;
