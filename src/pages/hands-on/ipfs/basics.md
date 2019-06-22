---
templateKey: about-page
title: IPFS basics
date: 2019-06-09T04:29:00.000Z
updatedDate: 2019-06-09T04:29:00.000Z
draft: false
description: A hands-on with IPFS basics
section: "hands-on"
authors:
  - bguiz
tags:
  - hands-on
---

## Set up

Follow the instructions on the
[IPFS install page](https://docs.ipfs.io/guides/guides/install/).

For UNIX systems, you will need to download an archive file,
and run a script in it:

```bash
# mac only
curl https://dist.ipfs.io/go-ipfs/v0.4.21/go-ipfs_v0.4.21_darwin-amd64.tar.gz > go-ipfs.tar.gz

# linux only
curl https://dist.ipfs.io/go-ipfs/v0.4.21/go-ipfs_v0.4.21_linux-arm64.tar.gz > go-ipfs.tar.gz

# both
tar xvfz go-ipfs.tar.gz
cd go-ipfs
./install.sh
```

For Windows, you will need to download an archive file,
and put the `ipfs.exe` file somewhere on your `%PATH%`.

## Run your own node

Check to see if this file has already been created:

```bash
cat ~/.ipfs/config
```

If it does not exist, you will need to initialise your IPFS:

```bash
ipfs init
```

Now you are ready to run your own node:

```bash
ipfs daemon
```

You should see some output that looks similar to:

```bash
Initializing daemon...
go-ipfs version: 0.4.21-
Repo version: 7
System version: amd64/darwin
Golang version: go1.12.5
Swarm listening on /ip4/127.0.0.1/tcp/4001
Swarm listening on /ip4/192.168.1.172/tcp/4001
Swarm listening on /ip6/::1/tcp/4001
Swarm listening on /ip6/fd73:d6f5:6ad3:0:4f4:4464:3636:222c/tcp/4001
Swarm listening on /ip6/fd73:d6f5:6ad3:0:6df6:32ee:4638:462a/tcp/4001
Swarm listening on /p2p-circuit
Swarm announcing /ip4/127.0.0.1/tcp/4001
Swarm announcing /ip4/192.168.1.172/tcp/4001
Swarm announcing /ip6/::1/tcp/4001
Swarm announcing /ip6/fd73:d6f5:6ad3:0:4f4:4464:3636:222c/tcp/4001
Swarm announcing /ip6/fd73:d6f5:6ad3:0:6df6:32ee:4638:462a/tcp/4001
API server listening on /ip4/127.0.0.1/tcp/5001
WebUI: http://127.0.0.1:5001/webui
Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
Daemon is ready
```

Take note of this line:

```bash
Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
```

This means that your own local node for IPFS can be reached
over HTTP at http://localhost:8080/

## Try it out

Enter the following command:

```bash
ipfs config show | grep -i PeerID
```

You should get output similar to:

```bash
    "PeerID": "QmRNDN13tyVY9z7buHqJhuaN9ou9z6cf7wDJL6JuHVudDj"
```

This is the ID of your own node -
anyone else who knows this can talk to your node via IPFS!

Now let's write a file to IPFS:

```bash
echo "${USER} <3 DApps Dev Club" | ipfs add
```

You will get output similar to:

```bash
added QmQSBNDPDjQxo4skLoMK2V7ZpSkcLz2niGjAe6XjvL5SL7 QmQSBNDPDjQxo4skLoMK2V7ZpSkcLz2niGjAe6XjvL5SL7
 24 B / 24 B [======================================================================================================================================================================]
```

This is the ID of the file that you just uploaded to IPFS -
anyone who knows this hash can download your file!
Let's copy-and-paste that and set it as an environment variable
in your terminal:

```bash
IPFS_HASH=QmQSBNDPDjQxo4skLoMK2V7ZpSkcLz2niGjAe6XjvL5SL7
```

```bash
# get file from your local IPFS node, by talking to the API directly
$ ipfs cat ${IPFS_HASH}
bguiz <3 DApps Dev Club

# get file from your local IPFS node, over HTTP
$ curl http://127.0.0.1:8080/ipfs/${IPFS_HASH}
bguiz <3 DApps Dev Club
```

## Peer to peer

IPFS is a peer-to-peer distributed file system -
let's take a look at all the other nodes that your node is
connected to, i.e. its peers:

```bash
ipfs swarm peers
```

You should see a small list of peers that your current IPFS node is connected to.
All of these other computers are also running their own instance of `ipfs daemon`!
Also, like any other peer-to-peer network, your own node tries to discover more nodes on the network.

```bash
$ ipfs swarm peers | wc -l
27
# ... wait for a few minutes...
$ ipfs swarm peers | wc -l
41
```

Now if there are several of you connected to the same local area network,
either wireless or wired, you should be able to discover each others nodes,
assuming that there's no firewall on the network that is configured to impede this.
However, this peer discovery is *eventual* -
it does not occur automatically upon starting, and can take a while.

In order to "force" your IPFS node to connect to another known IPFS node,
you will need to somehow obtain its IP address, and `PeerID`.
You can obtain this by running:

```bash
ipfs id
```

In the output, copy any of the lines that **does not** begin with:

- `/ip4/127.0.0.1`
- `/ip6/::1`

(These addresses are normally only accessible from you own computer)

Then on a different computer, enter the following, replacing the `${ADDRESS}` string with the one that you just copied:

```bash
ipfs swarm connect ${ADDRESS}
```

Note that this does not guarantee that your IPFS node will connect to the one that you have specified,
but it does make it likely that it will connect to this one faster than it would have taken by default.
If the current IPFS node does succeed in connecting to the other IPFS node,
you will see output similar to the following:

```bash
$ ipfs swarm connect /ip4/123.123.21.43/tcp/4001/ipfs/QmWtjovndrUkjUWgHpzSPfyrEqNo3LGAD1WniPSZH4N4kU
connect QmWtjovndrUkjUWgHpzSPfyrEqNo3LGAD1WniPSZH4N4kU success
```
