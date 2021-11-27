FROM nginx:1.15.0-alpine

WORKDIR /

COPY ./proxy.conf ./etc/nginx/conf.d/proxy.conf

WORKDIR /etc

RUN echo server proxy.addpeople.com>>hosts

WORKDIR /etc/nginx/conf.d