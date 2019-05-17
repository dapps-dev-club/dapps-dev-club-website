---
templateKey: blog-post
title: "Summary of session #06"
date: 2019-05-16T15:04:00Z
updatedDate: 2019-05-17T15:56:00Z
draft: false
description: "Web3: Front-end setup + Web3.js scaffold + Smart contract interactions: Queries, mutations, and listening to events"
featuredImage: /img/dadc-s01e06-roundup.png
section: news
authors:
  - bguiz
tags:
  - irl
  - s01
  - s01e06
  - summary
  - javascript
  - frontend
  - webpack
  - web3js
---

The DApps Dev Club held its sixth session,
about building front end web applications that talk to smart contracts,
on Tuesday evening at Chainstack.

We spent some time covering general front end web development,
and then built upon that by introducing **web3 provider**s and **web3.js**,
using that to talk to a smart contract instead.

~~Videos will be posted soon!~~
[Videos for this session](/2019-05-17-dapps-dev-club-6th-session-videos/ "Web3 - Videos from S01E06 of DApps Dev Club")
are now available!

<!-- excerpt -->

## Format

Continuing with the bar set in the previous sessions,
this one was almost entirely comprised of hands-on stuff,
and very little theory from a slide deck.

![Let me hit you with some knowledge](https://i.giphy.com/media/coYo4nM8jE1TW/giphy.webp)

Those who've attended our more recent sessions will know that we are **not**
doing this ^.
It isn't about a speaker presenting information,
and the audience downloading that information.
Instead, we're about interactively trying out the things we talk about as we
go along - less talking and more doing.

## Difficulty and pace

This session's hands-on exercises turned out to be the most difficult among
all the sessions thus far,
based on the feedback during and after the session that I have got from you.

In previous sessions, usually about at least two-thirds of those attending
have managed to get the stuff working -
and usually at least two-thirds of those attending have their laptops open
and are actively participating, by following along with the hands-on exercises -
so that has been pretty good!
&hellip; and of course thanks very much to those who volunteered to help out
among others during the session (see the next section, **above and beyond**),
that enabled us to achieved this.

In this session, however, only about half of you managed to get your DApps
working up to the first half of the hands-on exercises,
and only a third of you managed to to get your DApps working
at the end of the hands-on exercises - based on shows of hands.

This is indicative that the difficulty and pace was too hard or fast,
and that I need to makes some changes in the upcoming sessions.
(more on this in the next section, **reflections**.)

## Above and beyond

A few of you who attend these sessions have really stepped up,
going from attending the sessions, to actively helping out.

Thanks [Gerald Nah](https://www.linkedin.com/in/geraldnahhawyuan/)
for helping out during the session,
with setting up the AV and helping out with the recordings.
This was a last minute arrangement, so thanks for being accommodating!

Thanks
[Jack Ng](https://www.linkedin.com/in/jack-ng-b2593b151) and
[Arif Rahman](https://www.linkedin.com/in/arif-rahman-86785a136/).
Both of them helped many of you out during the session,
troubleshooting, and getting you unstuck at the tricky parts!
Also, for **reviewing** my hands-on materials prior to the session,
and giving me **detailed feedback** on it -
which was certainly put to good use!

You deserve a shout out for being awesome! 🙌🙌
The session would not have progressed as **smoothly** as it did without you!

## Reflections

This session, as mentioned earlier, did not have a satisfactory
"got it working" rate - significantly down from the previous sessions.
Thus we will take this into account, and slow down the pace of the sessions.

In this one, we have clearly pushed the limits of both the
scope and the complexity of the content that we are covering during the session.
This has been duly noted, and in future sessions,
we will reverse this trend by reducing and simplifying instead.

The next session, and the remaining ones,
will still aim to cover the same concepts as originally planned;
however, the goal will no longer be to demonstrate or build all of them
in hands-on exercises.
The hands-on exercises will instead be reigned back,
and instead be more like those in sessions #03 and #04,
where it felt like everyone was being challenged,
but not too much to the point that you were unable to get it working.

Apart from the content that was being covered,
there was another significant hurdle,
which was the installation of various dependencies.
In this session there were no new tools to install,
so we were not expecting this issue to crop up - but it still managed to!

So what's going to change here?
For starters, instead of simply saying "install these tools &hellip;" prior to the
sessions -
which we have already been doing in our pre-session announcement posts -
we will also add "&hellip; and install these dependencies."
That will solve the problem for those of you who are keen,
and can come to the session prepared with all the necessary bits already good
to go.

Next up we have another issue, which is that installing depndencies really
should not be that hard to do - most of the time we are dealing with NodeJs
packages distributed on npm.
However, some of the stuff builds NodeJs native modules,
which require certain dependencies that just work better on UNIX systems
(like Mac or Linux).
Those who are on Windows will have a much harder time though -
many of you encountered errors that fundamentally were attributable to
misconfigurations of the `PATH` environment variable,
or certain system binaries that are pre-installed on most UNIX systems
simply being missing.
For those using Windows, setting up a working development environment is harder,
and requires more effort beforehand.
Please consider installing
[Powershell](https://docs.microsoft.com/en-us/powershell/) or
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
in order to follow along more easily!

## Topics

### Front-end web development set up

- [Deck](https://dappsdev.org/deck/s01e06/#setup)
- [Hands-on](/hands-on/web3/project-setup/)

In our very first section, we ditched smart contracts and DApp development
entirely, and instead focused purely on regular web development:
HTML, CSS, and Javascript.

We are building a DApp that runs in the browser,
so there is a lot of common ground between "regular" web development,
and DApp development -
in fact, one might even think of front-end DApp development as
web development that happens to make use of a library/ module called web3.js!

Here we set up a basic NodeJs project with webpack to do both
development builds with hot reloading as well as production builds.

### web3.js scaffolding

- [Deck](https://dappsdev.org/deck/s01e06/#setup)
- [Hands-on](/hands-on/web3/scaffold/)

Following on from the previous hands-on exercise,
we turned our CApp (centralised application)
into a DApp (decentralised application),
by adding web.js.

That was merely the first step though,
we explored the concept of a **web3 provider**,
which in our case was injected into the browser by MetaMask,
and how to use **web3.js** to build a *bridge* that allows regular Javascript
to talk to nodes on the Ethereum network.

Following this, we explored what truffle does behind the scenes when one runs
the **build** and **migrate** commands,
with a focus on the **compiled byte code** and the **deployed byte code**.
This actually, in retrospect, answers a question that was asked,
but did not get enough time to answer in the previous session
(session #05 on testing smart contracts).
We used the contents of `builds/contracts` to construct a Javascript wrapper
for the smart contract that we have built during the previous sessions.
&hellip; and this is the thing through which we are able to interact with the
smart contracts in the subsequent hands-on sections!

### Querying State of a Smart Contract

- [Deck](https://dappsdev.org/deck/s01e06/#interactions)
- [Hands-on](/hands-on/web3/query-state/)

The first, and most straightforward way of interacting with a smart contract
is to query its state.
The solidity compiler auto-generates public accessor functions for each
public state variable that it contains,
and we simply have to use those.

The main take away here, which is a reiteration of something which was stressed
in the previous session (session #05 about testing smart contracts),
is that we should use `.call()` instead of `.send()`,
because we want to query a local copy of the smart contract -
which web3.js does automatically, no extra work required here -
instead of sending the same query to the network,
which involves the computational overhead of processing a transaction,
and therefore needs to be paid for using gas.

At this point we would have built something that we can actually call a DApp
for the first time in this entire series 🎉🎉🎉 congratulations!

### Mutating State of a Smart Contract

- [Deck](https://dappsdev.org/deck/s01e06/#interactions)
- [Hands-on](/hands-on/web3/mutate-state/)

The other main interaction that we have with smart contracts is when we
mutate its state - that is to call a function that modifies its state somehow.
We also explored this concept in the previous session,
but the state transitions (mutations) that we performed,
were done programmatically within tests.
This time we're doing more or less the same thing,
but the interaction is done by a user of our web application instead.

Here we're no longer just working with a local copy,
since we need to send transactions in order to modify state,
so we use `.send()` (not `.call()`).
We also explored how to estimate gas manually,
and what happens when you ignore the estimate and specify
either too much or too little gas.

We also examined the transaction data -
what web3.js actually transmits to the Ethereum network -
and related that back to what we learnt in the earlier sessions.
This wasn't, technically, related to front-end DApp development,
but it was something that was fun to look at at this point,
and to round out some theoretical concepts that were covered in the
some of the previous sessions,
but now we can see in detail.

### Listening to Events Emitted by a Smart Contract

- [Deck](https://dappsdev.org/deck/s01e06/#interactions)
- [Hands-on](/hands-on/web3/listen-events/)

Our final hands-on exercise was to interact with our smart contracts not
in the request-response variety,
but rather in the listening for events variety.
Web3.js makes this very easy to do,
and we set up a listener that prints out event details whenever the ones we were
interested in did something.

We wanted to get further by also updating the web page to list details,
but that needed to be skipped in light of time -
we always run out of it in our final exercise in each session.

There were further tasks around filtering events that were left as
take-home tasks for all of you.

## Thanks

Thanks to
[Lifelong Learning Institute (SkillsFutureSG)](https://www.lli.sg/)
for sponsoring us via their learning circles program - you have them to thank
for the F&amp;B.

Thanks to [Chainstack](https://chainstack.com/)
for hosting us at their excellent space.
Thanks Ashlie &amp; Dennis for helping us run the event,
and helping with the set up.

## Next session

RSVPs are now open - please let us know if you're attending, as it helps us
plan for seating, ordering F&amp;B, etc:

[**RSVP** on eventbrite](https://dappsdev-s01e07.eventbrite.com/)

🤘🤘🤘
