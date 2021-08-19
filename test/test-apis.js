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
                password: "1234"
            })
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

    it("1. It should GET user's models", (done) => {
        const data = new TextEncoder().encode(
            JSON.stringify(
                {
                    userId: "60d6d57bdbb0861ff7cca78b",
                }
            )
        )
        const options = {
            "rejectUnauthorized": false,
            host: 'localhost',
            port: 3000,
            path: '/models/user',
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
});

/**
 * Test the GET route
 */
describe("GET /models", () => {
    it("1. It should GET all models", (done) => {
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
                //process.stdout.write("Response: " + d)
            })
        })
        req.on('error', error => {
            console.error("Error: " + error)
        })
        req.end()
        done()

    });
});

describe("POST /models/add-model", () => {

    it("1. It should POST a new model", (done) => {
        const data = new TextEncoder().encode(
            JSON.stringify(
                {
                    modelName : "AstrunautLocal",
                    src : "saved-models/Astronaut.glb",
                    alt :"Astro",
                    "hotspots[0][position]": "-0.5158334257401533m 0.8808310669112648m 00.12073262739521484m",
                    latitude : "52.48979763883894",
                    longitude: "13.390766864570562",
                    "hotspots[0][normal]" :"-0.6055749170967261m -0.030052908207539756m 0.7952206250416061m",
                    "hotspots[0][text]" : "Hand Moon2",
                    distance :"5",
                    rotation :"5",
                    scaling : "5",
                    userId :"60d6d57bdbb0861ff7cca78b",
                }
            )
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
                //process.stdout.write("Response: " + d)
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
