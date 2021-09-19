describe("change profile pic", () => {
  //user logs in
  //user chage profile pic
  it("user logs in ", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("rims@gmail.com");
    cy.get('input[name="password"]').type("1234");

    cy.findByRole("button", {
      name: /login/i,
    }).click();
  });

  it("User can change profile pic", () => {
    cy.findByRole("button", {
      name: /edit photo/i,
    }).click();

    cy.findByText(/upload photo/i).click();

    cy.get('input[type="file"]').attachFile("waldo.png");

    cy.findByRole("button", {
      name: /save changes/i,
    }).click();
  });
});
