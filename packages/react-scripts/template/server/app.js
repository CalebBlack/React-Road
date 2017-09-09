const express = require('express');
//END OF PACKAGE IMPORTS
const Router = require('./router/index');
//END OF LOCAL IMPORTS
const PORT = process.env.PORT || 9000;
//END OF CONSTS
//MAIN PROGRAM
const app = express();
// Enable Helmet for more protection
app.use(helmet());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
// Serve routes
Router(app);

// Serve webpage
app.get('*', (req, res) => {res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))});
// Start Server
app.listen(PORT,()=>{console.log('Server running on port #'+PORT);});
