#pragma strict

enum Edge { TOP, DOWN, LEFT, RIGHT }

/*
 * Creates an instance of the specified prefab at a 
 * certain position on or outside the map
 */
function spawnSingle(prefab : GameObject, time : float, position : Vector2) {
	spawnSingle(prefab, time, position, Vector2.zero);
}


/* 
 * Creates an instance of the specified prefab at a 
 * certain position on or outside the map
 * spread is the maximum random deviation from position in
 * x and y direction
 * (uniformly distributed)
 */
function spawnSingle(prefab : GameObject, time : float, position : Vector2, spread : Vector2) {
	
}

function spawnSingle(prefab : GameObject, time : float, edge : Edge) {
	// - calculate position
	// - spawnSingle(...,calculatedPosition)
}


/*
 * 
 * endTime 	Time in seconds for how long spawning should take place (set to Mathf.infinity
 * 			for spawning until game ends.
 */
function spawnContinuous(prefab : GameObject, startTime : float, duration : float, 
		period : float, periodSpread : float, position : Vector2) {
	
}
