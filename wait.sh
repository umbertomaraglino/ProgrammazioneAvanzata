#!/bin/sh
# wait until MySQL is really available
maxcounter=1000

host="$1"
port=3306  # Usa la porta corretta se necessario

counter=1
while ! mysql --protocol TCP -h "$host" -P "$port" -u"$DB_USER" -p"$DB_PASSWORD" -e "show databases;" > /dev/null 2>&1; do
    echo "Attempt $counter: $host, $DB_USER, $DB_PASSWORD"
    sleep 3  # Aumentato il tempo di attesa per ogni tentativo
    counter=`expr $counter + 1`
    if [ $counter -gt $maxcounter ]; then
        >&2 echo "We have been waiting for MySQL too long already; failing."
        exit 1
    fi;
done
echo "MySQL is ready!"
