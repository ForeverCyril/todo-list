FROM openjdk:17-jdk

LABEL maintainer="cyrilchen1999@outlook.com"

ENV WEB_ROOT=/todo-web/

COPY rootfs/ /

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/todo-api.jar"]

