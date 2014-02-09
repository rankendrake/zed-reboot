#pragma strict

var objectToDestroy : GameObject;
var destroyThisFrame : boolean;

function Start () {

}

function Update () {
}

function LateUpdate(){
	if (destroyThisFrame == true) {
		Destroy(objectToDestroy);
		destroyThisFrame = false;
//		objectToDestroy = null;
	}
	if (objectToDestroy != null){
		destroyThisFrame = true;
	} 
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if (otherCollider.gameObject.tag.Equals("BU")) {
		otherCollider.gameObject.transform.position = transform.position;
		
		objectToDestroy = otherCollider.gameObject;
		Debug.Log("HIT");
	}
}