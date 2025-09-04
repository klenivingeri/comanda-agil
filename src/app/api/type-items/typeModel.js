import mongoose from "mongoose";

const typesSchema = mongoose.Schema(
  {
    type: { type: mongoose.Schema.Types.String, required: true },
    name: { type: mongoose.Schema.Types.String, required: true },
  },
  { versionKey: false }
);

const category =
  mongoose.models?.category || mongoose.model("category", typesSchema);

export { category, typesSchema };
