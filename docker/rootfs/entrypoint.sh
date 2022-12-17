#!/usr/bin/env sh

set -e

nohup mysqld --user=mysql --basedir=/usr --datadir=/var/lib/mysql --secure-file-priv=NULL > /dev/null 2>&1 &

echo "Wait DB Start!"
while ! mysqladmin ping > /dev/null 2>&1; do
    echo "Wait ..."
    sleep 1
done

echo "DB Init!"
mysql -e "CREATE DATABASE ${MYSQL_DATABASE};"
mysql -e "CREATE USER ${MYSQL_USER}@localhost IDENTIFIED BY '${MYSQL_PASSWORD}';"
mysql -e "GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

echo "DB ready!"

echo "starting nginx"
nginx

echo "starting server"

java -Djava.net.preferIPv4Stack=true -jar /todo-api.jar &

exec "$@"