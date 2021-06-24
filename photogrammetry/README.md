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
docker build -t ahoreis/photogrammetry .
docker-compose up -d
```

## Usage

### start pipeline (local)

1. create subdirectory in img_in and copy images in it
<code>
docker exec photogrammetry photogrammetry <i>subdirectory_name [meshroom graph]</i>
</code>

### start pipeline (remote / with docker API)

NodeJS SDK: https://github.com/apocas/dockerode

TODO

### SSH

If you want to access the docker container directly i.e. for getting access to the meshroom binaries.
ssh has to be installed on your host.

[code]
ssh -p 2222 root@[docker-host]
[/code]

## Todo

- finish README
- scale model to a realistic size
- optimize meshroom graph parameters
- publish preview while calculating
- add image compression tool to pipeline
- presets for different image capturing conditions
