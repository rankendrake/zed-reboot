#pragma strict

var startHealth : int;
private var health : int;
private var animatorDead : boolean;

var angleDeviationOfDying : float;

function Start() {
	health = startHealth;
	animatorDead = false;
}

function Update() {
	if (!isAlive() && !animatorDead) {
		gameObject.GetComponent(Animator).SetBool("IsDead", true);
		animatorDead = true;
		
		GetComponent(Collider2D).enabled = false;
				
		gameObject.transform.Rotate(new Vector3(0, 0, (Random.value - 0.5)*angleDeviationOfDying));
		Debug.Log(gameObject.transform.eulerAngles.z);
	}
}

function reduceHealth(reductionAmount : int) {
	health -= reductionAmount;			
	if (health <= 0) {
		health = 0;
	}
}

function isAlive() : boolean {
	return (health > 0);
}