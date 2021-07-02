{
    "header": {
        "pipelineVersion": "2.2",
        "releaseVersion": "2021.1.0",
        "fileVersion": "1.1",
        "nodesVersions": {
            "ImageMatching": "2.0",
            "Texturing": "5.0",
            "Meshing": "7.0",
            "FeatureMatching": "2.0",
            "FeatureExtraction": "1.1",
            "CameraInit": "4.0",
            "StructureFromMotion": "2.0",
            "MeshFiltering": "3.0"
        }
    },
    "graph": {
        "CameraInit_1": {
            "nodeType": "CameraInit",
            "position": [
                0,
                0
            ],
            "parallelization": {
                "blockSize": 0,
                "size": 3,
                "split": 1
            },
            "uids": {
                "0": "a636cb8054394660607914aaa1dae44de22f82be"
            },
            "internalFolder": "{cache}/{nodeType}/{uid0}/",
            "inputs": {
                "viewpoints": [
                    {
                        "viewId": 988553086,
                        "poseId": 988553086,
                        "path": "/home/anton/Dokumente/Projekte/lot1/lot1-object-marking/photogrammetry/dataset_monstree-master/mini3/IMG_1025.JPG",
                        "intrinsicId": 332580168,
                        "rigId": -1,
                        "subPoseId": -1,
                        "metadata": "{\"AliceVision:SensorWidth\": \"4.890000\", \"AliceVision:useWhiteBalance\": \"1\", \"DateTime\": \"2017:07:18 15:31:30\", \"Exif:ApertureValue\": \"1.69599\", \"Exif:BrightnessValue\": \"4.96804\", \"Exif:ColorSpace\": \"65535\", \"Exif:DateTimeDigitized\": \"2017:07:18 15:31:30\", \"Exif:DateTimeOriginal\": \"2017:07:18 15:31:30\", \"Exif:ExifVersion\": \"0221\", \"Exif:ExposureBiasValue\": \"0\", \"Exif:ExposureMode\": \"0\", \"Exif:ExposureProgram\": \"2\", \"Exif:Flash\": \"24\", \"Exif:FlashPixVersion\": \"0100\", \"Exif:FocalLength\": \"3.99\", \"Exif:FocalLengthIn35mmFilm\": \"28\", \"Exif:LensMake\": \"Apple\", \"Exif:LensModel\": \"iPhone 7 back camera 3.99mm f/1.8\", \"Exif:LensSpecification\": \"3.99, 3.99, 1.8, 1.8\", \"Exif:MeteringMode\": \"5\", \"Exif:PhotographicSensitivity\": \"20\", \"Exif:PixelXDimension\": \"4032\", \"Exif:PixelYDimension\": \"3024\", \"Exif:SceneCaptureType\": \"0\", \"Exif:SensingMethod\": \"2\", \"Exif:ShutterSpeedValue\": \"5.90695\", \"Exif:SubsecTimeDigitized\": \"730\", \"Exif:SubsecTimeOriginal\": \"730\", \"Exif:WhiteBalance\": \"0\", \"Exif:YCbCrPositioning\": \"1\", \"ExposureTime\": \"0.0166667\", \"FNumber\": \"1.8\", \"GPS:Altitude\": \"1223.82\", \"GPS:AltitudeRef\": \"0\", \"GPS:DateStamp\": \"2017:07:18\", \"GPS:DestBearing\": \"359.233\", \"GPS:DestBearingRef\": \"T\", \"GPS:HPositioningError\": \"6\", \"GPS:ImgDirection\": \"359.233\", \"GPS:ImgDirectionRef\": \"T\", \"GPS:Latitude\": \"37, 43, 23.81\", \"GPS:LatitudeRef\": \"N\", \"GPS:Longitude\": \"119, 36, 57.26\", \"GPS:LongitudeRef\": \"W\", \"GPS:Speed\": \"0.00532005\", \"GPS:SpeedRef\": \"K\", \"GPS:TimeStamp\": \"22, 31, 30\", \"ICCProfile\": \"0, 0, 2, 36, 97, 112, 112, 108, 4, 0, 0, 0, 109, 110, 116, 114, 82, 71, 66, 32, 88, 89, 90, 32, 7, 223, 0, 10, 0, 14, 0, 13, 0, 8, 0, 57, 97, 99, 115, 112, 65, 80, 80, 76, 0, 0, 0, 0, 65, 80, 80, 76, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ... [548 x uint8]\", \"Make\": \"Apple\", \"Model\": \"iPhone 7\", \"Orientation\": \"6\", \"ResolutionUnit\": \"none\", \"Software\": \"10.3.2\", \"XResolution\": \"72\", \"YResolution\": \"72\", \"jpeg:subsampling\": \"4:2:0\", \"oiio:ColorSpace\": \"sRGB\"}"
                    },
                    {
                        "viewId": 1461218130,
                        "poseId": 1461218130,
                        "path": "/home/anton/Dokumente/Projekte/lot1/lot1-object-marking/photogrammetry/dataset_monstree-master/mini3/IMG_1024.JPG",
                        "intrinsicId": 332580168,
                        "rigId": -1,
                        "subPoseId": -1,
                        "metadata": "{\"AliceVision:SensorWidth\": \"4.890000\", \"AliceVision:useWhiteBalance\": \"1\", \"DateTime\": \"2017:07:18 15:31:28\", \"Exif:ApertureValue\": \"1.69599\", \"Exif:BrightnessValue\": \"5.17327\", \"Exif:ColorSpace\": \"65535\", \"Exif:DateTimeDigitized\": \"2017:07:18 15:31:28\", \"Exif:DateTimeOriginal\": \"2017:07:18 15:31:28\", \"Exif:ExifVersion\": \"0221\", \"Exif:ExposureBiasValue\": \"0\", \"Exif:ExposureMode\": \"0\", \"Exif:ExposureProgram\": \"2\", \"Exif:Flash\": \"24\", \"Exif:FlashPixVersion\": \"0100\", \"Exif:FocalLength\": \"3.99\", \"Exif:FocalLengthIn35mmFilm\": \"28\", \"Exif:LensMake\": \"Apple\", \"Exif:LensModel\": \"iPhone 7 back camera 3.99mm f/1.8\", \"Exif:LensSpecification\": \"3.99, 3.99, 1.8, 1.8\", \"Exif:MeteringMode\": \"5\", \"Exif:PhotographicSensitivity\": \"40\", \"Exif:PixelXDimension\": \"4032\", \"Exif:PixelYDimension\": \"3024\", \"Exif:SceneCaptureType\": \"0\", \"Exif:SensingMethod\": \"2\", \"Exif:ShutterSpeedValue\": \"6.90799\", \"Exif:SubsecTimeDigitized\": \"462\", \"Exif:SubsecTimeOriginal\": \"462\", \"Exif:WhiteBalance\": \"0\", \"Exif:YCbCrPositioning\": \"1\", \"ExposureTime\": \"0.00833333\", \"FNumber\": \"1.8\", \"GPS:Altitude\": \"1224.42\", \"GPS:AltitudeRef\": \"0\", \"GPS:DateStamp\": \"2017:07:18\", \"GPS:DestBearing\": \"7.97446\", \"GPS:DestBearingRef\": \"T\", \"GPS:HPositioningError\": \"8\", \"GPS:ImgDirection\": \"7.97446\", \"GPS:ImgDirectionRef\": \"T\", \"GPS:Latitude\": \"37, 43, 23.86\", \"GPS:LatitudeRef\": \"N\", \"GPS:Longitude\": \"119, 36, 57.18\", \"GPS:LongitudeRef\": \"W\", \"GPS:Speed\": \"0.0605214\", \"GPS:SpeedRef\": \"K\", \"GPS:TimeStamp\": \"22, 31, 28\", \"ICCProfile\": \"0, 0, 2, 36, 97, 112, 112, 108, 4, 0, 0, 0, 109, 110, 116, 114, 82, 71, 66, 32, 88, 89, 90, 32, 7, 223, 0, 10, 0, 14, 0, 13, 0, 8, 0, 57, 97, 99, 115, 112, 65, 80, 80, 76, 0, 0, 0, 0, 65, 80, 80, 76, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ... [548 x uint8]\", \"Make\": \"Apple\", \"Model\": \"iPhone 7\", \"Orientation\": \"6\", \"ResolutionUnit\": \"none\", \"Software\": \"10.3.2\", \"XResolution\": \"72\", \"YResolution\": \"72\", \"jpeg:subsampling\": \"4:2:0\", \"oiio:ColorSpace\": \"sRGB\"}"
                    },
                    {
                        "viewId": 2085958917,
                        "poseId": 2085958917,
                        "path": "/home/anton/Dokumente/Projekte/lot1/lot1-object-marking/photogrammetry/dataset_monstree-master/mini3/IMG_1026.JPG",
                        "intrinsicId": 332580168,
                        "rigId": -1,
                        "subPoseId": -1,
                        "metadata": "{\"AliceVision:SensorWidth\": \"4.890000\", \"AliceVision:useWhiteBalance\": \"1\", \"DateTime\": \"2017:07:18 15:31:32\", \"Exif:ApertureValue\": \"1.69599\", \"Exif:BrightnessValue\": \"5.00969\", \"Exif:ColorSpace\": \"65535\", \"Exif:CustomRendered\": \"2\", \"Exif:DateTimeDigitized\": \"2017:07:18 15:31:32\", \"Exif:DateTimeOriginal\": \"2017:07:18 15:31:32\", \"Exif:ExifVersion\": \"0221\", \"Exif:ExposureBiasValue\": \"0\", \"Exif:ExposureMode\": \"0\", \"Exif:ExposureProgram\": \"2\", \"Exif:Flash\": \"24\", \"Exif:FlashPixVersion\": \"0100\", \"Exif:FocalLength\": \"3.99\", \"Exif:FocalLengthIn35mmFilm\": \"28\", \"Exif:LensMake\": \"Apple\", \"Exif:LensModel\": \"iPhone 7 back camera 3.99mm f/1.8\", \"Exif:LensSpecification\": \"3.99, 3.99, 1.8, 1.8\", \"Exif:MeteringMode\": \"5\", \"Exif:PhotographicSensitivity\": \"25\", \"Exif:PixelXDimension\": \"4032\", \"Exif:PixelYDimension\": \"3024\", \"Exif:SceneCaptureType\": \"0\", \"Exif:SensingMethod\": \"2\", \"Exif:ShutterSpeedValue\": \"5.90695\", \"Exif:SubsecTimeDigitized\": \"966\", \"Exif:SubsecTimeOriginal\": \"966\", \"Exif:WhiteBalance\": \"0\", \"Exif:YCbCrPositioning\": \"1\", \"ExposureTime\": \"0.0166667\", \"FNumber\": \"1.8\", \"GPS:Altitude\": \"1224.68\", \"GPS:AltitudeRef\": \"0\", \"GPS:DateStamp\": \"2017:07:18\", \"GPS:DestBearing\": \"346.362\", \"GPS:DestBearingRef\": \"T\", \"GPS:HPositioningError\": \"8\", \"GPS:ImgDirection\": \"346.362\", \"GPS:ImgDirectionRef\": \"T\", \"GPS:Latitude\": \"37, 43, 23.81\", \"GPS:LatitudeRef\": \"N\", \"GPS:Longitude\": \"119, 36, 57.29\", \"GPS:LongitudeRef\": \"W\", \"GPS:Speed\": \"0.188065\", \"GPS:SpeedRef\": \"K\", \"GPS:TimeStamp\": \"22, 31, 32\", \"ICCProfile\": \"0, 0, 2, 36, 97, 112, 112, 108, 4, 0, 0, 0, 109, 110, 116, 114, 82, 71, 66, 32, 88, 89, 90, 32, 7, 223, 0, 10, 0, 14, 0, 13, 0, 8, 0, 57, 97, 99, 115, 112, 65, 80, 80, 76, 0, 0, 0, 0, 65, 80, 80, 76, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ... [548 x uint8]\", \"Make\": \"Apple\", \"Model\": \"iPhone 7\", \"Orientation\": \"6\", \"ResolutionUnit\": \"none\", \"Software\": \"10.3.2\", \"XResolution\": \"72\", \"YResolution\": \"72\", \"jpeg:subsampling\": \"4:2:0\", \"oiio:ColorSpace\": \"sRGB\"}"
                    }
                ],
                "intrinsics": [
                    {
                        "intrinsicId": 332580168,
                        "pxInitialFocalLength": 3289.914110429448,
                        "pxFocalLength": 3289.914110429448,
                        "type": "radial3",
                        "width": 4032,
                        "height": 3024,
                        "sensorWidth": 4.89,
                        "sensorHeight": 3.6675,
                        "serialNumber": "/home/anton/Dokumente/Projekte/lot1/lot1-object-marking/photogrammetry/dataset_monstree-master/mini3_Apple_iPhone 7",
                        "principalPoint": {
                            "x": 2016.0,
                            "y": 1512.0
                        },
                        "initializationMode": "estimated",
                        "distortionParams": [
                            0.0,
                            0.0,
                            0.0
                        ],
                        "locked": false
                    }
                ],
                "sensorDatabase": "/home/anton/Meshroom-2021.1.0-av2.4.0-centos7-cuda10.2/aliceVision/share/aliceVision/cameraSensors.db",
                "defaultFieldOfView": 45.0,
                "groupCameraFallback": "folder",
                "allowedCameraModels": [
                    "pinhole",
                    "radial1",
                    "radial3",
                    "brown",
                    "fisheye4",
                    "fisheye1"
                ],
                "useInternalWhiteBalance": true,
                "viewIdMethod": "metadata",
                "viewIdRegex": ".*?(\\d+)",
                "verboseLevel": "info"
            },
            "outputs": {
                "output": "{cache}/{nodeType}/{uid0}/cameraInit.sfm"
            }
        },
        "FeatureExtraction_1": {
            "nodeType": "FeatureExtraction",
            "position": [
                200,
                0
            ],
            "parallelization": {
                "blockSize": 40,
                "size": 3,
                "split": 1
            },
            "uids": {
                "0": "0f3b43190cd115f6a5e586d1029bccc1405e9278"
            },
            "internalFolder": "{cache}/{nodeType}/{uid0}/",
            "inputs": {
                "input": "{CameraInit_1.output}",
                "describerTypes": [
                    "sift"
                ],
                "describerPreset": "normal",
                "maxNbFeatures": 0,
                "describerQuality": "normal",
                "contrastFiltering": "GridSort",
                "relativePeakThreshold": 0.01,
                "gridFiltering": true,
                "forceCpuExtraction": true,
                "maxThreads": 0,
                "verboseLevel": "info"
            },
            "outputs": {
                "output": "{cache}/{nodeType}/{uid0}/"
            }
        },
        "ImageMatching_1": {
            "nodeType": "ImageMatching",
            "position": [
                400,
                0
            ],
            "parallelization": {
                "blockSize": 0,
                "size": 3,
                "split": 1
            },
            "uids": {
                "0": "859e566c9a7682080699cc59f8b8ce48f5c7eebb"
            },
            "internalFolder": "{cache}/{nodeType}/{uid0}/",
            "inputs": {
                "input": "{FeatureExtraction_1.input}",
                "featuresFolders": [
                    "{FeatureExtraction_1.output}"
                ],
                "method": "VocabularyTree",
                "tree": "/home/anton/Meshroom-2021.1.0-av2.4.0-centos7-cuda10.2/aliceVision/share/aliceVision/vlfeat_K80L3.SIFT.tree",
                "weights": "",
                "minNbImages": 200,
                "maxDescriptors": 500,
                "nbMatches": 50,
                "nbNeighbors": 50,
                "verboseLevel": "info"
            },
            "outputs": {
                "output": "{cache}/{nodeType}/{uid0}/imageMatches.txt"
            }
        },
        "FeatureMatching_1": {
            "nodeType": "FeatureMatching",
            "position": [
                600,
                0
            ],
            "parallelization": {
                "blockSize": 20,
                "size": 3,
                "split": 1
            },
            "uids": {
                "0": "d949b0dc2ba95c1ee6ffa23f16ed4b84d1fc8db8"
            },
            "internalFolder": "{cache}/{nodeType}/{uid0}/",
            "inputs": {
                "input": "{ImageMatching_1.input}",
                "featuresFolders": "{ImageMatching_1.featuresFolders}",
                "imagePairsList": "{ImageMatching_1.output}",
                "describerTypes": "{FeatureExtraction_1.describerTypes}",
                "photometricMatchingMethod": "ANN_L2",
                "geometricEstimator": "acransac",
                "geometricFilterType": "fundamental_matrix",
                "distanceRatio": 0.8,
                "maxIteration": 2048,
                "geometricError": 0.0,
                "knownPosesGeometricErrorMax": 5.0,
                "maxMatches": 0,
                "savePutativeMatches": false,
                "crossMatching": false,
                "guidedMatching": false,
                "matchFromKnownCameraPoses": false,
                "exportDebugFiles": false,
                "verboseLevel": "info"
            },
            "outputs": {
                "output": "{cache}/{nodeType}/{uid0}/"
            }
        },
        "StructureFromMotion_1": {
            "nodeType": "StructureFromMotion",
            "position": [
                800,
                0
            ],
            "parallelization": {
                "blockSize": 0,
                "size": 3,
                "split": 1
            },
            "uids": {
                "0": "2d97c6fc77445ca80091ce3fd44466206783d9a6"
            },
            "internalFolder": "{cache}/{nodeType}/{uid0}/",
            "inputs": {
                "input": "{FeatureMatching_1.input}",
                "featuresFolders": "{FeatureMatching_1.featuresFolders}",
                "matchesFolders": [
                    "{FeatureMatching_1.output}"
                ],
                "describerTypes": "{FeatureMatching_1.describerTypes}",
                "localizerEstimator": "acransac",
                "observationConstraint": "Basic",
                "localizerEstimatorMaxIterations": 4096,
                "localizerEstimatorError": 0.0,
                "lockScenePreviouslyReconstructed": false,
                "useLocalBA": true,
                "localBAGraphDistance": 1,
                "maxNumberOfMatches": 0,
                "minNumberOfMatches": 0,
                "minInputTrackLength": 2,
                "minNumberOfObservationsForTriangulation": 2,
                "minAngleForTriangulation": 3.0,
                "minAngleForLandmark": 2.0,
                "maxReprojectionError": 4.0,
                "minAngleInitialPair": 5.0,
                "maxAngleInitialPair": 40.0,
                "useOnlyMatchesFromInputFolder": false,
                "useRigConstraint": true,
                "lockAllIntrinsics": false,
                "filterTrackForks": false,
                "initialPairA": "",
                "initialPairB": "",
                "interFileExtension": ".abc",
                "verboseLevel": "info"
            },
            "outputs": {
                "output": "{cache}/{nodeType}/{uid0}/sfm.abc",
                "outputViewsAndPoses": "{cache}/{nodeType}/{uid0}/cameras.sfm",
                "extraInfoFolder": "{cache}/{nodeType}/{uid0}/"
            }
        },
        "Meshing_1": {
            "nodeType": "Meshing",
            "position": [
                1000,
                0
            ],
            "parallelization": {
                "blockSize": 0,
                "size": 1,
                "split": 1
            },
            "uids": {
                "0": "80acd65f180bc35ed061ba5c7a1f22361876de75"
            },
            "internalFolder": "{cache}/{nodeType}/{uid0}/",
            "inputs": {
                "input": "{StructureFromMotion_1.output}",
                "depthMapsFolder": "",
                "useBoundingBox": false,
                "boundingBox": {
                    "bboxTranslation": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.0
                    },
                    "bboxRotation": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.0
                    },
                    "bboxScale": {
                        "x": 1.0,
                        "y": 1.0,
                        "z": 1.0
                    }
                },
                "estimateSpaceFromSfM": true,
                "estimateSpaceMinObservations": 3,
                "estimateSpaceMinObservationAngle": 10,
                "maxInputPoints": 50000000,
                "maxPoints": 5000000,
                "maxPointsPerVoxel": 1000000,
                "minStep": 2,
                "partitioning": "singleBlock",
                "repartition": "multiResolution",
                "angleFactor": 15.0,
                "simFactor": 15.0,
                "pixSizeMarginInitCoef": 2.0,
                "pixSizeMarginFinalCoef": 4.0,
                "voteMarginFactor": 4.0,
                "contributeMarginFactor": 2.0,
                "simGaussianSizeInit": 10.0,
                "simGaussianSize": 10.0,
                "minAngleThreshold": 1.0,
                "refineFuse": true,
                "helperPointsGridSize": 10,
                "densify": false,
                "densifyNbFront": 1,
                "densifyNbBack": 1,
                "densifyScale": 20.0,
                "nPixelSizeBehind": 4.0,
                "fullWeight": 1.0,
                "voteFilteringForWeaklySupportedSurfaces": true,
                "addLandmarksToTheDensePointCloud": false,
                "invertTetrahedronBasedOnNeighborsNbIterations": 10,
                "minSolidAngleRatio": 0.2,
                "nbSolidAngleFilteringIterations": 2,
                "colorizeOutput": false,
                "addMaskHelperPoints": false,
                "maskHelperPointsWeight": 1.0,
                "maskBorderSize": 4,
                "maxNbConnectedHelperPoints": 50,
                "saveRawDensePointCloud": false,
                "exportDebugTetrahedralization": false,
                "seed": 0,
                "verboseLevel": "info"
            },
            "outputs": {
                "outputMesh": "{cache}/{nodeType}/{uid0}/mesh.obj",
                "output": "{cache}/{nodeType}/{uid0}/densePointCloud.abc"
            }
        },
        "MeshFiltering_1": {
            "nodeType": "MeshFiltering",
            "position": [
                1200,
                0
            ],
            "parallelization": {
                "blockSize": 0,
                "size": 1,
                "split": 1
            },
            "uids": {
                "0": "d16abd25929458d53dcd5aacb72f4d586f3f7823"
            },
            "internalFolder": "{cache}/{nodeType}/{uid0}/",
            "inputs": {
                "inputMesh": "{Meshing_1.outputMesh}",
                "keepLargestMeshOnly": false,
                "smoothingSubset": "all",
                "smoothingBoundariesNeighbours": 0,
                "smoothingIterations": 5,
                "smoothingLambda": 1.0,
                "filteringSubset": "all",
                "filteringIterations": 1,
                "filterLargeTrianglesFactor": 60.0,
                "filterTrianglesRatio": 0.0,
                "verboseLevel": "info"
            },
            "outputs": {
                "outputMesh": "{cache}/{nodeType}/{uid0}/mesh.obj"
            }
        },
        "Texturing_1": {
            "nodeType": "Texturing",
            "position": [
                1400,
                0
            ],
            "parallelization": {
                "blockSize": 0,
                "size": 1,
                "split": 1
            },
            "uids": {
                "0": "41f777ceec5faab85e71a023a1d38c0e44b73485"
            },
            "internalFolder": "{cache}/{nodeType}/{uid0}/",
            "inputs": {
                "input": "{Meshing_1.output}",
                "imagesFolder": "",
                "inputMesh": "{MeshFiltering_1.outputMesh}",
                "textureSide": 8192,
                "downscale": 2,
                "outputTextureFileType": "png",
                "unwrapMethod": "Basic",
                "useUDIM": true,
                "fillHoles": false,
                "padding": 5,
                "multiBandDownscale": 4,
                "multiBandNbContrib": {
                    "high": 1,
                    "midHigh": 5,
                    "midLow": 10,
                    "low": 0
                },
                "useScore": true,
                "bestScoreThreshold": 0.1,
                "angleHardThreshold": 90.0,
                "processColorspace": "sRGB",
                "correctEV": false,
                "forceVisibleByAllVertices": false,
                "flipNormals": false,
                "visibilityRemappingMethod": "PullPush",
                "subdivisionTargetRatio": 0.8,
                "verboseLevel": "info"
            },
            "outputs": {
                "output": "{cache}/{nodeType}/{uid0}/",
                "outputMesh": "{cache}/{nodeType}/{uid0}/texturedMesh.obj",
                "outputMaterial": "{cache}/{nodeType}/{uid0}/texturedMesh.mtl",
                "outputTextures": "{cache}/{nodeType}/{uid0}/texture_*.{outputTextureFileTypeValue}"
            }
        }
    }
}