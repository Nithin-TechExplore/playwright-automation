Feature: Registration to the application

@myTest
Scenario: Verifying register of the application
    Given I launch the application
    When I click on "Register" button
    Then I enter the following values
    | firstName | lastName | address | city | state | zipCode | phone | ssn | userName | password | confirmPassword |
    | TestFirst | TestLast | Test Street | TestCity | TestState | 123456 | 1234567890 | 11111111 | test123 |Test@123 | Test@123 |
    Then I wait for "5" seconds
    Then I click on "registerButton" button