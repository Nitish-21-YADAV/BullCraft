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

const AuthRouter = require("./Routes/AuthRouter")
const { singupvalidation, loginvalidation } = require("./Middleware/AuthValidation")
const { signup, loginUp } = require("./controller/AuthController");
const { holdings } = require("../new_fronthand/src/dashboard/data/data");
const { StocksModel } = require("./model/StocksModel");
const { OrderModel } = require("./model/OrderModel");
const { TargetModel } = require("./model/TargetModel")
const { UserModel } = require("./model/UserModel")    
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

let userIdValue = null;

app.post('/testsss', (req, res) => {
    res.send("Done Bro ");
})
router.post('/tests', (req, res) => {
    res.send("Done Bro ");
})



// ----One time set up only in case no data found from api it should display the existing data from database------
// app.get("/addholdings",async(req,res)=>{
//     let tempHolding =[
//         {
//           name: "BHARTIARTL",
//           qty: 2,
//           avg: 538.05,
//           price: 541.15,
//           net: "+0.58%",
//           day: "+2.99%",
//         },
//         {
//           name: "HDFCBANK",
//           qty: 2,
//           avg: 1383.4,
//           price: 1522.35,
//           net: "+10.04%",
//           day: "+0.11%",
//         },
//         {
//           name: "HINDUNILVR",
//           qty: 1,
//           avg: 2335.85,
//           price: 2417.4,
//           net: "+3.49%",
//           day: "+0.21%",
//         },
//         {
//           name: "INFY",
//           qty: 1,
//           avg: 1350.5,
//           price: 1555.45,
//           net: "+15.18%",
//           day: "-1.60%",
//           isLoss: true,
//         },
//         {
//           name: "ITC",
//           qty: 5,
//           avg: 202.0,
//           price: 207.9,
//           net: "+2.92%",
//           day: "+0.80%",
//         },
//         {
//           name: "KPITTECH",
//           qty: 5,
//           avg: 250.3,
//           price: 266.45,
//           net: "+6.45%",
//           day: "+3.54%",
//         },
//         {
//           name: "M&M",
//           qty: 2,
//           avg: 809.9,
//           price: 779.8,
//           net: "-3.72%",
//           day: "-0.01%",
//           isLoss: true,
//         },
//         {
//           name: "RELIANCE",
//           qty: 1,
//           avg: 2193.7,
//           price: 2112.4,
//           net: "-3.71%",
//           day: "+1.44%",
//         },
//         {
//           name: "SBIN",
//           qty: 4,
//           avg: 324.35,
//           price: 430.2,
//           net: "+32.63%",
//           day: "-0.34%",
//           isLoss: true,
//         },
//         {
//           name: "SGBMAY29",
//           qty: 2,
//           avg: 4727.0,
//           price: 4719.0,
//           net: "-0.17%",
//           day: "+0.15%",
//         },
//         {
//           name: "TATAPOWER",
//           qty: 5,
//           avg: 104.2,
//           price: 124.15,
//           net: "+19.15%",
//           day: "-0.24%",
//           isLoss: true,
//         },
//         {
//           name: "TCS",
//           qty: 1,
//           avg: 3041.7,
//           price: 3194.8,
//           net: "+5.03%",
//           day: "-0.25%",
//           isLoss: true,
//         },
//         {
//           name: "WIPRO",
//           qty: 4,
//           avg: 489.3,
//           price: 577.75,
//           net: "+18.08%",
//           day: "+0.32%",
//         },
//       ]

//       tempHolding.forEach((item)=>{
//        let newHolding = new HoldingModel({
//         name:item.name,
//         qty:item.qty,
//         avg:item.avg,
//         price:item.price,
//         net:item.net,
//         day:item.day
//         })
//         newHolding.save();
//       });
//       res.send("Done bro !");
// })


