// routes/googleAuth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Start Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const { token, user } = req.user;
    res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}&email=${user.email}`);
  }
);

module.exports = router;
