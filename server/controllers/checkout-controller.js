const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = {
  async checkoutSession(req, res) {
    const priceArr = req.body.Price;
    const quantityArr = req.body.Quantity;

    const lineItemsArr = [];
    for (let i = 0; i < priceArr.length; i++) {
      lineItemsArr.push({ price: priceArr[i], quantity: quantityArr[i] });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItemsArr,
      mode: "payment",
      success_url:
        process.env.NODE_ENV === "production"
          ? `http://biketastic.herokuapp.com?checkout=success`
          : "http://localhost:3000?checkout=success",
      cancel_url:
        process.env.NODE_ENV === "production"
          ? `http://biketastic.herokuapp.com?checkout=cancel`
          : "http://localhost:3000?checkout=cancel",
    });

    res.redirect(303, session.url);
  },
};
