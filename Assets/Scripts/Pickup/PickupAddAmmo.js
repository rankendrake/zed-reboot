#pragma strict

var numberOfClips : int;
var zedResources : ZedResources;
var pickupBounds : Bounds;
var spriteLength : float;
var distanceFromZed : float;

function Start () {
	numberOfClips = 1;
	zedResources = GameObject.Find("zed").GetComponent(ZedResources) as ZedResources;
	pickupBounds = gameObject.GetComponent(SpriteRenderer).bounds;
	spriteLength = pickupBounds.max.x - pickupBounds.min.x;
	//transform.position.z = GameObject.Find("zed").transform.position.z;
}

function Update() {
	var zedPosition = GameObject.Find("zed").transform.position;
	zedPosition.z = transform.position.z;
	if (Vector3.Magnitude(zedPosition - transform.position) < spriteLength) {
		pickupExecute();
	}
	
//	if(pickupBounds.SqrDistance() < spriteLength*spriteLength)
//		pickupExecute();
}

function pickupExecute() {
		for(var weapon in zedResources.weapons) {
			weapon.addClips(numberOfClips);
		}
		WaitForEndOfFrame();
		Destroy(gameObject);
}