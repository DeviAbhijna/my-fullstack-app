const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  text: String,
  files: [String],
  createdAt: { type: Date, default: Date.now },
});

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  email: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  lastContacted: { type: Date, default: null },
  interactionCount: { type: Number, default: 0 },
  notes: [NoteSchema],
});

ContactSchema.methods.getHealthScore = function () {
  const base = 50;
  const interactions = Math.min(this.interactionCount * 5, 40);
  const last = this.lastContacted
    ? Math.floor((Date.now() - this.lastContacted) / (1000 * 60 * 60 * 24))
    : 365;
  const decay = Math.min(last, 100);
  let score = base + interactions - decay;
  return Math.max(0, Math.min(100, score));
};

module.exports = mongoose.model("Contact", ContactSchema);
