#pragma strict
/*
 * Specifies the actual sequence of zombies in the survival mode
 * may be attached to any GameObject, preferably environment
 *
 */
var zombieSpawnEngine : ZombieSpawnEngine;
var leaderZombiePrefab : GameObject;
var packZombiePrefab : GameObject;
var chaserZombiePrefab : GameObject;

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
	
//	zombieSpawnEngine.spawnContinuous(leaderZombiePrefab, 0, 150, 30, Edge.LEFT);
//	zombieSpawnEngine.spawnContinuous(leaderZombiePrefab, 10, 150, 30, Edge.RIGHT);
//	zombieSpawnEngine.spawnContinuous(leaderZombiePrefab, 10, 150, 30, Edge.TOP);
//	zombieSpawnEngine.spawnContinuous(leaderZombiePrefab, 10, 150, 30, Edge.BOTTOM);
//	
//	zombieSpawnEngine.spawnContinuous(packZombiePrefab, 0, 150, 50, Edge.LEFT);
//	zombieSpawnEngine.spawnContinuous(packZombiePrefab, 10, 150, 50, Edge.RIGHT);
//	zombieSpawnEngine.spawnContinuous(packZombiePrefab, 10, 150, 50, Edge.TOP);
//	zombieSpawnEngine.spawnContinuous(packZombiePrefab, 10, 150, 50, Edge.BOTTOM);
//
//	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 0, 150, 50, Edge.LEFT);
//	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 10, 150, 50, Edge.RIGHT);
//	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 10, 150, 50, Edge.TOP);
//	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 10, 150, 50, Edge.BOTTOM);



	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 0, 5, 15, Edge.LEFT);
	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 5, 10, 5, Edge.RIGHT);
	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 10, 150, 50, Edge.TOP);
	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 10, 150, 20, Edge.BOTTOM);
	
		
	zombieSpawnEngine.spawnContinuous(leaderZombiePrefab, 0, 150, 200, Edge.LEFT);	
	zombieSpawnEngine.spawnContinuous(packZombiePrefab, 10, 1000, 200, Edge.RIGHT);
	zombieSpawnEngine.spawnContinuous(packZombiePrefab, 10, 1000, 200, Edge.TOP);
	
//	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 0, 150, 130, Edge.LEFT);
//	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 10, 150, 130, Edge.RIGHT);
//	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 10, 150, 130, Edge.TOP);
//	zombieSpawnEngine.spawnContinuous(chaserZombiePrefab, 10, 150, 130, Edge.BOTTOM);
	
	
//	zombieSpawnEngine.spawnContinuous(packZombiePrefab, 0, 1, 3, Vector2(4, 4), Vector2(1, 1));
//	zombieSpawnEngine.spawnContinuous(newZombiePrefab, 0, 50, 25, Vector2(2, 0), Vector2(2, 2));
}