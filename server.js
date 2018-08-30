const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const fs = require('fs');
const port = 3000;

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.use((request, response, next) => {
    console.log(request.headers);
    next();
});
app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send('Something broken!!');
});

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


/**
 * ROUTESSSSSS
 */
app.get('/', (request, response) => {
    response.render('home', { name: "MAHIPAL" });
});

const routeMethod = (routename, content, data) => {
    return `
    app.get('/${routename}', (request, response) => {
        response.render(${routename}, ${data});
    });
    `;
}
const fileContent = `
    app.get('/home', (request, response) => {
        response.render('home', { name: "MAHIPAL" });
    });
`

fs.writeFile('api/routes.js', fileContent, (err) => {
    if (err) throw err;
    console.log("The file was successfully saved!!");
});




app.listen(port, (err) => {
    if (err) console.log(`Something bad happend`, err);
    console.log(`Server listening on ${port}`);
});

