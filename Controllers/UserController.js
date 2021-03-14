const UserModel = require("../Models/Users");
const { v4: uuidv4 } = require("uuid");
const { use } = require("../Routes/routes");
const bcrypt = require("bcrypt");
const validations = require("../Validations/userValidation");

const startSelling = async (req, res, next) => {

  try {
    const user = await UserModel.find({ userEmail: req.query.email });
    return res.status(200).json(user)
  }
  catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message })
  }
}


const createUser = async (req, res, next) => {
  try {
    const user = new UserModel();
    user.userId = uuidv4();
    user.userName = req.body.userName;
    user.userEmail = req.body.userEmail;
    const encryptedPassword = await bcrypt.hash(req.body.userPassword, 8);
    user.userPassword = encryptedPassword;
    user.userMobile = req.body.userMobile;
    user.userAddress = req.body.userAddress;
    user.userState = req.body.userState;

    user.userIsSeller = req.body.userIsSeller || false;
    user.userIsAdmin = req.body.userIsAdmin;
    var emailCount = 0;
    await UserModel.countDocuments(
      { userEmail: user.userEmail },
      (err, count) => {
        if (err) {
          console.log(err);
        } else {
          if (count > 0) {
            emailCount = count;
          }
        }
      }
    );
    if (emailCount > 0) {
      return res.status(303).json({ message: "email is already exist" });
    } else {
      if (user.userIsSeller) {
        user.userBankAccountNumber = req.body.userBankAccountNumber;
        user.userIfscCode = req.body.userIfscCode;
        user.userGstNumber = req.body.userGstNumber;
        user.userPanNumber = req.body.userPanNumber;
        user.userAadharNumber = req.body.userAadharNumber;
      }
    }
    await validations.newUserValidation.validateAsync(req.body);
    await user.save();
    return res.status(200).json({ message: user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message + "in  catch" });
  }
};
const userSignIn = async (req, res, next) => {
  const email = req.body.userEmail;
  const result = await UserModel.findOne(
    { $and: [{ userEmail: email }] },
    (err, result) => {

      if (result == null) {
        return res.status(200).json({ userdata: null });
      } else if (result) {
        bcrypt
          .compare(req.body.userPassword, result.userPassword)
          .then((authentication) => {
            if (authentication) {

              return res.status(200).json({ userdata: result });
            } else {

              return (res.status(200).json({ userdata: null }));
            }
          })
          .catch((err) => console.error(err));

      }
    }
  );
};

const getProfileDetails = async (req, res, next) => {
  try {
    let userDetails = await UserModel.find({ "userEmail": req.params.userEmail })
    return res.status(201).json({ message: "Successfully found user", data: userDetails })
  }
  catch (err) {
    return res.status(400).json({ message: err.message })
  }
};
const userVerification = async (req, res, next) => {
  await UserModel.find({ userMobile: req.body.userMobile }, (err, result) => {
    if (err) {
      return res.status(400).json(err.message);
    } else if (result.length != 0) {
      return res.status(200).json({ message: true });
    }
    else {
      return res.status(200).json({ message: false });
    }

  });
};




const updatePassword = async (req, res, next) => {
  try {
    const givenMobile = req.body.userMobile;
    const filter = { "userMobile": givenMobile };
    const encryptedPassword = await bcrypt.hash(req.body.userPassword, 8);
    const needupadte = {
      "userPassword": encryptedPassword
    }
    const updatedPassword = await UserModel.findOneAndUpdate(filter, needupadte, { new: true });

    return res.json({ message: updatedPassword });
  } catch (error) {
    console.log(error);
    return res.json({ message: null })
  }
}
const getOrder = async (req, res, next) => {
  console.log("before try")
  try {
    console.log(req.params.userEmail)
    let users = await UserModel.find({ userEmail: req.params.userEmail });
    console.log("find")
    return res.status(201).json(users);
  }
  catch (err) {
    console.log("not working")
    return res.status(400).json({ message: err.message });
  }
}
const updateUserDetails = async (req, res, next) => {
  try {
    let filter = { "_id": req.params.id };
    let updatedUser = await UserModel.findOneAndUpdate(filter, req.body, { new: true });
    return res.status(201).json({ message: "User data updated", data: updatedUser });
  }
  catch (err) {
    return res.status(400).json(err.message);
  }
}

const addProductToCart = async (req, res, next) => {
  // try{
  //   let cart = await UserModel.find({userEmail : req.body.userEmail})
  //   let updatedcart = [...cart, req.body.product]
  // }
  const isValidId = await (UserModel.exists({ userEmail: req.body.userEmail }))
  if (!isValidId) return res.status(400).json({ message: "Email Id is not registered with us!!" })

  let cart = (await UserModel.find({ userEmail: req.body.userEmail }, 'userCart'))[0].userCart

  for (let i = 0; i < cart.length; i++) {
    console.log(cart.length)
    if (cart[i].productId === req.body.product.productId) {
      cart[i].productQuantity += req.body.product.productQuantity
      try {
        await UserModel.updateOne({ userEmail: req.body.userEmail }, { $set: { userCart: cart } })
        return res.status(200).json({ message: "Product added to the existing cart successfully!!" })
      }
      catch (err) {
        return res.status(400).json({ message: "Failed to add the product to the cart!!" })
      }
    }
  }
  UserModel.updateOne(
    { userEmail: req.body.userEmail },
    { $push: { userCart: req.body.product } },
    (error, success) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: "Failed to add the product to the cart!!" })
      } else {
        console.log(success);
        return res.status(200).json({ message: "Product added to the existing cart successfully!!" })
      }
    });
}
const cancelOrder = async (req, res) => {
  console.log("data in the controller:")

  try {

    let order = await UserModel.findOneAndUpdate({ userEmail: req.body.email, "userOrderHistory._id": req.body.orderId },
      { $set: { "userOrderHistory.$.isCancelled": true } }, { new: true });

    console.log("data: " + order)

    return res.status(201).json({ message: "order cancelled from the order history successfully!!", data: order });

  }
  catch (err) {
    return res.status(400).json({ message: err })
  }
}
const deleteProductInCart = async (req, res, next) => {
  console.log("Deleteing ....")
  const isValidId = await (UserModel.exists({ userEmail: req.body.userEmail }))
  if (!isValidId) return res.status(400).json({ message: "Email is not registered with us!!" })
  try {
    let cart = (await UserModel.find({ userEmail: req.body.userEmail }, 'userCart'))[0].userCart
    for (let i = 0; i < cart.length; i++) {
      console.log("cart length before delete is" + cart.length)
      if (cart[i].productId === req.body.productId) {

        cart.splice(i, 1)
        try {
          await UserModel.updateOne({ userEmail: req.body.userEmail }, { $set: { userCart: cart } })
          return res.status(200).json({ message: "Product deleted from the  cart successfully!!" })
        }
        catch (err) {
          return res.status(400).json({ message: "Failed to delete product to the cart!!" })
        }
      }
    }

  }
  catch (err) {
    return res.status(400).json({ message: "Unable to delete the item from the cart" })
  }
}

module.exports = {
  createUser,
  userSignIn,
  getProfileDetails,
  updatePassword,
  startSelling,
  updateUserDetails,
  userVerification,
  getOrder,
  addProductToCart,
  deleteProductInCart,
  cancelOrder

};