// app.get("/addstocks",async(req,res)=>{
//     try{
//     let tempstocks = [
//         { name: "BHARTIARTL", qty: 1, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
//         { name: "HDFCBANK", qty: 1, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
//         { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
//         { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
//         { name: "ITC", qty: 1, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
//         { name: "KPITTECH", qty: 1, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
//         { name: "M&M", qty: 1, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
//         { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
//         { name: "SBIN", qty: 1, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
//         { name: "SGBMAY29", qty: 1, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
//         { name: "TATAPOWER", qty: 1, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
//         { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
//         { name: "WIPRO", qty: 1, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
//         { name: "ADANIPORTS", qty: 1, avg: 653.4, price: 688.9, net: "+5.43%", day: "+0.89%" },
//         { name: "BAJAJ-AUTO", qty: 1, avg: 3657.2, price: 3780.1, net: "+3.36%", day: "+0.19%" },
//         { name: "BPCL", qty: 1, avg: 360.5, price: 340.7, net: "-5.50%", day: "-0.90%", isLoss: true },
//         { name: "COALINDIA", qty: 1, avg: 149.3, price: 167.4, net: "+12.12%", day: "+0.15%" },
//         { name: "DRREDDY", qty: 1, avg: 4178.4, price: 4352.6, net: "+4.16%", day: "-1.12%", isLoss: true },
//         { name: "EICHERMOT", qty: 1, avg: 2750.8, price: 2649.1, net: "-3.70%", day: "+0.25%", isLoss: true },
//         { name: "HCLTECH", qty: 1, avg: 1034.7, price: 1108.3, net: "+7.11%", day: "+0.72%" },
//         { name: "HEROMOTOCO", qty: 1, avg: 2892.3, price: 2937.7, net: "+1.57%", day: "+1.03%" },
//         { name: "ICICIBANK", qty: 1, avg: 715.6, price: 738.9, net: "+3.25%", day: "-0.12%", isLoss: true },
//         { name: "JSWSTEEL", qty: 1, avg: 380.3, price: 399.8, net: "+5.13%", day: "+1.43%" },
//         { name: "MARUTI", qty: 1, avg: 7350.6, price: 7899.2, net: "+7.46%", day: "+0.44%" },
//         { name: "NTPC", qty: 1, avg: 120.4, price: 134.8, net: "+11.96%", day: "-0.08%", isLoss: true },
//         { name: "ONGC", qty: 1, avg: 98.2, price: 104.7, net: "+6.61%", day: "+1.12%" },
//         { name: "POWERGRID", qty: 1, avg: 186.1, price: 200.5, net: "+7.75%", day: "+0.92%" },
//         { name: "TITAN", qty: 1, avg: 1628.2, price: 1777.9, net: "+9.21%", day: "+0.53%" },
//         { name: "ULTRACEMCO", qty: 1, avg: 4562.3, price: 4711.8, net: "+3.28%", day: "-0.32%", isLoss: true },
//         { name: "VEDL", qty: 1, avg: 230.9, price: 243.6, net: "+5.51%", day: "+0.21%" },
//         { name: "HDFC", qty: 1, avg: 2305.9, price: 2354.3, net: "+2.10%", day: "+1.29%" },
//         { name: "SBILIFE", qty: 1, avg: 920.4, price: 970.7, net: "+5.47%", day: "-0.44%", isLoss: true },
//         { name: "AXISBANK", qty: 1, avg: 725.8, price: 745.2, net: "+2.67%", day: "+1.54%" },
//         { name: "GRASIM", qty: 1, avg: 1500.6, price: 1480.9, net: "-1.31%", day: "+0.83%", isLoss: true },
//         { name: "INDUSINDBK", qty: 1, avg: 1010.9, price: 1050.5, net: "+3.92%", day: "-0.35%", isLoss: true },
//         { name: "IOC", qty: 1, avg: 82.1, price: 86.8, net: "+5.73%", day: "+0.27%" },
//         { name: "TATACONSUM", qty: 1, avg: 616.8, price: 630.7, net: "+2.26%", day: "+0.63%" },
//         { name: "ADANIGREEN", qty: 1, avg: 1100.9, price: 1095.4, net: "-0.50%", day: "+0.17%", isLoss: true },
//         { name: "ASIANPAINT", qty: 1, avg: 3052.6, price: 3175.1, net: "+4.02%", day: "+1.32%" },
//         { name: "BAJAJFINSV", qty: 1, avg: 14560.4, price: 14899.5, net: "+2.33%", day: "+0.90%" },
//         { name: "HINDALCO", qty: 1, avg: 325.8, price: 349.4, net: "+7.22%", day: "+1.11%" },
//         { name: "DIVISLAB", qty: 1, avg: 4451.7, price: 4332.9, net: "-2.67%", day: "+0.56%", isLoss: true },
//         { name: "TECHM", qty: 1, avg: 960.4, price: 995.8, net: "+3.68%", day: "-0.98%", isLoss: true }
//       ]
//       tempstocks.forEach((item)=>{
//         let newStocksModel = new StocksModel({
//         name:item.name,
//         qty:item.qty,
//         avg:item.avg,
//         price:item.price,
//         net:item.net,
//         day:item.day
//         })
//         newStocksModel.save();
//       })
//       res.send("Done ") 
//     }
//     catch (error) {
//         console.error("Error adding stocks:", error);
//         res.status(500).send("Error adding stocks");
//     }
// })


