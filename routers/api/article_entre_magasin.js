const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Article_Entre_Magasin = require('../../models/Article_Entre_Magasin');
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
     check('qte_entre','quantite is required')
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
    prix_unitaire,
    qte_entre,
    observation
}= req.body;

//Build profile objects
const Fields = {};
Fields.owner = req.user.id;
if(article) Fields.article = article;
if(prix_unitaire) Fields.prix_unitaire = prix_unitaire;
if(qte_entre) Fields.qte_entre = qte_entre;
if(observation) Fields.observation = observation;

try{
    element = new Article_Entre_Magasin(Fields);
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
        const elements = await Article_Entre_Magasin.find().populate('owner',['name','avatar']);
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
        await Article_Entre_Magasin.findOneAndRemove({_id:req.params.id});

        res.json({msg:'Element Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Article_Entre_Magasin.deleteMany({});

        res.json({msg:'all Elements are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
