const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/404');

const sequelize = require('./util/database'); 

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
    // console.log(result);
    
  })
  .catch(err => {
    console.log(err);
  });



