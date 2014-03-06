#pragma strict

var ZombiePrefab : GameObject;
var spawning : boolean;
var spawnDelay : float;

private var lastSpawnTime : float;

private var leftBound : float;
private var rightBound : float;
private var topBound : float;
private var bottomBound : float;

function Start() {
	lastSpawnTime = Time.time;
	leftBound = transform.position.x - transform.localScale.x/2;
	rightBound = transform.position.x + transform.localScale.x/2;
	topBound = transform.position.y + transform.localScale.y/2;
	bottomBound = transform.position.y - transform.localScale.y/2;
	spawning = true;
}

function Update() {
if(spawning)
	if ((Time.time - lastSpawnTime) > spawnDelay) {
		var NewZombieLoc : Transform = transform;
		NewZombieLoc.position.x = Random.Range(leftBound,rightBound);
		NewZombieLoc.position.y = Random.Range(bottomBound,topBound);
		var NewZombie : GameObject = Instantiate(ZombiePrefab, NewZombieLoc.position, transform.rotation);
		lastSpawnTime = Time.time;
	}
}