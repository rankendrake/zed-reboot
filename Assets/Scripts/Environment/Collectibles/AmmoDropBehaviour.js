/*
 * Behaviour of an ammo drop.
 *
 * CURRENTLY NOT USED
 */ 


#pragma strict

var numberOfClips : int;
var maxStartSpeed : float;
var drag : float;
var _transform : Transform;

var pickupSound : AudioClip;

private var velocity : Vector2;

function Start() {
	velocity = new Vector2(Random.Range(-maxStartSpeed, maxStartSpeed), 
			Random.Range(-maxStartSpeed, maxStartSpeed));
}

function Update () {
	_transform.position += Time.deltaTime*velocity;
	
	// (to do: not frame independent yet)
	// can be done similarly as the CoinBehaviour script
	velocity = velocity*drag;
}


function OnTriggerEnter2D(other: Collider2D) {
	var otherGameObject = other.transform.root.gameObject;
	if (otherGameObject.CompareTag("zed")) {
		collect(otherGameObject.GetComponent(ZedResources));	
	}
}

function collect(zedResources : ZedResources) {
	if (zedResources == null) {
		Debug.Log("Error! Ammo pickup collected by GameObject without ZedResources");
	}
	AudioSource.PlayClipAtPoint(pickupSound,_transform.position);
	Destroy(gameObject);
	for(var weapon : Weapon in zedResources.weapons) {
		weapon.addClips(numberOfClips);
	}
}