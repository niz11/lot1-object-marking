# Photogrammetry Pipeline with express.js

Photogrammetry pipeline based on Meshroom (Version 2021.1.0): https://github.com/alicevision/meshroom/releases.

## Features

 - application server to automatically generate a 3D model with the 3D-model-rendering software meshroom
   - infer the geometry of a scene from a set of unordered photographs, output as 3D-model (available formats: .obj, .gltf, .glb, ...)
 - the webserver will serve the static html page (src/webserver/static/createModel.html) for user interaction and start of the pipeline.
 - the ceated models will be send to the webserver, where they get fetched by the user
 

## Prerequisites

Hardware:
- at least 8GB RAM, 32GB recommended
- NVIDIA GPU with a CUDA compute capability >= 3.0

OS:
- Either Linux, Windows/Windows preview version, MacOS
- Local Pipeline works on all OS
- Dockerised pipeline fully works on Linux and Windows-preview-version, partially works on Windows
Dockerised Meshroom-Pipeline:
   - On Linux: Install Nvidia CUDA Toolkit to enable access of GPUs inside docker-containers
   - On Windows: Windows preview version necessary, in order to be able to use WSL2 and make GPU available inside docker-containers. Without windows-preview-version, only the      preview-pipeline-function (skips all steps during 3D-model creation that require GPU computations) are available. Full model creation not possible then. Use local Meshroom Pipeline (below) instead.
Local Meshroom-Pipeline:
   - OS independent
   - runs locally inside node.js child-processes --> directly accesses GPU, doesn't require any 

## Installation/config

### Https steps:
 1. The pipeline server doesn't need to be a HTTPS server, but is heavily recommended. Of course signing your own certificates is useless. After all the server is meant to run somewhere remote anyways.
 2. Generate SSL keys following this article: https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/.
 3. Put certificates into photogr-server/cert folder and name the key "key.pem" and the certificate "cert.pem".
    
### Pipeline steps:
 1. Download the repository and Meshroom(Version 2021.1.0) from above.
 2. unzip folder and place Meshroom-2021.1.0 inside "Meshroom-AliceVision\Pipeline_2021" folder.
 3. if node.js is not installed yet, download node.js
 4. configure .env file for server-port, and pipeline-configs
 5. Install dependencies:
````
npm i

````
 6. open your command line/shell and cange directory into the folder where you downloaded the repository
 7. run the following command:

 ````
node server.js
````
 8. You need to go to go to https://localhost:8080/ in your browser once in the beginning, in order to click on ignore that the page is not safe due to self-certifictes. Otherwise calls from the frontend to this server won't be allowed (browser will reject requests). So you must see the page of the server once inside your used browser.
 9. DONE

## Create 3D model --> Start pipeline (local)

1. visit https://localhost:3000/createModel.html and login 
2. choose a name for your model and select desired optional parameters
3. click on "Durchsuchen" and upload the images, from which you want to have a 3D model
4. click on "upload" and wait for arrival of the 3D model
5. when ready, the 3D model will be displayed on the page below

## Todo

- publish preview while calculating/ post processing (graph minimization)
