const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Etat = require('../../models/Etat');
const User = require('../../models/User');


//@route GET api/profile
//@desc create or update user profile
//@route private
router.post('/',[auth,
    [
    check('description_Fr','Description is required')
    .not()
    .isEmpty(),
    check('description_Ar','Description is required')
    .not()
    .isEmpty()
]
],async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

const {
    description_Ar,
    description_Fr,
    num_Ordre
}= req.body;

//Build type objects
const Fields = {};
Fields.owner = req.user.id;
if(description_Ar) Fields.description_Ar = description_Ar;
if(description_Fr) Fields.description_Fr = description_Fr;
if(num_Ordre) Fields.num_Ordre = num_Ordre;


try{
    type = new Etat(Fields);
    await type.save()
    res.json(type);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const types = await Etat.find().populate('owner',['name']);
        res.json(types);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Delete Type
router.delete('/:type_id',auth,async (req,res)=>{
    try {

        //remove type
        await Etat.findOneAndRemove({_id:req.params.type_id});
        res.json({msg:'Element Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Etat.deleteMany({});

        res.json({msg:'all Elements are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
