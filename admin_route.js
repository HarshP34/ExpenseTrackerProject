const express=require('express');

const router=express.Router();

const adminController=require('../controllers1/admin');
const Authentication=require('../middleware/auth');

router.post('/expense',Authentication.authentication,adminController.addUser);

router.get('/expense',Authentication.authentication,adminController.getUsers);

router.put('/edit-expense/:id',adminController.posteditUser);

router.get('/edit-expense/:id',adminController.geteditUser);

router.delete('/delete-expense/:id',Authentication.authentication,adminController.deleteUserById)

router.post('/user/signup',adminController.postSignup);

router.get('/user/signup',adminController.getSignup);

router.post('/user/login',adminController.postLogin);

module.exports=router;