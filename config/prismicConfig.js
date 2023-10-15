require('dotenv').config()

// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
const fetch = require('node-fetch')
const prismic = require('@prismicio/client')

const repoName = 'Floema'
const accessToken = process.env.PRISMIC_ACCESS_TOKEN

// The `routes` property is your route resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
  {
    type: 'page',
    path: '/:uid',
  },
]

export const client = prismic.createClient(repoName, {
  fetch,
  accessToken,
  routes,
})
