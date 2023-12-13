const request= require('supertest')
const userr = require('./server')

/*code in comments has been tested once, will not test again because of duplication.*/

describe("post request /signup", () =>{
    test("status code must be 400, type must be json list", async () => {
        const response=await request(userr).post("/api/user/signup").send({
            name: "testest",
            email: "testest@lol.dev",
            roomno: "test",
            password: "123"
        })
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe("application/json")
    })
    /*test("status code must be 201, type must be json list", async () => {
        const response=await request(userr).post("/signup").send({
            name: "testest",
            email: "testest@lol.dev",
            roomno: "test",
            password: "Test@123"
        })
        expect(response.statusCode).toBe(201)
        expect(response.type).toBe("application/json")
    })*/
    test("status code must be 400, type must be json list", async () => {
        const response=await request(userr).post("/api/user/signup").send({
            name: "testestest",
            email: "testest@lol.dev",
            roomno: "test123",
            password: "Test@12344"
        })
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe("application/json")
    })
})

describe("post request /login", () =>{
    test("status code must be 400, type must be json list", async () => {
        const response=await request(userr).post("/api/user/login").send({
            email: "testest@lol.dev",
            password: "123"
        })
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe("application/json")
    })
    test("status code must be 200, type must be json list", async () => {
        const response=await request(userr).post("/api/user/login").send({
            email: "testest@lol.dev",
            password: "Test@12344"
        })
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe("application/json")
    })
})

describe("post request /signupadmin", () =>{
    test("status code must be 400, type must be json list", async () => {
        const response=await request(userr).post("/api/user/signupadmin").send({
            name: "testest",
            email: "testestest@lol.dev",
            roomno: "test",
            password: "123"
        })
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe("application/json")
    })
    /*test("status code must be 201, type must be json list", async () => {
        const response=await request(userr).post("/api/user/signupadmin").send({
            name: "testestest",
            email: "wafton@lol.dev",
            roomno: "test123",
            password: "K9kbea%23@4/5{&nFQt_8&y-%7sm=[M:C*u4D"
        })
        expect(response.statusCode).toBe(201)
        expect(response.type).toBe("application/json")
    })*/
    test("status code must be 400, type must be json list", async () => {
        const response=await request(userr).post("/api/user/signupadmin").send({
            name: "William Afton",
            email: "wafton@lol.dev",
            roomno: "A203",
            password: "6X_V}63i[Yx.6}D%4}7MeNi/,Hp]9eFj"
        })
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe("application/json")
    })
})
