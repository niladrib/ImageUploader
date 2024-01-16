import express from 'express';
import bodyParser from "body-parser";

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});