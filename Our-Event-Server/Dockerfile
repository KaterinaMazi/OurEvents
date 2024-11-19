FROM python:3.12-alpine as build

WORKDIR app

COPY ./requirements.txt .

RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

COPY --chmod=755 . .

EXPOSE 8000

ENTRYPOINT ["sh","./docker-entrypoint.sh"]

FROM build as development

CMD ["python","manage.py","runserver","0.0.0.0:8000"]

FROM build as production

# Create dummy certificates
RUN apk add --no-cache openssl

RUN mkdir -p /etc/letsencrypt/live/our-events.site/ && \
    [ -f /etc/letsencrypt/live/our-events.site/privkey.pem ] && [ -f /etc/letsencrypt/live/our-events.site/fullchain.pem ] || \
    openssl req -x509 -newkey rsa:4096 \
    -keyout /etc/letsencrypt/live/our-events.site/privkey.pem \
    -out /etc/letsencrypt/live/our-events.site/fullchain.pem \
    -sha256 -days 3650 -nodes \
    -subj "/C=XX/ST=StateName/L=CityName/O=CompanyName/OU=CompanySectionName/CN=our-events.site"



CMD ["gunicorn", "--bind", "0.0.0.0:8000", "OurEventServerDjango.wsgi:application"]