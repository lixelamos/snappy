
module.exports.register = async  (req, res, next) => {
    const {username, email,password}= req.body;
    const usernameCheck= await user.findOne({username});
    if (usernameCheck)
    return res.json({msg:"Username already exists",status:false});
    const emailCheck= await user.findOne({email});
    if (emailCheck)
    return res.json({msg:"Email already exists",status:false});
    const hashedPassword = await brcypt.hashPassword(password,10);
    const user = new User({
        email,
        username,
        password: hashedPassword,
    });
    try{
        await user.save();
        return res.json({status:true,msg:"User created successfully"});
    }catch(error){
        
    };
};
module.exports.login =async (req,res)=>{   
 const {username,password}= req.body;
const user= await User.findOne({username});
if (!user)
return res.json({status:false, msg:'User not found'});
const isPasswordValid = await brcypt.comparePassword(password,user.password);
if (!isPasswordValid) 
return res.json({status:false, msg:'incorect username or Wrong password'});
return res.json({status:true,msg:"User logged in successfully"});
};
delete user.password;
if (emailCheck)
return res.json({msg:"Email already exists",status:false});
try{
    await user.save();
    return res.json({status:true,msg:"User created successfully"});
}catch(error){
    };