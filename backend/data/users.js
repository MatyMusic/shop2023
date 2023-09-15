import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin user",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("msyeg5770", 10),
    isAdmin: true,
  },
  {
    name: " yoel",
    email: "yoel@gmail.com",
    password: bcrypt.hashSync("msyeg5770", 10),
    isAdmin: false,
  },
  {
    name: "ella",
    email: "ella@gmail.com",
    password: bcrypt.hashSync("msyeg5770", 10),
    isAdmin: false,
  },
];

export default users;
