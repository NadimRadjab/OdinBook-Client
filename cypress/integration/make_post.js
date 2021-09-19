describe("change profile pic", () => {
  //user logs in
  //makes post
  //likes a post
  //comments a post
  it("user logs in ", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("rims@gmail.com");
    cy.get('input[name="password"]').type("1234");

    cy.findByRole("button", {
      name: /login/i,
    }).click();
  });

  it("user makes a new post and likes it", () => {
    const main = cy.findByRole("main");
    main.findByRole("textbox").type("Hello");
    cy.findByText(/add/i).click();

    cy.findByRole("button", {
      name: /like/i,
    }).click();
  });
  it("user adds a comment on the post", () => {
    cy.get(".makeStyles-expand-72").click();
    cy.get('input[name="text"]').eq(1).type("how are you");
    cy.get(".MuiButton-sizeSmall").eq(2).click();
  });
});
