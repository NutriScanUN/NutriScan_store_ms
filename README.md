# NutriScan_store_ms

## Commands to Docker Compile and Run

To build and run the Docker container, use the following commands:

```js
docker build -t nutriscanun-store-ms .
docker run -d -p 3005:3005 --env-file .env --name nutriscanun-store-ms-docker nutriscanun-store-ms
```

## Image Deploy

```js
docker tag nutriscanun-store-ms juanxo074/nutriscan-store-ms:latest
```
