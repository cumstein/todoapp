import connectDB from "@/utils/connectDB";
import User2 from "@/models/User2";
import { hashPassword } from "@/utils/auth";

async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      status: "failed",
      message: "Invalid Data",
    });
  }

  const existingUser = await User2.findOne({ email: email });

  if (existingUser) {
    res.status(422).json({
      status: "failed",
      message: "User already exists",
    });
  }

  const hashedPassword = await hashPassword(password);
  const newUser2 = await User2.create({
    email: email,
    password: hashedPassword,
  });
  console.log(newUser2);
  res.status(201).json({ status: "success", message: "User Created" });
}

export default handler;
