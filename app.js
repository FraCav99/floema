require('dotenv').config()

const express = require('express')
const path = require('path')

const { client } = require('./config/prismicConfig')

const prismicH = require('@prismicio/helpers')

const app = express()
const errorHandler = require('errorhandler')
const port = process.env.PORT || 3000

// Set Pug as templating engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(errorHandler())

// Add a middleware function that runs on every route. It will inject
// the prismic context to the locals so that we can access these in
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  }

  next()
})

app.get('/', (req, res) => {
  res.render('pages/home')
})

app.get('/about', async (req, res) => {
  // TODO: recuperare metadata per template pug
  // TODO: risolvere problema slice_type 'galllery' (typo nel nome)
    const document = await client.getSingle('about')
    console.log(document.data.body)
    res.render('pages/about', { document })
})

app.get('/collections', (req, res) => {
  res.render('pages/collections')
})

app.get('/detail/:uid', async (req, res) => {
  const document = await client.getByUID('product', req.params.uid, {
    fetchLinks: 'collection.title',
  })
  res.render('pages/detail', { document })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
