# Linux Snippets

![LinuxSnippets version](https://img.shields.io/badge/version-v1.0.4-green.svg)


Here u can find various Linux commands, snippets, scripts, and security tips & tricks.

## Inhalt

- [Disclaimer](#Disclaimer)
- [Terminal movement commands and tricks](#terminal-movement-commands-and-tricks)
- [Miscellaneous](#miscellaneous)
- [License](#license)

## DISCLAIMER!
ALL SCRIPTS COMES WITH ABSOLUTE NO WARRANTY!

All programs are WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.


## Terminal movement commands and tricks


### cd to previous folder

```bash
cd -
```

### Jump between words on the terminal

```bash

STRG + ArrowLeft || ArrowRight

```


### Show history and call a command

```bash

history

!876 # executes command on position 876

```

### $_

```bash

mkdir /tmp/new && cd $_

```

The special variable $_ contains the last argument of the last command


## Miscellaneous

### Drop all MySQL databases

Attention: This script will delete ALL databases! Do NOT use it, until you really know what you are doing.

```bash
mysql -p<PASSWORD> -e "show databases" | grep -v Database | grep -v mysql | grep -v information_schema | grep -v performance_schema | grep -v sys | gawk '{print "drop database " $1 ";select sleep(0.1);"}' | mysql -p<PASSWORD>
```



### Find - practical regex examples

```bash
find . -iname 'wthm*g.php' -type f -exec echo {} \;
find . -iname 'wthm*g.php' -type f -exec rm -f {} \;  # find & remove!

find . -iname 'pageinfo.php' -type f -exec echo {} \;
find . -iname 'pageinfo.php' -type f -exec rm -f {} \;  # find & remove!

find . -iname '*[0-9]*.php' -type f -exec echo {} \;

### chmod file or folders
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
```

### Bulk find & replace

```bash
find /path/to/files -type f -exec sed -i 's/oldstring/new string/g' {} \;
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



### Del 0 (zero,empty) Byte files

```bash
find . -type f -size 0b -print    # print 0 byte files
find . -type f -size 0b -delete   # del 0 byte files
```

### Find large files

```bash
find . -type f -size +400M
```

### Delete the whole block downunder with vi

```bash
d , ALT + }
```

### Empty whole file within vi

```bash
d , SHIFT + G
```


### Find files with setuid or setguid - stdout to console

```bash

find / \( -perm -4000 -o -perm -2000 \) -type f -exec file {} \;

```

### Protect logfiles against deletion and clearing

```bash

chattr +a /var/log/messages

lsattr /var/log/messages # prints +a attribut to stdout
```
This protects messages for deletion and clearing. Even if you are root!
Do it with all importend files.


### Rapid Reset fast hack
´´´bash

# Allow 50 RST_Packets per minute.
# Adjust the number 50 to your server workload
/sbin/iptables -A INPUT -p tcp --tcp-flags RST RST -m limit --limit 50/min -j ACCEPT
/sbin/iptables -A INPUT -p tcp --tcp-flags RST RST -j DROP 


´´´
[RapidReset Dokumentation](https://github.com/b1tw0rker/linux/blob/master/RapidReset.md)





## License
[MIT](https://choosealicense.com/licenses/mit/)