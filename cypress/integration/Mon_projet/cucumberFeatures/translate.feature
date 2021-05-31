Feature: Translate Feature
  Verify if user is able to translate his sentences in to the site
 
  Scenario Outline: Translation into German
    Given I open the Deepl page
    And I write "<sentence>" in the translation input
    Then The translation output should equal "<translation>"
 
    Examples:
      | sentence                | translation         |
      | Hello world             | Hallo Welt          |
      | I am learning Cypress ! | Ich lerne Cypress ! |
 
  Scenario: Deletion of the text
    Given I open the Deepl page
    And I write "Hello World" in the translation input
    And I click on the delete button
    Then The translation output should equal ""