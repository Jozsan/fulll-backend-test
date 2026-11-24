Feature: Locate a vehicle

    In order to not forget where I've parked my vehicle
    As an application user
    I should be able to know my vehicle's last known location

    Background:
        Given my fleet
        And a vehicle
        And I have registered this vehicle into my fleet

    @critical
    Scenario: I can locate a vehicle that has been parked
        And a location
        And my vehicle has been parked into this location
        When I locate my vehicle
        Then I should be told my vehicle is at this location

    Scenario: I'm informed when a vehicle has no known location yet
        When I locate my vehicle
        Then I should be told my vehicle's location is unknown

    Scenario: I can't locate a vehicle that has never been registered
        Given a vehicle that has never been registered
        When I locate my vehicle
        Then I should be informed this vehicle was not found
