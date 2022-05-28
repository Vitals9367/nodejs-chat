FROM node:16

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

RUN yarn install --pure-lockfile

COPY . .

EXPOSE 3000
CMD [ "yarn", "run","start:prod" ]