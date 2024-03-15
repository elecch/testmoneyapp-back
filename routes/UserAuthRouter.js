const express = require("express");
const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");
const {
  signup,
  login,
  logout,
  myDetails,
} = require("../controllers/UserAuthController");
const { verifyToken } = require("../middlewares/verifytoken");
const UserAuthRouter = express.Router();

UserAuthRouter.post("/signup", signup);
UserAuthRouter.post("/login", login);
UserAuthRouter.post("/logout", logout);
UserAuthRouter.get("/my-details", verifyToken, myDetails);
UserAuthRouter.post("/add-income", verifyToken, addIncome);
UserAuthRouter.get("/get-incomes", verifyToken, getIncomes);
UserAuthRouter.delete("/delete-income/:id", deleteIncome);
UserAuthRouter.post("/add-expense", verifyToken, addExpense);
UserAuthRouter.get("/get-expenses", verifyToken, getExpense);
UserAuthRouter.delete("/delete-expense/:id", deleteExpense);

module.exports = UserAuthRouter;
