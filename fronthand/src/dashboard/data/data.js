 const watchlist = [
    {
      name: "INFY",
      price: 1555.45,
      percent: "-1.60%",
      isDown: true,
    },
    {
      name: "ONGC",
      price: 116.8,
      percent: "-0.09%",
      isDown: true,
    },
    {
      name: "TCS",
      price: 3194.8,
      percent: "-0.25%",
      isDown: true,
    },
    {
      name: "KPITTECH",
      price: 266.45,
      percent: "3.54%",
      isDown: false,
    },
    {
      name: "QUICKHEAL",
      price: 308.55,
      percent: "-0.15%",
      isDown: true,
    },
    {
      name: "WIPRO",
      price: 577.75,
      percent: "0.32%",
      isDown: false,
    },
    {
      name: "M&M",
      price: 779.8,
      percent: "-0.01%",
      isDown: true,
    },
    {
      name: "RELIANCE",
      price: 2112.4,
      percent: "1.44%",
      isDown: false,
    },
    {
      name: "HUL",
      price: 512.4,
      percent: "1.04%",
      isDown: false,
    },
  ];

 const holdings = [
    {
      name: "BHARTIARTL",
      qty: 2,
      avg: 538.05,
      price: 541.15,
      net: "+0.58%",
      day: "+2.99%",
    },
    {
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 1522.35,
      net: "+10.04%",
      day: "+0.11%",
    },
    {
      name: "HINDUNILVR",
      qty: 1,
      avg: 2335.85,
      price: 2417.4,
      net: "+3.49%",
      day: "+0.21%",
    },
    {
      name: "INFY",
      qty: 1,
      avg: 1350.5,
      price: 1555.45,
      net: "+15.18%",
      day: "-1.60%",
      isLoss: true,
    },
    {
      name: "ITC",
      qty: 5,
      avg: 202.0,
      price: 207.9,
      net: "+2.92%",
      day: "+0.80%",
    },
    {
      name: "KPITTECH",
      qty: 5,
      avg: 250.3,
      price: 266.45,
      net: "+6.45%",
      day: "+3.54%",
    },
    {
      name: "M&M",
      qty: 2,
      avg: 809.9,
      price: 779.8,
      net: "-3.72%",
      day: "-0.01%",
      isLoss: true,
    },
    {
      name: "RELIANCE",
      qty: 1,
      avg: 2193.7,
      price: 2112.4,
      net: "-3.71%",
      day: "+1.44%",
    },
    {
      name: "SBIN",
      qty: 4,
      avg: 324.35,
      price: 430.2,
      net: "+32.63%",
      day: "-0.34%",
      isLoss: true,
    },
    {
      name: "SGBMAY29",
      qty: 2,
      avg: 4727.0,
      price: 4719.0,
      net: "-0.17%",
      day: "+0.15%",
    },
    {
      name: "TATAPOWER",
      qty: 5,
      avg: 104.2,
      price: 124.15,
      net: "+19.15%",
      day: "-0.24%",
      isLoss: true,
    },
    {
      name: "TCS",
      qty: 1,
      avg: 3041.7,
      price: 3194.8,
      net: "+5.03%",
      day: "-0.25%",
      isLoss: true,
    },
    {
      name: "WIPRO",
      qty: 4,
      avg: 489.3,
      price: 577.75,
      net: "+18.08%",
      day: "+0.32%",
    },
  ];
 
