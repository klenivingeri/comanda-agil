import mongoose from "mongoose";

import { tenantSchema } from "./create/tenantModel";

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["master", "admin", "gm", "user"],
      default: "user",
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tenants",
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  { versionKey: false }
);

const users = mongoose.models?.users || mongoose.model("users", usersSchema);

export { users };
