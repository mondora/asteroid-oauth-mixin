[![Build Status](https://travis-ci.org/mondora/asteroid-oauth-mixin.svg?branch=master)](https://travis-ci.org/mondora/asteroid-oauth-mixin)
[![Coverage Status](https://coveralls.io/repos/mondora/asteroid-oauth-mixin/badge.svg?branch=master&service=github)](https://coveralls.io/github/mondora/asteroid-oauth-mixin?branch=master)

# asteroid-oauth-mixin

An OAuth mixin for Asteroid. You can use an available provider (check the
list of available provider) or you can add a custom provider.


## Available provider

*   Google

## Install

    npm install asteroid-oauth-mixin

## Development environment setup

After cloning the repository, install `npm` dependencies with `npm install`.
Run `npm test` to run unit tests, or `npm run dev` to have `mocha` re-run your tests when source or test files change.

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
asteroid.getServiceConfig = providerName => {
    return this.loginServiceConfiguration[providerName];
}

/*
*   Somewhere in your code
*/

asteroid.loginWith("google")
    .then(() => console.log("login successful"))
    .catch(() => console.log("error logging in"))

```

## Example usage with asteroid-immutable-collections-mixin:

```js
import {createClass} from "asteroid";
import * as asteroidOauthMixin from "asteroid-oauth-mixin";
import * as asteroidImmutableMixin from "asteroid-immutable-collections-mixin";

const Asteroid = createClass([asteroidImmutableMixin, asteroidOauthMixin]);

const asteroid = new Asteroid({platform, endpoint});

/*
*   Somewhere in your code
*/

asteroid.loginWith("google")
    .then(() => console.log("login successful"))
    .catch(() => console.log("error logging in"))

```

## API

### loginWith(providerName, scope)

This is the method used to login.

#### Arguments

- `providerName` **string** _required_: the provider name with whom you want to login with Oauth.

- `scope` **string** _optional_: you might need to request access to APIs, depending on the level of access you need. For `google` provider, the `default` is set to `openid email`.

#### Returns

A promise to the method return value (the promise is rejected if the method throws).

### registerOauthProvider(provider)

This is used to set a custom provider.

#### Arguments

- `provider` **string** _required_: the provider name with whom you want to add to the list of available provider.

#### Returns

Nothing.
