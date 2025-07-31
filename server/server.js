const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const watchRoutes = require('./routes/watch.routes');

const app = express();
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/api/watches', watchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});