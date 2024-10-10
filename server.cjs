const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes and serve the index.html file for any route
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
