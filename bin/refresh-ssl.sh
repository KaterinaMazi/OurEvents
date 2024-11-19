#!/bin/bash

# renew the certificates
docker compose -f docker-compose-production.yml run certbot renew

# Reload Nginx to apply the new certificates
docker compose -f docker-compose-production.yml exec nginx nginx -s reload