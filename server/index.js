import { v4 } from 'node-uuid'
import bodyParser from 'body-parser'
const express = require('express')
const app = express()

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

const fakeDatabase = {
  contacts: [
    {
      id: v4(),
      firstName: 'Andrew',
      lastName: 'Lagman',
      bithday: '1989.02.23',
      phoneNumber: '9423432423',
      email: 'foobar@gmail.com',
      notes: 'hello world'
    },
    {
      id: v4(),
      firstName: 'Alex',
      bithday: '1992.01.30',
      lastName: 'German',
      phoneNumber: '9423432423',
      email: 'alex.german@gmail.com',
      notes: 'Hey there!'
    }
  ]
}

app.set('port', (process.env.PORT || 3001))

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/contactTable', (req, res) => {
  delay(1000)
    .then(() => { res.json(fakeDatabase.contacts) })
  // res.json(fakeDatabase.contacts)
})

app.post('/api/addContact', (req, res) => {
  const contact = {
    id: v4(),
    firstName: req.body.firstName || '',
    lastName: req.body.lastName || '',
    bithday: req.body.bithday || '',
    phoneNumber: req.body.phoneNumber || '',
    email: req.body.email || '',
    notes: req.body.notes || ''
  }
  fakeDatabase.contacts.push(contact)
  delay(1000)
    .then(() => { res.json(contact) })
  // res.json(contact)
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`)
})