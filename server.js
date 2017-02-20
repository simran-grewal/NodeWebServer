const express = require('express');    // requiring express
const hbs  = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();   // making new express app
hbs.registerPartials(__dirname + '/views/partials') // it is for partials .in this i am specifing dericotry where i will use all my handlebars
app.set('view engine', 'hbs');


//HTTP Route Handeler
app.use((req, res, next) =>{
var log = `${new Date().toString()}:   ${req.method}  ${req.url}`;
fs.appendFile('server.log', log, (err) => {
  if(err){
    console.log('cannot connect to server');
  }
})

 next();

})

// THis is very Important:)
/*
app.use((req, res, next) => {
    res.render('maintain.hbs');
})
*/

app.use(express.static(__dirname + '/public')); // It is middleWare we want to use
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!<h1>');
    // res.send({
    //   name: 'simran',
    //   likes: [
    //     'music',
    //     'traveling'
    //   ]
    // });
    res.render('Home.hbs', {
      msg: "This is my",

    });

    });
    hbs.registerHelper('getCurrentYear', () => {
      return new Date().getFullYear();
    });

      hbs.registerHelper('upper', (text) => {
        return text.toUpperCase();
      });



app.get('/about', (req, res) => {
  res.render('about.hbs', {
      pageTitle: 'About page',

  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);

});