// app.get("/addpositions",async(req,res)=>{
//     let tempoPosition = [
//         {
//           product: "CNC",
//           name: "EVEREADY",
//           qty: 2,
//           avg: 316.27,
//           price: 312.35,
//           net: "+0.58%",
//           day: "-1.24%",
//           isLoss: true,
//         },
//         {
//           product: "CNC",
//           name: "JUBLFOOD",
//           qty: 1,
//           avg: 3124.75,
//           price: 3082.65,
//           net: "+10.04%",
//           day: "-1.35%",
//           isLoss: true,
//         },
//       ]
//       tempoPosition.forEach((item)=>{
//         let newProsition = new PositionModel ({
//             product:item.product,
//             name: item.name,
//             qty:item.qty,
//             avg:item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss:item.isLoss
//         }) 
//         newProsition.save();
//       });
//       res.send("Done for this too bro !");
// })
// ------------------------------------------------New Stock data --------------------------------
// import {mystocks} from "../new_fronthand/src/dashboard/data/data";
// const  {mystocks} = require("../new_fronthand/src/dashboard/data/data");
// app.get('/addingstocks',(req,res)=>{
//     // let mystocks=[
//     //     { name: "BHARTIARTL", qty: 1, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%", isLoss: false },
//     //     { name: "HDFCBANK", qty: 1, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%", isLoss: false },
//     //     { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%", isLoss: false },
//     //     { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: false },
//     //     { name: "ITC", qty: 1, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%", isLoss: false },
//     //     { name: "KPITTECH", qty: 1, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%", isLoss: false },
//     //     { name: "M&M", qty: 1, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
//     //     { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%", isLoss: true },
//     //     { name: "SBIN", qty: 1, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: false },
//     //     { name: "SGBMAY29", qty: 1, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%", isLoss: true },
//     //     { name: "TATAPOWER", qty: 1, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: false },
//     //     { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: false },
//     //     { name: "WIPRO", qty: 1, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%", isLoss: false },
//     //     { name: "ADANIPORTS", qty: 1, avg: 653.4, price: 688.9, net: "+5.43%", day: "+0.89%", isLoss: false },
//     //     { name: "BAJAJ-AUTO", qty: 1, avg: 3657.2, price: 3780.1, net: "+3.36%", day: "+0.19%", isLoss: false },
//     //     { name: "BPCL", qty: 1, avg: 360.5, price: 340.7, net: "-5.50%", day: "-0.90%", isLoss: true },
//     //     { name: "COALINDIA", qty: 1, avg: 149.3, price: 167.4, net: "+12.12%", day: "+0.15%", isLoss: false },
//     //     { name: "DRREDDY", qty: 1, avg: 4178.4, price: 4352.6, net: "+4.16%", day: "-1.12%", isLoss: false },
//     //     { name: "EICHERMOT", qty: 1, avg: 2750.8, price: 2649.1, net: "-3.70%", day: "+0.25%", isLoss: true },
//     //     { name: "HCLTECH", qty: 1, avg: 1034.7, price: 1108.3, net: "+7.11%", day: "+0.72%", isLoss: false },
//     //     { name: "HEROMOTOCO", qty: 1, avg: 2892.3, price: 2937.7, net: "+1.57%", day: "+1.03%", isLoss: false },
//     //     { name: "ICICIBANK", qty: 1, avg: 715.6, price: 738.9, net: "+3.25%", day: "-0.12%", isLoss: false },
//     //     { name: "JSWSTEEL", qty: 1, avg: 380.3, price: 399.8, net: "+5.13%", day: "+1.43%", isLoss: false },
//     //     { name: "MARUTI", qty: 1, avg: 7350.6, price: 7899.2, net: "+7.46%", day: "+0.44%", isLoss: false },
//     //     { name: "NTPC", qty: 1, avg: 120.4, price: 134.8, net: "+11.96%", day: "-0.08%", isLoss: false },
//     //     { name: "ONGC", qty: 1, avg: 98.2, price: 104.7, net: "+6.61%", day: "+1.12%", isLoss: false },
//     //     { name: "POWERGRID", qty: 1, avg: 186.1, price: 200.5, net: "+7.75%", day: "+0.92%", isLoss: false },
//     //     { name: "TITAN", qty: 1, avg: 1628.2, price: 1777.9, net: "+9.21%", day: "+0.53%", isLoss: false },
//     //     { name: "ULTRACEMCO", qty: 1, avg: 4562.3, price: 4711.8, net: "+3.28%", day: "-0.32%", isLoss: false },
//     //     { name: "VEDL", qty: 1, avg: 230.9, price: 243.6, net: "+5.51%", day: "+0.21%", isLoss: false },
//     //     { name: "HDFC", qty: 1, avg: 2305.9, price: 2354.3, net: "+2.10%", day: "+1.29%", isLoss: false },
//     //     { name: "SBILIFE", qty: 1, avg: 920.4, price: 970.7, net: "+5.47%", day: "-0.44%", isLoss: false },
//     //     { name: "AXISBANK", qty: 1, avg: 725.8, price: 745.2, net: "+2.67%", day: "+1.54%", isLoss: false },
//     //     { name: "GRASIM", qty: 1, avg: 1500.6, price: 1480.9, net: "-1.31%", day: "+0.83%", isLoss: true },
//     //     { name: "INDUSINDBK", qty: 1, avg: 1010.9, price: 1050.5, net: "+3.92%", day: "-0.35%", isLoss: false },
//     //     { name: "IOC", qty: 1, avg: 82.1, price: 86.8, net: "+5.73%", day: "+0.27%", isLoss: false },
//     //     { name: "TATACONSUM", qty: 1, avg: 616.8, price: 630.7, net: "+2.26%", day: "+0.63%", isLoss: false },
//     //     { name: "ADANIGREEN", qty: 1, avg: 1100.9, price: 1095.4, net: "-0.50%", day: "+0.17%", isLoss: true },
//     //     { name: "ASIANPAINT", qty: 1, avg: 3052.6, price: 3175.1, net: "+4.02%", day: "+1.32%", isLoss: false },
//     //     { name: "BAJAJFINSV", qty: 1, avg: 14560.4, price: 14899.5, net: "+2.33%", day: "+0.90%", isLoss: false },
//     //     { name: "HINDALCO", qty: 1, avg: 325.8, price: 349.4, net: "+7.22%", day: "+1.11%", isLoss: false },
//     //     { name: "DIVISLAB", qty: 1, avg: 4600.6, price: 4785.2, net: "+4.01%", day: "-0.12%", isLoss: false },
//     //     { name: "LT", qty: 1, avg: 1380.9, price: 1397.2, net: "+1.18%", day: "+1.40%", isLoss: false },
//     //     { name: "TECHM", qty: 1, avg: 1016.8, price: 1042.4, net: "+2.52%", day: "+0.75%", isLoss: false },
//     //     { name: "SUNPHARMA", qty: 1, avg: 586.3, price: 599.5, net: "+2.25%", day: "-0.10%", isLoss: false }
//     //   ]
//     mystocks.forEach( (item)=>{
//         let newStock = new StocksModel({
//             name: item.name,
//             product:item.product,
//             qty:item.qty, 
//             avg:item.avg,
//             price: item.price,
//             net: item.net, 
//             day: item.day,
//             isLoss:item.isLoss
//         })
//         newStock.save()
//     })
//     res.send("Done Bro-");
// })

