#pragma strict

// Accuracy determines how fast deviation returns to zero. Zero deviation is perfect accuracy.
@HideInInspector
var deviation : float;

private var accuracy : float;
var maxDev : float;

function Start () {
deviation = 0.0;
maxDev = 20.0;
accuracy = GetComponent(WeaponAttributes).getAccuracyRecover();
}

function Update () {
if(deviation > 0.0)
	{
	deviation -= (Time.deltaTime * accuracy);
	if(deviation < 0.0)
		deviation = 0.0;
	if(deviation > maxDev)
		deviation = maxDev;
	}
}