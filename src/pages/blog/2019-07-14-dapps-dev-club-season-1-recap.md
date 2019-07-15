---
templateKey: blog-post
title: "Season 1 recap"
date: 2019-07-14T22:45:00Z
updatedDate: 2019-07-14T22:45:00Z
draft: false
description: ""
featuredImage: /img/dadc-s01-recap.png
section: news
authors:
  - bguiz
tags:
  - irl
  - s01
  - recap
  - thanks
---

DApps Dev Club is a technical book club,
whose format is different from most other tech meetups.
Rather than have two or three speakers delivering a short lecture about a particular topic,
it is about learning some source material 
(taken from *Mastering Ethereum*, by Gavin Wood and Andreas Antonopoulos),
and then applying that in hands-on exercises.

Also, as I'm sure to mention in every single session,
these sessions have nothing to do with investing or finance,
and in fact we don't care about the price of Ether at all
(only gas price for smart contract function invocations).

We just concluded our first season, which is a series of ten sessions,
where an attendee could start off with:

- Zero knowledge about blockchains
- Zero knowledge about Solidity or smart contracts
- Only some basic knowledge about Javascript

&hellip; and would end up with being able to build a basic DApp.

We started with our first session on the 20th of February,
and just had our final one earlier this week, on the 9th of July, 
running at a **tremendous clip** of one session every two weeks.

Running all of these sessions has been quite the experience!

<!-- excerpt -->

## Thanks

Before we get into the recap,
we would like to thank everyone who made this possible.
In every session, we have been thanking the organisations
who have sponsored the events, or have helped us with community outreach.

This time, we would like to thank the **people** who have helped out 
in so many different ways.

