if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require ('express-ejs-layouts');
const bodyParser = require ('body-parser');

const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors')
const booksRouter = require ('./routes/books')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended:false}));

const mongoose = require ('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/authors', authorsRouter)
app.use('/books', booksRouter)


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
// app.listen(port); <-- format normal nya Heroku, pakai port 8000 tapi
app.listen(port, function() {
  console.log("server running Successfully");
});
