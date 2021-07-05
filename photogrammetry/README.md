# Photogrammetry Pipeline

Dockerized photogrammetry pipeline based on Meshroom (Version 2021.1.0): https://github.com/alicevision/meshroom.

## Features

- infer the geometry of a scene from a set of unordered photographs, output as 3D-model (available formats: .obj, .gltf, .glb, ...)
- source image compression
- post processing (graph minimization)
- continuous model optimization by adding additional images afterwards

## Prerequisites

- at least 8GB RAM, 32GB recommended
- NVIDIA GPU with a CUDA compute capability >= 3.0
- docker
- docker-compose
- official [NVIDIA drivers](https://www.nvidia.com/en-us/drivers/unix/) >= 361.93 (maybe older versions work as well)
- ([NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html)) <- not sure if it's really necessary

   nvidia-smi must be available
 
The pipeline is not tested on Windows yet.

## Installation

The pipeline can be build with the dockerfile from this repository but is also available pre-built from docker Hub.

### Docker Hub

1. create directories img_in, model, log and download the docker-compose.yml file from this directory
2. in the same directory run:
```bash
docker pull ahoreis/photogrammetry:latest
docker-compose up -d
```

### build image with docker

1. clone this repository and navigate into the directory with the dockerfile
2. run:
```bash
docker build -t ahoreis/photogrammetry .  # note the "."
docker-compose up -d
```

## Usage

### Starting the pipeline

There are different ways to start the photogrammetry pipeline, depending on your use case. They all rely on the photogrammetry bash script provided in this repository. If you want to access meshroom directly, u have to execute the /opt/Meshroom/meshroom_batch script in the container.

#### start pipeline (local)

1. create a folder containing all images under the following path: ./img_in/[user_id]/[model_name]
2. execute the following command:
<code>
docker exec photogrammetry photogrammetry <i>[options] model_name [meshroom_graph]</i>
</code>
The first photogrammetry stands for the container name. The second for the photogrammetry script.

Available graph files are saved in the graph folder. If you want to use your own graph files u need to place them there.
For all available options, see the explanation below.

#### start pipeline (remote / with docker API)

NodeJS SDK: https://github.com/apocas/dockerode

TODO

#### start pipeline with nodejs

https://stackoverflow.com/questions/44647778/how-to-run-shell-script-file-using-nodejs

TODO

#### start pipeline from other docker container

https://stackoverflow.com/questions/59035543/how-to-execute-command-from-one-docker-container-to-another

the easiest way is probably to login to the photogrammetry container via ssh and run the pipeline 

TODO

#### SSH

If you want to access the docker container directly i.e. for getting access to the meshroom binaries.
ssh has to be installed on your host.

```
ssh -p 2222 root@[docker-host]
```

### Available options

  -h - show help
  -u - set user id, if not specified it will be set to default_user
  -c - use image compression (it is not used by default)
  -p - generate fast preview mesh before computing the final model (will be saved under model/[user_id]/[model_name]/preview)
  
### Examples

The following example will start the meshroom container from the host system using image compression and generating a fast preview, that will be saved under /model/test_user/test_model/preview, before computing the real model with the standard meshroom graph file (it is not necessary to provide the standard graph file as it is the default, this is just for demonstration purposes).

```
docker exec photogrammetry photogrammetry -c -p -u test_user test_model standard.mg
```

## Todo

- finish README
- scale model to a realistic size
- optimize meshroom graph parameters
- more testing
- more presets for different image capturing conditions:
   - small / big datasets
   - small model size / agressive mesh decimation
   - low / high end host machines
   - different lighting conditions
   - different artwork sizes and special artwork forms
- more flexible logging options with verbose levels (ALL, INFO, WARNING, ERROR)
- catch and handle common errors
- implement automated iterative model improvement by using artist feedback

## Bugs

Sometimes the pipeline may fail when recreating an already calculated model. In this case ssh into the container and delete model files and cache files:
```
ssh -p 2222 root@[docker-host]
rm -R /data/cache/*
rm -R /data/model/[u_id]/[model-name]/*
```
