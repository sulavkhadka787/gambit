import jwt from "jsonwebtoken";

async function cookieValidator(cookies) {
  try {
    if (cookies) {
    } else {
      return;
    }
  } catch (err) {
    throw new Error(err);
  }
}

export default async function validateCookies(req, res, next) {
  const valid = await cookieValidator(req.cookies);
  next();
}
