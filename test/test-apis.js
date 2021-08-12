let chai = require("chai");
const expect = chai.expect;
const request = require('request');
var urlBase = "https://localhost:3000";
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp)
const https = require('https')


/**
 * Test the POST route
 */
describe("POST /users/register", () => {
    it("1. It should REGISTER a new user", (done) => {
        const data = new TextEncoder().encode(
            JSON.stringify({
                name: "user1",
                email: "user1@email.com",
                password: "1234"            })
        )
        const options = {
            "rejectUnauthorized": false,
            host: 'localhost',
            port: 3000,
            path: '/users/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', d => {
                process.stdout.write("Response: " + d)
            })
        })
        req.on('error', error => {
            console.error("Error: " + error)
        })

        req.write(data)
        req.end()
        done()

    });

    it("2. It should Login a new user", (done) => {
        const data = new TextEncoder().encode(
            JSON.stringify({
                email: "user1@email.com",
                password: "1234"            })
        )
        const options = {
            "rejectUnauthorized": false,
            host: 'localhost',
            port: 3000,
            path: '/users/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', d => {
                process.stdout.write("Response: " + d )
            })
        })
        req.on('error', error => {
            console.error("Error: " + error)
        })

        req.write(data)
        req.end()
        done()

    });
});

/**
 * Test the GET route
 */
describe("GET /models", () => {
    it("1. It should REGISTER a new user", (done) => {
        const options = {
            "rejectUnauthorized": false,
            host: 'localhost',
            port: 3000,
            path: '/models',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', d => {
                process.stdout.write("Response: " + d)
            })
        })
        req.on('error', error => {
            console.error("Error: " + error)
        })
        req.end()
        done()

    });
});


// it('Main page content', function(done) {
//
//     const payload = {
//         name: "user1",
//         email: "user@email.com",
//         password: "1234"
//     };
//     request('https://localhost:3000' , function(error, response, body) {
//         expect(200);
//         console.log(body)
//         done();
//     });
// });
//
//
// it('Main page content', function(done) {
//
//     const payload = {
//         name: "user1",
//         email: "user@email.com",
//         password: "1234"
//     };
//     request('http://localhost:3000/users/register' , function(error, response, body) {
//         expect(200);
//         console.log(body)
//         done();
//     });
// });
