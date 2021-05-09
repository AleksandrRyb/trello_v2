import express, { response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { protect } from "../middlewares/authorization";

function getAuthRoutes() {
  const router = express.Router();

  router.post("/register", register);
  router.post("/login", login);
  router.post("/token-is-valid", validateToken);
  router.get("/", protect, me);

  return router;
}

async function register(req, res, next) {
  const { password, passwordCheck, username } = req.body;
  try {
    //Validate our fields
    if (!password && !passwordCheck && !username) {
      return res
        .status(400)
        .json({ message: "Empty fields do not allowed, fill the fields!" });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "A password must have 5 at least 5 characters." });
    }

    if (password != passwordCheck) {
      return res.status(400).json({ message: "Password do not mutch" });
    }
    //Check if user already exists
    const existingUser = await User.findOne({
      username,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this username already exists!" });
    }
    //Generate salt for hashing our password
    const salt = await bcrypt.genSalt();
    //Hash our password
    const passwordHash = await bcrypt.hash(password, salt);
    //Save new User with credentials and hashed password
    const newUser = await new User({ username, password: passwordHash }).save();

    res
      .status(200)
      .json({ user: { username: newUser.username, id: newUser._id } });
  } catch {
    res.status(422).json({ message: "Register related error, try later!" });
  }
}

async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    //Validate our fields
    if (!password && !username) {
      return res
        .status(400)
        .json({ message: "Empty fields do not allowed, enter everything" });
    }

    //Check if user does not exists
    const existedUser = await User.findOne({ username });
    if (!existedUser) {
      return res
        .status(400)
        .json({ message: `User with username: ${username} does not exists` });
    }

    //Check password match
    const isPasswordMatch = await bcrypt.compare(
      password,
      existedUser.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    const user = {
      id: existedUser._id,
      username: existedUser.username,
    };
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(422).json({ message: "Login related error, try later!" });
  }
}

async function validateToken(req, res, next) {
  try {
    //Check if token exists
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(200).json(false);
    }
    //Check if token was changed
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(200).json(false);
    }
    //Check if user does not exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(200).json(false);
    }

    res.status(200).json(true);
  } catch (error) {}
}

async function me(req, res, next) {
  try {
    const existedUser = await User.findById(req.userId);

    if (!existedUser) {
      return res.status(401).json({});
    }

    const user = {
      _id: existedUser._id,
      username: existedUser.username,
    };

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({});
  }
}

export { getAuthRoutes };
