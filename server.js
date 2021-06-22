const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const util = require('util');
const https = require('https');
const cors = require('cors');
const busboy = require('connect-busboy');  // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
const obj2gltf = require('obj2gltf'); // converting .obj to .gltf/.glb
const app = express();
const port = 8080;

// skips meshroom-3D-model-generation, by using known images to meshromm-cache --> imidiate finish
const testing = false;

// app.use(cors());
// app.options('*', cors());
// var session = require('express-session');

// contains current 3D-model-creation-tasks in progress from meshroom
let current_modelling_processes = new Map();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "text/html");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// module to manage upload of images, max 2MiB buffer --> images are directly written to disk
app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware

let uploadPath = path.join(__dirname, 'uploaded-images/images'); // Register the upload path
fs.ensureDir(uploadPath); // Make sure that he upload path exits

// var output_folder_length;

// REST interface
app.get('/', function (req, res) {
  console.log('GET request to the homepage');
  res.sendFile(path.join(__dirname, 'index.html'));
});
// path to request the finished 3D model with given id
app.get('/meshroom-pipeline-model', function (req, res) {
  const model_id = req.query.id;
  console.log('GET request to the 3D object-model.glb with id: ' + model_id);
  res.sendFile(path.join(__dirname, 'Meshroom-AliceVision/output/output' + model_id + '/model' + model_id + '.glb'));
});

// app.get('/object_files/AnyConv.com__texturedMesh.glb', function (req, res) {
//   console.log('GET request to the 3D object');
//   res.sendFile(path.join(__dirname, 'object_files/AnyConv.com__texturedMesh.glb'));
// });

// path to request whether a 3D model generation is already finished
app.get('/meshroom-pipeline', function (req, res) {
  const model_id = req.query.id;
  console.log('GET request to the 3D object with id: ' + model_id);
  if (current_modelling_processes.has(model_id.toString())) {
    res.status(200);
    res.send("Modelling still in progress, this can take a few minutes.");
  } else {
    try {
      const output_path = path.join(__dirname, 'Meshroom-AliceVision/output/output' + model_id + '/model' + model_id + '.glb');
      if (fs.existsSync(output_path)) {
        console.log("Directory exists.");
        res.status(201);
        // res.sendFile(output_path + "/texturedMesh.obj");
        res.send("3D model created! Ready to be fetched under ID: " + model_id);
      } else {
        console.log("Directory does not exist.");
        res.status(404);
        res.send("Model with " + model_id + " not found. Please check model-ID.");
      }
    } catch (e) {
      console.log("An error occurred.");
    }
  }

  // res.sendFile(path.join(__dirname, 'object_files/AnyConv.com__texturedMesh.glb'));
});

// path to post the images and trigger the pipeline
app.post('/meshroom-pipeline', async function (req, res) {
  let image_count = req.query.images;
  const request_id = Math.round(Math.random() * 10_000_000);
  const upload_folder = uploadPath + request_id;
  console.log('POST request to the pipeline with ' + image_count + ' images');
  await fs.mkdir(upload_folder);
  console.log("New folder created!");
  let received_images = 0; // number of images fully received
  
  req.pipe(req.busboy); // Pipe it trough busboy
  req.busboy.on('file', (fieldname, file, filename) => {
    console.log(`Upload of '${filename}' started`);

    // Create a write stream of the new file
    const fstream = fs.createWriteStream(path.join(upload_folder, filename));
    // Pipe it trough
    file.pipe(fstream);

    // On finish of the upload
    fstream.on('close', async () => {
      received_images++;
      console.log("Received images = " + received_images);
      console.log(`Upload of '${filename}' finished`);
      // res.redirect('back');
      if (received_images == image_count) {
        console.log("All images received!");
        current_modelling_processes.set(request_id.toString(), true);
        const response = {
          request_id: request_id,
          response: '3D creation in Progress! This can take from a few minutes to several hours. \n You can either wait on the website,' +
            ' or come back later and request the 3D model with id: ' + request_id + '. In that case, please write it down to remember.'
        }
        // response is send to tell frontend of successfull initiation of the 3D-modelling-pipeline
        res.json(response);
        // waits until meshromm finished rendering 
        await initiateMeshroomPipeline(request_id);
        const options = {
          binary: true
        }
        let model_output = path.join(__dirname, 'Meshroom-AliceVision/output/output' + request_id);
        // convert .obj to .glb with node module (obj2gltf)
        obj2gltf(model_output + '/texturedMesh.obj', options)
          .then(async function (glb) {
            fs.writeFileSync(model_output + '/model' + request_id + '.glb', glb);
            // after .glb file got written do disk, the model_id will be removed from the current_working_buffer 
            current_modelling_processes.delete(request_id.toString());
            console.log('Pipeline Callback finished! \n Ready to send 3D-model-file to requester with output_file_id: ' + request_id);
          });
      }
    });
  });
});

app.post('/', function (req, res) {
  console.log('POST request to the homepage');
  res.send('POST request to the homepage');
});

// start node-child-process to run the meshroom-pipeline asynchronously
async function initiateMeshroomPipeline(request_id) {
  // const output_dir_length = await readDirLength();
  // output_folder_length = output_dir_length;

  console.log('3D model computation in progress...');
  const meshrom_exe_path = path.join(__dirname, 'Meshroom-AliceVision\\Pipeline_2021\\Meshroom-2021.1.0\\meshroom_batch.exe');
  let input_path;
  // meshroom will scip building 3D model from scratch, because image-signatures already known --> safes time
  if (testing) {
    input_path = path.join(__dirname, 'Meshroom-AliceVision\\input\\dataset_monstree-master\\mini3');
  } else {
    input_path = path.join(__dirname, 'uploaded-images/images' + request_id);
  }
  // const output_path = path.join(__dirname, 'Meshroom-AliceVision\\output\\output' + (output_dir_length + 1));
  const output_path = path.join(__dirname, 'Meshroom-AliceVision\\output\\output' + request_id);

  const execFile = util.promisify(require('child_process').execFile);
  async function startMeshroom() {
    try {
      const { stdout, stderr } = await execFile(meshrom_exe_path, ['--input', input_path, '--output', output_path]);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    } catch (err) {
      console.error(err);
    }
  }
  return startMeshroom();
  // minimum required args are 'input' and 'output'
  /* const child = await execFile(meshrom_exe_path, ['--input', input_path, '--output', output_path], (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
    console.log(stdout);
    console.error(stderr);
  }); */
  /*   use event hooks to provide a callback to execute when data are available: --> somehow prints data to console only when 
    process finished */
  // child.stdout.on('data', function(data) {
  //   console.log(data.toString()); 
  // });
  /*   The exit event isn't guaranteed to be fired. For instance, if the process failed to spawn,
   the error event is called. However, if the process did spawn and another error is caused, both handlers 
   will be called. 
   */
  /* child.on('exit', function() {
    console.log("Pipeline Finished rendering 3D model!");
  }); */
}

// for https
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')), // 'server.key'
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')) // 'server.cert'
}

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`3D modelling app listening at https://localhost:${port}`);
});

// async function readDirLength() {
//   try {
//     const files = await fs.promises.readdir(path.join(__dirname, '/Meshroom-AliceVision/output'));
//     return files.length;
//   } catch (err) {
//     console.error('Error occured while reading directory!', err);
//   }
// }


