#pragma strict

var gun : Transform;
var bullet : GameObject;

function Start () {

}

function Update () {
	if (Input.GetMouseButtonDown(0)) {
	    Instantiate(bullet,gun.transform.position,gun.transform.rotation);
	}
}