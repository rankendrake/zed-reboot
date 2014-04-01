#pragma strict

var numberOfClips : int;
var zedResources : ZedResources;

function Start () {
	numberOfClips = 1;
	zedResources = GameObject.Find("zed").GetComponent(ZedResources) as ZedResources;
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if (otherCollider.CompareTag("Player")) {
		Debug.Log("Collides!");
		zedResources = otherCollider.gameObject.GetComponent(ZedResources) as ZedResources;
		for(var weapon in zedResources.weapons) {
			weapon.addClips(numberOfClips);
		}
		collider2D.enabled = false;
		WaitForEndOfFrame();
		Destroy(gameObject);
	}
}