import mongoose from "mongoose";

const user_db = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updated_at: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { timestamps: true }
);

user_db.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const user_model = mongoose.model("User", user_db);

export default user_model;
