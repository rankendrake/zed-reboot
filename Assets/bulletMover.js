#pragma strict

var speed : float;


function Start() {
	gameObject.tag = "BU";
}

function Update () {
	
	var relativeSpeed : float = Time.deltaTime*speed;
	
	rigidbody2D.velocity = new Vector2(
			relativeSpeed*Mathf.Cos(Mathf.Deg2Rad*transform.eulerAngles.z),
			relativeSpeed*Mathf.Sin(Mathf.Deg2Rad*transform.eulerAngles.z));
}