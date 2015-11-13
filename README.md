[![Build Status](https://travis-ci.org/mondora/asteroid-oauth-mixin.svg?branch=master)](https://travis-ci.org/mondora/asteroid-oauth-mixin)
[![Coverage Status](https://coveralls.io/repos/mondora/asteroid-oauth-mixin/badge.svg?branch=master&service=github)](https://coveralls.io/github/mondora/asteroid-oauth-mixin?branch=master)

# asteroid-oauth-mixin

An OAuth mixin for Asteroid.

## Install

### In node

Download the package:

    npm install asteroid-oauth-mixin

## Example usage

```js
import {createClass} from "asteroid";
import * as asteroidOauthMixin from "asteroid-oauth-mixin";

const Asteroid = createClass([asteroidOauthMixin]);

const asteroid = new Asteroid({platform, endpoint});

/*
*   You need to define a `getServiceConfig` method (either in a mixin or on the
*   instance itself) which returns a plain object containing the configuration
*   for the specified provider. Such configurations are stored in the
*   `meteor_accounts_loginServiceConfiguration` collection, which the oauth
*   mixin automatically retrieves by subscribing to
*   `meteor.loginServiceConfiguration`, a subscription published - by default -
*   by the meteor server.
*   A naive implementation could be the following:
*/
asteroid.ddp.on("added", ({collection, id, fields}) => {
    if (collection === "meteor_accounts_loginServiceConfiguration") {
        asteroid.loginServiceConfiguration = {
            ...asteroid.loginServiceConfiguration,
            [id]: {
                _id: id,
                ...fields
            }
        };
    }
});
asteroid.getServiceConfig = function (providerName) {
    return this.loginServiceConfiguration[providerName];
}

/*
*   Somewhere in your code
*/

asteroid.loginWith("google")
    .then(() => console.log("login successful"))
    .catch(() => console.log("error logging in"))

```

### If you use asteroid-collections-mixin:

```js
import {createClass} from "asteroid";
import * as asteroidOauthMixin from "asteroid-oauth-mixin";
import * as asteroidCollectionsMixin from "asteroid-collections-mixin";

const Asteroid = createClass([asteroidCollectionsMixin, asteroidOauthMixin]);

const asteroid = new Asteroid({platform, endpoint});

/*
*   Somewhere in your code
*/

asteroid.loginWith("google")
    .then(() => console.log("login successful"))
    .catch(() => console.log("error logging in"))

```
