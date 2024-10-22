Feature: Login to the application in the Sauce Demo

    @sauceDemo
    Scenario: Login to the Sace Application
        Given I launch the application
        Then I Enter the "<UserName>" in "sauceUserName"
        Then I Enter the "<Password>" in "saucePassword"
        Then I click on "LOGIN" button
        Then I wait for "5" seconds

        Examples:
            | UserName      | Password     |
            | standard_user | secret_sauce |