import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "krishna"], required: true },
  text: { type: String, required: true },
  reference: { type: String, default: "—" },
  createdAt: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  messages: [messageSchema],
});

export default mongoose.model("Chat", chatSchema);
