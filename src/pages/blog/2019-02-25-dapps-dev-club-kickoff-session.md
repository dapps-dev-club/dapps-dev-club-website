---
templateKey: blog-post
title: "Kickoff session"
date: 2019-02-25T07:04:00.000Z
updatedDate: 2019-02-25T07:04:00.000Z
draft: false
description: "DApps Dev Club's first session"
featuredImage: /img/dadc-s01-e01-featured-image.jpeg
section: news
authors:
  - bguiz
tags:
  - irl
  - s01
  - s01e01
  - blockchain
  - dapp
---

Here is a round up of the *kickoff session* of DApps Dev Club,
which ran last Wednesday (20th February 2019) at the Microsoft office in Marina Boulevard.

The [slide deck](https://dappsdev.org/deck/s01e01/) that was used during the session, has been published, so now you can take a look.

<!-- excerpt -->

**Highlights**

During the mid-session break, and after the session, we asked you what your favourite parts were. Most of you said that your favourite part was the live demo of the [Anders' Blockchain explainer](https://anders.com/blockchain/) during the *Just enough blockchain* segment - so a very quick recap of what we went through:

- *Hash*: The three properties of a hash function that are useful in blockchains
- *Block*: Instead of arbitrary data, we're adding some structure to what is hashed
- *Blockchain*: Each block now contains the hash of the previous block, and how that relates to singly-linked lists
- *Distributed blockchain*: Have three peers each create a block chain, but one of them maliciously creates a block with data different from the rest, and why the others choose to ignore it
- We skipped: *Tokens* and *Coinbase* even though Ethereum has those too, we don't need to know that before we delve into DApps. You should totally explore that on your own though!

For some of the more advanced members in the audience, there are a couple of things that were simplified or glossed over in the demonstration. Thanks [Joey](https://twitter.com/joeytwiddle) for pointing these out to us.

1. In the *distributed blockchain* section, multiple peers mined the same hash for the same block. In reality, peers can mine different hashes for the same block, by starting with different nonce values. Technically, the block contents are *almost* identical, but not *exactly* the same. The difference is the *nonce*. Since one of the properties of a hash function is that just a *slight change* in the input causes the hash to be completely different, the blocks can have very different hashes.
2. Also, in the *distributed blockchain* section, we used the terms "real spend" and "double spend". The network cannot know whether any particular spend is a valid attempt, or a double spend attempt, without consensus first having taken place, and thus cannot have been known at this point. This was will become evident in the next section for *tokens*, which was not demonstrated. Why not [try it out](https://anders.com/blockchain/tokens.html) yourself?

Another thing that you liked was the *Limitations* part of the *What is a DApp?* segment. Going into further details on this was not within the scope of the session; however, since there is interest, we will write up a blog post focused on this topic. Watch this space!

**Videos**

We have got the *first two* videos up already:

- 🎥  [Welcome](https://www.youtube.com/watch?v=-cCnIXIfULo)
- 🎥  [DApps Dev Club Introduction](https://www.youtube.com/watch?v=E-T7uLup2Js)

There are two more to come, for the *Just enough blockchain*, and the *What is a DApp?* segments - we will post another update when those are ready!

This is our first time recording at a meetup - or recording anything really -  and we're pretty chuffed that we got it working at all! Sorry about the extra low framerate from the camera trained on the speakers, and the low volume audio. We will work on improving our recording skills for the next session.

Also, a huge thanks to Michael Cheng of EngineersSG for producing this wonderful [DIY tech meetup recording guide](https://github.com/engineersftw/gitwiki), and for answering a slew of questions from us. Without his help, we would not have been able to record our sessions!

**Reflections**

Based on the feedback that we have received from you so far, plus a measure of contemplation:

- More slides with pictures
- Make demos more interactive
- Improve on AV recording skills
- Add QR codes for links in slides
- Start at 6:30pm instead of 6:00pm

**More feedback?**

We really want to hear more from you: How did the session go? What did you like? What didn't you like? What do you think we could have done better?

Join the discussion on [discord](https://discordapp.com/invite/eM9Vv7P), or this [Q&A board](https://app2.sli.do/event/awgvs53v/live/questions).

**Next session**

We're working really hard to lock down a venue for the next sessions, so we'll keep you posted once we have that! Note that until then, the dates on our [sessions list](https://dappsdev.org/sessions/) are to be confirmed!

While you are waiting for the next session, there are a few things that you can do!

Read select parts of the [*Mastering Ethereum*](https://github.com/ethereumbook/ethereumbook) book, which we'll be discussing in the next session:
  - Chapter 1: What is Ethereum
    - Optional: *Ethereum’s Four Stages of Development*
    - Optional: *The Birth of Ethereum*
    - Optional: *Ethereum’s Development Culture*
    - Read all of the sections in this chapter, except for these ones above, as we do not plan to discuss them in the next session.
    - If you only have time to read *one* section, read: *Ethereum and Turing Completeness*
  - Chapter 13: The Ethereum Virtual Machine
    - Optional: Compiling Solidity to EVM Bytecode
    - Optional: Contract Deployment Code
    - Optional: Disassembling the Bytecode
    - Read all of the sections in this chapter, except for these ones above, as we do not plan to discuss them in the next session.
    - If you only have time to read *one* section, read: *Turing Completeness and Gas*

Also, please think of some ideas for a DApp that you would like to build. Bring your ideas along to the next session. Over the course of the sessions, we'll be helping you to refine your ideas, and build them into DApps!

As promised, future sessions are going to be less lecture-like and more
like a technical workshop or book club!

See you all again soon!
