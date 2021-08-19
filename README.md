# lot1-object-marking

This project consists of 3 main components. The webserver, the 3D-model-creation-server, or pipeline (/photogr-server) and the docker-image of the 3D model rendering software meshroom (/photogrammetry).
The installation/config of the webserver is done inside this README. For installation and config of the pipeline-server go to subdirectory /photogr-server and read the README and for the docker-image go to the README in /photogrammetry.

# Build
To build and start the express server just use:

````
npm start
````

# Deploy

Website with node express app can be served via nginx
## nginx

````
upstream rest_node_js {
    server  127.0.0.1:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com; # Replace domain name!
    # Redirect users to the https domain
    return 302 https://$server_name$request_uri;
}

server {
    # Content for WebXR hast to be served via SSL
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    # Example for Cloudflare as SSL CA
    ssl_certificate         certs/cloudflare.crt;
    ssl_certificate_key     certs/cloudflare.key;
    ssl_client_certificate  certs/origin-pull-ca.pem;
    ssl_verify_client on;

    server_name example.com www.example.com; # Replace domain name!

    # Use express node via proxy:
    location / {
        proxy_pass http://rest_node_js;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}

````

## localhost + express
The express server serves the index.html file on port 3000.
To connect to the DB you need the .env file: Please contact one of the members to get a hold of it.

Https steps:
Generate SSL keys following this article: https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/.

Install dependencies:
````
npm i

````

Run the project locally:

````
npm start

````

And Visit: https://localhost:3000/

To see served files on your mobile phone:
1. In your computer to go network settings and check networks IP.
2. In your phone open chrome and go the the path: https://{IP}:3000/
3. Give localhost permissions  and the browser permissions to access your location.
4. Login.
5. Under Services you could find the whole functionalities of the website.

To see the Artist side of the website login with the credentials:

````
email: test@gmail
password: 1234

````
