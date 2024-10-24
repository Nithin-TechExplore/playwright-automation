Feature: Test Put API

@putTest
Scenario: API to test Put Service
    When I request "putUser" "put" call
    Then I validate response status code as "200"
    Then I validate "$.job" field data as "zion resident"