FROM node:20-alpine AS builder

WORKDIR /app

ARG REACT_APP_SITE_URL=https://bunglog.coreluma.kr
ARG REACT_APP_API_BASE_URL=/api

ENV REACT_APP_SITE_URL=${REACT_APP_SITE_URL}
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

COPY package.json package-lock.json ./
RUN npm ci

COPY public ./public
COPY src ./src
COPY tailwind.config.js ./
COPY convertToWebP.mjs ./

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
