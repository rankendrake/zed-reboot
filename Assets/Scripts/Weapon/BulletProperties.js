/*
 * An interface for the bullet's power and owner object.
 */

#pragma strict

var power : float;
private var owner : GameObject;

function setPower(power : float) {
	this.power = power;
}

function getPower() {
	return power;
}

function setOwner(obj : GameObject) {
	owner = obj;
}

function getOwner() : GameObject {
	return owner;
}