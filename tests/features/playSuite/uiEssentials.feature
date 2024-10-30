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

