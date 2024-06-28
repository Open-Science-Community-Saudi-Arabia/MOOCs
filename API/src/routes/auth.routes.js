const express = require("express");
const { basicAuth } = require("../middlewares/auth");
const rbac = require("../middlewares/permission_handler");
const authController = require("../controllers/auth.controllers");
const router = express.Router();

router
  .post("/signup", authController.signup)

  .post("/login-admin", authController.loginSuperAdmin)

  .post(
    "/user/activate/:email",
    basicAuth(),
    rbac("SuperAdmin"),
    authController.activateUserAccount
  )
  .post(
    "/user/deactivate/:email",
    basicAuth(),
    rbac("SuperAdmin"),
    authController.deactivateUserAccount
  )

  .post("/login", authController.login)
  .post("/forgotpassword", authController.forgetPassword)
  .patch(
    "/resetpassword/",
    basicAuth("password_reset"),
    authController.resetPassword
  )
  .post("/googlesignin", authController.googleSignin)
  .post("/google/callback", authController.googleSignin)
  .get("/verifyemail/:token", authController.verifyEmail)
  .get("/user", basicAuth(), authController.getLoggedInUser);

module.exports = router;
