require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = 8080;

app.use("/stripe", express.raw({ type: "*/*" }));
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

app.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(event);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }

  //Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initaited payment`);
  }
  //Payment successful
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment`);
  }
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
