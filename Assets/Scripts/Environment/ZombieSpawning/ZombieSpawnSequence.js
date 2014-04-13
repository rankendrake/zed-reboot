#pragma strict
/*
 * Specifies the actual sequence of zombies in the survival mode
 * may be attached to any GameObject, preferably environment
 *
 */
var zombieSpawnEngine : ZombieSpawnEngine;
var leaderZombiePrefab : GameObject;
var packZombiePrefab : GameObject;
var newZombiePrefab : GameObject;

function Start () {
	// possible commands:
	// spawnSingle(prefab, time, position)
	// spawnSingle(prefab, time, position, spread)
	// spawnSingle(prefab, time, edge)
	// spawnSingle(prefab, time, edges) [To do]
	
	// spawnContinuous(prefab, startTime, duration, zombieNumber, position)
	// spawnContinuous(prefab, startTime, duration, zombieNumber, position, spread)
	// spawnContinuous(prefab, startTime, duration, zombieNumber, edge)
	// spawnContinuous(prefab, startTime, duration, zombieNumber, edges) [to do]
	


	zombieSpawnEngine.spawnContinuous(newZombiePrefab, 0, 5, 25, Vector2(2, 0), Vector2(2, 2));
}