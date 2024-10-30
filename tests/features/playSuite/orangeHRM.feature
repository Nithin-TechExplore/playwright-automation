Feature: Verify multiple Tabs

        @demoOrangeHRM1
    Scenario: Validation of Multiple tabs
        Given I launch the application
        When I click on "OrangeHRM, Inc" link and switch tab
        Then I verify if the title of the page is "OrangeHRM" for the switched tab
        Then I wait for "3" seconds
        When I click on "Book a Free Demo" link for the switched tab
        Then I wait for "3" seconds
        Then I switch back to main window