import express from 'express';
import path from "path";



const app = express();
const port = 3000;
// app.get('/', (req, res) => {
//     console.log('received request!');
//     res.send('Express + TypeScript Server');
// });
app.use(express.static(path.join(__dirname,'public')));
app.set('trust proxy', 'loopback');
app.listen(port, 'localhost', () => {
    console.log(`server is listening on ${port}`);
});