FROM node:20-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm i
USER node
COPY . .
EXPOSE 3000
CMD node index.js
