FROM debian:11.5-slim

# Install dependence software

ENV MYSQL_HOST=localhost
ENV MYSQL_PORT=3306
ENV MYSQL_DATABASE=todo
ENV MYSQL_USER=todo
ENV MYSQL_PASSWORD=rS&#2Hy@W9
ENV MYSQL_ROOTPASSWORD=rS&#2Hy@W9

# add mysql-community key, unpack from "mysql-apt-config_0.8.24-1_all.deb"
COPY mysql.gpg /etc/apt/trusted.gpg.d/

RUN  \
    # change software repository
    sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list &&\
    # add tuna mysql repository
    echo "deb http://mirrors.tuna.tsinghua.edu.cn/mysql/apt/debian bullseye mysql-8.0 mysql-tools" > /etc/apt/sources.list.d/mysql-community.list && \
    # disable the mysql_install_db codepath in mysql-community-server install script, and set apt to be quite
    mkdir -p /var/lib/mysql && \
    { \
        echo mysql-community-server mysql-community-server/data-dir select ''; \
        echo mysql-community-server mysql-community-server/root-pass password ''; \
        echo mysql-community-server mysql-community-server/re-root-pass password ''; \
        echo mysql-community-server mysql-community-server/remove-test-db select false; \
    } | debconf-set-selections &&\
    # install required software
    apt-get -y update && \
    apt-get -y install --no-install-recommends\
      openjdk-17-jdk-headless \
      mysql-community-server-core \
      mysql-community-client  \
      nginx \
      &&  \
    rm -rf /var/lib/apt/lists/* && \
    # init database
    groupadd -r mysql && useradd -r -g mysql mysql && \
    mkdir -p /var/lib/mysql /var/run/mysqld && \
    chown -R mysql:mysql /var/lib/mysql /var/run/mysqld && \
    mysqld --initialize-insecure --user=mysql --basedir=/usr --datadir=/var/lib/mysql

COPY rootfs/ /

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/bin/sh"]

