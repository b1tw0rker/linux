#Angreifer nutzen Lücke im HTTP/2-Protokoll aus


### Workaround

```bash
 $IPTABLES -A INPUT  -p tcp -m tcp -s 192.168.0.20 --dport 22 -m state --state NEW,ESTABLISHED -m limit --limit 3/min --limit-burst 5 -j ACCEPT
 $IPTABLES -A OUTPUT  -p tcp -m tcp -d 192.168.0.20 --sport 22 -m state --state ESTABLISHED,RELATED -j ACCEPT
```

 Todo: Limit RST
