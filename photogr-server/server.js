const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const util = require('util'); // promisifying functions
const https = require('https');
// const cors = require('cors');
const busboy = require('connect-busboy'); // Middleware to handle the image upload https://github.com/mscdex/connect-busboy
const obj2gltf = require('obj2gltf'); // converting .obj to .gltf/.glb
const shell = require('shelljs'); // to run commands on the shell for the meshroom-docker-container
const fetch = require('node-fetch'); // library for http calls --> newer than 'require'-module
const FormData = require('form-data');

const app = express();
const port = 8080;

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "text/html");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// module to manage upload of images, max 2MiB buffer --> images are directly written to disk
app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

// default path
app.get('/', function (req, res) {
  console.log('GET request to the homepage');
  res.sendFile(path.join(__dirname, 'index.html'));
});


// skips meshroom-3D-model-generation, by using known images to meshromm-cache --> imidiate finish
const testing = false;
// true activates local 3D-modelling pipeline using a node-child-process and running meshroom.exe inside
// false will connect with local docker-container that runs meshroom and has far more implemented configs
const local_pipeline = true;

// contains current 3D-model-creation-tasks in progress running through meshroom.exe
let current_modelling_processes = new Map();

let inputPath = '';
if (local_pipeline) inputPath = path.join(__dirname, 'Meshroom-AliceVision/input/uploaded-images/user/'); // Register the upload path
else inputPath = '../photogrammetry/img_in/';
fs.ensureDir(inputPath); // Make sure that he upload path exits

// path to request whether a 3D model generation is already finished
app.get('/pipeline/model-status', function (req, res) {
  const userId = req.query.userId;
  const modelName = req.query.modelName;
  const request_id = userId + '-' + modelName;
  console.log('GET request to the 3D object with id: ' + request_id);
  if (current_modelling_processes.has(request_id.toString())) {
    res.status(200);
    res.send("Modelling still in progress, this can take a few minutes.");
  } else {
    try {
      let output_path;
      if (local_pipeline) /* output_path = path.join(__dirname, 'Meshroom-AliceVision/output/output' + model_id + '/model' + model_id + '.glb'); */
        output_path = '../src/webserver/static/saved-models/user/' + userId + '/' + modelName + '/' + modelName + '.glb';
      else output_path = '../photogrammetry/model/' + userId + '/' + modelName + '/model.glb';
      if (fs.existsSync(output_path)) {
        console.log("Requested model exists in directory.");
        res.status(201);
        // res.sendFile(output_path + "/texturedMesh.obj"); // for now frontend requests webserver directory for model from model-viewer html-element
        res.send("3D model created and saved in database! Ready to be fetched under ID: " + request_id);
      } else {
        console.log("Requested model does not exist in directory.");
        res.status(404);
        res.send("Model with " + request_id + " not found. Please check model-ID.");
      }
    } catch (e) {
      console.log("An error occurred.");
    }
  }
});

// path to post the images and trigger the pipeline
app.post('/pipeline/start', async function (req, res) {
  const image_count = req.query.images;
  const userId = req.query.userId;
  const modelName = req.query.modelName;
  const request_id = userId + '-' + modelName;

  const upload_folder_user = inputPath + userId;
  const upload_folder_model = inputPath + userId + '/' + modelName + '/';
  console.log('POST request to the pipeline with ' + image_count + ' images');
  if (!fs.ensureDir(upload_folder_user)) {
    await fs.mkdir(upload_folder_user);
  }
  await fs.mkdir(upload_folder_model);
  console.log("New folder created!");
  let received_images = 0; // number of images fully received

  req.pipe(req.busboy); // Pipe it trough busboy
  req.busboy.on('field', function (fieldname, val) {
    req.body[fieldname] = val;
  });
  req.busboy.on('file', (fieldname, file, filename) => {
    console.log(`Upload of '${filename}' started`);

    // Create a write stream of the new file
    const fstream = fs.createWriteStream(path.join(upload_folder_model, filename));
    // Pipe it trough
    file.pipe(fstream);

    // On finish of the upload
    fstream.on('close', async () => {
      received_images++;
      console.log("Received images = " + received_images);
      console.log(`Upload of '${filename}' finished`);
      // res.redirect('back');
      if (received_images == image_count) {
        const compressed = JSON.parse(req.body.compressed);
        const preview = JSON.parse(req.body.preview);

        console.log("All images received!");
        current_modelling_processes.set(request_id.toString(), true);
        const response = {
          request_id: request_id,
          response: 'All images reveived and 3D creation in Progress! This can take from a few minutes to several hours. \n You can either wait on the website,' +
            ' or come back later and look up your models under add-Annotaion-page.'
        }
        // response is send to tell frontend of successfull upload of all images and initiation of the 3D-modelling-pipeline
        res.json(response);

        if (local_pipeline) {
          current_modelling_processes.set(request_id.toString(), true);
          // waits until meshromm finished rendering 
          await initiateMeshroomPipeline(userId, modelName, upload_folder_model);
          const options = {
            binary: true
          }
          let model_output = path.join(__dirname, 'Meshroom-AliceVision/output/user/' + userId + '/' + modelName);
          // let model_output = '../src/webserver/static/saved-models/' + req.query.userId + '/' + req.query.modelName;
          if(!fs.ensureDir(model_output + '/texturedMesh.obj')) {
            console.log("Something went wrong during local-pipeline-computation!");
            current_modelling_processes.delete(request_id.toString());
            return;
          }
          // after rendering, convert .obj to .glb with node module (obj2gltf)
          obj2gltf(model_output + '/texturedMesh.obj', options)
            .then(async function (glb) {
              fs.writeFileSync(model_output + '/' + modelName + '.glb', glb);
              // after .glb file got written do disk, the model_id will be removed from the current_working_buffer 
              // current_modelling_processes.delete(request_id.toString());
              console.log('Pipeline Callback finished! \n Ready to send 3D-model-file to requester with output_file_id: ' + request_id);
              // send model(.glb) with user/meta data to the main-webserver, where the .glb is stored locally in directory (temp solution)
              sendModelFile(userId, modelName, request_id);
            });
        } else {
          initiateDockerPipeline(userId, modelName, request_id, compressed, preview);
          // sendModelFile(userId, modelName);
        }
      }
    });
  });
});

