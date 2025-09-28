import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    type: { type: mongoose.Schema.Types.String, required: true },
    name: { type: mongoose.Schema.Types.String, required: true },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tenants",
      required: true,
    },
  },
  { versionKey: false }
);

const category =
  mongoose.models?.categories || mongoose.model("categories", categorySchema);

export { category, categorySchema };