// ---------------------------------------donot uncomment above code----------------------------------------------



// ----------------------------------To check whether data is coming from databse-------------------------------

app.get('/stocks', async (req, res) => {
    const stocks = await StocksModel.find()
    res.json(stocks)
})

app.get("/gettingHolding", async (req, res) => {
    const { userId } = req.query
    // console.log("userId from req : ",userId);

    let holdingData = await HoldingModel.find({ userId: userId });
    // console.log("Filtered holdings:", holdingData);
    console.log("userid:", userId);

    res.json(holdingData);
});

app.get("/gettingOrders", async (req, res) => {
    const { userId } = req.query

    let OrderData = await OrderModel.find({ userId: userId });
    // console.log("Filtered holdings:", holdingData);
    console.log("userid:", userId);
    res.json(OrderData);
});

app.get("/gettingPosition", async (req, res) => {
    let PositionData = await PositionModel.find({});
    res.json(PositionData);
});




app.post('/sign', singupvalidation, signup);
app.post("/login", loginvalidation, loginUp);

// ---------------------------------

app.post('/submit', async (req, res) => {
    try {
        const { email, fname, contact, country, lname, altcontact, altemail, state, address, work } = req.body;
        console.log(req.body);
        
        const existingUser = await RegisterModel.findOne({ email });
        console.log("existingUser",existingUser);
        
        if (existingUser) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        const newUser = new RegisterModel({ email, fname, contact, country, lname, altcontact, altemail, state, address, work });
        console.log("newUser:",newUser);
        
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
        console.log("Existing:", existingShare);
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
            console.log("NEWORDER DATA ------------", newOrder);

            console.log("Before: ", existingShare.qty);
            existingShare.qty -= qty;
            await existingShare.save();
            console.log("After: ", existingShare.qty);
            res.json({ success: true, message: 'Quantity updated in holdings.' })
        }

    } catch (error) {
        console.log("500 wala :    ", error);
        res.status(500).json({ success: false, message: 'Error updating holdings.' });
    }

});

