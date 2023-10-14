# Attackers exploit HTTP/2 protocol vulnerability

What is the Rapid Reset Gap?

The Rapid Reset gap affects a specific feature within the HTTP/2 protocol: the ability to abort streams within a TCP connection. In a normal flow, this feature is useful to prevent the transfer of data that is no longer needed or to manage resources efficiently.

However, attackers can abuse this feature by sending continuous requests and aborting these requests using RST_STREAM frames. This results in a reset of the stream. When this happens in rapid succession, it can cause servers to become overloaded and enter a denial of service (DoS) state.

A worrisome aspect of this gap is the fact that, according to Google, the client and server do not need to coordinate the cancellation of a stream. This means that the client can perform unilateral actions, which allows the possibility of many requests in a short period of time.

Find more information here: 

[Linktext](https://www.heise.de/news/Rapid-Reset-Angreifer-nutzten-Luecke-in-HTTP-2-Protokoll-seit-August-2023-aus-9330889.html)


### Workaround

Use the iptables module limit to limit the number of connections. Attention. Use per IP address first and then the global limit.

```bash

    ### Allow 50 RST_Packets per minute
    ###
    ###
    iptables -A INPUT -p tcp --tcp-flags RST RST -m limit --limit 50/min -j ACCEPT
    iptables -A INPUT -p tcp --tcp-flags RST RST -j DROP


    ### Rate Limit SSH Connections
    ###
    ###
    iptables -A INPUT  -p tcp -m tcp -s 192.168.0.20 --dport 22 -m state --state NEW,ESTABLISHED -m limit --limit 3/min --limit-burst 5 -j ACCEPT
    iptables -A OUTPUT  -p tcp -m tcp -d 192.168.0.20 --sport 22 -m state --state ESTABLISHED,RELATED -j ACCEPT


    ### Rate restriction per IP
    ###
    ###
    iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --set
    iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --update --seconds 1 --hitcount 50 -j LOG --log-prefix "RateLimit DROP 80: "
    iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --update --seconds 1 --hitcount 50 -j DROP
    iptables -A INPUT -p tcp --dport 443 -m state --state NEW -m recent --set
    iptables -A INPUT -p tcp --dport 443 -m state --state NEW -m recent --update --seconds 1 --hitcount 50 -j LOG --log-prefix "RateLimit DROP 443: "
    iptables -A INPUT -p tcp --dport 443 -m state --state NEW -m recent --update --seconds 1 --hitcount 50 -j DROP



    ### Rate restriction global for all requests
    ###
    ###
    iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m limit --limit 50/sec --limit-burst 100 -j LOG --log-prefix "RateLimit ACCEPT 80: "
    iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m limit --limit 50/sec --limit-burst 100 -j ACCEPT
    iptables -A INPUT -p tcp --dport 443 -m state --state NEW -m limit --limit 50/sec --limit-burst 100 -j LOG --log-prefix "RateLimit ACCEPT 443: "
    iptables -A INPUT -p tcp --dport 443 -m state --state NEW -m limit --limit 50/sec --limit-burst 100 -j ACCEPT



```


© 2023 by Dipl. Wirt.-Ing. Nick Herrmann
DISCLAIMER
This program is WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
All rights reserved worldwide
