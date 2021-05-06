# lot1-object-marking

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