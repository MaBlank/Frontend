# Stage 1: Build the Angular application
FROM node:16 as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:1.19.0-alpine as prod

COPY --from=build /app/dist/frontend-annotation-tool /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
