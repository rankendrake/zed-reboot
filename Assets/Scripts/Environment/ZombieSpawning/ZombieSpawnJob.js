#pragma strict
import System.Collections.Generic;

/*
 * Used by the ZombieSpawning.js-Script. 
 * Combines all necessary information about a job
 */

class ZombieSpawnJob extends UnityEngine.Object {
	enum LocationMode {
		SINGLE_EDGE, MULTIPLE_EDGE, POSITION
	}
	
	private var prefab : GameObject;
	private var startTime : float;
	private var endTime : float;
	private var spawnDelay : float;
	
	private var lastSpawnTime : float;
		
	private var locationMode : LocationMode;
	
	// needed to let one zombie be spawned at the start no matter what
	private var firstTimeSpawned : boolean;
	
	// for single edge
	private var edge : Edge;
	
	// for multiple edges
	private var edges : Edge[];
	
	// for position
	private var position : Vector2;
	private var spread : Vector2;
	
	function ZombieSpawnJob(prefab : GameObject, 
			startTime : float, 
			duration : float,
			spawnDelay : float,
			edge : Edge) {
		this.prefab = prefab;
		this.locationMode = LocationMode.SINGLE_EDGE;	
		this.edge = edge;
		this.startTime = startTime;
		this.endTime = startTime + duration;
		this.spawnDelay = spawnDelay;
	}	
	
	function ZombieSpawnJob(prefab : GameObject, 
			startTime : float, 
			duration : float,
			spawnDelay : float,
			edges : Edge[]) {
		this.prefab = prefab;
		this.locationMode = LocationMode.MULTIPLE_EDGE;	
		this.edges = edges;
		this.startTime = startTime;
		this.endTime = startTime + duration;
	}	
	
	function ZombieSpawnJob(prefab : GameObject, 
			startTime : float, 
			duration : float,
			spawnDelay : float,
			position : Vector2,
			spread : Vector2) {
		this.prefab = prefab;
		this.locationMode = LocationMode.POSITION;	
		this.startTime = startTime;
		this.endTime = startTime + duration;
		this.spawnDelay = spawnDelay;
		this.position = position;
		this.spread = spread;
	}
	
	function spawnIfDue() {
		if ((Time.timeSinceLevelLoad > startTime) && (Time.timeSinceLevelLoad < endTime)) {
			if (!firstTimeSpawned || ((Time.timeSinceLevelLoad - lastSpawnTime) > spawnDelay)) {		
				firstTimeSpawned = true;	
				lastSpawnTime = Time.timeSinceLevelLoad;
				var spawnPosition2D : Vector2 = getPosition();
				var spawnPosition : Vector3 = new Vector3(spawnPosition2D.x, 
						spawnPosition2D.y, EnvironmentAttributes.zombieZCoordinate);
				Instantiate(prefab, spawnPosition, Quaternion.identity);
			}			
		}
	}
	
	function isExpired() : boolean {
		return Time.timeSinceLevelLoad > endTime;
	}
	
	function getPrefab() : GameObject {
		return prefab;
	}
	
	private function getPosition() : Vector2 {
		if (locationMode == LocationMode.POSITION) {
			return new Vector2(position.x + Random.Range(-spread.x, spread.x),
					position.y + Random.Range(-spread.y, spread.y));
		} else if (locationMode == LocationMode.MULTIPLE_EDGE) {
			var selectedEdgeIndex : int = Random.Range(0, edges.Length);;
			edge = edges[selectedEdgeIndex];
		}	
		
		if (edge == Edge.TOP) {
			return (new Vector2(
				Random.Range(EnvironmentAttributes.leftBound, 
						EnvironmentAttributes.rightBound),
				EnvironmentAttributes.topBound) + new Vector2(
						Random.Range(-spread.x, spread.x), 
						Random.Range(-spread.y, spread.y)));
		} else if (edge == Edge.BOTTOM) {
			return (new Vector2(
				Random.Range(EnvironmentAttributes.leftBound, 
						EnvironmentAttributes.rightBound),
				EnvironmentAttributes.bottomBound) + new Vector2(
						Random.Range(-spread.x, spread.x), 
						Random.Range(-spread.y, spread.y)));
		} else if (edge == Edge.LEFT) {
			return (new Vector2(
				EnvironmentAttributes.leftBound, 
				Random.Range(EnvironmentAttributes.bottomBound,
						EnvironmentAttributes.topBound)) + new Vector2(
						Random.Range(-spread.x, spread.x), 
						Random.Range(-spread.y, spread.y)));			
		} else if (edge == Edge.RIGHT) {
			return (new Vector2(
				EnvironmentAttributes.rightBound, 
				Random.Range(EnvironmentAttributes.bottomBound,
						EnvironmentAttributes.topBound)) + new Vector2(
						Random.Range(-spread.x, spread.x), 
						Random.Range(-spread.y, spread.y)));		
		} else return Vector2(0, 0);
	}
}