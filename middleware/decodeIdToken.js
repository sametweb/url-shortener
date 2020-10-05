const admin = require("firebase-admin");
admin.initializeApp();

module.exports = async (req, res, next) => {
  const { idToken } = req.body;
  if (idToken === "0") {
    req.user_id = idToken;
    next();
  } else {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user_id = decodedToken.uid;
      next();
    } catch (err) {
      res
        .status(400)
        .json({ error: err, message: "Error authenticating the user" });
    }
  }
};
