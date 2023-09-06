const errorHandler = (err, req, res, next) => {
  // console.log('errorHandler\n');
  if (err?.message.includes('not found')) {
    req.logger.warning(`${err.stack} - ${new Date().toLocaleTimeString()}`);
    return res.status(404).json({ message: err.message });
  }
 else if (err?.name.includes('ZodError')) {
    req.logger.warning(`${err.stack} - ${new Date().toLocaleTimeString()}`);
    return res.status(400).json({ message: err.issues });
  }
 else if (err?.message.includes('Login failed, invalid password.')) {
    req.logger.warning(`${err.stack} - ${new Date().toLocaleTimeString()}`);
    return res.status(401).send({ message: 'Login failed, invalid password.' });
  }
 else if (err?.message.includes('Email and Password invalid format.')) {
    req.logger.warning(`${err.stack} - ${new Date().toLocaleTimeString()}`);
    return res
      .status(401)
      .send({ message: 'Email and Password invalid format.' });
  }
 else if (err?.message.includes('File not found')) {
    req.logger.warning(`${err.stack} - ${new Date().toLocaleTimeString()}`);
    return res.status(500).json({ message: err.message });
  }
  try {
    // console.log('errorHandler req\n',req);
    req.logger.warning(`${err.stack} - ${new Date().toLocaleTimeString()}`);
    res.status(500).json({ message: 'Ocurrió un error' });
    next();
  }
  catch (e){
    // console.log('Error del errorHandler\n', e);
    res.status(500).json({ message: 'Ocurrió un error' });
  }
};

export default errorHandler;
