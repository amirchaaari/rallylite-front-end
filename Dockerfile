FROM nginx:alpine
COPY dist/rallylite-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
