// este archivo es para que netlify genere el archgivo .env  y no tenga que mandarselo yo
const fs = require('fs');  // importo modulo de node file sistem fs
fs.writeFileSync('./.env', `API=${process.env.API} \n`); // creo el archivo . env en el directorio raiz  del proyercto