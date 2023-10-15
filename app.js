require('dotenv').config()

const express = require('express')
const path = require('path')

const client = require('./config/prismicConfig').client

const prismicH = require('@prismicio/helpers')

const app = express()
const port = process.env.PORT || 3000

// Set Pug as templating engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Add a middleware function that runs on every route. It will inject
// the prismic context to the locals so that we can access these in
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  }
  next()
})

app.get('/', async (req, res) => {
  // Here we are retrieving the first document from API endpoint
  const document = await client.getFirst()
  res.render('pages/home', { document })
})

app.get('/about', async (req, res) => {
  res.render('pages/about')
})

app.get('/collections', (req, res) => {
  res.render('pages/collections')
})

app.get('/detail/:uid', (req, res) => {
  res.render('pages/detail')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
