import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.mjs"; // Adjust path if necessary
const { expect } = chai;

chai.use(chaiHttp);

describe("Node Server", function () {
  let server;

  before(done => {
    server = app.listen(3000, done); // Start server on port 3000 for testing
  });

  after(done => {
    server.close(done); // Close server after tests
  });

  it("should return Hello From Vahid on / GET", function (done) {
    chai
      .request(server) // Use the server instance, not 'app'
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
      .request(server) // Use the server instance, not 'app'
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
      .request(server) // Use the server instance, not 'app'
      .get("/ready")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.response).to.equal("Great!, It works!");
        done();
      });
  });
});
