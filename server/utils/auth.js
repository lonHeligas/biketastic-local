
const withAuth = (req, res, next) => {
  console.log("Body: ", req.body);
  if ( !req.body.user_id ) {
    res.redirect('/login');
  } else {
    next();
  }
}

module.exports = withAuth;