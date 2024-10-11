import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    text: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    status: {
      type: Number,
      default: 0,
      /*
      0 - qo'shilyapdi
      1 - aktiv mahsulot
      2 - nofaol mahsulot
    */
    },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", productSchema);
export default Product;
