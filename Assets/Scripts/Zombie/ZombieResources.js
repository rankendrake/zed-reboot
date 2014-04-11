#pragma strict

var skillPointCoinPrefab : GameObject;
var angleDeviationOfDying : float;

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
		var animator : Animator = gameObject.GetComponent(Animator);
		animator.SetBool("isDead", true);
		animatorDead = true;
		animator.SetLayerWeight(2, 0); // stop overriding arm movement
		gameObject.tag = "deadZombie";
		gameObject.name = "deadZombie";
		
		// Play death sound.
		AudioSource.PlayClipAtPoint(zombieDeathSound,transform.position);
		trimUnnecessaryComponents();
			
		// Dying rotation variation
		gameObject.transform.Rotate(new Vector3(0, 0, (Random.value - 0.5)*angleDeviationOfDying));
		
		
		//spriteRenderer.sortingLayerName = "backgroundLayer";
		//spriteRenderer.sortingOrder = -10;
		
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
    	var childrenTransforms : Component[] = transform.GetComponentsInChildren(Transform);    
    	for(var i : int = 0; i < childrenTransforms.Length; i++) {
    		var child : Transform = childrenTransforms[i];    		
    		if(child.gameObject.CompareTag("detector")) {
	    		Destroy(child.gameObject);
	    	} else if(child.gameObject.CompareTag("collisionDetector")) {
	    		Destroy(child.gameObject);
	    	}
	    	child.gameObject.isStatic = true;
    	}    	
    }  
    gameObject.isStatic = true;    
}

function dropSkillPoint() {
	Instantiate(skillPointCoinPrefab, transform.position, Quaternion.identity);
}