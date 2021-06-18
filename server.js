const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const app = express();
const port = 8080;

var output_folder_length;

// REST interface
app.get('/',  async function (req, res) {
    console.log('GET request to the homepage');
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/object_files/AnyConv.com__texturedMesh.glb', function (req, res) {
  console.log('GET request to the 3D object');
  res.sendFile(path.join(__dirname, 'object_files/AnyConv.com__texturedMesh.glb'));
});

app.post('/meshroom-pipeline', async function (req, res) {
    console.log('POST request to the pipeline');
    // res.send('POST request to the pipeline');
    await startMeshroomPipeline();
    console.log('Pipeline Callback finished!');
    res.sendFile(path.join(__dirname, 'Meshroom-AliceVision/output/output' + output_folder_length + '/texturedMesh.obj'));
});
app.post('/', async function (req, res) {
  console.log('POST request to the homepage');
  res.send('POST request to the homepage');
});

async function readDirLength() {
  try {
    const files = await fs.promises.readdir(path.join(__dirname,'/Meshroom-AliceVision/output'));
    return files.length;
  } catch (err) {
    console.error('Error occured while reading directory!', err);
  }
}

// start node-child-process to run the meshroom-pipeline asynchronously
async function startMeshroomPipeline() {
  const output_dir_length = await readDirLength();
  output_folder_length = output_dir_length;

  console.log('3D model computation in progress...');
  const meshrom_exe_path = path.join(__dirname, 'Meshroom-AliceVision\\Pipeline_2021\\Meshroom-2021.1.0\\meshroom_batch.exe');
  const input_path = path.join(__dirname, 'Meshroom-AliceVision\\input\\dataset_monstree-master\\mini3');
  const output_path = path.join(__dirname, 'Meshroom-AliceVision\\output\\output' + (output_dir_length + 1));

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


app.listen(port, () => {
    console.log(`3D modelling app listening at http://localhost:${port}`);
  });
