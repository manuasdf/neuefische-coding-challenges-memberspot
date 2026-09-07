FROM node:26-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install --omit=dev
COPY ./dist ./
ENV JWT_SECRET=e3fc7b4c489fdf273db0f6aa5e1b166d76d2436019577fcdbaa264989157a4aa
CMD ["node", "main.js"]
