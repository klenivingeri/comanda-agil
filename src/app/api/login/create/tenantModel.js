import mongoose from "mongoose";

const tenantsSchema = mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String, required: true },
  },
  { versionKey: false }
);

const tenants =
  mongoose.models?.tenants || mongoose.model("tenants", tenantsSchema);

export { tenants, tenantsSchema };
