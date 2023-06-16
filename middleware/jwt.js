import userCredential from "../model/user.js";
import jwt from "jsonwebtoken";
//import cookie-parser from "cookie-parser";
//const app = cookie-parser()


export const loginrequired = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Token: " + token);
  if (token) {
    const validatetoken = jwt.verify(token, process.env.JWT);
    console.log("this is validatetoken:" + validatetoken);
    if (validatetoken) {
      res.user = validatetoken._id;
      next();
    } else {
      console.log("token expires");
      res.render("./Login/Login", { errorMessage: "You are logout" });
    }
  } else {
    console.log("token not found!");
    res.render("./Login/Login", { errorMessage: "Please login" });
  }
};

export const verifyEmail = (req, res, next) => {
  try {
    userCredential.find(function (err, users) {
      if (err) {
        console.log(err);
        res.render("./Login/Login", { errorMessage: "Something went wrong, Please try to click your verification link again..." });
      }
      else {
        users.forEach(function (user) {
          if (user.email === req.body.email) {
            if (user.isVerified === true) {
              next();
            }
            else {
              console.log("Your email is not verified");
              res.render("./Login/Login", { errorMessage: "Your email is not verified" });
            }
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.render("./Login/Login", { errorMessage: "Something went wrong, Please try to click your verification link again..." });
  }
};

export default { loginrequired, verifyEmail };