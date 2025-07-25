# Use nginx to serve the static files
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the locally built Angular app
COPY dist/rallylite-frontend /usr/share/nginx/html

# Optional: Custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
