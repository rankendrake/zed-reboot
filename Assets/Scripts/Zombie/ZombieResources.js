﻿#pragma strict

var skillPointCoinPrefab : GameObject;
var startHealth : float;
var angleDeviationOfDying : float;
var spriteRenderer : SpriteRenderer;

private var zombieProperties : ZombieProperties;
private var health : float;
private var animatorDead : boolean;

private var zedResources : ZedResources;

//var zombieDeathSound : AudioSource;

var zombieDeathSound : AudioClip;

function Start() {
	zombieProperties = transform.GetComponent(ZombieProperties);

	health = zombieProperties.getMaxHealth();
	animatorDead = false;
	
	zedResources = GameObject.Find("zed").GetComponent(ZedResources);
}

function Update() {
	// Zombie is dying
	if (!isAlive() && !animatorDead) {
		gameObject.GetComponent(Animator).SetBool("isDead", true);
		gameObject.tag = "deadZombie";
		gameObject.name = "deadZombie";
	// Play death sound.
		AudioSource.PlayClipAtPoint(zombieDeathSound,transform.position);
		trimUnnecessaryComponents();
		
		// Dying rotation variation
		gameObject.transform.Rotate(new Vector3(0, 0, (Random.value - 0.5)*angleDeviationOfDying));
		
		spriteRenderer.sortingLayerName = "backgroundLayer";
		spriteRenderer.sortingOrder = -10;
		
		// Tell Zed the difficulty of the zombie which was killed
		zedResources.handleZombieKilled(zombieProperties.getDifficultyLevel());
		
		if (Random.Range(0.0, 1.0) < zombieProperties.getSkillPointDropProbability()) {
			dropSkillPoint();
		}
	}
}

function reduceHealth(reductionAmount : float) {
	health -= reductionAmount;			
	if (health < 0) {
		health = 0;
	}
}

function isAlive() : boolean {
	return (health > 0);
}

function trimUnnecessaryComponents() {
	var components = gameObject.GetComponents(typeof(Component));
    for (var component : Component in components) {
            if (!(component instanceof Transform) &&
            	!(component instanceof Renderer) &&
            	!(component instanceof Animator)) {
                 Destroy(component);
            }
    }
    if(transform.childCount > 0) {
    	for(var child : Transform in gameObject.transform) {
    		Destroy(child.gameObject);
    	}
    }  
}

function dropSkillPoint() {
	Instantiate(skillPointCoinPrefab, transform.position, Quaternion.identity);
}