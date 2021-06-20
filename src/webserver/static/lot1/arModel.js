class Hotspot {
    text = "";
    rPosition = new THREE.Vector3();
    position = new THREE.Vector3();
    normal = new THREE.Vector3();

    domButton = null;
    domTextBox = null;

    #animLength = 5;
    #curAnim = 5;
    #alpha = 0;
    #visible = false;
    constructor(dbHotspot) {
        this.text = dbHotspot.text;

        let p = dbHotspot.position.split(" ");
        this.position.x = +p[0];
        this.position.y = +p[1];
        this.position.z = +p[2];

        let n = dbHotspot.normal.split(" ");
        this.normal.x = +n[0];
        this.normal.y = +n[1];
        this.normal.z = +n[2];

        this.createDOMElement();
    }

    createDOMElement() {
        let root = document.getElementById("infoBox"); //TODO: find better solution
        if (!this.domButton) {
            this.domButton = document.createElement("button");
            this.domButton.id = 'p';
            root.appendChild(this.domButton);
        }
        if (!this.domTextBox) {
            this.domTextBox = document.createElement("div");
            this.domTextBox.id = 'tb';
            this.domTextBox.innerHTML = this.text;
            this.domButton.appendChild(this.domTextBox);
        }
    }

    update() {
        if (this.#curAnim < this.#animLength) ++this.#curAnim;
    }

    interpolation(delta) {
        let animScale = this.#curAnim / this.#animLength;
        if (this.#curAnim < this.#animLength) animScale += delta;

        if (this.#visible) this.#alpha = animScale;
        else this.#alpha = 1 - animScale;

        this.#updateDOM();
    }

    #updateDOM() {
        this.domButton.style.backgroundColor = 'rgba(0, 140, 180, '+ this.#alpha + ')';
        if (this.#visible) {
            this.domTextBox.style.visibility = 'visible';
        }
        else {
            this.domTextBox.style.visibility = 'collapsed';
        }
    }

    updateScreenPosition(position) {
        this.domButton.style.left = (50 * position.x) + 50 + '%';
        this.domButton.style.top = (-50 * position.y) + 50 + '%';
    }

    setVisibility(visible) {
        if (visible !== this.#visible){
            this.#curAnim = 0;
        }
        this.#visible = visible;
    }
}


class ArModel {
    name = "";
    hotspots = [];
    src = "";
    alt = "";
    location = {
        latitude: 0,
        longitude: 0,
    };

    markerMetrics = {
        distance: 0,
        rotation: 0,
        scaling: 1
    }

    relativeRotation = 0;

    mesh = null;
    offset = new THREE.Vector3();

    #timeStep = 1 / 30;
    #curTime = performance.now();
    #accDelta = 0;

    #raycaster = new THREE.Raycaster();

    constructor(databaseModel) {
        this.name = databaseModel.name;
        this.src = databaseModel.src;
        this.alt = databaseModel.alt;
        this.location.latitude = databaseModel.location.latitude ;
        this.location.longitude = databaseModel.location.longitude;
        this.markerMetrics.distance = databaseModel.marker.distance;
        this.markerMetrics.rotation = databaseModel.marker.rotation;
        this.markerMetrics.scaling = databaseModel.marker.scaling;

        for (let h in databaseModel.hotspots) {
            this.hotspots.push(new Hotspot(h));
        }
    }

    loadModelFromSource(scene, onLoaded) {
        const loader = new THREE.GLTFLoader();
        let _this = this;
        loader.load(this.src, function (gltf) {
            _this.mesh = gltf.scene;
            scene.add(_this.mesh);
            onLoaded();
        });
    }

    update(pose, camera, cameraPosition) {
        if (!this.mesh) return;

        this.#updateModel(pose);
        this.#updateHotspots(camera, cameraPosition)
        let prevTime = this.#curTime;
        // max 3 updates to counteract death cycle
        for (let i = 0; i < 3 && this.#accDelta >= this.#timeStep; ++i) {
            for (let hs in this.hotspots){
                hs.update();
            }
            this.#accDelta -= this.#timeStep;
        }

        this.#curTime = performance.now();
        let curDelta = this.#accDelta + this.#curTime - prevTime;

        let delta = 1.0;
        if (curDelta <= this.#timeStep) {
            delta = this.#accDelta / this.#timeStep;
        }

        for (let hs in this.hotspots){
            hs.interpolation(delta);
        }
        this.#curTime = performance.now();
        this.#accDelta += this.#curTime - prevTime;
    }

    #updateModel(pose){
        this.mesh.matrix.fromArray(pose.transform.matrix);
        this.mesh.matrix.decompose(this.mesh.position, this.mesh.quaternion, this.mesh.scale);
        this.mesh.translateY(this.offset.y);
        this.mesh.rotation.y += this.relativeRotation;
        this.mesh.translateX(this.markerMetrics.distance);
    }

    #updateHotspots(camera, cameraPosition) {
        for (let hs of this.hotspots) {

            // correct hotspot position relative to mesh orientation and world position
            hs.position = hs.rPosition.clone();
            hs.applyQuaternion(this.mesh.quaternion);
            hs.add(this.mesh.position);

            // project world position to screen space
            let screenPos = hs.position.clone();
            screenPos.project(camera);
            hs.updateScreenPosition(screenPos);

            // raycast
            let dir = cameraPosition.clone().sub(hs.position).normalize();
            this.#raycaster.set(hs.position, dir);
            const intersections = this.#raycaster.intersectObject(box);
            const intersects = (intersections.length) > 0;

            hs.setVisibility(intersects)
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

