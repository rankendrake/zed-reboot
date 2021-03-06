﻿/*
 * Defines the behaviour of the cogs on the ScannerTurret which rotate as the barrel is turned.
 * Purely visual.
 */

#pragma strict

var barrelName : String;
private var barrel : Transform;
var spinningSpeedMultiplier : float;
var direction : boolean;

function Start () {
	barrel = transform.parent.Find(barrelName);
}

function Update () {
	if (direction)
		transform.eulerAngles.z = barrel.eulerAngles.z*spinningSpeedMultiplier;
	else
		transform.eulerAngles.z = -barrel.eulerAngles.z*spinningSpeedMultiplier;
}