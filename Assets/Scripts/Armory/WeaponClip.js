#pragma strict

var clipSize : int;
private var bullets : int;
private var ammoPouch : AmmoPouch;
private var clipChanged : boolean;
private var reloadStartTime : float;

function Start () {
	bullets = 0;
	ammoPouch = transform.parent.GetComponent(AmmoPouch);
	reload(true);
}

function wasteBullet() : boolean {
	if (bullets <= 0) {
		return false;
	} else if (bullets == 1) {
		bullets--;
		reload(false);
	} else {
		bullets--;
		
	}
	return true;
}

function reload(initialReload : boolean) {
	var clipsLeft : boolean = ammoPouch.useClip();
	if (clipsLeft) {
		bullets = clipSize;
		clipChanged = true;
		reloadDelay(initialReload);
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

function reloadDelay(initialReload : boolean) {
	if (initialReload) {
		reloadStartTime = 0;
	} else {
		reloadStartTime = Time.time;
	}
}

function getReloadStartTime() : float {
	return reloadStartTime;
}