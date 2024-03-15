const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req._id;

  const expense = new ExpenseSchema({
    // 변수명을 'income'에서 'expense'로 변경
    title,
    amount,
    category,
    description,
    date,
    user: userId,
  });

  try {
    // Validations
    if (!title || !amount || !category || !description || !date) {
      // amount 검사 추가
      return res.status(400).json({ message: "모든 필드를 입력해야 합니다!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      // 금액 검사 로직 수정
      return res
        .status(400)
        .json({ message: "금액은 양수이며 숫자여야 합니다!" });
    }
    await expense.save(); // 변수명 수정
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
    }); // 변수명 수정
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      // 변수명 수정
      res.status(200).json({ message: "비용 삭제됨" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
