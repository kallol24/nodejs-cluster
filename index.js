// https://www.youtube.com/watch?v=9RLeLngtQ3A&t=603s&ab_channel=yoursTRULY
// https://www.youtube.com/watch?v=6xIbVPyh9wo&ab_channel=LearnCode.academy

const app = require('express')();
const cors = require('cors');
const cluster = require('cluster');
const os = require('os');

const cpu = os.cpus().length;

app.use(cors());

const port = 3001;

app.get('/', (req, res) => {
    for (let i = 0; i < 1e8; i++){
        //do some heavy computing
    }
    res.send(`response sent from process ${process.pid}`);
    // cluster.worker.kill();
});

if (cluster.isMaster) {
    for (let i = 1; i <= cpu; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork(); 
    });
} else {
    app.listen(port, () => console.log(`Process: ${process.pid} running on server ${port}`))
};

// app.listen(port, () => console.log(`App running on port ${port}`));