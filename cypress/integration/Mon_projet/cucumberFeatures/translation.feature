@translation
Feature: Translate Feature
    Verify if user is able to translate his sentences in to the site

    @translation-language
    Scenario Outline: translation
        Given I open the Translation page
        When I change translation languages from "<source>" to "<target>"
        And I write "<sentence>" in the translation input
        Then The translation output should equal "<translation>"

        Examples:
            | sentence | translation | source | target |
            | Bonjour  | Hello       | fr     | en     |

    @translation-default
    Scenario Outline: Translation 2.3
        Given I open the Translation page
        When I write "<sentence>" in the translation input
        Then The translation output should equal "<translation>"

        Examples:
            | sentence | translation |
            | Thanks   | Danke       |