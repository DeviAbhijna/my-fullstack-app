const Contact = require("../models/Contact");

exports.getAll = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  const result = contacts.map((c) => ({
    ...c.toObject(),
    healthScore: c.getHealthScore(),
  }));
  res.json(result);
};

exports.create = async (req, res) => {
  const { name, phone, email, tags } = req.body;
  if (!name) return res.status(400).json({ msg: "Name required" });
  const contact = new Contact({
    name,
    phone,
    email,
    tags: tags ? tags.split(",") : [],
  });
  await contact.save();
  res.status(201).json(contact);
};

exports.getOne = async (req, res) => {
  const c = await Contact.findById(req.params.id);
  if (!c) return res.status(404).json({ msg: "Not found" });
  res.json({ ...c.toObject(), healthScore: c.getHealthScore() });
};

exports.update = async (req, res) => {
  const c = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(c);
};

exports.delete = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

exports.interact = async (req, res) => {
  const c = await Contact.findById(req.params.id);
  if (!c) return res.status(404).json({ msg: "Not found" });
  c.interactionCount += 1;
  c.lastContacted = new Date();
  await c.save();
  res.json({ healthScore: c.getHealthScore(), lastContacted: c.lastContacted });
};

exports.addNote = async (req, res) => {
  const { text } = req.body;
  const c = await Contact.findById(req.params.id);
  const files = (req.files || []).map((f) => `/uploads/${f.filename}`);
  c.notes.push({ text, files });
  await c.save();
  res.json(c);
};
