
//{ region Setup
var scene, camera, light, renderer;
var clock;
var mouse = new THREE.Vector2();

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight * 1.0;

function init()
{
	// Create Scene
	scene = new THREE.Scene();
	
	// Create Camera
	camera = new THREE.PerspectiveCamera(90, canvasWidth / canvasHeight, 0.1, 10000);
	camera.position.y = 50;
	camera.position.z = 10;
	
	// Create Light
	light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(-30, 60.0, 50);
	scene.add(light);
	
	scene.add(new THREE.AmbientLight(0xffffff, 0.2));
	
	// Create Clock
	clock = new THREE.Clock();
	clock.start();
	
	// Create Renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(canvasWidth, canvasHeight);
	document.body.appendChild(renderer.domElement);
	renderer.domElement.setAttribute("id", "webGL");
	
	// Event Functions
	renderer.domElement.addEventListener('mousemove', onMouseMove);
	window.addEventListener('resize', onWindowResize, false);
	
	Start();
	requestAnimationFrame(animate);
}

function animate(time)
{
	var deltaTime = clock.getDelta();
	Update(time/1000, deltaTime)
	
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
var isReady = false;
function animate(time)
{
	THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
		isReady = loaded == total;
	};

	if (isReady)
	{
		var deltaTime = clock.getDelta();
		Update(time/1000, deltaTime)
		
		renderer.render(scene, camera);
	}
	requestAnimationFrame(animate);
}

function onWindowResize()
{
	camera.aspect = canvasWidth / canvasHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize(canvasWidth, canvasHeight);
}

function onMouseMove(e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}

var format = '.png';
var skyboxUrls = [
	'right' + format,
	'left' + format,
	'top' + format,
	'bottom' + format,
	'back' + format,
	'front' + format
];

var car, car2;
var panneaux = [];
function Start()
{
	
	loadSkybox("img/Skybox/storm/", skyboxUrls);
	
	var roadTexture = new THREE.TextureLoader().load('Textures/road.png');
	var roadMaterial = new THREE.MeshPhongMaterial( {map:roadTexture, color: 0xffffff, specular: 0x555555, shininess: 0 }  );
	roadMaterial.map.wrapS = THREE.RepeatWrapping;
	roadMaterial.map.repeat.set(15, 1);
    
	var road = new THREE.Mesh(new THREE.PlaneGeometry(12388, 256), roadMaterial);
	road.rotation.x = -Math.PI/2;
	scene.add(road);
	
	var grassTexture = new THREE.TextureLoader().load('Textures/grass.png');
	var grassMaterial = new THREE.MeshPhongMaterial( {map:grassTexture, color: 0xffffff, specular: 0x555555, shininess: 0 }  );
	grassMaterial.map.wrapS = THREE.RepeatWrapping;
	grassMaterial.map.wrapT = THREE.RepeatWrapping;
	grassMaterial.map.repeat.set(45, 15);
    
	var grass = new THREE.Mesh(new THREE.PlaneGeometry(12388, 4096), grassMaterial);
	grass.rotation.x = -Math.PI/2;
	grass.position.z = 2176;
	scene.add(grass);
	var grass2 = grass.clone();
	grass2.position.z = -2176;
	scene.add(grass2);
	
	
	// Load car models 
	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath( 'models/' );
	mtlLoader.load( 'BMW.mtl', function( materials ) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath( 'models/' );
		objLoader.load( 'BMW.obj', function ( object ) {

			car = object.clone();
			// reset wheel pivot
			for(i = 0; i < 8; i++)
			{
				var wheel = car.children[i];
				var box = new THREE.Box3().setFromObject(wheel);
				box.getCenter(wheel.position); // this re-sets the mesh position
				wheel.position.multiplyScalar(-1);
				wheel.geometry.translate(wheel.position.x, wheel.position.y, wheel.position.z);
				wheel.position.multiplyScalar(-1);
			}
			car.position.set(6444, 0, 50);
			// car.position.set(2000, 0, 50);
			car.scale.set(0.8, 0.8, 0.8);
			
			camera.position.set(-15, 55, 0);
			camera.rotation.set(0,Math.PI/2,0);
			car.add(camera);
			scene.add(car);
			
			car2 = car.clone();
			car2.position.x *= -1;
			car2.position.z *= -1;
			car2.rotation.y = Math.PI;
			scene.add(car2);
			
			console.log(car);
			
		});
	}, function onProgress(){});
	
	
	// Chargement des textures des différent panneaux
	var panneauTextures = [];
	var planeMaterials = [];
	panneauTextures[0] = new THREE.TextureLoader().load('Textures/Panneaux/1.png');
	panneauTextures[1] = new THREE.TextureLoader().load('Textures/Panneaux/2.png');
	panneauTextures[2] = new THREE.TextureLoader().load('Textures/Panneaux/3.png');
	panneauTextures[3] = new THREE.TextureLoader().load('Textures/Panneaux/4.png');
	panneauTextures[4] = new THREE.TextureLoader().load('Textures/Panneaux/A.png');
	panneauTextures[5] = new THREE.TextureLoader().load('Textures/Panneaux/B.png');
	for (i = 0; i < 6; i++)
	{
		planeMaterials[i] = new THREE.MeshLambertMaterial({map:panneauTextures[i], color: 0xffffff, emissive: 0x1010cc, emissiveIntensity: 0.4});
		planeMaterials[i].map.wrapS = THREE.RepeatWrapping;
		planeMaterials[i].map.wrapT = THREE.RepeatWrapping;
		planeMaterials[i].transparent = true;
	}

	// Ajout des panneaux
	var objLoader = new THREE.OBJLoader();
	objLoader.load( "models/pannal.obj", function(object){
		object.scale.set(15,15,15);
		
		for (i = 0; i < 10; i++)
		{
			panneaux[i] = object.clone();
			var plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), planeMaterials[i % 6]);
			plane.rotation.y = Math.PI/2;
			plane.position.y = 5;
			plane.position.x = 0.13;
			plane.position.z = 0.05;
			
			panneaux[i].children[0].add(plane);
			panneaux[i].position.z = i*50;
			scene.add(panneaux[i]);
		}
		
		panneaux[0].position.set(5000,0,-128);
		panneaux[6].position.set(4500,0,-128);
		panneaux[1].position.set(4200,0,128);
		panneaux[7].position.set(3700,0,-128);
		panneaux[2].position.set(3300,0,128);
		panneaux[3].position.set(2800,0,128);
		panneaux[8].position.set(2300,0,-128);
		panneaux[9].position.set(1800,0,128);
		panneaux[5].position.set(0,0,128);
    });
	
}


