# Photogrammetry Pipeline with express.js

Photogrammetry pipeline based on Meshroom (Version 2021.1.0): https://github.com/alicevision/meshroom/releases.

## Features

 - small webpage to generate a 3D model and display when finished
 - communicates with local node-express.js server on which 3D-model-rendering software runs
 - infer the geometry of a scene from a set of unordered photographs, output as 3D-model (available formats: .obj, .gltf, .glb, ...)

## Prerequisites

Hardware:
- at least 8GB RAM, 32GB recommended
- NVIDIA GPU with a CUDA compute capability >= 3.0
OS:
- Either Linux, Windows/Windows preview version, MacOS
- Local Pipeline works on all OS
- Dockerised pipeline fully works on Linux and Windows-preview-version, partially works on Windows
- Dockerised Meshroom-Pipeline:
   - On Linux: Install Nvidia CUDA Toolkit to enable access of GPUs inside docker-containers
   - On Windows: Windows preview version necessary, in order to be able to use WSL2 and make GPU available inside docker-containers. Without windows-preview-version, only the      preview-pipeline-function (skips all steps during 3D-model creation that require GPU computations) are available. Full model creation not possible then. Use local Meshroom Pipeline (below) instead.
- Local Meshroom-Pipeline:
   - OS independent
   - runs locally inside node.js child-processes --> directly accesses GPU, doesn't require any 

## Installation/config

### Https steps:
 1. Generate SSL keys following this article: https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/.
 2. Put certificates into photogr-server/cert folder
    
### Pipeline steps:
 1. Download the repository and Meshroom(Version 2021.1.0) from above.
 2. unzip folder and place Meshroom-2021.1.0 inside "Meshroom-AliceVision\Pipeline_2021" folder.
 3. if node is not installed yet, download node.js
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
 8. go to https://localhost:8080/ in your browser
 9. DONE

## Create 3D model --> Start pipeline (local)

1. visit https://localhost:8080/ 
2. click on "Durchsuchen" and upload the images, from which you want to have a 3D model
3. click on "upload" and wait for arrival of the 3D model
4. when ready, the 3D model will be displayed on the page below

## Todo

- finish README
- publish preview while calculating/ post processing (graph minimization)
