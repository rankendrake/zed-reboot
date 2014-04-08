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
	
	// spawnContinuous(prefab, startTime, duration, period, position)
	// spawnContinuous(prefab, startTime, duration, period, position, spread)
	// spawnContinuous(prefab, startTime, duration, period, edge)
	// spawnContinuous(prefab, startTime, duration, period, edges) [to do]
	


	zombieSpawnEngine.spawnContinuous(newZombiePrefab, 2, 100, .4, Edge.RIGHT);

	//zombieSpawnEngine.spawnContinuous(leaderZombiePrefab, 2, 100, 2, Edge.BOTTOM);
}