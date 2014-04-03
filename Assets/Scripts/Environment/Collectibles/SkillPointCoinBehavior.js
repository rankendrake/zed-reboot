#pragma strict

var skillPoints : int;
var maxStartSpeed : float;
var drag : float;
var _transform : Transform;

private var velocity : Vector2;

function Start() {
	velocity = new Vector2(Random.Range(-maxStartSpeed, maxStartSpeed), 
			Random.Range(-maxStartSpeed, maxStartSpeed));
}

 
function Update () {
	_transform.position += Time.deltaTime*velocity;
	
	// (to do: not frame independent yet)
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
		Debug.Log("Error! Skill point collected by GameObject without ZedResources");
	}
	
	Destroy(gameObject);
	zedResources.changeSkillPoints(skillPoints);
}