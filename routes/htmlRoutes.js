var path = require("path");

const PUBLIC_DIR = path.resolve(__dirname, "../public");

module.exports = function(app) {
// HTML Routes
app.get('/', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')))

app.get('/notes', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'notes.html')))

app.get('*', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')))

}