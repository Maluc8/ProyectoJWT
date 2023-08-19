import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'Empty authentication header!' });
  }
  const token = authHeader.split(' ')[1];
  // console.log('auth auth token\n', token);
  jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) => {
    //console.log('auth auth credentials\n', credentials);
    if (error) {
      req.logger.warn(
        `Authentication error. - ${new Date().toLocaleTimeString()}`
      );
      return res.status(403).send('Authentication error');
    }
    req.user = credentials.user;
    next();
  });
};

export default auth;
