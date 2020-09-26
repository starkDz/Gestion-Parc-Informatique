const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Service = require('../../models/Service');
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
    parent,
    fils,
    code_ser,
    description_Ar,
    description_Fr,
    num_Ordre
}= req.body;

//Build type objects
const Fields = {};
Fields.owner = req.user.id;
if(parent)Fields.parent=parent;
if(description_Ar) Fields.description_Ar = description_Ar;
if(description_Fr) Fields.description_Fr = description_Fr;
if(code_ser) Fields.code_ser = code_ser;
if(num_Ordre) Fields.num_Ordre = num_Ordre;
if(fils){
    Fields.fils = fils.split(',').map(fils =>fils.trim());
}

try{
    type = new Service(Fields);
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
        const elements = await Service.find();
        res.json(elements);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Delete Type
router.delete('/:type_id',auth,async (req,res)=>{
    try {

        //remove type
        await Service.findOneAndRemove({_id:req.params.type_id});
        res.json({msg:'Element Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.get('/:id',auth,async (req,res)=>{
    try {

        //remove type
        const elements = await Service.aggregate([
            //{ $match: { _id:req.params.id  } }, // Only look at Luke Skywalker
            {
              $graphLookup: {
                from: 'Service', // Use the customers collection
                startWith: '$code_ser', // Start looking at the document's `friends` property
                connectFromField: 'code_ser', // A link in the graph is represented by the friends property...
                connectToField: 'parent', // ... pointing to another customer's _id property
                maxDepth: 1, // Only recurse one level deep
                as: 'connections' // Store this in the `connections` property
              }
            }
          ]);
        res.json(elements);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Service.deleteMany({});
        
        res.json({msg:'all Elements are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;