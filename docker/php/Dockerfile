FROM php:8.1.13-fpm-bullseye

RUN apt-get update && apt-get install -y \
    curl \
    libicu-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    git \
    cron \
    zip \
    unzip

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql exif pcntl bcmath gd intl soap
RUN docker-php-ext-configure intl

RUN sed -i -e "s/upload_max_filesize = .*/upload_max_filesize = 1G/g" \
        -e "s/post_max_size = .*/post_max_size = 1G/g" \
        -e "s/memory_limit = .*/memory_limit = 512M/g" \
        /usr/local/etc/php/php.ini-production \
        && cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini

COPY --from=composer:2.4.4 /usr/bin/composer /usr/bin/composer