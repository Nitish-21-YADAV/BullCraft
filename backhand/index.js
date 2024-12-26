require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const RegisterModel = require("./model/RegisterModel")
const RegisterSchema = require("./schemas/RegisterSchema")
const cron = require("node-cron")
const nodemailer = require("nodemailer")
const { HoldingModel } = require("./model/HoldingModel");
const { PositionModel } = require("./model/PositionModel");
const { singupvalidation, loginvalidation } = require("./Middleware/AuthValidation")
const { signup, loginUp } = require("./controller/AuthController");
const { StocksModel } = require("./model/StocksModel");
const { OrderModel } = require("./model/OrderModel");
const { TargetModel } = require("./model/TargetModel")
const { UserModel } = require("./model/UserModel")    
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(cors());
// app.use(cors({
//     origin: 'https://bull-craft-fronthand.vercel.app',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//   }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

let userIdValue = null; 




app.get('/stocks', async (req, res) => {
    const stocks = await StocksModel.find()
    res.json(stocks)
})

app.get("/gettingHolding", async (req, res) => {
    const { userId } = req.query
    let holdingData = await HoldingModel.find({ userId: userId });
    res.json(holdingData);
});

app.get("/gettingOrders", async (req, res) => {
    const { userId } = req.query

    let OrderData = await OrderModel.find({ userId: userId });
    res.json(OrderData);
});

app.get("/gettingPosition", async (req, res) => {
    let PositionData = await PositionModel.find({});
    res.json(PositionData);
});




app.post('/sign', singupvalidation, signup);
app.post("/login", loginvalidation, loginUp);


app.post('/submit', async (req, res) => {
    try {
        const { email, fname, contact, country, lname, altcontact, altemail, state, address, work } = req.body;
        const existingUser = await RegisterModel.findOne({ email });      
        if (existingUser) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        const newUser = new RegisterModel({ email, fname, contact, country, lname, altcontact, altemail, state, address, work });
        await newUser.save()
        res.status(200).json({
            message: "Register successful",
            success: true
        });

    } catch (error) {
        console.error("Error in saving data:", error);
        res.status(500).json({
            message: "Internal server error in Register ",
            success: false,
        });
    }
});

app.post("/SellingShare", async (req, res) => {
    const { userId, qty, name } = req.body;
    try {
        const existingShare = await HoldingModel.findOne({ userId, name });
        if (existingShare) {
            const newOrder = new OrderModel({
                userId: userId,
                name: existingShare.name,
                qty: qty,
                avg: existingShare.avg,
                price: existingShare.price,
                bs: 'Sell'
            })
            await newOrder.save();
            existingShare.qty -= qty;
            await existingShare.save();
            res.json({ success: true, message: 'Quantity updated in holdings.' })
        }

    } catch (error) {
        console.log("500 wala :    ", error);
        res.status(500).json({ success: false, message: 'Error updating holdings.' });
    }

});

app.post('/BuyingShare', async (req, res) => {
    const { userId, name, quantity } = req.body;
    try {
        const existingShare = await HoldingModel.findOne({ userId, name }); 
        if (existingShare) {
            const newOrder = new OrderModel({
                userId: userId,
                name: existingShare.name,
                qty: quantity,
                avg: existingShare.avg,
                price: existingShare.price,
                bs: "BUY"
            })
            await newOrder.save();
            existingShare.qty += quantity;
            await existingShare.save();
            res.json({ success: true, message: 'Quantity updated in holdings.' })
        }

        else {

            const newshareName = String(name)
            const shareDetails = await StocksModel.findOne({ name })
            if (!shareDetails) {
                return res.status(404).json({ success: false, message: 'Complete the Requiremnets.' });
            }
            const newOrder = new OrderModel({
                userId: userId,
                name: shareDetails.name,
                qty: quantity,
                avg: shareDetails.avg,
                price: shareDetails.price,
                bs: "BUY"
            });
            const newUserShare = new HoldingModel({
                userId: userId,
                name: shareDetails.name,
                qty: quantity,
                avg: shareDetails.avg,
                price: shareDetails.price,
                net: shareDetails.net,
                day: shareDetails.day

            })
            await newUserShare.save();
            await newOrder.save();
            res.json({ success: true, message: 'Share added to holdings.' });
        }
    }
    catch (error) {
        console.log("500 wala :    ", error);
        res.status(500).json({ success: false, message: 'Error updating holdings.' });
    }
})

app.post('/TargetShare', async (req, res) => {
    const { userId, name, price, target } = req.body;
    userIdValue = userId
    try {
        console.log(userId, name, price, target);
        const userTargetModel = new TargetModel({
            userId: userId,
            name: name,
            price: price,
            target: target
        })
        await userTargetModel.save();
    }
    catch (error) {
        console.log("Error in Target", error);
    }
})

app.post("/Target", async (req, res) => {

    const { userId } = req.body
    const existingTarget = await TargetModel.findOne({ userId: userId });
    res.json(existingTarget)
})

const sendanotherEmail = async (userId, email, subjectEmail, feebackMessage) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.User_email,
            pass: process.env.User_key
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.User_email,
        subject: subjectEmail,
        text: ` The ${feebackMessage} . The userId is ${userId}`
    }

    try {
        await transporter.sendMail(mailOptions)
        return true
    } catch (error) {
        console.log("Error In Sending the Feedback.Please Try again ");
        return false
    }
}

app.post("/feedback", async (req, res) => {
    const { userId, email, subjectEmail, feebackMessage } = req.body
    if (!userId || !email || !subjectEmail || !feebackMessage) {
    return res.status(400).json({ 
        success: false, 
        message: "Complete all feedback fields and please send it again." 
    });
}

    else {
        const feedbackSent = await sendanotherEmail(userId, email, subjectEmail, feebackMessage)
        if (feedbackSent) {
            res.status(200).json({ success: true, message: "Feeback Is send.We will Reach Out in working 2 days" })
        }
        else {
            res.status(500).json({ success: false, message: "Feeback Is not send.Please send it again" })
        }
    }
})

const getUserEmailById = async (userId) => {
    const user = await UserModel.findOne({ _id: userId });
    console.log("email id: ", user);
    if (!user) {
        console.log("No user found with id:", userId);
    }
    return user?.email;
};
const sendEmail = async (userId, name, price) => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.User_email,
            pass: process.env.User_key
        },
    });
    const userEmail = await getUserEmailById(userId);

    const mailOptions = {
        from: process.env.User_email, 
        to: userEmail,
        subject: "Target Reached Notification",
        text: `Good news! Your target for ${name} has been reached. Current price: ${price}`,
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
cron.schedule("*/1 * * * *", async () => {
  
    const targetCount = await TargetModel.countDocuments();
    if (targetCount === 0) {
        return; 
    }
    else {

        try {
            let userId = userIdValue;
            const targets = await TargetModel.find({ userId: userId })
            const stocks = await StocksModel.find()
            for (const target of targets) {
                const stock = stocks.find((s) => s.name === target.name)
                if (stock && stock.price == target.target) {
                    sendEmail(target.userId, target.name, target.target)
                    await TargetModel.findByIdAndDelete(target._id)
                }
            }
        }
        catch (error) {
            console.log("Error in target match:", error);

        }
    }
})


app.listen(PORT, () => {
    console.log("Shri Ganesh");
    console.log(`http://localhost:${PORT}`);
    mongoose.connect(uri);
    console.log("Connected");

})  