function loadSkybox(path, urls)
{
	scene.background = new THREE.CubeTextureLoader()
	.setPath(path)
	.load(urls);
}

var carDirection = new THREE.Vector3(-1, 0, 0);
var carDirection2 = new THREE.Vector3(1, 0, 0);

var stage = 1;
function Update(time, deltaTime)
{	
	if (isReady == false)
		return;

	if (car !== undefined && car2 !== undefined)
	{
		switch (stage)
		{
			case 1:
				stage1(deltaTime);
				break;
				
			case 2:
				stage1(deltaTime);
				car.rotation.y -= deltaTime/10;
				break;
				
			case 3:
				stage3(time, deltaTime);
				break;
		}
		
		panneaux[4].position.set(car2.position.x, car2.position.y+25, car2.position.z);
		
		// Moment where the car derive
		if (stage == 1 && car.position.x < 1000)
			stage = 2;
		
		// collision happen
		if (stage == 2 && car.position.distanceTo(car2.position) < 150)
			stage = 3;
		
		drunkCamera(time);
	}
}

function stage1(deltaTime)
{
	// move wheels
	for(i = 0; i < 8; i++)
	{
		car.children[i].rotation.z += deltaTime*50;
		car2.children[i].rotation.z -= deltaTime*50;
	}
	
	car.translateOnAxis(carDirection, deltaTime*500);
	car2.position.x += deltaTime*500;
}


var slower = 1;
var currentTime = 0;
function stage3(time, deltaTime)
{
	currentTime += deltaTime;
	if (currentTime > 4)
		slower += Math.pow(time, 2) * deltaTime/50;
	if (currentTime > 7)
		slower += Math.pow(time, 2) * deltaTime/50;
	if (currentTime < 8)
	{	
		car.rotation.x -= deltaTime*4 / slower;
		car.position.y = 50 + (Math.sin(time) + 2) *25/slower;
		car.position.z -= deltaTime*200/slower;
	}
	if (currentTime > 12)
		ResetScene();
	
	car2.position = car.position.clone();
	car2.position.z *=-1;
}

function drunkCamera(time)
{
	camera.rotation.x = Math.sin(time/2)*Math.PI/50;
	camera.rotation.z = Math.sin(time)*Math.PI/20;
}


function ResetScene()
{
	location.reload();
}


