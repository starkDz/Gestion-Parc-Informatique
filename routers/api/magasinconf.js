const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Magasin = require('../../models/Magasin');
const User = require('../../models/User');


//@route GET api/profile
//@desc create or update user profile
//@route private
router.post('/',[auth,
    [
    check('description_Fr','Description is required')
    .not()
    .isEmpty()
]
],async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

const {
    description_Fr,
    num_Ordre
}= req.body;

//Build type objects
const MagasinFields = {};
MagasinFields.owner = req.user.id;
if(description_Fr) MagasinFields.description_Fr = description_Fr;
if(num_Ordre) MagasinFields.num_Ordre = num_Ordre;


try{
    magasin = new Magasin(MagasinFields);
    await magasin.save()
    res.json(magasin);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const types = await Magasin.find().populate('owner',['name']);
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
        await Magasin.findOneAndRemove({_id:req.params.type_id});
        res.json({msg:'Store Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Magasin.deleteMany({});

        res.json({msg:'all Stores are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
