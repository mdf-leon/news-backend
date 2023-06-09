import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import connection from "../../db";
import User from "../models/User"; 

const knexClient = connection;

export const protectedRouteHandler = (req: Request, res: Response) => {
  // The user is authenticated, the user information is stored in req.session.user
  res.send({ status: "Access granted", user: req.session.user });
};

export const statusHandler = async (req: Request, res: Response) => {
  try {
    const dbres = await knexClient.raw("select 1+1 as result");
    res.status(200).send({ status: "Successfully connected to the database", dbres });
  } catch (error) {
    res.status(500).send({ status: "Error connecting to the database", error });
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const id = await User.create({
      username,
      email,
      password,
    });

    const user = await User.getById(id);

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User created successfully", user, token });
  } catch (err) {
    res.status(400).json({ message: "Error creating user" });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [user] = await knexClient("users").where({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    req.session.token = token;
    req.session.user = user;
    req.session.save();

    delete user.password;
    delete user.created_at;

    res.status(200).json({ message: "User logged in", user });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const forceLoginHandler = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  const users = await knexClient("users");
  if (uid === "0") return res.status(200).json({ users });
  try {
    const [user] = await knexClient("users").where({ id: uid });

    if (!user) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    req.session.token = token;
    req.session.user = user;
    res.status(200).json({ message: "User logged in" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};