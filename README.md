# NutriScan_store_ms

## Commands to Docker Compile and Run

To build and run the Docker container, use the following commands:

```js
docker build -t store-ms-image .
docker run -d -p 3005:3005 --env-file .env --name store-ms store-ms-image
```

## Image Deploy

```js
docker tag nutriscanun-store-ms juanxo074/nutriscan-store-ms:latest
```
