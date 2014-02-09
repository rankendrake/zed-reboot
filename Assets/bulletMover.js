#pragma strict

var speed : float;


function Update () {
	
	var relativeSpeed : float = Time.deltaTime*speed;
	transform.position += new Vector3(
		relativeSpeed*Mathf.Cos(Mathf.Deg2Rad*transform.eulerAngles.z), 
		relativeSpeed*Mathf.Sin(Mathf.Deg2Rad*transform.eulerAngles.z));
}