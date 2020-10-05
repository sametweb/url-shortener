const admin = require("firebase-admin");
admin.initializeApp();

module.exports = async (req, _, next) => {
  try {
    const idToken = req.headers.ID_TOKEN;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user_id = decodedToken.uid;
  } catch {
    req.user_id = 0;
  }
  next();
};
