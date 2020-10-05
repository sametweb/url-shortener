const admin = require("firebase-admin");
admin.initializeApp();

module.exports = async (req, _, next) => {
  try {
    const idToken = req.headers.id_token;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user_id = decodedToken.uid;
  } catch {
    req.user_id = 0;
  }
  console.log("idtoken", req.headers.id_token);
  next();
};
