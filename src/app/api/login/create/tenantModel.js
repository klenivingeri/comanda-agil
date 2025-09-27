import mongoose from "mongoose";

const tenantSchema = mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String, required: true },
  },
  { versionKey: false }
);

const tenant =
  mongoose.models?.tenant || mongoose.model("tenant", tenantSchema);

export { tenant, tenantSchema };
