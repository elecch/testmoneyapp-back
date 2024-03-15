const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req._id;

  const income = new IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
    user: userId, // user 필드 추가
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "모든 필드를 입력해야 합니다!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "금액은 양수여야 합니다!" });
    }
    await income.save();
    res.status(200).json({ message: "수입 추가됨" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  const userId = req._id;
  try {
    const incomes = await IncomeSchema.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "수입 삭제" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
