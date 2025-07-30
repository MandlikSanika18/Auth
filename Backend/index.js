const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport');
dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend/dist')));
app.use(session({
  secret: 'some_session_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

const googleAuthRoutes = require('./routes/googleAuth');
app.use('/auth', googleAuthRoutes); // 🔥 mount at /auth (not /api/auth)

const githubAuthRoutes = require('./routes/githubAuth');
app.use('/auth', githubAuthRoutes); // 🔥 mount at /auth (not /


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist','index.html'));                                                

});
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
