const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

let firebaseConfig = {
  apiKey: "AIzaSyBrHC_yghDNy7TptRJ_ADD6bL8A2FbvAb8",
  authDomain: "react-demo-e1d88.firebaseapp.com",
  projectId: "react-demo-e1d88",
  storageBucket: "react-demo-e1d88.appspot.com",
  messagingSenderId: "794527527422",
  appId: "1:794527527422:web:9ed8e896ff6f385d9e90af",
  measurementId: "G-BC6ZMW3TQL",
};

admin.initializeApp(firebaseConfig);
const db = admin.firestore();

exports.register = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { email, password, userName } = req.body;
    try {
      await admin.auth().createUser({ email, password });
      await db.collection("users").add({
        email,
        password,
        userName,
        createdAt: new Date(),
      });
      await admin.auth().createCustomToken();
      res
        .status(200)
        .send({ message: "User registration successfully", status: true });
      return;
    } catch (error) {
      res.status(200).send({ message: error.message, status: false });
      return;
    }
  });
});

