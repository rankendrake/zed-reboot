#pragma strict

private var zombieResources : ZombieResources;

function Start() {
	zombieResources = transform.GetComponent(ZombieResources);
}

// Has the potential of calculating the actual damage
// done using armor, resistances etc
function damage(power : float) {
	zombieResources.reduceHealth(power);
} 