app.post('/BuyingShare', async (req, res) => {
    const { userId, name, quantity } = req.body;
    console.log(req.body);

    try {
        const existingShare = await HoldingModel.findOne({ userId, name });
        console.log("Existing:", existingShare);
        if (existingShare) {
            const newOrder = new OrderModel({
                userId: userId,
                name: existingShare.name,
                qty: quantity,
                avg: existingShare.avg,
                price: existingShare.price,
                bs: "BUY"
            })
            console.log("NEWORDER DATA ------------", newOrder);
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
            console.log("Before   NEWORDER DATA ------------", newOrder);
            const newUserShare = new HoldingModel({
                userId: userId,
                name: shareDetails.name,
                qty: quantity,
                avg: shareDetails.avg,
                price: shareDetails.price,
                net: shareDetails.net,
                day: shareDetails.day

            })
            console.log("BEfore  ---- newUserShare: ", newUserShare);
            console.log("After ----1----- newUserShare: ", newUserShare);
            await newUserShare.save();
            await newOrder.save();
            console.log("NEWORDER DATA ------------", newOrder);
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
        console.log(userTargetModel);

        await userTargetModel.save();
    }
    catch (error) {
        console.log("Error in Target", error);
    }
})

app.post("/Target", async (req, res) => {

    const { userId } = req.body
    console.log(userId);

    const existingTarget = await TargetModel.findOne({ userId: userId });
    res.json(existingTarget)
    console.log("Existimg Target Value is: ", existingTarget)
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
        console.log("Email sent successfully!");
        return true
    } catch (error) {
        console.log("Error In Sending the Feedback.Please Try again ");
        return false
    }
}

app.post("/feedback", async (req, res) => {
    const { userId, email, subjectEmail, feebackMessage } = req.body
    console.log("subjectEmail: ", subjectEmail);
    console.log(email);


    console.log("feedbskc message :", feebackMessage);
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


console.log("before Entered in user id send mail ");
const getUserEmailById = async (userId) => {
    console.log("before Entered in user id send mail ");
    // Connect to your database and fetch the user document by userId
    const user = await UserModel.findOne({ _id: userId });
    console.log("email id: ", user);
    if (!user) {
        console.log("No user found with id:", userId);  // Handle the case where user is not found
    }
    return user?.email; // Return the email if user is found
};
console.log("before Entered in send mail ");
const sendEmail = async (userId, name, price) => {
    console.log("Entered in send mail ");

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
        from: process.env.User_email,              //to be 
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
console.log("before Cron job is");
console.log("userId - before schedule :", userIdValue);

cron.schedule("*/1 * * * *", async () => {
    console.log("Cron job is running...");

    const targetCount = await TargetModel.countDocuments();
    if (targetCount === 0) {
        console.log("No targets found. Exiting cron job.");
        return; // Exit the function if no targets are found
    }
    else {

        try {
            let userId = userIdValue;
            // const userId="674dde54d1dc0405bbed9446"
            console.log("Enterd in try ");

            // app.post("/TargetUserId",async(req,res)=>{
            //     console.log("Entered in TragetUserId route ");

            //     const {userId}=req.body
            //     let userIdValue=userId;
            //     console.log(userId);
            //     console.log("Just outside in TragetUserId route ");

            // })

            console.log("Ouside--------------------------------------------------------------------------------");
            console.log(userId);

            const targets = await TargetModel.find({ userId: userId })
            const stocks = await StocksModel.find()
            console.log(targets);
            // console.log("Stocksss kaa data ",stocks);
            console.log("Done with targets and stocks");


            for (const target of targets) {
                console.log("Indide For loop");

                const stock = stocks.find((s) => s.name === target.name)
                console.log("----------------------After stocks -----------------");
                console.log("Printing Stocks :  ", stock.name);
                console.log("Printing Stocks :  ", stock.price);
                console.log("Printing Target stock name: ", target.name);
                console.log("Printing Target target target price: ", target.target);
                console.log("Left the stocks ");

                if (stock && stock.price == target.target) {
                    sendEmail(target.userId, target.name, target.target)
                    console.log("If mai entered ");

                    await TargetModel.findByIdAndDelete(target._id)
                }
            }
            console.log("----------------Left loop---------------------");

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