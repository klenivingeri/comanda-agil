import mongoose from "mongoose";

const categoriesSchema = mongoose.Schema(
  {
    type: { type: mongoose.Schema.Types.String, required: true },
    name: { type: mongoose.Schema.Types.String, required: true },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tenants",
      required: true,
      index: true,
    },
  },
  { versionKey: false }
);

const categories =
  mongoose.models?.categories || mongoose.model("categories", categoriesSchema);

export { categories, categoriesSchema };
