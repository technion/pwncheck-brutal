Brutal Pwncheck
===============

Why brutal?
-----------

There are many, many libraries for Troy Hunt's Pwned Passwords API.

Many of them require Node. Others bundle a lot of polyfills. My favourites include some guy's home made SHA-1 imeplementation. This library is for people looking to use the API, and nothing else.

It's browser based, and although the build compiles out await/async, even Edge supports ES6 arrow functions, so this library ships with them. That said, Edge does not support SHA-1 in Webcrypto, so that browser isn't supported either.

Non-goals
---------

- Returning the number of times seen. This is not a good metric, a bad password is a bad password.
- Bundling 30KB of polyfills. I suggest looking at one of the existing libraries for this goal.
- Running as a command line interface. This was specifically built for web based use.

Usage
-----

Install the module:

    npm install --save pwncheck-brutal

Use it:
```
import { beenpwned } from "pwncheck-brutal";
beenpwned(confirmpassword)
  .then(pwned) => {
    console.log(`Has password been pwned? ${pwned}`);
  }
```

Tests
-----

I appreciate that you can mock fetch() and WebCrypto, but this code doesn't do much else. I generally take an approach of extensively writing tests, but this app would just be testing a bunch of mocks.
