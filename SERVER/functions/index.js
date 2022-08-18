const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true })
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })


exports.register = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { email, password, userName } = req.body;
    try {
      const user = await admin.auth().createUser({ email, password });
      await db.doc(`users/${user.uid}`).set({
        email,
        userName,
        createdAt: new Date(),
      });
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

exports.getPostList = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const postListRef = await db.collection('postList').get()
      const list = postListRef.docChanges().map(i => ({ ...i.doc.data(), postId: i.doc.id }))
      res.status(200).send(list)
      return
    } catch (error) {
      res.status(200).send({ message: error.message, status: false });
      return;
    }
  });
});

exports.savePost = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { content, coverImage, tags, title, uid } = req.body
      const payload = {
        content, coverImage, tags, title, uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      console.log(payload);
      const postListRef = await db.collection('postList').add(payload)
      const postRef = await postListRef.get()
      if (postRef.exists) {
        res.status(200).send({ data: postRef.data(), postId: postRef.id, status: 200 })
      } else {
        res.status(500).send({ message: 'Please reload', status: 500 })
      }
      return
    } catch (error) {
      res.status(500).send({ message: error.message, status: 500 })
    }
  })
})

exports.updatePost = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { content, tags, title, postId, isReadingList } = req.body
      const payload = {
        content, tags, title, isReadingList,
        updatedAt: new Date(),
      }
      await db.collection('postList').doc(postId).set(payload, { merge: true })
      res.status(200).send({ postId, status: 200 })
      return
    } catch (error) {
      res.status(500).send({ message: error.message, status: 500 })
    }
  })
})

exports.getUserReadingList = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { uid } = req.body
      const listRef = await db.collection('postList').where("uid", "==", uid).where("isReadingList", "==", true).get()
      const readingList = listRef.docChanges().map(i => ({ ...i.doc.data(), postId: i.doc.id }))
      res.status(200).send({ data: readingList, status: '200' });
      return
    } catch (error) {
      res.status(500).send({ message: error.message, status: 500 })
    }
  })
})

exports.getUsers = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const usersRef = await db.collection('users').get()
      const usersList = usersRef.docChanges().map(i => ({ ...i.doc.data(), userId: i.doc.id }))
      res.send(usersList);
      return
    } catch (error) {
      res.send(error.message)
    }
  })
})

exports.getUserInfo = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { uid } = req.body
      const userRef = await db.collection('users').doc(uid).get()
      if (userRef.exists) {
        const user = userRef.data();
        res.status(200).send({ data: user, status: '200' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message, status: 500 })
    }
  })
})

exports.updateUserInfo = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { uid, userName, email, displayPicture, bio } = req.body
      await db.collection('users').doc(uid)
        .set({ userName, email, displayPicture, bio }, { merge: true })
      res.status(200).send({ uid, status: 200 })
    } catch (error) {
      res.status(500).send({ message: error.message, status: 500 })
    }
  })
})
