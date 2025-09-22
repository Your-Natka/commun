# build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# optional: custom nginx config to proxy /api -> backend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]