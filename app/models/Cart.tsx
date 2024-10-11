import mongoose, { Schema, model, models } from "mongoose";

const cartSchema = new Schema({
  chatId: Number,
  admin: Boolean,
  action: String,
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      count: Number,
    },
  ],
});

const Cart = models.Cart || model("Cart", cartSchema);
export default Cart;
