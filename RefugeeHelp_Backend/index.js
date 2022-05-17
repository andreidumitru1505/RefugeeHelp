const express = require('express');
//const cors = require('cors');
const routes = require('./routes');
const app = express();

//app.use(cors());
app.use(express.json());
app.use(routes);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(8080,() => console.log('Server is running on port 8080'));
