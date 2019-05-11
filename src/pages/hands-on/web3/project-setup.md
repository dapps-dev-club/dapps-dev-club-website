---
templateKey: about-page
title: Hands-on - web3 - project set up
date: 2019-05-07T15:20:00.000Z
updatedDate: 2019-05-07T15:20:00.000Z
draft: false
description:
section: "hands-on"
authors:
  - bguiz
tags:
  - hands-on
---

## Background

Prior to commencing the exercise proper, let's introduce a few concepts.

### Front-end, back-end

Many present day applications, there is a division of responsibilities.
Different parts of the application are written so as to be able to run them
in different scenarios.
Just like assembly lines in factories,
where a single person does not assemble the entire product,
applications are actually multiple applications,
each of which do a different thing.

The most common division -
at least which you would hear about regularly as a developer -
is front-end and back-end, or client and server.
An example of a typical web application is
where you write one application to run on one device
(the front end running in a browser)
and another application to run on another device
(the back end running on a server hosted in a cloud).
There are several permutations and combinations of this.
For example, you can have multiple clients -
by device type: browser, Android, iOS,
or by usage type: customer, admin, et cetera -
and you can have multiple servers -
static file servers, API servers, CDNs, even microservices -
&hellip; within CApps, the number of different configurations is huge!

### Decentralised versions?

Applying this to DApps, we notice some similarities.

The clients can be built using standard web technologies
that run in the browser - HTML, CSS, and Javascript.
But, in order to work, they need something that allows it to talk to
smart contracts deployed on an Ethereum network.
A *Web3 Provider* like MetaMask allows us to do just that,
and we have previously explored doing precisely just that in our
[simple transactions hands-on exercise](/hands-on/simple-tx/).

There are no servers in a decentralised application,
but we do still have computers that execute deployed smart contracts,
running their functions when requested on the Ethereum Virtual Machine.
These computers are the nodes in the Ethereum network,
and thus they are effectively the servers that the DApp clients talk to.
We have previously **written** and **deployed** our smart contracts,
so now we need to write the clients to talk to them!

### Tools

We will be using all of the tools that we have used in a combination of our
previous hands on sessions:

- truffle
- ganache
- metamask

We will also be using something completely brand new:

- Webpack

### Webpack

Webpack is one of the ways in which you can "build" your front end web
applications.
It allows you as a developer to `import` or `require` files in your source code
just as you would when developing using NodeJs,
and "bundle" the required parts - the parts that you used -
into a Javascript file that you can include on your web page.

Strictly speaking, you **do not** need something like Webpack to develop
front end applications, but it does making working with 3rd party modules
significantly easier.
We are working with Web3.js, which used to provide a bundled file,
but **no longer** does, and thus we are using Webpack to work with it.

Take a look at the source code for the
[simple transactions hands-on exercise](/hands-on/simple-tx/) - view source -
and you will find that that uses the last version of Web3.js which was possible
to use like that.
However, we want to be on the bleeding edge, and use the latest version,
so we are not doing that again.

That being said, the objective here is not going to learn Webpack,
so we will skip all of that, and just copy-and-paste the required files,
to make it work, and then move on.
If you are keen, here are some links for you to explore further:

