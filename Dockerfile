FROM node:16.20.1-alpine3.17 as build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm cache clean --force
RUN npm ci
COPY . .
RUN npm run build

FROM node:16.20.1-alpine3.17 as application
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/package-lock.json .
RUN npm cache clean --force
RUN npm ci --only=production

USER node
ENV PORT=8080
EXPOSE 8080
CMD [ "node", "dist/main" ]
