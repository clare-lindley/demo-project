const express = require('express')
const app = express()
const port = 3000
const file_ops = require('./delete-files');

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// 1. handler
app.get('/delete-files', (req, res) => {
	file_ops.deleteFiles();
	res.status(200).send('OK BABY');
});

// 2. make the request! Call it from the speech api bit!



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
