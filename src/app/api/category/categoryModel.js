import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    type: { type: mongoose.Schema.Types.String, required: true },
    name: { type: mongoose.Schema.Types.String, required: true },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tenant",
      required: true,
    },
  },
  { versionKey: false }
);

const category =
  mongoose.models?.categories || mongoose.model("categories", categorySchema);

export { category, categorySchema };
