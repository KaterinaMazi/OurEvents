# Start the app
docker compose -f docker-compose-production.yml up --build -d

# Delete dummy certificate
docker compose -f docker-compose-production.yml exec nginx rm -rf /etc/letsencrypt/live/our-events.site
docker compose -f docker-compose-production.yml exec nginx rm -rf /etc/letsencrypt/archive/our-events.site
docker compose -f docker-compose-production.yml exec nginx rm -rf /etc/letsencrypt/renewal/our-events.site

# Generate SSL certificate
docker compose -f docker-compose-production.yml run certbot certonly --webroot -w /var/www/certbot --email takischampion@gmail.com --agree-tos --no-eff-email -d our-events.site

# Reload Nginx to apply the new certificates
docker compose -f docker-compose-production.yml exec nginx nginx -s reload

# Schedule Nginx reload with certificate refresh (every 12 hours)
CRON_JOB="0 */12 * * * /path/to/refresh-ssl.sh >> bin/refresh-ssl.log 2>&1"

# Check if the cron job already exists to prevent duplication
(crontab -l | grep -F "$CRON_JOB") || (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -