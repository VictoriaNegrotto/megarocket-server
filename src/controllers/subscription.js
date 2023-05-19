import Subscription from '../models/Subscription';

const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = await Subscription.findById(id);

    if (!isActive) {
      return res.status(404).json({
        message: `Subscription Id: ${id} inactive, can not be updated`,
        data: undefined,
        error: true,
      });
    }
    const { classes, members, date } = req.body;
    const suscriptionToUpdate = await Subscription.findByIdAndUpdate(
      id,
      {
        classes,
        members,
        date,
      },
      { new: true, runValidators: true },
    );
    if (!suscriptionToUpdate) {
      return res.status(404).json({
        message: `Subscription Id: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Subscription Id: ${id} Updated!`,
      data: suscriptionToUpdate,
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

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptionData = await Subscription.find({ isActive: true });
    res.status(200).json({
      message: 'Subscription list found',
      data: subscriptionData,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `An error ocurred:\n ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscriptionToDelete = await Subscription.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!subscriptionToDelete) {
      return res.status(404).json({
        message: `Subscription Id: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Subscription Id: ${id} deleted`,
      data: subscriptionToDelete,
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

const filterSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    const subsToFilter = await Subscription.findOne({ $and: [{ _id: id }, { isActive: true }] });

    if (!subsToFilter) {
      return res.status(404).json({
        message: `Subscription Id: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Subscription Id: ${id} was found`,
      data: subsToFilter,
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

const createSubscription = async (req, res) => {
  try {
    const { classes, members, date } = req.body;

    const newSubscription = await Subscription.create({
      classes,
      members,
      date,
    });
    res.status(201).json({
      message: 'Subscription was created successfully!',
      data: newSubscription,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `An error ocurred:\n ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const subscriptionController = {
  updateSubscription,
  deleteSubscription,
  filterSubscriptionById,
  getAllSubscriptions,
  createSubscription,
};

export default subscriptionController;
