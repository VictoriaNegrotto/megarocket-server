import Subscription from '../models/Subscription';

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
      message: 'An error ocurred',
      data: undefined,
      error: true,
    });
  }
};

const createSubscription = async (req, res) => {
  try {
    const { classInSubscription, members, date } = req.body;

    const newSubscription = await Subscription.create({
      class: classInSubscription,
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
      message: 'Error creating subscription',
      data: undefined,
      error: true,
    });
  }
};

const subscriptionControllers = {
  getAllSubscriptions,
  createSubscription,
};

export default subscriptionControllers;
