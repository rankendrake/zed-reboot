#pragma strict

private var clips : int;

function Start () {
	clips = 77; // TODO: change for release
}

function addClip() {
	clips++;
}

function useClip() : boolean {
	if (clips <= 0) {
		return false;
	} else {
		clips--;
	}
	return true;
}

function clipsLeft() : int {
	return clips;
}