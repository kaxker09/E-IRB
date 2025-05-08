const express = require('express');
const router = express.Router();
const { result } = require('lodash');
const { title } = require('process');
const authController = require('../controllers/auth.Controller')
const {requiredAuth, checkUser, redirectIfLoggedIn, checkRole} = require('../middleware/authMiddleware');
const userController = require('../user.Controller/user.controller');
const front = require('../frontend/front')

router.get('*', checkUser)

router.get('/',redirectIfLoggedIn, authController.homepage_get);
router.post('/', authController.login_post);


router.get('/signup',redirectIfLoggedIn, authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login',redirectIfLoggedIn, authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

router.get('/verify/:uniqueString', authController.verify_get);

router.get('/requestResetPassword', authController.requestResetPaswsword_get);
router.post('/requestResetPassword', authController.requestResetPaswsword_post);

router.get('/resetPassword/:uniqueReset', authController.resetPassword_get);
router.post('/resetPassword', authController.resetPassword_post);

router.get('/user', requiredAuth, checkRole('pchor'), front.user_get);
router.post('/user', checkRole('pchor'), userController.status_post);

router.get('/dyzurny',requiredAuth,checkRole('dyzurny'), front.admin_get);

router.get('/dyzurny/1pluton',requiredAuth,checkRole('dyzurny'), front.firstplatoon_get);
router.get('/dyzurny/2pluton', checkRole('dyzurny'), front.secondplatoon_get);
router.get('/dyzurny/3pluton',requiredAuth,checkRole('dyzurny'), front.thirdplatoon_get);
router.get('/dyzurny/4pluton', checkRole('dyzurny'), front.fourthplatoon_get);

module.exports = router;