// sends .glb file to webserver, where the file is saved locally in directory
function sendModelFile(userId, modelName, request_id) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; // allows calls to self-certificated https servers
  console.log("Sending .glb file to main server");
  let input;
  if (local_pipeline) {
    input = path.join(__dirname, 'Meshroom-AliceVision/output/user/' + userId + '/' + modelName + '/' + modelName + '.glb');
  } else {
    input = '../photogrammetry/model/' + userId + '/' + modelName + '/model.glb';
  }
  console.log(input)
  // console.log(fs.ensureDirSync(input))

  const form = new FormData();
  form.append('userId', userId);
  form.append('modelName', modelName);
  form.append('model', fs.createReadStream(input));

  fetch('https://localhost:3000/models/upload-model-file', { method: 'POST', body: form })
    .then(res => res.json())
    .then(json => console.log(json))
    .then(() => {
      process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
      current_modelling_processes.delete(request_id.toString());
    });
}

// start node-child-process to run the meshroom-pipeline asynchronously
async function initiateMeshroomPipeline(userId, modelName, upload_folder_model) {
  console.log('Local 3D model computation in progress...');

  const meshrom_exe_path = path.join(__dirname, 'Meshroom-AliceVision/Pipeline_2021/Meshroom-2021.1.0/meshroom_batch.exe');
  let input_path;
  // if testing, meshroom will scip building 3D model from scratch, because image-signatures already known --> safes time
  if (testing) {
    // input already known to meshromm-cache --> skipping rendering-time
    input_path = path.join(__dirname, 'Meshroom-AliceVision/input/dataset_monstree-master/mini3');
  } else {
    // real input path with freshly send images from frontend
    input_path = upload_folder_model;
  }

  const output_path_user = path.join(__dirname, 'Meshroom-AliceVision/output/user/' + userId);
  const output_path_model = output_path_user + '/' + modelName;
  if (!fs.ensureDir(output_path_user)) {
    await fs.mkdir(output_path_user);
  }
  await fs.mkdir(output_path_model);

  const execFile = util.promisify(require('child_process').execFile);
  async function startMeshroom() {
    try {
      const { stdout, stderr } = await execFile(meshrom_exe_path, ['--input', input_path, '--output', output_path_model]);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    } catch (err) {
      console.error(err);
    }
  }
  return startMeshroom();
}

function initiateDockerPipeline(userId, modelName, request_id, compressed, preview) {
  console.log('Docker 3D model computation in progress... Parameter: c=' + compressed + ', p=' + preview);

  let options = ''
  // -c --> compresses images before pipeline start
  if (compressed) options += ' -c'
  // -p is preview option --> saves preview in [user]/[modelname], also generates complete .glb-file which went through whole pipeline
  if (preview) options += ' -p'
  // skips the steps that use GPU --> for preview option, or if GPU is not available/doesn't supported, skips last pipeline steps
  // having -p option and preview.mg at the same time, doesn't make sense, because the fully generated model will be the same as the firstly generated preview-model
  const command_withoutGPU = 'docker exec photogrammetry photogrammetry' + options + ' -u ' + userId + ' ' + modelName + ' preview.mg' // use until nvidia gpu bug fixed (fehler wegen nvidia gpu on windows)
  const command_withGPU = 'docker exec photogrammetry photogrammetry -u ' + userId + ' ' + modelName;

  // TODO: extra pipeline mit graphen am ende um z.b. background-noise zu entfernen kommt noch --> am ende des command einfügen dann

  console.log("Start docker-pipeline");
  if (shell.exec(command_withoutGPU).code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
  }
  console.log("docker pipeline finished");
  // console.log("sending files")
  sendModelFile(userId, modelName, request_id);
}

// for https
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')), // 'server.key'
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')) // 'server.cert'
}

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`3D modelling app listening at https://localhost:${port}`);
});



