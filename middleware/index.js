const { getAuth } = require("firebase-admin/auth")

 async function checkIsAuthenticated(req, res, next) {
    const authHeaderVal = req.header("Authorization");

    if (!authHeaderVal) {
        return { authenticated: false, message: "No Authorisation Header."}
    }
    const idToken = authHeaderVal.slice(7);
    try {
        const decodedToken = await getAuth().verifyIdToken(idToken);
        return { authenticated: true, message: "Token is verfied."}
    } catch (err) {
        return { authenticated: false, message: "Token did not verify"}
    }
}

module.exports = checkIsAuthenticated;