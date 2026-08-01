---
title: "Computer Networks Cheat Sheet"
exam: "ccat"
subject: "computer-networks"
topic: "networking-basics"
description: "OSI vs TCP/IP models, IP addressing, TCP vs UDP, routing, switching, and error detection — the complete networking reference for CDAC C-CAT."
keywords: ["computer networks", "osi model", "tcp ip", "routing", "ccat networking"]
lastVerified: 2026-07-28
faq:
  - question: "What is the difference between OSI and TCP/IP model?"
    answer: "OSI has 7 layers while TCP/IP has 4 layers. OSI is a theoretical model, TCP/IP is the practical implementation used on the internet."
  - question: "Which layer handles routing in OSI model?"
    answer: "The Network Layer (Layer 3) handles routing, logical addressing, and path determination between source and destination."
---

## OSI model — 7 layers

| Layer | Name | Function | Example protocol/device |
|---|---|---|---|
| 7 | Application | User-facing services | HTTP, FTP, SMTP, DNS |
| 6 | Presentation | Data translation, encryption, compression | SSL/TLS, JPEG |
| 5 | Session | Establishes/manages/terminates sessions | NetBIOS, RPC |
| 4 | Transport | End-to-end delivery, reliability | TCP, UDP |
| 3 | Network | Logical addressing, routing | IP, ICMP, Router |
| 2 | Data Link | Physical addressing, framing | Ethernet, MAC address, Switch |
| 1 | Physical | Raw bit transmission | Cables, Hub, radio signals |

Mnemonic (top to bottom): **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing.

### OSI vs TCP/IP model

| OSI (7 layers) | TCP/IP (4 layers) |
|---|---|
| Application, Presentation, Session | Application |
| Transport | Transport |
| Network | Internet |
| Data Link, Physical | Network Access (Link) |

OSI is a **theoretical reference model**; TCP/IP is the **actual protocol suite** the internet runs on. This distinction is a very common exam question.

```pyq
Q: Which OSI layer is responsible for logical addressing and routing?
A) Data Link
*B) Network
C) Transport
D) Session
Explain: The Network layer (Layer 3) handles IP addressing and routing between networks. The Data Link layer (Layer 2) handles physical/MAC addressing within a single network segment.
```

```pyq
Q: How many layers does the TCP/IP model have, compared to OSI's 7?
A) 3
*B) 4
C) 5
D) 6
Explain: TCP/IP combines OSI's Application+Presentation+Session into one Application layer, and Data Link+Physical into one Network Access layer — giving 4 layers total (some textbooks show 5 by splitting Network Access).
```

## TCP vs UDP

| Property | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented (handshake required) | Connectionless |
| Reliability | Reliable — guarantees delivery, order | Unreliable — no delivery guarantee |
| Speed | Slower (overhead from reliability) | Faster (minimal overhead) |
| Use case | Web browsing, email, file transfer | Video streaming, DNS, gaming |
| Header size | 20 bytes | 8 bytes |

### TCP three-way handshake

```text
Client                          Server
  |----------- SYN ------------>|   (Client requests connection)
  |<-------- SYN-ACK -----------|   (Server acknowledges + requests back)
  |----------- ACK ------------>|   (Client confirms — connection established)

Connection termination uses a 4-way handshake (FIN, ACK, FIN, ACK).
```

```pyq
Q: Which protocol would a live video call most likely use, and why?
A) TCP — because it's reliable
*B) UDP — because low latency matters more than guaranteed delivery
C) HTTP — because it's simple
D) FTP — because it transfers data fast
Explain: Real-time video/audio prioritizes speed over reliability — a dropped packet causing a brief glitch is preferable to TCP's retransmission delay stalling the whole stream.
```

## IP addressing

### IPv4 address classes

| Class | Range (first octet) | Default subnet mask | Typical use |
|---|---|---|---|
| A | 1 – 126 | 255.0.0.0 (/8) | Very large networks |
| B | 128 – 191 | 255.255.0.0 (/16) | Medium networks |
| C | 192 – 223 | 255.255.255.0 (/24) | Small networks |
| D | 224 – 239 | — | Multicast |
| E | 240 – 255 | — | Reserved/experimental |

