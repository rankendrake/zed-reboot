#pragma strict

var power : float;

private var speed : float;
private var boxCollider2D : BoxCollider2D;
private var oldSpeed : float;

function Start() {
	//power = 100;
	oldSpeed = 0;
	boxCollider2D = GetComponent(BoxCollider2D) as BoxCollider2D;
}

function Update() {
	oldSpeed = speed;
	speed = gameObject.rigidbody2D.velocity.magnitude;
	if (speed != oldSpeed) {
		var x : float = gameObject.renderer.bounds.size.x;
		boxCollider2D.size.x = x + Time.fixedDeltaTime*speed*4;
		boxCollider2D.center.x = -boxCollider2D.size.x/2 + x/2;
	}	
}

function setPower(power : float) {
	this.power = power;
}

function getPower() {
	return power;
}

