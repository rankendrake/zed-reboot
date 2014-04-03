#pragma strict

var numberOfClips : int;
var zedResources : ZedResources;
var pickupBounds : Bounds;
var pickupLength : float;

function Start () {
	numberOfClips = 1;
	zedResources = GameObject.Find("zed").GetComponent(ZedResources) as ZedResources;
	pickupBounds = gameObject.GetComponent(MeshRenderer).bounds;
	pickupLength = pickupBounds.max.x - pickupBounds.min.x;
}

function Update() {
	if(pickupBounds.SqrDistance(GameObject.Find("zed").transform.position) < pickupLength*pickupLength)
		pickupExecute();
}

function pickupExecute() {
		for(var weapon in zedResources.weapons) {
			weapon.addClips(numberOfClips);
		}
		WaitForEndOfFrame();
		Destroy(gameObject);
}