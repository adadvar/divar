#!/bin/sh

echo "Run app install"
php artisan app:install
echo "App install was successful"

/usr/bin/supervisord  -c "/etc/supervisor/conf.d/supervisord.conf"