const verifyTokenAndRetrieveUser = async (token) => {
    try {
      if (!token) {
        throw new Error('No token provided');
      }
  
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Retrieve the user information based on the decoded token
      const user = await User.findByPk(decoded.userId);
  
      if (!user) {
        throw new Error('Invalid token');
      }
  
      return user;
    } catch (error) {
      throw new Error('Token verification failed');
    }
  };
  
  const authenticate = async (req, res, next) => {
    try {
      // Get the token from the request headers, query parameters, or cookies
      const token = req.headers.authorization?.replace('Bearer ', '');
  
      if (token) {
        const user = await verifyTokenAndRetrieveUser(token);
  
        // Attach the user object to the request
        req.user = user;
      }
    } catch (error) {
      // Token verification failed, but we proceed without attaching the user object
    }
  
    // Call the next middleware or route handler
    next();
  };
  
  const authenticateStrict = async (req, res, next) => {
    try {
      // Get the token from the request headers, query parameters, or cookies
      const token = req.headers.authorization?.replace('Bearer ', '');
  
      const user = await verifyTokenAndRetrieveUser(token);
  
      // Attach the user object to the request
      req.user = user;
    } catch (error) {
      return res.status(401).json({ error: 'Not authorized' });
    }
  
    // Call the next middleware or route handler
    next();
  };