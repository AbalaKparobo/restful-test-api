const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./database');

const User = require('./models/user');
const Admin = require('./models/admin');
const Account = require('./models/account');
const Transaction = require('./models/transaction');

const authRoute = require('./routes/auth')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let port = 8080;


Account.belongsTo(User);
// Account.hasOne(User);
// User.belongsTo(Account);

Account.hasMany(Transaction);
Transaction.belongsTo(Account);

app.use(authRoute);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  sequelize
    .sync()
    .then(res => {
      app.listen(process.env.PORT || port, e => {
        if (e) {console.log(e)}
        console.log(`Server is live on port ${port}`);
      })
    })
    .catch(err => console.log(err))
