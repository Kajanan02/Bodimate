import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Setup __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
