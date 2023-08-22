const express = require('express')
const app = express()
const PORT = 5007

app.use(express.json())

app.get('/api/mdr/handleresponse', (req, res) => {
  const authHeader = req.headers['authorization']
  if (authHeader) {
    console.log('auth header:', authHeader)
  }

  res.status(200).send({
    status: 200,
    message: 'test succeeded!',
  })
})

app.post('/api/mdr/handleresponse', (req, res) => {
  const { Table, data } = req.body[0]
  // console.info('data from sql server: ', req.body[0])
  const authHeader = req.headers['authorization']
  if (authHeader) {
    console.log('auth header:', authHeader)
  }

  if (!data || !Table) {
    res.status(400).send({
      message:
        'The data passed is not in the expected format. The body should contain an object that contains a key named "table" that is a string, and a key named "data" that is a JS object',
    })
  } else {
    console.log(`Success. Processed ${req.body.length} records.`)
    res.status(202).send('Sent to queue')
  }
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
