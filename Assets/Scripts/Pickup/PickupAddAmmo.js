#pragma strict

var numberOfClips : int;
var zedResources : ZedResources;

function Start () {
	numberOfClips = Mathf.FloorToInt(Random.value * 3);
	zedResources = GameObject.Find("zed").GetComponent(ZedResources) as ZedResources;
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if (otherCollider.gameObject.Equals(GameObject.Find("zed"))) {
		Debug.Log("Collides!");
		gameObject.collider2D.enabled = false;
		zedResources = otherCollider.gameObject.GetComponent(ZedResources) as ZedResources;
		for (var weapon in zedResources.weapons) {
			weapon.addClips(numberOfClips);
		}
	}
	WaitForEndOfFrame();
	Destroy(this);
}