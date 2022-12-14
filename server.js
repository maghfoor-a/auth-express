process.env.GOOGLE_APPLICATION_CREDENTIALS =
"secrets/firebase-service-account-secrets.json";

const express = require("express");
const { getAncientWisdom } = require("./bookOfAncientWisdom");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const cors = require("cors");

const app = express();
app.use(cors());

initializeApp();

const port = process.env.PORT || 4000;

//This route stays public for all
app.get("/", (req, res) => {
  res.send("Time (not secret): " + new Date());
});

//TODO: Your task will be to secure this route to prevent access by those who are not, at least, logged in.
app.get("/wisdom", async (req, res) => {
  try {
  const idToken = req.headers.authorization.slice(7);
  await getAuth()
  .verifyIdToken(idToken)
  .then((decodedToken => {
    const uid = decodedToken.uid;
    res.json("VERIFIED TOKEN for user: ", uid)
  }))
} catch(err) {
  console.error(err)
}
  //Eventual plan:
  //1. authHeader = get the value of the Authorization header
  //2. potentialToken = strip the "Bearer " prefix from authHeader
  //3. if (potentialToken is verified legit)
  //4.     return protected info in response
  //5. else
  //       say access denied in response
  res.send("🤐: " + getAncientWisdom() + "🤫");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
