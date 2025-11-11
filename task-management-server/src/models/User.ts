import mongoose, { Schema, Document } from "mongoose";

export type Role = "admin" | "user";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  refreshTokens: string[];
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    refreshTokens: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
