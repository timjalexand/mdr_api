const express = require('express')
const app = express()
const PORT = 5007

app.use(express.json())

app.get('/api/mdr/handleresponse', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'test succeeded!',
  })
})

app.post('/api/mdr/handleresponse', (req, res) => {
  const { table, data } = req.body
  console.info('data from sql server: ', req.body)

  if (!data || !table) {
    res.status(400).send({
      message:
        'The data passed is not in the expected format. The body should contain an object that contains a key named "table" that is a string, and a key named "data" that is a JS object',
    })
  } else {
    res.status(202).send('Sent to queue')
  }
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
