const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registController=async(req,res)=>{

    try{
            console.log(req.body);
        const existingUser=await userModel.findOne({email:req.body.email});
          console.log(existingUser);
          if (existingUser) {
            // User with the same email already exists
            return res.status(404).send({
              success: false,
              message: 'User already exists',
            });
          }

        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(req.body.password,salt);
        
        req.body.password=hashedpassword;

        //rest data excess
        console.log("YES")
        const user=new userModel(req.body);

        await user.save();
        return res.status(200).send({
            success:true,
            message:"User Registered Successfully",
            user,

        })

              
    } catch(error){
       console.log(error);
       res.status(500).send({
        success:false,
        message:"Error in Register API",
        error
       })
    }

 






};


//login call back
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid Credentials",
            });
        }
        //check role
        if (user.role !== req.body.role) {
            return res.status(500).send({
                success: false,
                message: "role dosent match",
            });
        }
        //compare password
        const comparePassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials",
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Login API",
            error,
        });
    }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        return res.status(200).send({
            success: true,
            message: "User Fetched Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "unable to get current user",
            error,
        });
    }
};

module.exports = { registController, loginController, currentUserController };