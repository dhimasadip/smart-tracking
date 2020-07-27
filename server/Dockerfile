FROM node:12.0

WORKDIR /var/www/smart-tracking/server

ENV PORT=3000

COPY package.json ./

RUN npm i -g nodemon

RUN npm i -g sequelize-cli

RUN npm i && npm cache clean --force

COPY . .

CMD ["sequelize", "db:create"]

CMD ["sequelize", "db:migrate"]

CMD ["nodemon", "app.js"]