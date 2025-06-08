describe('App Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the app successfully', () => {
    cy.get('.App').should('exist');
  });

  it('should render stories section', () => {
    cy.get('.stories-section').should('exist');
  });

  it('should display story items', () => {
    cy.get('.stories-bar').should('exist');
  });

  it('should show story viewer when clicking a story', () => {
    cy.get('.stories-bar').first().click();
    cy.get('.story-viewer').should('exist');
  });

  it('should handle 404 routes gracefully', () => {
    // Visit a non-existent route
    cy.visit('/non-existent-route');
    
    // Verify app doesn't crash
    cy.get('.App').should('exist');
  });
}); 