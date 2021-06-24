# Photogrammetry Pipeline with express.js

Photogrammetry pipeline based on Meshroom (Version 2021.1.0): https://github.com/alicevision/meshroom/releases.

## Features

 - small webpage to generate a 3D model and display when finished
 - communicates with local node-express.js server on which 3D-model-rendering software runs
 - infer the geometry of a scene from a set of unordered photographs, output as 3D-model (available formats: .obj, .gltf, .glb, ...)

## Prerequisites

- at least 8GB RAM, 32GB recommended
- NVIDIA GPU with a CUDA compute capability >= 3.0

## Installation

 1. Download the repository and Meshroom(Version 2021.1.0) from above.
 2. unzip folder and place Meshroom-2021.1.0 inside "Meshroom-AliceVision\Pipeline_2021" folder.
 3. if node is not installed yet, download node.js
 4. open your command line/shell and cange directory into the folder where you downloaded the repository
 5. run the following command:

 ````
node server.js
````
 6. go to https://localhost:8080/ in your browser
 7. DONE

## Create 3D model --> Start pipeline (local)

1. visit https://localhost:8080/ 
2. clcik on "Durchsuchen" and upload the images, from which you want to have a 3D model
3. click on "upload" and wait for arrival of the 3D model
4. when ready, the 3D model will be displayed on the page below

## Todo

- integrate functionality into official frontend
- integrate with official webserver wit AR functionality
- finish README
- publish preview while calculating/ post processing (graph minimization)
- add image compression tool to pipeline
