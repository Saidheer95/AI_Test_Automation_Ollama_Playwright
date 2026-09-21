require('dotenv').config();

const express = require('express');
const cors = require('cors');
const testRoutes = require('./routes/test.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tests', testRoutes);

app.get('/api/health', (req, res) => {
    res.json({
        status: 'UP',
        service: 'AI Test Automation Platform'
    });
});

app.listen(3001, () => {
    console.log('Backend running on http://localhost:3001');
});
