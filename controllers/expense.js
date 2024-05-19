const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req._id;

  const expense = new ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    user: userId,
  });

  try {
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "모든 필드를 입력해야 합니다!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "금액은 양수이며 숫자여야 합니다!" });
    }
    await expense.save();
    res.status(200).json({ message: "비용 추가됨" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpense = async (req, res) => {
  const userId = req._id;
  try {
    const expenses = await ExpenseSchema.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "비용 삭제됨" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
