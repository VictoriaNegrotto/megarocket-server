import firebaseApp from '../helper/firebase';

const verifyToken = (accessRole) => async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({
      message: 'Provide a Token',
      data: undefined,
      error: true,
    });
  }
  try {
    const response = await firebaseApp.auth().verifyIdToken(token);
    const firebaseUser = await firebaseApp.auth().getUser(response.uid);
    const role = firebaseUser.customClaims?.role;
    if (!role) {
      return res.status(403).json({
        message: 'No credentials found',
        data: undefined,
        error: true,
      });
    }
    if (!accessRole.includes(role)) {
      return res.status(403).json({
        message: 'Credentials not authorized to access this information',
        data: undefined,
        error: true,
      });
    }
    req.headers.firebaseApp = response.uid;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};
export default verifyToken;
