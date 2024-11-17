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

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "OurEventServerDjango.wsgi:application"]