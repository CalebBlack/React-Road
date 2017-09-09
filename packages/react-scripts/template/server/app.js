const express = require('express');
//END OF PACKAGE IMPORTS
const Router = require('./router/index');
//END OF LOCAL IMPORTS
const PORT = process.env.PORT || 9000;
//END OF CONSTS
//MAIN PROGRAM
const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Serve webpage
app.get('*', (req, res) => {res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))});
// Serve routes
Router(app);
app.disable('x-powered-by');
app.listen(PORT,()=>{console.log('Server running on port #'+PORT);});
