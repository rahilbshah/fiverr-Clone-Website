import User from '../models/user.model.js'
import createError from '../utils/createError.js';


export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send("User is Deleted!");
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};