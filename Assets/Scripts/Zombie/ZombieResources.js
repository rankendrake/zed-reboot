#pragma strict

var startHealth : float;
var angleDeviationOfDying : float;

private var zombieProperties : ZombieProperties;
private var health : float;
private var animatorDead : boolean;

var zombieDeathSound : AudioSource;

function Start() {
	zombieProperties = transform.GetComponent(ZombieProperties);

	health = zombieProperties.getMaxHealth();
	animatorDead = false;
}

function Update() {
	// Zombie is dying
	if (!isAlive() && !animatorDead) {
		gameObject.GetComponent(Animator).SetBool("isDead", true);
		gameObject.tag = "deadZombie";
		gameObject.name = "deadZombie";
		zombieDeathSound.PlayOneShot(zombieDeathSound.clip,1.0);
		trimUnnecessaryComponents();
		
		// Dying rotation variation
		gameObject.transform.Rotate(new Vector3(0, 0, (Random.value - 0.5)*angleDeviationOfDying));
		
		// Tell Zed the difficulty of the zombie which was killed
		var zedResources : ZedResources = GameObject.Find("zed").GetComponent(ZedResources);
		zedResources.handleZombieKilled(zombieProperties.getDifficultyLevel());
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
            	!(component instanceof Animator) &&
            	!(component instanceof AudioSource)) {
                 Destroy(component);
            }
    }
}