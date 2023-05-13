const Subscription = require('../models/Subscription');

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptionData = await Subscription.find();
    res.status(200).json({
      message: 'Subscription list found',
      data: subscriptionData,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    });
  }
};

const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundSubscription = await Subscription.findById(id);
    res.status(200).json({
      message: 'Subscription found!',
      data: foundSubscription,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    });
  }
};

// const createSubscription = async (req, res) => {
//   try {
//     const { class, members, date } = req.body;

//     const newSubscription = await Subscription.create({
//       class,
//       members,
//       date,
//     })
//     res.status(201).json({
//       message: 'Subscription was created',
//       data: newSubscription,
//       error: false,
//     })
//   } catch (error) {
//     res.status(400).json({
//       message: 'Error creating subscription',
//       error,
//     })
//   }
// }

const subscriptionControllers = {
  getAllSubscriptions,
  getSubscriptionById,
  // createSubscription,
};

export default subscriptionControllers;
