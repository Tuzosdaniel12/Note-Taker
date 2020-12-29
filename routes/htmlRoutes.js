var path = require("path");

const PUBLIC_DIR = path.resolve(__dirname, "../public");

module.exports = function(app) {
// HTML Routes

app.get('/', (req, res)=>{
    res.render("index");
})

app.get('/notes', (req, res)=>{
    res.render("notes");
})

}