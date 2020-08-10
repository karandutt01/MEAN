const router = require('express').Router()
const forget = require('../controllers/ForgotPassword')
const roleRights = require('../controllers/RoleRightCtrler')

const multer = require('../../utils/multer')

const Auth = require('../controllers/auth')
let auth = new Auth()

router.post('/register', auth.register)
router.post('/login', auth.login)
router.post('/forgotEmail', forget.forgetbyemail)
router.put('/reset-password', forget.resetPassword)
router.get('/rolerights', roleRights.getRoleRights)
router.put('/updatemenus', roleRights.editMenus)
router.post('/bannerimages/upload', multer.single('avatar'),roleRights.banner)
router.get('/displayimages', roleRights.displayImages)
router.delete('/delete/:id/:name', roleRights.deleteMenu)
router.post('/addsubmenu/:id', Addsubmenu)
router.get('/listsubmenu', roleRights.getSubMenu)
// router.get('/bannertable', roleRights.bannertable)

module.exports = router