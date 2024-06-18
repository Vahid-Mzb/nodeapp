import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.mjs"; // Ensure the path matches the location of your server file
const { expect } = chai;

chai.use(chaiHttp);

describe("Node Server", function () {
  let server;

  before((done) => {
    server = app.listen(4000, () => {
      console.log("Test server started on port 4000");
      done();
    });
  });

  after((done) => {
    // Check if server is running before trying to close it
    if (server && server.listening) {
      server.close(() => {
        console.log("Test server stopped");
        done();
      });
    } else {
      console.log("Server was not running");
      done();
    }
  });

  it("should return Hello From Vahid on / GET", function (done) {
    chai
      .request(server)
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
      .request(server)
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
      .request(server)
      .get("/ready")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.response).to.equal("Great!, It works!");
        done();
      });
  });
});
