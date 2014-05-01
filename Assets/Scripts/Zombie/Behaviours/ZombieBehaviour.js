#pragma strict

/* Base class for ZombieBehaviours.
*  All zombie behaviours will extend off of this class.
*/

public class ZombieBehaviour extends MonoBehaviour {

function Start(){}

function plotNewPosition() {} // Plot new position.

function getTarget() { // Determine the zombie’s current target.
	return null;
}

function getTargetVisualRange() {
	return 0;
}

function setTarget(target : GameObject) {}


}