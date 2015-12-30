# Pelorus 

## About
Pelorus is a simple yet highly-effective planning tool that helps reaching goals in a way of
successive approximations (based on Dynamic programming).

It’s not actually a to-do list, but you can use it to improve to-do list compilation. It’s
about decomposing strategic goals into a series of simple steps. On each step you can review
your actual state vector for each goal and plan next steps accordingly. This way you can
track your achievements on a regular basis and keep yourself up.

## Running app locally

1. Clone repository
2. [Install meteor.js](https://www.meteor.com/install) and make sure you have MongoDB installed
3. Start server via `meteor` command

## Styleguide

Please use [eslint](https://github.com/eslint/eslint) to ensure your code has appropriate style.

To install eslint, run `$ npm install -g eslint eslint-config-standard`

To run eslint `eslint -c .eslintrc --ext .js .`


## Deployment

We are currently using meteor.com as our [staging server](http://pelorus.meteor.com). Make sure you
have permissions to deploy to `pelorus.meteor.com` before you initiating deployment.

To deploy run `meteor deploy pelorus.meteor.com`.

