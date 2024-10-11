import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  title: String,
  status: {
    type: Boolean,
    default: true,
  },
});
const Category = models.Category || model("Category", categorySchema);
export default Category;
