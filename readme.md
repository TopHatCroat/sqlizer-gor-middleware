# SQLIZER

Middleware for [GoReplay](https://github.com/buger/goreplay/) which will store every intercepted triplet of request, response and replayed response.

### How to use

Ensure you've followed [GoReplay installation instructions](https://github.com/buger/goreplay/#installation) and that a working executable exists in your PATH.

```sh
git clone https://github.com/TopHatCroat/sqlizer-gor-middleware
npm install
npm build
sudo ./gor --input-raw :3000 \
    --input-raw-track-response \
    --output-http-track-response \
    --middleware "./middleware/sqlizer/dist/index.js ./db.sqlite3" \
    --output-http http://localhost:4000
```
`--input-raw-track-response` and `--output-http-track-response` are GoReplay options necessary for accessing the original and replayed responses, **without these middleware will do nothing.**
 
First parameter of middleware specifies the path to the database, it can point to a non existing database (directory must exist), or it can point to an already existing database previously created by the middleware.
