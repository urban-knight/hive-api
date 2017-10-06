var app = require("./app"),
    port = process.env.APP_PORT,
    url = process.env.APP_HOST;

app.listen(port, function(err){
    console.log("Starting up API service...");
    if (err) {
        console.error(err);
    } else {
        console.log("API started successfully.");
        console.log("HTTP Serving at: http://" + url + ":" + port);
    }
});