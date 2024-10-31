Feature: Verify various actions in the application

    @multipleTab2
    Scenario: Handling multiple tabs in playwright
        Given I launch the application
        When I click on "Multiple Windows" link
        Then I check if the Heading of the page is "Opening a new window"
        When I click on "Click Here" link and switch tab
        Then I check if the Heading of the page is "New Window" "for the switched tab"
        Then I switch back to main window
        Then I check if the Heading of the page is "Opening a new window"

    @dropdown1
    Scenario: Handling dropdown in playwright
        Given I launch the application
        When I click on "Dropdown" link
        When I select "Option 1" from dropdown
        Then I wait for "3" seconds
        When I select "Option 2" from dropdown