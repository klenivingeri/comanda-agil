import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: mongoose.Schema.Types.String, required: true },
    price: { type: mongoose.Schema.Types.Number },
  },
  { versionKey: false }
);

const product =
  mongoose.models?.products || mongoose.model("products", productSchema);

export { product };
