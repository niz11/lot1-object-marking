class Hotspot {
    text = "";
    rPosition = new THREE.Vector3();
    position = new THREE.Vector3();
    normal = new THREE.Vector3();

    domButton = null;
    domTextBox = null;

    #animLength = 30;
    #curAnim = 30;
    #alpha = 0;
    #visible = false;

    constructor() {
        this.#createDOMElement();
    }

    fromDB(dbHotspot) {
        this.text = dbHotspot.text;

        let p = dbHotspot.position.split(" ");
        this.position.x = +p[0];
        this.position.y = +p[1];
        this.position.z = +p[2];

        let n = dbHotspot.normal.split(" ");
        this.normal.x = +n[0];
        this.normal.y = +n[1];
        this.normal.z = +n[2];
    }

    #createDOMElement() {
        let root = document.getElementById("infoBox"); //TODO: find better solution ?
        if (!this.domButton) {
            this.domButton = document.createElement("button");
            this.domButton.className = 'p';
            root.appendChild(this.domButton);
        }
        if (!this.domTextBox) {
            this.domTextBox = document.createElement("div");
            this.domTextBox.className = 'tb';
            this.domTextBox.innerHTML = this.text;
            root.appendChild(this.domTextBox);
        }
    }

    updateDOMElement() {
        if (this.domTextBox) {
            this.domTextBox.innerHTML = this.text;
        }
    }

    update() {
        if (this.#curAnim < this.#animLength) ++this.#curAnim;
    }

    interpolation(delta) {
        let animScale = this.#curAnim / this.#animLength;
        if (this.#curAnim < this.#animLength) animScale += delta / this.#animLength;

        if (this.#visible) this.#alpha = animScale;
        else this.#alpha = 1 - animScale;

        this.#updateDOM();
    }

    #updateDOM() {
        this.domButton.style.backgroundColor = 'rgba(0, 140, 180, '+ this.#alpha  + ')';
        this.domTextBox.style.backgroundColor = 'rgba(0, 0, 0, '+ this.#alpha * 0.6  + ')';
        this.domTextBox.style.color = 'rgba(255, 255, 255, '+ this.#alpha + ')';
        // if (this.#visible) {
        //     this.domTextBox.style.visibility = 'visible';
        //     this.domButton.style.visibility = 'visible';
        // }
        // else {
        //     this.domTextBox.style.visibility = 'hidden';
        //     this.domButton.style.visibility = 'hidden';
        // }
    }

    updateScreenPosition(position) {
        this.domButton.style.left = (50 * position.x) + 50 + '%';
        this.domButton.style.top = (-50 * position.y) + 50 + '%';
        this.domTextBox.style.left = (50 * position.x) + 50 + '%';
        this.domTextBox.style.top = (-50 * position.y) + 50 + '%';
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

    #cen = new THREE.Vector3();


    constructor(databaseModel) {
        this.name = databaseModel.modelName;
        this.src = databaseModel.src;
        this.alt = databaseModel.alt;
        this.location.latitude = databaseModel.location.latitude ;
        this.location.longitude = databaseModel.location.longitude;
        this.markerMetrics.distance = databaseModel.marker.distance;
        this.markerMetrics.rotation = databaseModel.marker.rotation;
        this.markerMetrics.scaling = databaseModel.marker.scaling;

        for (let h of databaseModel.hotspots) {
            let hs = new Hotspot();
            hs.fromDB(h);
            this.hotspots.push(hs);
        }
    }

    loadModelFromSource(scene, onLoaded) {
        const loader = new THREE.GLTFLoader();
        let _this = this;
        loader.load(this.src, function (gltf) {
            _this.mesh = gltf.scene;
            _this.mesh.visible = false;

            for (let c of _this.mesh.children) {
                c.material.wireframe = true;
            }

            scene.add(_this.mesh);
            onLoaded();
        });
    }

    update(pose, camera, cameraPosition) {
        if (!this.mesh) return;
        // this.mesh.visible = true;
        this.#updateModel(pose);
        this.#updateHotspots(camera, cameraPosition)
        let prevTime = this.#curTime;
        // max 3 updates to counteract death cycle
        for (let i = 0; i < 3 && this.#accDelta >= this.#timeStep; ++i) {
            for (let hs of this.hotspots){
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

        for (let hs of this.hotspots){
            hs.interpolation(delta);
        }
        this.#curTime = performance.now();
        this.#accDelta += this.#curTime - prevTime;
    }

    #updateModel(pose){
        this.mesh.matrix.fromArray(pose.transform.matrix);
        this.mesh.matrix.decompose(this.mesh.position, this.mesh.quaternion, this.mesh.scale);
        this.mesh.position.add(this.#cen);
        this.mesh.translateY(this.offset.y);
        this.mesh.rotation.y += this.relativeRotation;
        this.mesh.translateZ(-this.markerMetrics.distance);

    }

    #updateHotspots(camera, cameraPosition) {
        for (let hs of this.hotspots) {

            // correct hotspot position relative to mesh orientation and world position
            // hs.position = hs.rPosition.clone();
            // hs.position.applyQuaternion(this.mesh.quaternion);
            // hs.position.add(this.mesh.position);

            hs.position = hs.rPosition.clone();
            this.mesh.localToWorld(hs.position);

            // project world position to screen space
            let screenPos = hs.position.clone();
            screenPos.project(camera);
            hs.updateScreenPosition(screenPos);

            let camPos = new THREE.Vector3();
            let camQua = new THREE.Quaternion();
            let camSca = new THREE.Vector3();
            camera.matrix.decompose(camPos, camQua, camSca);

            // raycast
            let dir = camPos.clone().sub(hs.position).normalize();
            this.#raycaster.set(hs.position, dir);
            const intersections = this.#raycaster.intersectObjects(this.mesh.children, true);
            const intersects = (intersections.length) > 0;

            // const box = new THREE.Box3().setFromObject( this.mesh );
            // const intersects = this.#raycaster.ray.intersectsBox( box );



            hs.setVisibility(!intersects)
        }
    }

    computeOffsetFromMesh() {
        if (this.mesh) {
            console.log(this.mesh);
            let bbox = new THREE.Box3().setFromObject(this.mesh);
            this.#cen = bbox.getCenter(new THREE.Vector3());
            this.#cen.multiplyScalar(-1);
            let size = bbox.getSize(new THREE.Vector3());
            this.offset.y = size.y / 2;
            console.log(this.#cen);
            console.log(size);
        }
    }
}

export {ArModel, Hotspot};