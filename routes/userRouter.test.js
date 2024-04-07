import mongoose from "mongoose";
import request from "supertest";
import bcrypt from "bcrypt";

import { app } from "../app";
import { User } from "../models/User.js";

const { DB_HOST } = process.env;
const PORT = 3001;

describe("test routes", () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  beforeEach(() => {});

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test login route", async () => {
    const password = await bcrypt.hash("654321", 10);

    const newUser = {
      email: "cat@mail.com",
      password,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "cat@mail.com",
      password: "654321",
    };

    const res = await request(app).post("/api/users/login").send(loginUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();

    const { token } = await User.findById(user._id);
    expect(res.body.token).toBe(token);

    expect(res.body.user.email).toBeTruthy();
    expect(res.body.user.subscription).toBeTruthy();

    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
  });
});