- [Webpack](https://webpack.js.org/)
- [CommonJS](http://www.commonjs.org/specs/modules/1.0/)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

### Vanilla web development

Front end web development is currently fractured into many "camps",
largely organised around their favourite "front-end framework".

I have even written a mini-book about this -
[AngularJs vs EmberJs](http://angularjs-emberjs-compare.bguiz.com/).
It is out of date at the moment, because these frameworks
have moved major version numbers;
plus while they were the dominant ones in the domain a few years ago,
they have been surpassed now by newer frameworks.
This segues nicely into the next point!

Guess what **has not** become outdated in the last few years?

Answer:
HTML, CSS, and Javascript!

If you wrote a web application using 2014 standards for
HTML, CSS, and Javascript, you could still (mostly) use those same skills
to write another web application today.

In this hands on we are going to be using just
regular old Javascript,
and regular old HTML.
If we needed to style anything, we'd use regular old CSS too
(but we're not planning to).

## Create project

Now, with that out of the way, let's create a project.

### Project folder

Within the project folder, create an `app` directory:

```bash
mkdir app
```

The app directory can be anywhere that you like -
it can even be in a different repository if you prefer -
but for the purposes of this hands-on exercise,
we are all going to standardise,
and put it in the root folder of your truffle project:

```bash
$ ls
app
build
contracts
migrations
test
truffle-config.js
```

Then, create the following files for a Webpack project:

```bash
cd app
mkdir src
touch src/index.html
touch src/index.js
touch webpack.config.js
```

### Configure npm

Run the following commands, to create a `package.json` file,
and install the required dependencies:

```bash
npm init --force

npm install --save \
    web3@1.0.0-beta.37 \
    web3-utils@1.0.0-beta.37

npm install --save-dev \
  copy-webpack-plugin@^4.6.0 \
  webpack@^4.28.1 \
  webpack-cli@^3.2.1 \
  webpack-dev-server@^3.1.14 \

```

Edit `package.json` to add `build` and `dev` run scripts:

```json
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  },

```

It should now look similar to this - if not, copy-and-paste over its contents:

```json
{
  "name": "dadc-cars-client",
  "version": "0.0.0",
  "description": "A client for dadc-cars, a DApps Dev Club hands-on exercise",
  "private": true,
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
  "devDependencies": {
    "copy-webpack-plugin": "^4.6.0",
    "webpack": "^4.28.1",
    "webpack-cli": "^3.2.1",
    "webpack-dev-server": "^3.1.14"
  },
  "dependencies": {
    "web3": "1.0.0-beta.37",
    "web3-utils": "1.0.0-beta.37"
  }
}

```

### Configure webpack

Edit `webpack.config.js`:

```javascript
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: 'index.html',
      },
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
  },
};

module.exports = webpackConfig;

```

Just copy-and-paste - we are not going to explain what is going on here,
this is merely for your own reference.

## Skeletal implementation

### HTML

Edit `src/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Cars - DApps Dev Club</title>
  </head>
  <style>
  </style>
  <body>
    <h1>Cars</h1>

    <h2>Queries</h2>

    <!-- add some queries here -->

    <h2>Actions</h2>

    <!-- add some state changers here -->

    <h2>Events</h2>

    <h3>CarHonk</h3>

    <!-- add event display here -->

    <hr />

    <p>
      Open the dev tools to view output
    </p>

    <script src="index.js"></script>
  </body>
</html>

```

### Javascript

Edit `src/index.js`:

```javascript
import Web3 from 'web3';
import { toWei } from 'web3-utils';

```

## Run your DApp!

Run the following command to create a "development build" of your DApp,
and serve it locally:

```bash
npm run dev
```

Open your browser, with MetaMask installed, and navigate to
[localhost:8080](https://localhost:8080/) -
this is the default port that webpack serves its builds at.

Now right-click anywhere on the page and select **Inspect Element**
to open up Dev Tools.

Note that this is not yet a DApp,
at this stage it is a regular web application that does not
interact with any smart contracts.
We will get to that later!

### MetaMask and Ganache

Ensure that your MetaMask is connected to the right Ethereum networks,
and is using the right accounts:

1. Make sure that you have Ganache running,
   do not close or restart it throughout your development process
2. Copy the seed phrase from Ganache over into MetaMask.
   to make sure that you have the same set of accounts.
   We have previously done this, but if you have not, you can do it now.
3. In the dropdown selection for network, ensure that you have `localhost`
   selected, and that the port number matches the one in Ganache
   (usually this is `:8545`, but sometimes can be different).

### Builds

The "development build" is not what you should upload to your server
which real users are going to use.
It is only designed for you as a developer to use.
Instead, run the following commands to create a "real build",
and then serve that locally as well:

```bash
npm run build
npx http-server ./dist/ -p 8989 -c-1
```

Now if you navigate to [localhost:8989](http://localhost:8989/),
you will see your DApp again.
But we will not be using this for the these hands-on exercises,
so let's switch back to using the "development build".

## Congratulations

🎉🎉🎉 You have just set up a front-end development flow for your DApp.

Next, we will add the ability to talk to your smart contracts via web3.js.

## Next &hellip;

- [Web3.js scaffolding](/hands-on/web3/scaffold/)
- [Query state](/hands-on/web3/query-state/)
- [Mutate state](/hands-on/web3/mutate-state/)
- [Listen to events](/hands-on/web3/listen-events/)

