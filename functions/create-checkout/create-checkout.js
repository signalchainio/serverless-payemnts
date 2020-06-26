const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.handler = async (events, context) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: "Clown fish",
        description:
          "Ocellaris Clownfish, Captive-Bred (Amphiprion ocellaris )",
        images: [
          "https://www.liveaquaria.com/images/categories/large/lg80188OcellarisClownfish.jpg",
        ],
        amount: 2499,
        currency: "usd",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId: session.id }),
  };
};
