#pragma strict

var speed : float;

@HideInInspector
var standing : boolean;

//@HideInInspector
//var angle : float;


var zed : Transform;
var angle : float;
function Start () {
	var zedPosition : Vector3 = zed.position;
	var positionDifference : Vector3 = zedPosition - transform.position;
	angle = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
	
	standing = false;
}

function Update () {
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
	
	angle += 0.05*angleDifference;
	
	transform.eulerAngles = new Vector3(0, 0, angle);
	var relativeSpeed : float = Time.deltaTime*speed;
	transform.position += new Vector3(relativeSpeed*Mathf.Cos(Mathf.Deg2Rad*angle), relativeSpeed*Mathf.Sin(Mathf.Deg2Rad*angle));
	
}