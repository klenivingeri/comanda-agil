import mongoose from "mongoose";

import { tenantSchema } from "./tenantModel";

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    password: { type: String, required: true, select: false },
    enable: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["MASTER", "ADMIN", "MODERATOR", "VIEWER"],
      default: "user",
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tenants",
      required: true,
      index: true,
    },
    branch: {
      type: String,
      required: true,
    },
    userAgent: [{ type: String, default: "" }],
  },
  { versionKey: false }
);

const users = mongoose.models?.users || mongoose.model("users", usersSchema);

export { users };

/*
    profile: {
      avatar: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
    },
*/
