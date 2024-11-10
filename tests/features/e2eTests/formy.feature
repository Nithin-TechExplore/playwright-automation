Feature: Fill a webform application

    @formfill1
    Scenario: Fill all the details and submit the form
        Given I launch the application
        When I click on "Complete Web Form" link
        Then I enter the value "John" in "firstName" textbox
        Then I enter the value "Scott" in "lastName" textbox
        Then I enter the value "QE" in "jobTitle" textbox
        Then I select the "College" radio
        Then I wait for "3" seconds
        Then I select "Male, Female, Prefer not to say" values from "checkBox"
        Then I wait for "3" seconds
        When I select "5-9" from "Years of experience"
        When I select date "15-March-2025" from "datePicker"
        When I click on "Submit" button