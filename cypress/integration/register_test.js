describe("register", () => {
  it("user failed to register", () => {
    cy.visit("http://localhost:3000/login");
    cy.findByRole("button", { name: /register/i }).click();

    cy.get('input[name="firstName"]').type("kim");
    cy.get('input[name="lastName"]').type("ham");
    cy.get('input[name="email"]').eq(1).type("kim@gmail.com");
    cy.get('input[name="password"]').eq(1).type("1");
    cy.findByRole("radio", {
      name: /female/i,
    }).click();

    cy.findByRole("button", {
      name: /register/i,
    }).click();
  });

  it("user successfully register ", () => {
    cy.visit("http://localhost:3000/login");
    cy.findByRole("button", { name: /register/i }).click();
    cy.get('input[name="firstName"]').type("kim");
    cy.get('input[name="lastName"]').type("ham");
    cy.get('input[name="email"]').eq(1).type("kim15@gmail.com");
    cy.get('input[name="password"]').eq(1).type("1234");
    cy.findByRole("radio", {
      name: /female/i,
    }).click();

    cy.findByRole("button", {
      name: /register/i,
    }).click();
  });
});