[Dr Leong Li Ming](https://www.linkedin.com/in/limingleong/)
from Lifelong Learning Institute,
for helping us to navigate the world of government sponsorship.
Without her savvy, we would not have been able to get the ball rolling.
DApps Dev Club is funded by SkillsFutureSG,
and is now also part of the SkillsFuture Festival 2019 -
and this would not have been possible without her advice and constant communication.

[Ashlie Chin](https://www.linkedin.com/in/ashlie-chin-b74b8491/) &amp; 
Dennis from Chainstack + Acronis,
for being such excellent venue hosts.
Ashlie went out of her way to get the office set up just nice for the events,
and Dennis for his perfect AV set up skills.
Of course [Laurent Dedenis](https://www.linkedin.com/in/laurent-dedenis/)
and [Eugene Aseev](https://www.linkedin.com/in/easeev/) as well,
for providing us with their excellent office space.

[Sarah Thiam](https://www.linkedin.com/in/sarahthiam/) &amp; 
Dickson from Microsoft,
for being excellent venue hosts as well.
If not for them, we would have been in quite the pickle,
and two out of the ten sessions would have had to be cancelled.
Thanks for getting us out of tricky spots in our times of need.

[Puah Hui Ying](https://www.linkedin.com/in/puahhuiying/) &amp; 
[Wong Zi Hui](https://www.linkedin.com/in/zihui-wong-4bab10a5/) &amp; 
[Daniel Shen](https://www.linkedin.com/in/dansjd/) from NBC'19,
for supporting the events in various ways.
Everything from inviting people to attend,
to ad-hoc speaking, to helping out with the AV -
all these things add up.
Plus, it was great organising NBC'19 with all of you!

[Michael Cheng](https://www.linkedin.com/in/miccheng/) from EngineersSG,
for putting together your *git wiki*,
and sharing all of your tech meetup recording know-how,
all open source.
Starting this season involved buying about $1000 worth of AV equipment,
which is a very heavy investment, especially if you don't know what you're doing.
I certainly had no idea what I was doing,
but the EngineersSG *git wiki* gave me the confidence 
that this particular AV set up would work,
and by proxy, the confidence to stump up the cash.
We have video recordings of every session,
and those of you who have **missed sessions** here and there,
or heard about DApps Dev Club later on in the season,
have a way to **catch up** on them.

[Jack Ng](https://www.linkedin.com/in/jack-ng-b2593b151/),
for not only **attending every session** in the whole season,
but also offering to help me out with reviewing the workshop materials -
completely voluntarily - and providing **great feedback**.
You have definitely helped improve the quality of the hands-on exercises,
and thus that of the sessions.

[Alex Towle](https://www.linkedin.com/in/alex-towle-937647144/),
for his passion in the Ethereum education space,
which was key in the go vs no-go decision in the early stages where
DApps Dev Club was just an idea, just a concept.
Subsequently too, for having quite a few long chats with me
during the planning phase, about the sessions, 
helping me to formulate the entire season in advance.

[Gerald Nah](https://www.linkedin.com/in/geraldnahhawyuan/),
[Kenneth Goh](https://www.linkedin.com/in/kenneth-goh-65ba9525/),
[Scott Koh](https://www.linkedin.com/in/scottkohzhiwei/), &amp;
[Solomon Soh](https://www.linkedin.com/in/solomon-soh-zhe-hong/)
for helping out with so many miscellaneous things,
from helping to check attendees in on the ticketing system,
to helping out with projectors,
to even helping buzz people into the office space.

Not forgetting all of **you** who have attended too!
Thank you for coming to the sessions,
asking great questions,
eating *kueh* together,
and even taking part in hackathons together!

You have been awesome, and it has been fun!

## Recap

We started off this season with a kickoff session where the concepts of decentralisation, and of DApps, were introduced.
Also, *minimum viable blockchain* - the bare minimum that you needed to know about how blockchains work,
in order to begin developing DApps -
was quite the hit!

We then went on to introduce - conceptually - the EVM, smart contracts, and web3;
plus relate them to the general problems that distributed computing tries to solve.
Exploring the stack-based execution model of the EVM
appeared to generate quite a few *Aha*s.

Subsequently we generated Ethereum keys using BIP39, and used Metamask to send simple transactions on a test network.
For many who attended this was their **first ever interaction** 
with a crypto network.

At this point we had not yet even begun developing a DApp,
but rather been focused on learning about,
and interacting with, some of the building blocks of a DApp.

Next we looked at Solidity by feature, 
introducing the programming language used in smart contracts.
We also used a few new developer tools: `solc`, Truffle, and Ganache.

Having learnt about writing smart contracts,
we next learnt how to test them. 
This began with a crash course in Javascript testing via Mocha,
and then quickly adapting that to test various aspects of smart contracts,
using truffle's built-in test runner

A DApp is incomplete without a client, 
thus next we did some front end web development,
creating a bridge between in-browser Javascript 
and our smart contracts using `web3.js`,
and used that to invoke functions and listen to events.

At this point we had built what we could have called our first DApp,
and it was time to switch thing up to more advanced topics.

This began by delving into the nebulous world of security.
Of course, we could not do it any justice, due to its enormous depth,
and thus we simply did an introductory level survey of various facets
of security that relate to DApps.
We talked about security training games (such as Ethernaut),
modules and libraries (such as OpenZeppelin),
and code analysis tools.

One of the main pain points that was highlighted very early on,
in the first few sessions, was the tremendously high cost of persistent
storage in smart contracts (the `SSTORE` EVM op code).
Many DApps solve this by using IPFS, a decentralised file system,
to store larger data, and files - and so we explored this. 

In our penultimate session, we tied up all the various loose ends,
things that are important to DApp development,
but we had simply glossed over in order to focus on the key parts.
We talked about Infura and data encryption.
We then talked about all the various things that should be explored
if we were to go deeper, and build more complex DApps.

We concluded the season with a bang -
after nine sessions in a row with just me talking,
we had our final one with a much more exciting line up,
featuring three guest speakers.
All of them talked about different aspects of DApps and decentralisation in general, 
that was *beyond* Ethereum.

## Next season

DApps Dev Club is *planning* to hold its next ~~session~~ season soon!

&hellip; but we would like to hear from you first!

- What are the other networks that you would like to build DApps on?
- Are there any upcoming hackathons that you would like to build a DApp at?
- What would you like to learn about in DApps Dev Club season #2?
- Do you have a venue that we can use for session in season #2?
- Do you have cash to splash to sponsor sessions in season #2?

Please join the
[DApps Dev Club chat group](https://bit.ly/dadc-chat)
and let me know your answers to the above.
