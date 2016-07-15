var express = require('express')

var app = express()

var id = 0
var object = {}
var last = ''
var date

const PASS_PERCENTAGE = 0.5
const NEW_ID_PERCENTAGE = 0.4

object.hits = {}
object.hits.hits = []

app.use('/', (req, res) => {
  if (!date) {
    date = new Date()
  }
  var result = {}
  result._source = {}

  if (Math.random() > PASS_PERCENTAGE) {
    result._source.status = 'failed'
    if (last === 'passed') {
      id++
      date = new Date()
    }
  } else {
    result._source.status = 'passed'
    if (last === 'failed') {
      id++
      date = new Date()
    }
  }

  if (Math.random() < NEW_ID_PERCENTAGE) {
    id++
    date = new Date()
  }

  result._id = id.toString()
  result._source['test-ID'] = id.toString()
  result._source['@timestamp'] = date.toISOString()

  object.hits.hits[0] = result
  last = result.status
  console.log(result)
  res.json(object)
})

app.listen(7777, () => {
  console.log('fake server listening on 7777')
})
