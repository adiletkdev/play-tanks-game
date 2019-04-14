const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Field = require('./field.js');
const Tank = require('./tank.js');

const port = 1771;
const tick = 33.3;

const fieldWidth = 10, fieldHeight = 10;
let field = new Field(fieldWidth, fieldHeight);
let tanks = { };
let bases = [
    { x: 0,              y: 0 },
    { x: fieldWidth - 1, y: 0 },
    { x: fieldWidth - 1, y: fieldHeight - 1 },
    { x: 0,              y: fieldHeight - 1 }
];

app.use(express.static('public'));

io.on('connection', socket => {
    const id = socket.id;

    console.log(`A player with id ${id} has connected.`);

    if (bases.length === 0) {
        console.log(`The room is full. Disconnecting the player with id ${id}.`);

        socket.disconnect();
        return;
    }

    let base = bases.shift(); const tank = tanks[id] = new Tank(socket, field, base.x, base.y, 1, 0);

    const tanksSerialized = {};
    for (const [id, tank] of Object.entries(tanks)) {
        tanksSerialized[id] = tank.serialize();
    }
    socket.emit('upd', tanksSerialized);
    const msg = {};
    msg[id] = tank.serialize();
    socket.broadcast.emit('upd', msg );

    console.log(`The new tank at ${tank.x}, ${tank.y} was created for player with id ${id}.`);

    socket.on('cmd', command => {
        console.log(`A player with id ${id} sent command ${command}.`);

        switch (command) {
            case 'w':
                tank.turnUp();
                break;
            case 's':
                tank.turnDown()
                break;
            case 'a':
                tank.turnLeft();
                break;
            case 'd':
                tank.turnRight();
                break;
            case 'e':
                tank.fire();
                // TODO
                break;
        }
        if ('e' !== command) {
            tank.move(tanks);

            const msg = {};
            msg[id] = tank.serialize();
            io.emit('upd', msg);
        }

        console.log(`The tank position is ${tank.x}, ${tank.y} for player with id ${id}.`);
    });

    socket.on('disconnect', (reason) => {
        console.log(`A player with id ${id} has disconnected.`);
        console.log('Reason: ' + reason);

        tank.isDead = true;
        const msg = {};
        msg[id] = tank.serialize();
        io.emit('upd', msg);

        delete tanks[id];
    });
});

setInterval(() => {
    for (const [id, tank] of Object.entries(tanks)) {
        if (tank.isDead) {
            console.log(`The tank of player with id ${tank.socket.id} was destroyed.`);

            const msg = {};
            msg[id] = tank.serialize();
            io.emit('upd', msg);

            tank.socket.disconnect();
            delete tanks[id];
        } else {
            tank.update(tanks);

            // TODO
        }
    }
}, tick);

http.listen(port, () => console.log(`Tank app listening on port ${port}!`));

