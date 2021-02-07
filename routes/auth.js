const  router = require('express').Router();
const User = require('../modle/User');
//const jwt = require('jsonwebtoken');

const { registerValidation,loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/register',async (req,res)=>{
    const{error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   // Check if the user is already
   const emailExist = await User.findOne({email: req.body.email});
   if(emailExist) return res.status(400).send('Email already exists');

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    

    const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: hashedPassword 
    });
    try{
       const savedUser = await user.save();
       res.send({user: user._id});
    }catch(err){
       res.status(400).send(err);
   }
});

//LOGIN
router.post('/login',async(req,res)=>{
    const{error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Email exists
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email is Wrong');

    //Password Correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    const token = jwt.sign({user: user._id},'my_secret token')
    res.json({ token: token});
     
   //   res.header('auth-token', token);

 //   res.send('Logged in!')
   

});
//sudo lsof -i :3000

module.exports = router;