const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')

const UserController = require('../../controller/UserController')

router.post('/register', UserController.newUser);
router.post('/login', UserController.login);
router.get('/refresh_token', UserController.refreshToken);
router.get('/logout', auth, UserController.logout)
router.put('/update_password',auth, UserController.updatePassword);
router.get('/infor', auth,  UserController.getUser)
//router.post('/list_all', auth, UserController.listAllUsers)

module.exports = router;