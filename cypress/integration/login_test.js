describe("login", () => {
  it("user failed to login", () => {
    cy.visit("http://localhost:3000/login");
    cy.findByRole("textbox").type("tim20@gmail.com");
    cy.findByPlaceholderText(/password/i).type("hello");
    cy.findByRole("button", { name: /login/i }).click();
  });

  it("user  login", () => {
    cy.visit("http://localhost:3000/login");
    cy.findByRole("textbox").type("tim@gmail.com");
    cy.findByPlaceholderText(/password/i).type("1234");
    cy.findByRole("button", { name: /login/i }).click();
  });
});
