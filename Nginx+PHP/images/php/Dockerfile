FROM php:8.2-fpm

RUN apt-get update 
RUN apt-get install -y curl git

#RUN apt-get update \
   # && apt-get install -y apt-transport-https lsb-release ca-certificates wget \
    #&& wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg \
    #&& echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list \
   # && apt-get update \
    #&& apt-get install -y php7.4-fpm
RUN docker-php-ext-install mysqli

RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/public_html

ENTRYPOINT [ "php-fpm" ]

