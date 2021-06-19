
class ArModel {
    constructor() {
        this.name = "";
        this.hotspots = [];
        this.src = "";
        this.alt = "";
        this.location = {
            latitude: 0,
            longitude: 0,
        };

        this.markerMetrics = {
            distance: 0,
            rotation: 0,
            scaling: 1
        }

        this.relativeRotation = 0;

        this.mesh = null;
        this.offset = new THREE.Vector3();

        this.timeStep = 1 / 30;
        this.curTime = performance.now();
        this.accDelta = 0;
    }

    update(pose, cameraPosition) {

        let prevTime = this.curTime;
        // max 3 updates to counteract death cycle 
        for (let i = 0; i < 3 && this.accDelta >= this.timeStep; ++i) {
            //updates TODO
            this.accDelta -= this.timeStep;
        }


        this.curTime = performance.now();
        this.accDelta += this.curTime - prevTime;

        let delta = 1.0;
        if (this.accDelta <= this.timeStep) {
            delta = this.accDelta / this.timeStep;
            //interpolations TODO
        }
        else {

        }
    }

    computeOffsetFromMesh() {
        if (mesh) {
            let size = new THREE.Vector3();
            this.mesh.geometry.computeBoundingBox();
            this.mesh.geometry.center();
            this.mesh.geometry.boundingBox.getSize(size);
            this.offset.y = size.y / 2;
        }
    }
}

class Hotspot {
    constructor() {
        this.text = "";
        this.rPosition = new THREE.Vector3();
        this.position = new THREE.Vector3();
        this.normal = new THREE.Vector3();

        this.domButton = null;
        this.domTextBox = null;
        this.visible = false;
        this.animLength = 5;
        this.alpha = 0;

    }

    createDOMElement() {

    }

    update() {

    }

    interpolation(delta) {

    }

    updateDOM() {

    }
}