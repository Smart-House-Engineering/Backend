// import chai from "chai"
import { describe, it } from "mocha"
import { expect, use } from "chai"
import chaiHttp from "chai-http"
import app from "../app.js"
const chai = use(chaiHttp)

describe("Authentication Routes", () => {
  describe("POST /login", () => {
    it("should return status 400 if email or password is missing", done => {
      chai
        .request(app)
        .post("/auth/login")
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400)
          done()
        })
    })

    // TODO: add successful login as well
  })

  describe("POST /logout", () => {
    it("should clear the cookie and return status 200", done => {
      chai
        .request(app)
        .post("/auth/logout")
        .end((err, res) => {
          expect(res).to.have.status(200)
          //   expect(res).to.have.cookie("SmartHouseToken", "")
          done()
        })
    })
  })
})
