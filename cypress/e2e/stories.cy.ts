describe('Instagram Stories Feature', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('loads the stories bar', () => {
    cy.get('.stories-bar').should('exist');
    cy.get('.stories-bar img').should('have.length.at.least', 1);
  });

  it('opens the story overlay when a story is clicked', () => {
    cy.get('.stories-bar img').first().click();
    cy.get('.story-viewer').should('be.visible');
  });

  it('shows the correct username and image in the overlay', () => {
    cy.get('.stories-bar img').eq(1).click();
    cy.get('.story-viewer').should('be.visible');
    cy.get('.story-viewer').contains('bob', { matchCase: false });
    cy.get('.story-viewer img').should('be.visible');
  });

  it('navigates to the next and previous stories', () => {
    cy.get('.stories-bar img').first().click();
    cy.get('.story-viewer').should('be.visible');
    cy.get('.story-viewer').click('right');
    cy.get('.story-viewer').click('left');
  });

  it('closes the overlay when the close button is clicked', () => {
    cy.get('.stories-bar img').first().click();
    cy.get('.story-viewer').should('be.visible');
    cy.get('.story-viewer button[aria-label="Close"]').click();
    cy.get('.story-viewer').should('not.exist');
  });

  it('auto-advances to the next story after 5 seconds', () => {
    cy.get('.stories-bar img').first().click();
    cy.get('.story-viewer').should('be.visible');
    cy.get('.story-viewer').contains('alice', { matchCase: false });
    cy.wait(5100); // Wait for auto-advance
    cy.get('.story-viewer').contains('bob', { matchCase: false });
  });

  it('closes the overlay after all stories are viewed', () => {
    cy.get('.stories-bar img').first().click();
    cy.get('.story-viewer').should('be.visible');
    // Advance through all stories
    cy.get('.story-viewer').then(($viewer) => {
      const totalStories = Cypress.$('.stories-bar img').length;
      for (let i = 1; i < totalStories; i++) {
        cy.get('.story-viewer').click('right');
      }
    });
    // After last story, clicking right should close the overlay
    cy.get('.story-viewer').click('right');
    cy.get('.story-viewer').should('not.exist');
  });

  it('closes the overlay after all stories auto-advance', () => {
    cy.get('.stories-bar img').first().click();
    cy.get('.story-viewer').should('be.visible');
    cy.get('.story-viewer').contains('alice', { matchCase: false });
    cy.get('.stories-bar img').then((imgs) => {
      const totalStories = imgs.length;
      // Wait for all stories to auto-advance
      cy.wait(totalStories * 5100);
      cy.get('.story-viewer').should('not.exist');
    });
  });

  it('closes the overlay when clicking left on the first story', () => {
    cy.get('.stories-bar img').first().click();
    cy.get('.story-viewer').should('be.visible');
    cy.get('.story-viewer').click('left');
    cy.get('.story-viewer').should('not.exist');
  });
}); 