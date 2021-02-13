FROM node:14

WORKDIR /mercury

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn","start"]