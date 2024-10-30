Feature: Delete API Sample test

    @deleteAPITest
    Scenario: API Sample test for Delete call
    When I request "deleteUser" "delete" call
    Then I validate response status code as "204"