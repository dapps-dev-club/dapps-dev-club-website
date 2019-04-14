---
templateKey: blog-post
title: "Summary of session #04"
date: 2019-04-12T10:52:00Z
updatedDate: 2019-04-12T10:52:00Z
draft: false
description: "Solidity: Solidity-by-feature + solc + ganache + truffle"
featuredImage: /img/dadc-s01e04-roundup.png
section: news
authors:
  - bguiz
tags:
  - irl
  - s01
  - s01e04
  - summary
  - solidity
  - solc
  - truffle
  - ganache
---

We held our 4th session - on Solidity - a few days ago, on Tuesday evening at
Chainstack. We covered features of Solidity as a programming language, as well
as a few development tools used to work with Solidity - solc, truffle, and ganache.

~~We will be posting about our videos soon!~~ We have posted
[our videos from this session](/blog/2019-04-13-dapps-dev-club-4th-session-videos/)
now.

<!-- excerpt -->

As mentioned in the
[session info](/blog/2019-04-06-dapps-dev-club-4th-session-info/)
prior to the session, we did not manage to cover Solidity as planned in the
previous session, so in this session we covered both Solidity, and the
development tools used to work with it. So there was a lot to cover - but we
got there!

## Format

As promised in the
[kickoff session](https://dappsdev.org/blog/2018-02-25-dapps-dev-club-kickoff-session/),
and the sessions since, we have transitioned from a lecture-style session,
to a participatory hands-on workshop type of session.
This time apart from the *introduction* and *recap* parts at the beginning,
and the *next session* part at the end, *all* the other parts had a hands-on
component to it.

## Difficulty and pace

During the break in the middle of the session, some of you said that the
hands-on part that we did was too easy - it was literally copy-and-paste - and
I told you to hang on till the end of the session.

In the second half of the session, we had two more hands-on parts. The final
one, the one where we used truffle, was clearly challenging, as many of you got
stuck, and needed help/ troubleshooting.

This was as intended - we want everybody to come away feeling like they have
learnt something, and accomplished something. That means making parts of the
session easy, and parts of it hard.

It was great to see that a few of you who had "figured it out" went on to help
others around you that happened to be stuck, to also "figure it out". We really
would love to see this trend continue, with you all reinforcing each others'
learning.

In this session, due to the sheer amount of content that we had to cover, we
had to pick up the pace significantly compared to the previous sessions. Even
then, we managed to run over time. Thank you everyone for sticking around till
late that that - and on a lighter note, we're glad that we managed keep your
collective attention for so long!

In fact some of you were so engaged that you were still
[chatting](https://bit.do/dadc-chat)
about the topics for the night till after midnight!

## Topics

### Solidity-by-feature

- [Deck](/deck/s01e04/#solidity)
- [Hands-on](/hands-on/solidity-intro/)

Here we built up a very basic smart contract from scratch, feature by feature.
But not by feature of the contract, but rather by feature of the programming
language.

We started off with a basic structure of a contract that did nothing.
Then added some state variables directly to the contract using primitive types.
Next we introduced dynamic types, using a `struct` to group several primitive
type variables together, and a `mapping` to store them as a state variable
on the contract.
After this, we added functions to add and modify those `struct`s.
Then refactored the functions to make use of function modifiers to reduce the
repetition when defining pre-conditions that were common or similar between
the functions.
Finally, we defined an `event` and wrote a new function that emitted it.

We also had a little aside, where we discussed what the term *contract*
within *smart contract* meant, in the context of *design by contract*, as
defined by Eiffel (another programming language).

### solc

- [Deck](/deck/s01e04/#solc)
- [Hands-on](/hands-on/solc-intro)

Here we installed *solc*, the solidity compiler, and ran it on the command line
(within a shell or terminal), with various options to see the different stages
and outputs of the compiler, briefly exploring what each was.

Here some of us ran into issues with installing *solcjs*, and those same issues
cropped up again later on when installing *truffle*. Thanks to Jeremy for
identifying the root cause of this - turns out it had nothing to do with either
*solcjs* or *truffle*, but rather to do with python 2 vs python 3. When
installing them, these rely on *node-gyp*, which expects python 2, but
crashes when python 3 is used.The solution  was to ensure that python 2 was
first on your `PATH` environment variable. This is something to keep in mind
for future sessions.

### ganache

- [Deck](/deck/s01e04/#ganache)

This was a really short section, and it was mostly about installing the tool
and running it. Apart from that though, the larger discussion was about how
the various tools fit together in the development, deployment, and running
of decentralised applications.

### truffle

- [Deck](/deck/s01e04/#truffle)
- [Hands-on](/hands-on/truffle-intro/)

Here we used the smart contract that we had built earlier, and took them for a
spin. We initialised a blank truffle project, put the contract into it. Used
truffle to compile, deploy, and interact with the smart contract, through
its REPL (read-eval-print-loop).

This was the most challenging part of the session, and also where the most
problems encountered, and questions were. Also simultaneously seemed to be the
favourite part for everyone.

For those using Windows, Jack has a tip:
Use `truffle.cmd` instead of `truffle` in order to avoid certain errors.

An astute observation, from Joey, was:

> I saw there were three levels of payment:
>
> - contract.numCars.call() is free (just querying the node's chain I guess)
> - contract.honkCar() costs some gas
> - contract.addCar() costs some gas, and the contract also demands that you
>   send it some Eth!

That is spot on - when calling a function that does not change the state of
the contract in any way, query the local copy of the contract, rather than
query the copy of the contract that is on the blockchain.

When you do execute a
function on a copy of the contract that is on the blockchain, that must be done
through a transaction. Any transaction that gets executed requires a certain
amount of gas to run (depending on its computational complexity), and that gas
must be paid for in Ether, otherwise, none of the Ethereum nodes in the network
will execute the transaction, as the incentive to execute the other
transactions will mean that they will be prioritised. So the nodes performing
the transactions must always get their fee.

Over and  above this, optionally, the transaction may also send ether to the
contract itself. In Solidity, this means that the function must be marked
with the `payable` keyword. When this is present `msg.value` amount of
Ether is added to the contract.

Another observation, also from Joey, was an error on my part.

```
contract.numCars() // should cost ETH
contract.numCars.call() // should be free
```

However, it turns out that `truffle-contract`, which is truffle's own wrapper
around a deployed instance of a contract, does some *framework magic* here,
and when the function is *view* or *pure*, it automatically switches to the
`.call()` variant instead of the one that you called.

Thanks for the attention to detail and catching that one!

## Javascript??

![I can haz Javascript?](/img/i-can-haz-javascript.jpeg)

In the next session, we will need to come into it knowing some basic Javascript,
as we will be writing tests using mocha, to test our smart contracts. We've
posted a list of resources of where you can learn Javascript from.

But let's face it - nothing beats some hands-on help when you're stuck on
something. So we have enlisted the *help of some volunteers* from the SingaporeJS
community, as well as the broader developer community here. That will certainly
help for those of you attending. Hopefully it will also make it *less* daunting
for those of you who will be doing Javascript for the first time.

## Thanks

Thanks to
[Lifelong Learning Institute (SkillsFutureSG)](https://www.lli.sg/)
for sponsoring us via their learning circles program - you have them to thank
for the F&amp;B.
Thanks [Dr Leong Li-Ming](https://www.linkedin.com/in/limingleong/),
their principal manager, for attending too.

Thanks to [Chainstack](https://chainstack.com/) and
[Acronis](https://www.acronis.com/)
for hosting us at their excellent office.
Thanks [Ashlie](https://www.ashliechin.com/) for helping us run the event, and
Dennis for putting together the excellent AV set up.

Thanks to Zi Hui and Wing as well, for their on-site assistance running the
event.

## Next session

RSVPs are now open - please let us know if you're attending, as it helps us
plan for seating, ordering F&amp;B, etc:

[**RSVP** on eventbrite](https://www.eventbrite.com/e/dapps-dev-club-session-05-testing-smart-contracts-tickets-60041615087)

See you all again soon!
