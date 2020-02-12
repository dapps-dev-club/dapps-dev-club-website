---
templateKey: about-page
title: Start Here - Smart Contract Development Patterns
date: 2020-02-11T10:36:00.000Z
updatedDate: 2020-02-11T10:36:00.000Z
draft: false
description: "Start Here. The first hands-on workshop in a series about smart contract development patterns: Ownable, pausable, and non-fungible token"
section: "hands-on"
authors:
  - bguiz
tags:
  - hands-on
---

WIP!

## Pre-requsites

- A Github account
- SSH keys set up, and authorised in your Github account
- NodeJs set up, version `10.*`
  - Use [nvm](https://github.com/nvm-sh/nvm) to install/ manage multiple versions if necessary
- Ganache installed, version `2.1.*`
- A POSIX compliant shell or terminal
  - Linux: Your default terminal is OK
  - Mac OSX: Your default terminal is OK
  - Windows: `cmd` is **not OK**; need to install something else `git-terminal` or `WSL/2` instead

## Create a git repository

You have 2 options.
The quick way is to fork the demo repository.
The not-so-quick way is to set it up from scratch.
Both sets of instructions have been provided for your reference.

### Fork demo repository

Visit https://github.com/dapps-dev-club/smart-contract-dev-patterns-workshop and press the "Fork" button.

![Github - Fork demo repo - Start](./01-github-fork-demo-repo.png)

You should now see ...

- Click "clone or download"
- Select "clone with SSH" (you must be logged in, and have SSH keys set up)
- Copy the git url

![Github - Fork demo repo - Clone](./01-github-fork-then-clone.png)

```bash
git clone git@github.com:${YOUR_GITHUB_USERNAME}/smart-contract-dev-patterns-workshop.git

```

We roll back our local copy to the very first commit,
which which can reference by the handy tag name `step-01-01`.

```bash
git reset --hard step-01-01
```

Ensure the git remote repository (on github) has rolled back too,
to match your local git repository (on your computer).

```bash
git push -f origin master

```

### From scratch

```bash
# initialise the project
mkdir smart-contract-dev-patterns-workshop
cd smart-contract-dev-patterns-workshop
touch README.md
```

Edit your `README.md` file to add a basic description.
You may use the following, modify as you see fit:

```markdown
# Smart Contract Development Patterns Workshop

This is a **work in progress**.
Please check back here later!

## Instructions

Instructions are available
[here](http://dappsdev.org/hands-on/smart-contract-dev-patterns/).

## Author

[Brendan Graetz](http://bguiz.com/)

## Licence

GPL-3.0

```

```bash
git init
git add README.md
git commit -m "docs: add README"
git tag -a step-01-01 $( git rev-parse HEAD ) -m "step-01-01"
```

Note that `git rev-parse HEAD` simply returns the git commit hash for
the most recent commit, that you just created.

Visit `https://github.com/${YOUR_GITHUB_USERNAME}/repositories/new`

For example: https://github.com/organizations/dapps-dev-club/repositories/new

![Github - Create new repo - Button](./01-github-create-new-repo.png)

Fill in fields ...

![Github - Create new repo - Filled](./01-github-create-new-repo-filled.png)

Copy the commands at the bottom of the page ...

![Github - Create new repo - Commands](./01-github-create-new-repo-commands.png)

```bash
git remote add origin git@github.com:${YOUR_GITHUB_USERNAME}/smart-contract-dev-patterns-workshop.git
git push -u origin master
```

Refresh your project's page on github,
you should see your first commit there.

## More steps

TODO

...

## Quick Links

This workshop is part of a series:

- [Start here](../01-start-here/) &hellip; You are here.
- [Ownable](../02-ownable/)
- [Pausable](../03-pausable/)
- [Non-fungible token](../04-non-fungible-token/)