const mystocks = [
  { name: "BHARTIARTL", qty: 1, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%", isLoss: false },
  { name: "HDFCBANK", qty: 1, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%", isLoss: false },
  { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%", isLoss: false },
  { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
  { name: "ITC", qty: 1, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%", isLoss: false },
  { name: "KPITTECH", qty: 1, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%", isLoss: false },
  { name: "M&M", qty: 1, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
  { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%", isLoss: false },
  { name: "SBIN", qty: 1, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
  { name: "SGBMAY29", qty: 1, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%", isLoss: false },
  { name: "TATAPOWER", qty: 1, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
  { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
  { name: "WIPRO", qty: 1, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%", isLoss: false },
  { name: "ADANIPORTS", qty: 1, avg: 653.4, price: 688.9, net: "+5.43%", day: "+0.89%", isLoss: false },
  { name: "BAJAJ-AUTO", qty: 1, avg: 3657.2, price: 3780.1, net: "+3.36%", day: "+0.19%", isLoss: false },
  { name: "BPCL", qty: 1, avg: 360.5, price: 340.7, net: "-5.50%", day: "-0.90%", isLoss: true },
  { name: "COALINDIA", qty: 1, avg: 149.3, price: 167.4, net: "+12.12%", day: "+0.15%", isLoss: false },
  { name: "DRREDDY", qty: 1, avg: 4178.4, price: 4352.6, net: "+4.16%", day: "-1.12%", isLoss: true },
  { name: "EICHERMOT", qty: 1, avg: 2750.8, price: 2649.1, net: "-3.70%", day: "+0.25%", isLoss: false },
  { name: "HCLTECH", qty: 1, avg: 1034.7, price: 1108.3, net: "+7.11%", day: "+0.72%", isLoss: false },
  { name: "HEROMOTOCO", qty: 1, avg: 2892.3, price: 2937.7, net: "+1.57%", day: "+1.03%", isLoss: false },
  { name: "ICICIBANK", qty: 1, avg: 715.6, price: 738.9, net: "+3.25%", day: "-0.12%", isLoss: true },
  { name: "JSWSTEEL", qty: 1, avg: 380.3, price: 399.8, net: "+5.13%", day: "+1.43%", isLoss: false },
  { name: "MARUTI", qty: 1, avg: 7350.6, price: 7899.2, net: "+7.46%", day: "+0.44%", isLoss: false },
  { name: "NTPC", qty: 1, avg: 120.4, price: 134.8, net: "+11.96%", day: "-0.08%", isLoss: true },
  { name: "ONGC", qty: 1, avg: 98.2, price: 104.7, net: "+6.61%", day: "+1.12%", isLoss: false },
  { name: "POWERGRID", qty: 1, avg: 186.1, price: 200.5, net: "+7.75%", day: "+0.92%", isLoss: false },
  { name: "TITAN", qty: 1, avg: 1628.2, price: 1777.9, net: "+9.21%", day: "+0.53%", isLoss: false },
  { name: "ULTRACEMCO", qty: 1, avg: 4562.3, price: 4711.8, net: "+3.28%", day: "-0.32%", isLoss: true },
  { name: "VEDL", qty: 1, avg: 230.9, price: 243.6, net: "+5.51%", day: "+0.21%", isLoss: false },
  { name: "HDFC", qty: 1, avg: 2305.9, price: 2354.3, net: "+2.10%", day: "+1.29%", isLoss: false },
  { name: "SBILIFE", qty: 1, avg: 920.4, price: 970.7, net: "+5.47%", day: "-0.44%", isLoss: true },
  { name: "AXISBANK", qty: 1, avg: 725.8, price: 745.2, net: "+2.67%", day: "+1.54%", isLoss: false },
  { name: "GRASIM", qty: 1, avg: 1500.6, price: 1480.9, net: "-1.31%", day: "+0.83%", isLoss: false },
  { name: "INDUSINDBK", qty: 1, avg: 1010.9, price: 1050.5, net: "+3.92%", day: "-0.35%", isLoss: true },
  { name: "IOC", qty: 1, avg: 82.1, price: 86.8, net: "+5.73%", day: "+0.27%", isLoss: false },
  { name: "TATACONSUM", qty: 1, avg: 616.8, price: 630.7, net: "+2.26%", day: "+0.63%", isLoss: false },
  { name: "ADANIGREEN", qty: 1, avg: 1100.9, price: 1095.4, net: "-0.50%", day: "+0.17%", isLoss: true },
  { name: "ASIANPAINT", qty: 1, avg: 3052.6, price: 3175.1, net: "+4.02%", day: "+1.32%", isLoss: false },
  { name: "BAJAJFINSV", qty: 1, avg: 14560.4, price: 14899.5, net: "+2.33%", day: "+0.90%", isLoss: false },
  { name: "HINDALCO", qty: 1, avg: 325.8, price: 349.4, net: "+7.22%", day: "+1.11%", isLoss: false },
  { name: "DIVISLAB", qty: 1, avg: 4600.6, price: 4785.2, net: "+4.01%", day: "-0.51%", isLoss: true },
  { name: "LUPIN", qty: 1, avg: 1012.3, price: 981.5, net: "-3.04%", day: "-0.08%", isLoss: true },
  { name: "TATASTEEL", qty: 1, avg: 1156.0, price: 1200.7, net: "+3.89%", day: "-0.58%", isLoss: true },
  { name: "SBI", qty: 1, avg: 245.6, price: 265.7, net: "+8.17%", day: "-0.22%", isLoss: true },
  { name: "BEL", qty: 1, avg: 90.3, price: 101.9, net: "+12.91%", day: "+0.35%", isLoss: false },
  { name: "HDFCLIFE", qty: 1, avg: 727.9, price: 746.2, net: "+2.51%", day: "+0.92%", isLoss: false },
  { name: "BALKRISIND", qty: 1, avg: 1962.0, price: 1924.3, net: "-1.93%", day: "-0.04%", isLoss: true }
];

const positions = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 312.35,
      net: "+0.58%",
      day: "-1.24%",
      isLoss: true,
    },
    {
      product: "CNC",
      name: "JUBLFOOD",
      qty: 1,
      avg: 3124.75,
      price: 3082.65,
      net: "+10.04%",
      day: "-1.35%",
      isLoss: true,
    },
  ];

module.exports = { mystocks,watchlist, holdings, positions };
