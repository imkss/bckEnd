require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const saltRounds = 10;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Verysecretstring",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://0.0.0.0:27017/userDB");
}

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  facebookId: String,
  githubId: String,
  secret: String,
});

userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// STRATEGY FOR GOOGLE

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id })
        .then((foundUser) => {
          if (foundUser) {
            return foundUser;
          } else {
            const newUser = new User({
              googleId: profile.id,
            });
            return newUser.save();
          }
        })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

// STRATEGY FOR FACEBOOK

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ facebookId: profile.id, username: profile.displayName })
        .then((foundUser) => {
          if (foundUser) {
            return foundUser;
          } else {
            const newUser = new User({
              facebookId: profile.id,
              username: profile.displayName,
            });
            return newUser.save();
          }
        })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

// STRATEGY FOR GITHUB

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_APP_ID,
      clientSecret: process.env.GITHUB_APP_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/github/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ githubId: profile.id })
        .then((foundUser) => {
          if (foundUser) {
            return foundUser;
          } else {
            const newUser = new User({
              githubId: profile.id,
            });
            return newUser.save();
          }
        })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

app.get("/", function (req, res) {
  res.render("home");
});

// GOOGLE AUTH

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/secrets");
  }
);

// FACEBOOK AUTH

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["public_profile"] })
);

app.get(
  "/auth/facebook/secrets",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/secrets");
  }
);

// GITHUB AUTH

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/secrets",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/secrets");
  }
);

// HANDLE THE FEATURES

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/secrets");
  }
);

app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.post("/secrets", function (req, res) {
  User.find({ secret: { $ne: null } }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        res.render("secrets", { userWithSecrets: foundUser });
      }
    }
  });
});

app.get("/submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", function (req, res) {
  console.log(req.user._id);
  console.log(req.body.secret);
  // THIS "TRY" BLOCK IS NEVER GETTING EXECUTED :
  try {
    User.findById(req.user._id, async (foundUser) => {
      foundUser.secret = req.body.secret;
      await foundUser.save(function () {
        res.redirect("/secrets");
      });
    });
  } catch (err) {
    res.send(err);
  }
});

app.get("/logout", function (req, res) {
  req.logOut((err) => {});
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
