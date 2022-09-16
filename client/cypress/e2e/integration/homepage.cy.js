describe("renders home page", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.get("#playTrack").click();
  });
});

describe("click play in sidebar media controls and pause it after 10 seconds", () => {
  it("plays", () => {
    cy.visit("/");
    cy.get("#playTrack").click();
    cy.get("#playStatus")
      .invoke("attr", "data-play-status")
      .should("eq", "true");
    cy.wait(10000);
    cy.get("#pauseTrack").click();
    cy.get("#playStatus")
      .invoke("attr", "data-play-status")
      .should("eq", "false");
  });
});
