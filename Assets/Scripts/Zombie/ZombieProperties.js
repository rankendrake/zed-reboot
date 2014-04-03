#pragma strict

var difficultyLevel : int;
var maxHealth : float;
var attackDamage : float;
var timeBetweenHits : float;
var skillPointDropProbability : float;

function getDifficultyLevel() {
	return difficultyLevel;
}

function getAttackDamage() {
	return attackDamage;
}

function getMaxHealth() {
	return maxHealth;
}

function getTimeBetweenHits() {
	return timeBetweenHits;
}

function getSkillPointDropProbability() {
	return skillPointDropProbability;
}