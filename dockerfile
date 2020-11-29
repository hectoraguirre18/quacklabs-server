FROM node
LABEL Quacklabs Server
RUN mkdir -p /app
WORKDIR app
COPY ./ .
RUN npm install
EXPOSE 4000
ENTRYPOINT npm start