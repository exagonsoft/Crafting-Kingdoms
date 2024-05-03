FROM thirdweb/engine:latest

COPY .env /app/.env

EXPOSE 3005

# Start the application
CMD ["npm", "start"]
