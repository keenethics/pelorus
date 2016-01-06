# Pelorus 

## About
Pelorus is a simple yet highly-effective planning tool that helps reaching goals in a way of
successive approximations (based on Dynamic programming).

It’s not actually a to-do list, but you can use it to improve to-do list compilation. It’s
about decomposing strategic goals into a series of simple steps. On each step you can review
your actual state vector for each goal and plan next steps accordingly. This way you can
track your achievements on a regular basis and keep yourself up.

To start you need to set up a "strategic" milestone - a milestone that can last a couple years.
Once you are done with it, you can enter your goals for that period.

For each of the smaller periods (year, month and week) you can create milestones accordingly
and enter subgoals that are steps in reaching your strategic goals.

That's it. You can now check your goals by the end of the day and set progress on each of them.

## Running app locally

1. Clone repository
2. [Install meteor.js](https://www.meteor.com/install) and make sure you have MongoDB installed
3. Start server via `meteor` command

## Styleguide

Please use [eslint](https://github.com/eslint/eslint) to ensure your code has appropriate style.

```
$ npm install -g eslint eslint-config-standard babel-eslint  # install eslint
$ eslint -c .eslintrc --ext .js .                            # run eslint for the whole project
```

Other rules we enforce:

1. Use `check` for all your Meteor.method params
2. Use Meteor.methods rather than client-side queries that modify data
... (to be added)

## Deployment

We are currently using meteor.com as our [staging server](http://pelorus.meteor.com). Make sure you
have permissions to deploy to `pelorus.meteor.com` before you initiating deployment.

To deploy run `meteor deploy pelorus.meteor.com`.

