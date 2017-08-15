const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');

const port    = process.env.PORT || 3000;

var app       = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => { return new Date().getFullYear() });
hbs.registerHelper('screamIt', (text) => { return text.toUpperCase() });

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} - ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });

    next();
});
/*
    app.use((req, res, next) => {
        res.render('maintenance.hbs');
    });
*/
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    /*
        res.send({ // JSON data
            name: 'John Dow',
            likes: ['biking', 'coding']
        });
    */
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About the author of the page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'All projects created by Tuan Anh Ha'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Page not found!'
    });
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
