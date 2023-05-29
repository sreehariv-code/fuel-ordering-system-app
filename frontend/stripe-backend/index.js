require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.post("/api/pay", async (req, res) => {
  try {
    const { name, amount } = req.body;
    if (!name) return res.status(400).json({ message: "Please Enter a name" });

    //Stripe payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      payment_method_types: ["card"],
      metadata: { name: name, amount: amount },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
