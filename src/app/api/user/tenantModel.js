import mongoose from "mongoose";

const tenantsSchema = mongoose.Schema(
  {
    logo: { type: mongoose.Schema.Types.String },
    name: { type: mongoose.Schema.Types.String, required: true },
    enable: {
      productImage: { type: mongoose.Schema.Types.Boolean, default: true },
    },
    signature: {
      type: { type: mongoose.Schema.Types.String},
      star: { type: mongoose.Schema.Types.String},
      end: { type: mongoose.Schema.Types.String},
      price: { type: mongoose.Schema.Types.Number},
    },
  },
  {
    timestamps: true,
  },
  { versionKey: false }
);

const tenants =
  mongoose.models?.tenants || mongoose.model("tenants", tenantsSchema);

export { tenants, tenantsSchema };
