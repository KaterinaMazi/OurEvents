#!/bin/sh

# Install docker

sudo apt update
sudo apt upgrade -y

sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt update
sudo apt install docker-ce -y

sudo systemctl enable docker
sudo systemctl status docker # Check final status

# Generate SSL certificate

docker compose -f ../docker-compose-production.yml run certbot certonly --webroot -w /var/www/certbot --email takischampion@gmail.com --agree-tos --no-eff-email -d our-events.site

# Start the app
docker compose -f ../docker-compose-production.yml up --build

# Schedule Nginx reload with certificate refresh (every 12 hours)
0 */12 * * * refresh-ssl.sh
