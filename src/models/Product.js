import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  salePrice: Number,
  buyPrice: Number,
  inStock: Boolean,
  quantity: Number,
  description: String,
  mainImage: String,
  otherImages: [String],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
