const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(express.static('static'));
const allowCors = [
    'http://localhost:3000',
    'http://polling.macstr.pl'
]
app.use(cors({
    origin: allowCors
}));
app.use(express.json());

let obs = [];
app.get('/lp', (req, res) => {
    obs.push(res);
});

app.post('/mess', (req, res) => {
    console.log('post');
    let mess = req.body.mess;
    obs.forEach(res => {
        res.send({mess: mess});
    })
    console.log(mess);
    obs = [];
    res.sendStatus(204);
})
let op = 0;
app.get('/cnt', (req, res) => {
    res.send(`numer ${op++}`);
    console.log(op);
})
app.listen(PORT, () => {
    console.log(`App work on port ${PORT}`);
})