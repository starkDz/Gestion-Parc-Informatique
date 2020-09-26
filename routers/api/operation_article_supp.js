const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Operation_Article_Supp = require('../../models/Operation_Article_Supp');
//@route GET api/profile/me
//@desc  current user s router
//@route private
/*
router.get('/me',auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user : req.user.id}).populate('user',
        ['name','avatar']);

        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server Error');
    }
});
*/
//@route GET api/profile
//@desc create or update user profile
//@route private

router.post('/',[auth,
    [
    check('qte_supp','num_document is required')
    .not()
    .isEmpty()
]
],async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log('Her We go');
        return res.status(400).json({ errors: errors.array()});
    }
const {
    article,
    article_entre,
    qte_supp
}= req.body;

//Build profile objects
const Fields = {};
Fields.owner = req.user.id;
if(article) Fields.article = article;
if(article_entre) Fields.article_entre = article_entre;
if(qte_supp) Fields.qte_supp = qte_supp;

try{
    let element = await Operation_Article_Supp.findOne({user:req.user.id});
    element = new Operation_Article_Supp(Fields);
    await element.save()
    res.json(element);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const elements = await Operation_Article_Supp.find().populate('owner',['name','avatar']);
        res.json(elements);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Get Proofile with User Id
/*
router.get('/:article_id',async (req,res)=>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id }).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind=='ObjectId'){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.status(500).send('Server Error');
    }
});

*/
//Delete User, profile and posts      api/profile   private
router.delete('/:id',auth,async (req,res)=>{
    try {

        //remove type
        await Operation_Article_Supp.findOneAndRemove({_id:req.params.id});
        
        res.json({msg:'Element Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Operation_Article_Supp.deleteMany({});
        
        res.json({msg:'all Elements are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;