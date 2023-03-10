# PRODUCTION DOCKERFILE
FROM docker.io/node:lts-alpine

# Build args
ARG TOKEN
ARG PREFIX
ARG SERVER_ID
ARG REACTION_MESSAGE_ID
ARG RED_ROLE_ID
ARG GREEN_ROLE_ID
ARG BLUE_ROLE_ID

WORKDIR /src/app

COPY package.json .

RUN yarn && \
  yarn cache clean
COPY . .

ENV TOKEN=$TOKEN
ENV NODE_ENV="production"
ENV SERVER_ID=$SERVER_ID
ENV REACTION_MESSAGE_ID=$REACTION_MESSAGE_ID
ENV PREFIX=$PREFIX
ENV RED_ROLE_ID=$RED_ROLE_ID
ENV GREEN_ROLE_ID=$GREEN_ROLE_ID
ENV BLUE_ROLE_ID=$BLUE_ROLE_ID

RUN yarn build

CMD ["node", "dist/main.js"]