const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Document_Entre = require('../../models/Document_Entre');
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
    check('ref_document_entr','Reference de Document is required')
    .not()
    .isEmpty(),
    check('article','articles is required')
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
    code_service,
    code_type_doc,
    code_doc,
    ref_document_entr,
    observation,
    date_doc,
    magasin,
    article

}= req.body;

//Build profile objects
const Fields = {};
Fields.owner = req.user.id;
if(code_service) Fields.code_service = code_service;
if(code_doc) Fields.code_doc = code_doc;
if(ref_document_entr) Fields.ref_document_entr = ref_document_entr;
if(code_type_doc) Fields.code_type_doc = code_type_doc;
if(observation) Fields.observation = observation;
if(date_doc) Fields.observation = date_doc;
if(magasin) Fields.magasin = magasin;
if(article) Fields.articles = article;

try{

    articleItem = new Document_Entre(Fields);
    await articleItem.save()
    res.json(articleItem);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const articles = await Document_Entre.find()
        .populate('owner',['name'])
        .populate('code_type_doc',['description_Fr'])
        .populate('code_doc',['num_document'])
        .populate('code_service',['description_Fr']);
        res.json(articles);
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
        await Document_Entre.findOneAndRemove({_id:req.params.aid});

        res.json({msg:'Document Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Document_Entre.deleteMany({});

        res.json({msg:'all Documents are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
