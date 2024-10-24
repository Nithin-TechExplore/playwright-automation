Feature: Get API Sample test

    @getAPITest
    Scenario: API Sample test for Get call
    When I request "getUser" "get" call
    Then I validate response status code as "200"
    Then I validate "$..id" field data as "2"
