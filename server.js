/**
 * server.js
 * 
 * main file connecting database access and routers
 */

//import frameworks, modules,  libraries, and external data
    const express = require('express');
    const app = express();
    const helmet = require('helmet');

    require("./config/db");
    const apiBooks = require('./routes/apiBooks');
    const apiUsers = require('./routes/apiUsers');
    
//application level middleware
    app.use(express.json());
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
    app.use('/books', apiBooks);
    app.use('/users', apiUsers);

//server settings
    const PORT = 3000;

//display homepage for server
    app.get("/", (request, response) => {
        response.status(200).json({message: "Welcome to Such Catchy Book Review App!"});
    });

// Catch-all (Express 5 style)
    app.use((request, response) => {
    response.status(404).json({ error: "Route not found" });
    });

//start the server
    app.listen(PORT, () => {
        console.log("server started");
    });