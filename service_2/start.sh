#!/bin/sh

if [ "$SET_CONTAINER_TIMEZONE" = "true" ]; then
    echo ${CONTAINER_TIMEZONE} >/etc/timezone && \
    ln -sf /usr/share/zoneinfo/${CONTAINER_TIMEZONE} /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata
    echo "Timezone: $CONTAINER_TIMEZONE"
else
    echo "Timezone não modificado"
fi

pip install -r requirements.txt

python server/app.py