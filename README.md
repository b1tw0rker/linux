# Linux snippet collection

![LinuxSnippets version](https://img.shields.io/badge/version-v1.0.4-green.svg)

Nicks personal tips & tricks collection serves various Linux commands, snippets, scripts, and security tips & tricks.

# Inhalt

- [Disclaimer](#Disclaimer)
- [Terminal movement tricks](#terminal-movement-tricks)
- [Vi tricks](#vi-tricks)
- [Find tricks](#find-tricks)
- [Security](#security)
- [Miscellaneous](#miscellaneous)
- [License](#license)

# Disclaimer
ALL SCRIPTS COMES WITH ABSOLUTE NO WARRANTY!
All programs are WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.


# Terminal and tricks


### cd to previous folder

```bash
cd -
```

### Jump between words on the terminal

```bash

STRG + ArrowLeft || ArrowRight

```


### Print history and call a command

```bash

history

!876 # executes cmd on position 876

```

### $_

```bash

mkdir /tmp/new && cd $_

```

The special variable $_ contains the last argument of the last command.

# Vi tricks

### Delete the whole block downunder

```bash
d , ALT + }
```

### Empty whole file

```bash
d , SHIFT + G
```


### Open vi in the last line

```bash
vi + /var/log/messages
```


### Open vi on line n

```bash
vi +n /var/log/messages
```


### Open vi on first searchresult

```bash
vi +/search /var/log/messages
```



# Find tricks

### Regex examples

```bash
find . -iname 'wthm*g.php' -type f -exec echo {} \;
find . -iname 'wthm*g.php' -type f -exec rm -f {} \;  # find & remove!

find . -iname 'pageinfo.php' -type f -exec echo {} \;
find . -iname 'pageinfo.php' -type f -exec rm -f {} \;  # find & remove!

find . -iname '*[0-9]*.php' -type f -exec echo {} \;

# chmod file and folders
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
```

### Find & replace bulk

```bash
find /path/to/folder -type f -exec sed -i 's/oldstring/new string/g' {} \;
```

Search and replace 'oldstring' to 'new string' in **all** files within folder: /path/to/folder


### Del 0 Byte files

```bash
find . -type f -size 0b -print    # print 0 byte files
find . -type f -size 0b -delete   # del 0 byte files
```

### Find large files

```bash
find . -type f -size +400M
```




# Security

### Find files with setuid or setguid - stdout to console

```bash

find / \( -perm -4000 -o -perm -2000 \) -type f -exec file {} \;

```

### Protect logfiles against removal and deletion

```bash

chattr +a /var/log/messages # only append is possible

lsattr /var/log/messages # prints +a attribut to stdout

```
This protects messages from deletion and removal. Even if you have root access! Use it for all important files.

### Pentest with apache benchmark (ab)

```bash

Usage: ab [options] [http[s]://]hostname[:port]/path

ab -h

```

### Lynis audit tool

```bash

dnf install lynis
lynis audit system

```

Lynis security scan details:

Hardening index : 72 [############## ]  
Tests performed : 264  
Plugins enabled : 0


```bash

cat /var/log/lynis-report.dat | grep suggestion # to the work pirates ;-)

```

### Rkhunter

```bash

dnf install rkhunter
rkhunter --check

```

### Kernel hardening

[/etc/sysctl.d/99-bw-custom.conf](https://github.com/b1tw0rker/linux/blob/master/etc/sysctl.d/99-bw-custom.conf)


### Rapid Reset b.c.w. HTTP/2 Attack - fast hack

```bash

# Allow 50 RST_Packets per minute.
# Adjust the number 50 to your server workload
/sbin/iptables -A INPUT -p tcp --tcp-flags RST RST -m limit --limit 50/min -j ACCEPT
/sbin/iptables -A INPUT -p tcp --tcp-flags RST RST -j DROP

```

[RapidReset/HTTP/2 Attack Details](https://github.com/b1tw0rker/linux/blob/master/RapidReset.md)

### Tripwire

lorem ipsum

# Miscellaneous

### Drop all MySQL databases

Attention: This script will delete ALL databases! Do NOT use it unless you really know what you are doing.

```bash

mysql -p<PASSWORD> -e "show databases" | grep -v Database | grep -v mysql | grep -v information_schema | grep -v performance_schema | grep -v sys | gawk '{print "drop database " $1 ";select sleep(0.1);"}' | mysql -p<PASSWORD>

```


### Connected ports

```bash

lsof -i TCP -n -P | awk '/ESTABLISHED/ {print $1"/"$3"/"$8}' | sort -u

```

### Monitoring connected ports

```bash

#!/bin/bash
i=1

while [ "$i" == 1 ] ; do

 clear
 lsof -i TCP -n -P | awk '/ESTABLISHED/ {print $1"/"$3"/"$8}' | sort -u
 sleep 5

done

exit 0

```
### Tor hidden service

```bash

apt/dnf install tor

```


```bash

# /etc/tor/torrc
HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServicePort 80 192.168.13.199:80

```

```bash

cd /var/lib/tor
mkdir hidden_service
chown debian-tor:debian-tor hidden_service
chmod 0700 hidden_service

```` 

```bash

systemctl tor restart

```

```bash

cat /var/lib/tor/hidden_service/hostname # prints 'hidden service' domainname

```

<a href="http://www.tamagothi.de/2016/01/30/kurzanleitung-hidden-service-mit-tor-aufsetzen" target="_new">Read more details</a>


### W

```bash
w
```

print logged users

# License
[MIT](https://choosealicense.com/licenses/mit/)