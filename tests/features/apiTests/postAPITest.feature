Feature: Test Post API

@postTest
Scenario: API to test Post Service
    When I request "createUser" "post" call
    Then I validate response status code as "201"
    Then I validate "$.name" field data as "morpheus"