127.x.x.x is reserved for loopback (localhost), not part of Class A's usable range — a common trap.

### CIDR notation

```text
192.168.1.0/24
             ↑
             number of bits used for the NETWORK portion

/24 = 255.255.255.0 = 256 addresses total, 254 usable
      (1 reserved for network address, 1 for broadcast address)

Usable hosts = 2^(32 - prefix) - 2
```

```pyq
Q: How many usable host addresses are there in a /24 subnet?
A) 256
*B) 254
C) 255
D) 128
Explain: A /24 gives 2^8 = 256 total addresses, but 2 are reserved — one for the network address, one for the broadcast address — leaving 254 usable for hosts.
```

## Switching techniques

| Technique | How it works | Trade-off |
|---|---|---|
| Circuit Switching | Dedicated path reserved for the entire session | Guaranteed bandwidth, but wastes idle capacity |
| Packet Switching | Data split into packets, routed independently | Efficient sharing, but variable delay (jitter) |
| Message Switching | Entire message stored and forwarded hop by hop | Simple, but high latency, needs storage at each node |

The modern internet uses **packet switching** — this is a frequently tested fact.

## Routing

| Type | Strategy | Example protocol |
|---|---|---|
| Distance Vector | Each router shares its full routing table with neighbors; picks path with fewest hops | RIP |
| Link State | Each router builds a full map of the network topology, computes shortest path itself | OSPF |

```text
Distance Vector: "I'll tell you what I know, you figure out the rest"
                 — simpler, but slower to converge, prone to routing loops

Link State:      "I'll tell everyone exactly what I see"
                 — faster convergence, more overhead, no loops
```

```pyq
Q: RIP (Routing Information Protocol) is an example of which routing approach?
*A) Distance Vector
B) Link State
C) Static Routing
D) Hybrid Routing
Explain: RIP uses the Bellman-Ford algorithm and hop count as its metric — the defining trait of Distance Vector routing. OSPF is the classic Link State example.
```

## Error detection

| Method | How it works | Detects |
|---|---|---|
| Parity bit | Adds 1 bit to make the count of 1s odd/even | Single-bit errors only |
| Checksum | Sum of data blocks, transmitted and re-verified | Most errors, some patterns missed |
| CRC (Cyclic Redundancy Check) | Polynomial division, remainder appended | Burst errors — most robust of the three |

CRC is the standard for Ethernet frames precisely because it reliably catches burst errors that simple parity or checksums can miss.

```pyq
Q: Which error detection method is most effective at catching burst errors?
A) Parity bit
B) Checksum
*C) CRC
D) All are equally effective
Explain: CRC uses polynomial division across the entire data block, making it far more robust against burst errors (consecutive corrupted bits) than a simple parity bit or checksum.
```

## Network devices

| Device | OSI Layer | Function |
|---|---|---|
| Hub | Physical (1) | Broadcasts to all ports — no intelligence |
| Switch | Data Link (2) | Forwards frames based on MAC address — learns port-MAC mapping |
| Router | Network (3) | Forwards packets between different networks, based on IP |
| Gateway | Any/all | Connects networks using different protocols entirely |

```pyq
Q: A switch makes forwarding decisions based on which address?
A) IP address
*B) MAC address
C) Port number
D) Domain name
Explain: A switch operates at the Data Link layer and forwards frames using MAC addresses, learning which device sits on which port. Routers, by contrast, use IP addresses (Network layer).
```

## DNS, HTTP & common ports

| Port | Protocol | Purpose |
|---|---|---|
| 20/21 | FTP | File transfer (data/control) |
| 22 | SSH | Secure remote login |
| 23 | Telnet | Unencrypted remote login |
| 25 | SMTP | Sending email |
| 53 | DNS | Domain name resolution |
| 80 | HTTP | Web traffic (unencrypted) |
| 110 | POP3 | Retrieving email |
| 443 | HTTPS | Web traffic (encrypted) |

```text
DNS resolution flow:
  Browser → Local DNS cache → Recursive Resolver
  → Root Server → TLD Server (.com, .in, etc.)
  → Authoritative Name Server → IP address returned
```


