# Linux Snippets

Here you can find various linux commands,snippets and programs. Mostly topics: Security


### drop all MySQL databases

```bash
mysql -p<DEINPASSWORT> -e "show databases" | grep -v Database | grep -v mysql | grep -v information_schema | gawk '{print "drop database " $1 ";select sleep(0.1);"}' | mysql -p<DEINPASSWORT>
```


### find - practical regex examples

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

### find & replace

```bash
find /path/to/files -type f -exec sed -i 's/oldstring/new string/g' {} \;
```


### connected ports

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


### cd to previous folder

```bash
cd -
```

### DEL o Byte files

```bash
find . -type f -size 0b -print    # print 0 byte files
find . -type f -size 0b -delete   # del 0 byte files
```

### find large files

```bash
find . -type f -size +400M
```

### delete the whole block downunder with vi

```bash
d , ALT + }
```



### find files with setuid or setguid and print with file

```bash

find / \( -perm -4000 -o -perm -2000 \) -type f -exec file {} \;

```

### protect logfiles

```bash

chattr +a /var/log/messages

lsattr /var/log/messages # test file messages for +a attribut

```






### License
[MIT](https://choosealicense.com/licenses/mit/)