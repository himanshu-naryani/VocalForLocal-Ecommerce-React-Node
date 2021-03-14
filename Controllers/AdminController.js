const UserModel = require('../Models/Users')
const makeAdmin= async(req,res)=>
{
    var emailCount=0;
    await UserModel.countDocuments({userEmail:req.body.userEmail},(err,count)=>
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            emailCount=count;
        }
    })
    if(emailCount==1)
    {      
    try{
        
        await UserModel.updateOne({userEmail:req.body.userEmail},{$set:{userIsAdmin:true}})
        
        return res.status(200).json({message:"Admin making succesful"})
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}
    else
    return res.status(400).json({ message: "invalid email!" })

}
module.exports={
    makeAdmin
}