import User from "../Models/User.js";
import EditHistory from "../Models/EditHistory.js";

export const createTask = async (req, res) => {
  try {
    const { name, age, department, address, status } = req.body;

    if (!name || !age || !department || !address || !status) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ name });
    if (!existingUser) {
      const user = await User.create({
        name,
        age,
        department,
        address,
        status,
      });
      res.status(201).send(user);
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = {
      ...req.body,
      updatedAt: Date.now(),
      modifiedData: req.body.modifiedData || "",
    };

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const tasks = await User.find();
    res.send(tasks);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const createEditHistory = async (req, res) => {
  const { userId, changes, timestamp } = req.body;
  try {
    const newHistory = new EditHistory({ userId, changes, timestamp });
    await newHistory.save();
    res.status(201).json(newHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEditHistory = async (req, res) => {
  try {
    const histories = await EditHistory.find({
      userId: req.params.userId,
    }).sort({ timestamp: -1 });
    res.json(histories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
