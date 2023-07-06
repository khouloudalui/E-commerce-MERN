const User = require("../models/User");
//EDIT
exports.EditUSer = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
};
//DELETE USER
exports.DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted ...");
  } catch (error) {
    res.status(500).send("server error");
  }
};
//GET USER
exports.GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (error) {
    res.status(500).send("server error");
  }
};
