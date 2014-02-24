#pragma strict

var xp : int;
var nextLevelUp : int;
var level : int;

function Start() {
	xp = 0;
	level = 1;
	nextLevelUp = 10;
}
 
function gainExperience(amount : int) {
    xp += amount;
    if (xp >= nextLevelUp)
    {
        levelUp();
    }
}
 
function levelUp() {
    nextLevelUp *= 2;
    level++;
    
}