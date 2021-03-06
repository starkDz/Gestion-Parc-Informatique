const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

//@route POST api/users
//@desc  Register User
//@route Public

router.post('/',[
    check('name',
        'Name is required').not().isEmpty(),
    check('email',
        'Please include a valide email').isEmail(),
    check('password',
        'Please enter a password with 6 or more characters').isLength({min:6})
    ],
    async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name,email,password} = req.body;

    try{

    //See if user exists
        let user = await User.findOne({email});
        if(user){
           return res.status(400).json({errors:[{msg: 'User Already Exists'}]});
        }
    //Get users gravatar
        const avatar = gravatar.url(email,{
            s:"200",
            r:"pg",
            d:"mm"
        });
        user  = new User({
            name,
            email,
            avatar,
            password
        });

    //Encrypt Password
        const salt = await bcrypt.genSalt(10);

        user.password=await bcrypt.hash(password,salt);
        await user.save();

    //Return jsonwebtoken

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 36000},
            (err, token)=>{
                if(err) throw err;
                res.json({token});
            } )

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }


});
// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const users = await User.find().populate('owner',['name']);
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Delete Type
router.delete('/:user_id',auth,async (req,res)=>{
    try {

        //remove type
        await User.findOneAndRemove({_id:req.params.user_id});
        res.json({msg:'Element Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await User.deleteMany({});

        res.json({msg:'all Elements are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports= router;
