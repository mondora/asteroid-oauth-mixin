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
*   Somewhere in your code
*/

asteroid.loginWith("google")
    .then(() => console.log("login successful"))
    .catch(() => console.log("error logging in"))

```
