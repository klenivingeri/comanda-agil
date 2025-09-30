import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String, required: true },
    description: { type: mongoose.Schema.Types.String },
    code: { type: mongoose.Schema.Types.String },
    price: { type: mongoose.Schema.Types.Number },
    active: { type: mongoose.Schema.Types.Boolean },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tenants",
      required: true,
    },
  },
  { versionKey: false }
);

const products =
  mongoose.models?.products || mongoose.model("products", productSchema);

export { products };
