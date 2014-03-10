#pragma strict

var clipSize : int;
private var bullets : int;
private var ammoPouch : AmmoPouch;
private var clipChanged : boolean;

function Start () {
	bullets = 0;
	ammoPouch = transform.parent.GetComponent(AmmoPouch);
	reload();
}

function wasteBullet() : boolean {
	if (bullets <= 0) {
		return false;
	} else if (bullets == 1) {
		bullets--;
		reload();
	} else {
		bullets--;
		
	}
	return true;
}

function reload() {
	var clipsLeft : boolean = ammoPouch.useClip();
	if (clipsLeft) {
		bullets = clipSize;
		clipChanged = true;
	}
}

function getClipSize() : int {
	return clipSize;
}

function getBullets() : int {
	return bullets;
}

function testAndSetClipChanged() : boolean {
	if (clipChanged) {
		clipChanged = false;
		return true;
	} else {
		return false;
	}
}