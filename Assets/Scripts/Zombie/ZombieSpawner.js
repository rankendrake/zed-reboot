#pragma strict

var ZombiePrefab : GameObject;

var spawnDelay : float;

private var lastSpawnTime : float;


function Start() {
	lastSpawnTime = Time.time;
}

function Update() {
	if ((Time.time - lastSpawnTime) > spawnDelay) {
		var NewZombie : GameObject = Instantiate(ZombiePrefab, transform.position, transform.rotation);
		lastSpawnTime = Time.time;
	}
}