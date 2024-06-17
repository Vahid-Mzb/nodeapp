import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.mjs"; // Ensure the path matches the location of your server file
const { expect } = chai;

chai.use(chaiHttp);

describe("Node Server", function () {
  it("should return Hello From Vahid on / GET", function (done) {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.response).to.equal("Hello From Vahid");
        done();
      });
  });

  it("should return Hello World on /will GET", function (done) {
    chai
      .request(app)
      .get("/will")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.response).to.equal("Hello World");
        done();
      });
  });

  it("should return Great!, It works! on /ready GET", function (done) {
    chai
      .request(app)
      .get("/ready")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.response).to.equal("Great!, It works!");
        done();
      });
  });
});
