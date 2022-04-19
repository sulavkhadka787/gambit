router.post(
  "/login",
  body("username").isAlphanumeric().isLength({ min: 5 }),
  body("password").isAlphanumeric().isLength({ min: 8 }),
  async (req, res, next) => {
    console.log("router.post./auth/login hit");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }
    const username = req.body.username;
    const password = req.body.password;

    const currentUser = await User.findOne({
      username: username,
    });

    if (!currentUser) {
      return next("Email or password is incorrect");
    }

    const compPass = await bcrypt.compare(password, currentUser.password);
    if (!compPass) {
      return next("Email or password is incorrect");
    }

    const token = jwt.sign({ id: currentUser._id }, PRIVATE_KEY, {
      expiresIn: TOKEN_EXPIRY,
    });
    currentUser.password = "";

    res.status(200).json({
      token,
      user: { username: currentUser.username, balance: currentUser.balance },
    });
    next();
  }
);
