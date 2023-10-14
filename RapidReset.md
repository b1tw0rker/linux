#Angreifer nutzen Lücke im HTTP/2-Protokoll aus

### Workaround

Use the iptables module limit to limit the number of connections. Attention. Use per IP address first and then the global limit.

```bash

    $IPTABLES -A INPUT  -p tcp -m tcp -s 192.168.0.20 --dport 22 -m state --state NEW,ESTABLISHED -m limit --limit 3/min --limit-burst 5 -j ACCEPT
    $IPTABLES -A OUTPUT  -p tcp -m tcp -d 192.168.0.20 --sport 22 -m state --state ESTABLISHED,RELATED -j ACCEPT

    ### Rate Beschränking per IP
    ###
    ###
    $IPTABLES -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --set
    $IPTABLES -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --update --seconds 1 --hitcount 50 -j LOG --log-prefix "RateLimit DROP 80: "
    $IPTABLES -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --update --seconds 1 --hitcount 50 -j DROP
    $IPTABLES -A INPUT -p tcp --dport 443 -m state --state NEW -m recent --set
    $IPTABLES -A INPUT -p tcp --dport 443 -m state --state NEW -m recent --update --seconds 1 --hitcount 50 -j LOG --log-prefix "RateLimit DROP 443: "
    $IPTABLES -A INPUT -p tcp --dport 443 -m state --state NEW -m recent --update --seconds 1 --hitcount 50 -j DROP



    ### Rate Beschränking global für alle Anfragen
    ###
    ###
    $IPTABLES -A INPUT -p tcp --dport 80 -m state --state NEW -m limit --limit 50/sec --limit-burst 100 -j LOG --log-prefix "RateLimit ACCEPT 80: "
    $IPTABLES -A INPUT -p tcp --dport 80 -m state --state NEW -m limit --limit 50/sec --limit-burst 100 -j ACCEPT
    $IPTABLES -A INPUT -p tcp --dport 443 -m state --state NEW -m limit --limit 50/sec --limit-burst 100 -j LOG --log-prefix "RateLimit ACCEPT 443: "
    $IPTABLES -A INPUT -p tcp --dport 443 -m state --state NEW -m limit --limit 50/sec --limit-burst 100 -j ACCEPT



```

Todo: Limit RST
