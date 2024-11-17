# frontend/Dockerfile
FROM node:22-alpine as build

# Set working directory
WORKDIR app

# Copy package.json and install dependencies
COPY package.json .

RUN npm install

# Copy the source code
COPY . .

FROM build as development

EXPOSE 5173

CMD ["npm", "run", "dev"]

FROM build as production

# Build the production files
CMD ["npm", "run", "build"]