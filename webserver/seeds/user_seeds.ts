import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import connection from "../../db";



export async function seed(knex: Knex): Promise<void> {
  await connection("users").del();

  const users = [];
  for (let i = 1; i <= 3; i++) {
    const user = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: "x",
    };
    users.push(user);
  }

  await connection("users").insert(users);
}
