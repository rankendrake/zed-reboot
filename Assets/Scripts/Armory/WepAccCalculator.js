#pragma strict

// Accuracy determines how fast deviation returns to zero. Zero deviation is perfect accuracy.
var deviation : float;
var accuracy : float;
var maxDev : float;

// Deviation is corrected according to a function of itself every frame as well, by this value.
var devCorrectItself : float;


function Start () {
deviation = 0.0;
maxDev = 20.0;
accuracy = GetComponent(WepAttributes).GetAccRecover();
devCorrectItself = 0.985;
}

function Update () {
if(deviation > 0.0)
	{
	deviation *= devCorrectItself;
	deviation -= (Time.deltaTime * accuracy);
	if(deviation < 0.0)
		deviation = 0.0;
	if(deviation > maxDev)
		deviation = maxDev;
	}
}