self.importScripts('wasm_fdt.js')

let openCVURL;
let openCVready = false;
let cv2;

// var Module = {
//     onRuntimeInitialized: function() {
//         openCVready = true;
//         postMessage({type: "cvReady"});
//     },
//     setStatus: function(msg) {
//         postMessage({type: "cvStatus", msg: msg});
//     }
// };

async function loadOpenCV(paths) {
    let OPENCV_URL = "";
    let asmPath = "";
    let wasmPath = "";
    let simdPath = "";
    let threadsPath = "";
    let threadsSimdPath = "";

    if(!(paths instanceof Object)) {
        throw new Error("The first input should be a object that points the path to the OpenCV.js");
    }

    if ("asm" in paths) {
        asmPath = paths["asm"];
    }

    if ("wasm" in paths) {
        wasmPath = paths["wasm"];
    }

    if ("threads" in paths) {
        threadsPath = paths["threads"];
    }

    if ("simd" in paths) {
        simdPath = paths["simd"];
    }

    if ("threadsSimd" in paths) {
        threadsSimdPath = paths["threadsSimd"];
    }

    let wasmSupported = !(typeof WebAssembly === 'undefined');
    if (!wasmSupported && OPENCV_URL === "" && asmPath !== "") {
        OPENCV_URL = asmPath;
        console.log("The OpenCV.js for Asm.js is loaded now");
    } else if (!wasmSupported && asmPath === ""){
        throw new Error("The browser supports the Asm.js only, but the path of OpenCV.js for Asm.js is empty");
    }

    let simdSupported = wasmSupported ? await wasmFeatureDetect.simd() : false;
    let threadsSupported = wasmSupported ? await wasmFeatureDetect.threads() : false;

    if (simdSupported && threadsSupported && threadsSimdPath !== "") {
        OPENCV_URL = threadsSimdPath;
        console.log("The OpenCV.js with simd and threads optimization is loaded now");
    } else if (simdSupported && simdPath !== "") {
        if (threadsSupported && threadsSimdPath === "") {
            console.log("The browser supports simd and threads, but the path of OpenCV.js with simd and threads optimization is empty");
        }
        OPENCV_URL = simdPath;
        console.log("The OpenCV.js with simd optimization is loaded now.");
    } else if (threadsSupported && threadsPath !== "") {
        if (simdSupported && threadsSimdPath === "") {
            console.log("The browser supports simd and threads, but the path of OpenCV.js with simd and threads optimization is empty");
        }
        OPENCV_URL = threadsPath;
        console.log("The OpenCV.js with threads optimization is loaded now");
    } else if (wasmSupported && wasmPath !== "") {
        if(simdSupported && threadsSupported) {
            console.log("The browser supports simd and threads, but the path of OpenCV.js with simd and threads optimization is empty");
        }

        if (simdSupported) {
            console.log("The browser supports simd optimization, but the path of OpenCV.js with simd optimization is empty");
        }

        if (threadsSupported) {
            console.log("The browser supports threads optimization, but the path of OpenCV.js with threads optimization is empty");
        }

        OPENCV_URL = wasmPath;
        console.log("The OpenCV.js for wasm is loaded now");
    } else if (wasmSupported) {
        console.log("The browser supports wasm, but the path of OpenCV.js for wasm is empty");
    }

    if (OPENCV_URL === "") {
        throw new Error("No available OpenCV.js, please check your paths");
    }

    openCVURL = OPENCV_URL;
}

// Set paths configuration
let pathsConfig = { //TODO
    wasm: "../opencv/xtrWasm/bin/opencv.js",
    threads: "../opencv/xtrWasmT/bin/opencv.js",
    simd: "../opencv/xtrWasmS/bin/opencv.js",
    threadsSimd: "../opencv/xtrWasmTS/bin/opencv.js",
}

// importScripts("../opencv/xtrWasmTS/bin/opencv.js");
// import '../opencv/xtrWasm/bin/opencv.js';
// Load OpenCV.js and use the pathsConfiguration



// loadOpenCV(pathsConfig).then((success)=>{
//     self.importScripts(openCVURL);
//     console.log('OpenCV loaded');
//     console.log(cv);
//     loadArUco();
// });


self.importScripts('../opencv/xtrWasm/bin/opencv.js');
console.log('OpenCV loaded');



let dict = null;
let params = null;
let camMat = null;
let camDist = null;
let rvecs = null;
let tvecs = null;
let rgbaDat = null;
let grayDat = null;
let mIDs = null;
let mCorners = null;

function loadArUco() {
    console.log(cv2);
    dict =  new cv2.aruco_Dictionary(cv2.DICT_4X4_50);
    params = new cv2.aruco_DetectorParameters();
    params.cornerRefinementMethod = cv2.CORNER_REFINE_SUBPIX;
    //TODO: more params need changing?

    camMat = new cv2.Mat();
    camDist = new cv2.Mat();
    camDist = cv2.matFromArray(5, 1, cv2.CV_64F, [0, 0, 0, 0, 0]);
    rvecs = new cv2.Mat();
    tvecs = new cv2.Mat();
    rgbaDat = new cv2.Mat();
    grayDat = new cv2.Mat();
    mIDs = new cv2.Mat();
    mCorners = new cv2.MatVector();


    postMessage({type: "loaded"});
    console.log('Aruco loaded');
}

// loadArUco();

cv().then((s) => { // weird workaround for now...
    cv2 = s;

    loadArUco();
});

// console.log('CV: ',cv);

let first = true;

onmessage = function (e) {
    let focL = e.data.focL;
    let width = e.data.w;
    let height = e.data.h;
    let imgData = e.data.imgData;

    let markers = [];

    if (dict) {



        camMat.create(3, 3, cv2.CV_64F)
        camMat.data64F.set([focL, 0, 0, 0, focL, 0, width / 2, height / 2, 1]);
        rgbaDat.create(height, width, cv2.CV_8UC4)
        rgbaDat.data.set(imgData);
        cv2.cvtColor(rgbaDat, grayDat, cv2.COLOR_RGBA2RGB, 0);

        cv2.detectMarkers(grayDat, dict, mCorners, mIDs, params);
        cv2.estimatePoseSingleMarkers(mCorners, 0.05, camMat, camDist, rvecs, tvecs);

        if (first) {
            console.log(rgbaDat.data);
            console.log(grayDat.data);
            console.log(params);
            console.log(mCorners.size());
            first = false;
        }


        for(let i=0; i < mIDs.rows; ++i) {
            console.log('detected marker');
            markers.push({
                id: mIDs.data32S[i],
                // tvec: [tvecs.doublePtr(0, i)[0], tvecs.doublePtr(0, i)[1], tvecs.doublePtr(0, i)[2]],
                // rvec: [rvecs.doublePtr(0, i)[0], rvecs.doublePtr(0, i)[1], rvecs.doublePtr(0, i)[2]]

                tx: tvecs.doublePtr(0, i)[0],
                ty: tvecs.doublePtr(0, i)[1],
                tz: tvecs.doublePtr(0, i)[2],

                rx: rvecs.doublePtr(0, i)[0],
                ry: rvecs.doublePtr(0, i)[1],
                rz: rvecs.doublePtr(0, i)[2],
            })
        }
    }







    postMessage({
        type: "arPose",
        data: markers});
}
