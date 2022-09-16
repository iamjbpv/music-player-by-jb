// var assert = require("assert");

// describe("BasicTest", function () {
//   describe("Multiplication", function () {
//     it("should be 15 when multiplied by 3", function () {
//       var result = 5 * 3;

//       assert.equal(result, 15);
//     });
//   });
// });

const expect = require("chai").expect;
var axios = require("axios");

describe("POST /PLAYLIST", () => {
  var data = JSON.stringify({
    username: "john doe",
    playlistName: "ROCK AND ROLL",
  });
  var config = {
    method: "post",
    url: "http://localhost:8080/api/user/playlist",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  it("OK, creating a new track works", (done) => {
    axios(config)
      .then(function (response) {
        expect(response.data).to.contain.property("_id");
        expect(response.data).to.contain.property("username");
        expect(response.data).to.contain.property("name");
        done();
      })
      .catch(function (error) {
        done(err);
      });
  });
});
