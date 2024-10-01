# Stock Management Demo v2.0

Dealership stock-on-hand.

## Development

A `Makefile` is used to bundle up commands to get the dev system up and running.

### Install Development

`make dev-install` will install all the neccessary prerequisites for the development environment. 

The system assumes your workstation is Debian 12.

### Dev Run

`make run` will start the node server and run the angular frontend.

Proxying has been an issue.

TODO lxc containers with nginx proxy infront of everything

## Production Consideration

Requirement stipulates Angular V8. 

Decided to upgrade to Angular V18 due to deprecation and obsolescence errors.
