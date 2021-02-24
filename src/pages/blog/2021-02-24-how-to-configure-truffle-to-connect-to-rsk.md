---
templateKey: blog-post
title: How to configure Truffle to connect to RSK?
featuredImage: /img/rsk-truffle-polling-interval.png
date: 2021-02-24T09:00:07.115Z
description: >-
  using the new provider.pollingInterval and deploymentPollingInterval options
  in truffle-config.js
tags:
  - rsk
  - truffle
authors:
  - bguiz
---
### Public Nodes

When connecting to **public nodes**,
it is crucial to understand that you are interacting with the nodes **indirectly**.
Each RPC request goes through a series of hops through other infrastructure,
such as authentication gateways, load balancers, rate limiters, et cetera.
Each of these other layers contains its own logic that may be more restrictive than the node itself.

You may opt to work around this by running your own node on `localhost`.

### Ethereum Defaults

Truffle's **default configuration** is optimised for the Ethereum network.
However, some of these values are incompatible with the RSK network,
and need to be **overridden** accordingly.
Remember that while RSK is compatible with Ethereum
both at the RPC level and at the VM level;
its internal implementation can be quite different.

The main difference lies in the relationship
between *block interval* and *polling interval*.

The **block interval** is the duration of time between
a block being added to the blockchain and the next one being added.
Note that all transactions must be in a block
in order to be added to the blockchain
(AKA "has been mined").

- RSK's block interval is currently approximately 30 seconds, whereas
- Ethereum's block interval is currently approximately 15 seconds.

Client applications, such as decentralised applications,
or in this case Truffle (a developer tool),
need to periodically check if blocks, and therefore transactions,
that have been submitted have since been added to the blockchain.
The **polling interval** is the duration of time between 
one such check and the next.

It thus makes sense to optimise the efficiency of the client application
by configuring a polling interval that is *commensurate*
with the anticipated block interval.
Drawing upon the concept of
[critical frequency](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem#Critical_frequency "Nyquist–Shannon sampling theorem - critical frequency")
(in Nyquist–Shannon sampling theorem),
it makes sense to pick a 15 second polling interval
when anticipating a 30 second block interval from RSK.
Manual testing appears to indicate that this works well.

> Note that Truffle's default is a 4 second polling
> for an anticipated 15 second block interval on Ethereum.
> This is still "allowed", as critical frequency
> as that specifies the *upper bound* of the sampling
> to be *half*.
> Configuration values should be picked carefully
> by weighing the pros and cons of performance against resource intensity.

Note that Truffle's implementation has 2 separate polling intervals:

- one for `provider.pollingInterval`,
  which is for "regular" usage, and
- another for `deploymentPollingInterval`,
  which is used exclusively for deployments (`truffle migrate`)

These configuration options were originally not implemented,
and were set to hard coded defaults.
These were added specifically top be able to support networks
with a different block interval!
See:

- [DApps Dev Club's tweet about adding `provider.pollingInterval`](https://twitter.com/DAppsDev/status/1324929409158012929)
- [DApps Dev Club's tweet about adding `deploymentPollingInterval`](https://twitter.com/DAppsDev/status/1328695467081756673)

### Configuring Truffle

With all the above in mind,
let's now see how to implement this in a Truffle project.

In your `truffle-config.js` file:

(1) Set a variable `testnetSeedPhrase` to
  contain a valid BIP-39 mnemonic phrase
  
(2) Set a variable `gasPriceTestnet` to
  contain the gas price you wish to use denominated in Wei.
  
(3) In the exported `config` object,
  set the value of `config.networks.testnet` to be the following.

```javascript
    testnet: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: testnetSeedPhrase,
        },
        providerOrUrl: 'https://public-node.testnet.rsk.co/',
        // Higher polling interval to check for blocks less frequently
        pollingInterval: 15e3,
      }),
      // Ref: http://developers.rsk.co/rsk/architecture/account-based/#chainid
      network_id: 31,
      gasPrice: gasPriceTestnet,
      networkCheckTimeout: 1e6,
      timeoutBlocks: 100,
      // Higher polling interval to check for blocks less frequently
      // during deployment
      deploymentPollingInterval: 15e3,
    },
```

(4) Now you can run `truffle` sub-commands with this network selected,
  for example:
  
```shell
truffle migrate --network testnet
```

----

Happy DApp developing!