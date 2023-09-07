FROM node:18.7

RUN npm install -g pnpm
WORKDIR /usr/src/app

COPY package.json .
RUN pnpm install
COPY . .

# 生产环境
RUN pnpm build
RUN rm -rf node_modules

EXPOSE 3000

# CMD ["pnpm", "start"]
# 生产环境
CMD ["pnpm", "start:prod"]