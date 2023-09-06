import { decodeToken } from '../utils/index.js';

const authorization = (permission) => {
  return async(req, res, next) => {
    const tokenInfo = await decodeToken(req.cookies.accessToken);
    const user = tokenInfo.user;
    if (!user.isAdmin || !user.role?.permissions.includes(permission)) {
      return res.status(401).send({ message: 'Not authorization!' });
    }
    next();
  };
};

export default authorization;
