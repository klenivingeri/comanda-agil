import mongoose from "mongoose";

import { typesSchema } from "../type-items/typeModel";

const productSchema = mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String, required: true },
    description: { type: mongoose.Schema.Types.String },
    code: { type: mongoose.Schema.Types.String },
    price: { type: mongoose.Schema.Types.Number },
    category: typesSchema,
    active: { type: mongoose.Schema.Types.Boolean },
  },
  { versionKey: false }
);

const product =
  mongoose.models?.products || mongoose.model("products", productSchema);

export { product };
