Play Tanks Game
===========

Play Tanks Game is a simple multiplayer tank game in a browser.

## Setup

1. Install dependencies

`npm install`

2. Start the server

`node index.js`

## Tank Client-Server Communication Protocol

### Tank Commands

Message Name: `cmd`

* Move Up:    'w'
* Move Down:  's'
* Move Left:  'a'
* Move Right: 'd'
* Fire:       'e'

### Server Updates

Message Name: `upd`

Sends essential tank and his projectile info.

## Authors

Adilet Kozubaev <adiletk312@gmail.com>
