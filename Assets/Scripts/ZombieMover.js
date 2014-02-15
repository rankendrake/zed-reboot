#pragma strict

var speed : float;
var speedDeviation : float;
var angularSpeed : float;

@HideInInspector
var standing : boolean;

@HideInInspector
var zed : Transform;

var angle : float;

private var zombieHealthController : ZombieHealthController;

function Start () {
	zed = GameObject.Find("zed").transform;

	var zedPosition : Vector3 = zed.position;
	var positionDifference : Vector3 = zedPosition - transform.position;
	angle = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
	
	standing = false;
	
	zombieHealthController = gameObject.GetComponent(ZombieHealthController);
	
	speed += (Random.value - 0.5)*speedDeviation;
}

function Update () {
	if (zombieHealthController.isAlive()) {
		var zedPosition : Vector3 = zed.position;
	
		var positionDifference : Vector3 = zedPosition - transform.position;
		var targetAngle : float = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
		
		var angleDifference : float = (targetAngle-angle);
		if (angleDifference > 180) {
			angleDifference -= 360;
		} 
		if (angleDifference < -180) {
			angleDifference += 360;
		}
		
		angle += angularSpeed*speed*Time.deltaTime*angleDifference;
		
		transform.eulerAngles = new Vector3(0, 0, angle);
		var relativeSpeed : float = Time.deltaTime*speed;

		rigidbody2D.velocity = new Vector2(
				relativeSpeed*Mathf.Cos(Mathf.Deg2Rad*angle), 
				relativeSpeed*Mathf.Sin(Mathf.Deg2Rad*angle));	
	} else {
		rigidbody2D.velocity = new Vector2(0, 0);	
	}

		
}