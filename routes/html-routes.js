module.exports = function(app) {
//load homepage
app.get("/", function (req, res){
    res.render("index");
});
}