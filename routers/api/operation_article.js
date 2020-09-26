const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Operation_Article = require('../../models/Operation_Article');
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
    check('qte_demande','num_document is required')
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
    document,
    article_entre,
    qte_distribue,
    observation,
    qte_consomme,
    qte_restante,
}= req.body;

//Build profile objects
const Fields = {};
Fields.owner = req.user.id;
if(article) Fields.article = article;
if(article_entre) Fields.article_entre = article_entre;
if(qte_demande) Fields.qte_demande = qte_demande;
if(qte_distribue) Fields.qte_distribue = qte_distribue;
if(qte_consomme) Fields.qte_consomme = qte_consomme;
if(observation) Fields.observation = observation;
if(qte_restante) Fields.qte_restante = qte_restante;

try{
    let element = await Operation_Article.findOne({user:req.user.id});
    element = new Operation_Article(Fields);
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
        const elements = await Operation_Article.find().populate('owner',['name','avatar']);
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
        await Operation_Article.findOneAndRemove({_id:req.params.id});
        
        res.json({msg:'Element Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Operation_Article.deleteMany({});
        
        res.json({msg:'all Elements are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;