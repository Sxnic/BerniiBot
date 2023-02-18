# PRODUCTION DOCKERFILE
FROM docker.io/node:lts-alpine

# Build args
ARG TOKEN

WORKDIR /src/app

COPY package.json .

RUN yarn && \
  yarn cache clean
COPY . .

ENV TOKEN=$TOKEN
ENV NODE_ENV="production"
ENV SERVER_ID="<SERVER_ID>"
ENV REACTION_MESSAGE_ID="<MESSAGE_ID>"
ENV PREFIX="?"
ENV RED_ROLE_ID="<ROLE_ID>"
ENV GREEN_ROLE_ID="<ROLE_ID>"
ENV BLUE_ROLE_ID="<ROLE_ID>"

RUN yarn build

CMD ["node", "dist/main.js"]