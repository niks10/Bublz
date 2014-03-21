#pragma strict

public static var d=1;
public static var mouseClicksStarted = false;
public static var mouseClicks = 0;
public static var mouseTimerLimit = .25f;
public static var radius = 0.5;
public static var power = 100.0;
public static var required:int;
public static var least=100000;

public static var a = 23;
public static var b = 17;
public static var c = 13;	//removal of 'c' bubbles

public static var windowRect : Rect;
windowRect = Rect(Screen.width/2 - 250, Screen.height/2 - 100, 500, 281);
public static var flag = false;

public var style : GUIStyle;
public var messageBoxImage : Texture;
public var optimality: Texture;
public static var score = 1000;		//start score of 1000

public static var myArrayList = new ArrayList();

function Start() {
	
	if(myArrayList.Count == 0)
	{
		while(true)
		{
			if(((d-1)%a==0) || ((d-1)%b==0) || ((d-1)%c==0))
				d= Random.Range(2,70) ;
			else
			{
				break;//To avoid presenting a problem which has a really quick and easy way to attain the target
			}
		}
	}

	myArrayList.Add(gameObject);
	print(myArrayList.Count);
		
}

function Update() {
		var t:int;
		var z:int;
		var v:int;
		var w:int=0;
		var x:int=0;
		var y:int=0;
		var d:int=required;
		for (w=0;w<200;w++)
		{
			for(x=0;x<200;x++)
			{
				for(y=0;y<200;y++)
				{
					if(w+x+y<=least && a*w+b*x-c*y==d-1)
					{
						least=w+x+y;
				        t=w;
                        z=x;
                        v=y;		
					}
				}
			}
		}	
}

function OnMouseOver()	//for right clicks only (removal of 'c' bubbles)
{
    if (Input.GetMouseButtonDown(1) && myArrayList.Count > c){	//if right click and number of bubbles > 'c'
    	for(var i = 0; i < myArrayList.Count; i++){
    		if(gameObject == myArrayList[i])
    		{
    			myArrayList.RemoveAt(i);
    			Destroy(gameObject);
    			 				
  				for(var j = 1; j < c; j++)
  				{
  					var t = myArrayList[0];
  					myArrayList.RemoveAt(0);
  					Destroy(t);
  					
  				}
  				
  				break;
  			}
    	}
    	
    	score -= 10;
    	print(myArrayList.Count);
    }
}

function OnSingleClick(){


	if(myArrayList.Count + a > 200)
	{
		flag = true;
		return;
	}

	var array1 = new ArrayList();
	
	for(var i = 0; i < a; i++){
		array1.Add(Instantiate(gameObject));
		var l:GameObject = array1[i];
		var x = l.transform.position;
		x.x += Random.Range(-0.4,0.4);
		x.y += Random.Range(-0.4,0.4);
		l.transform.position = x;
	}
	
	score -= 10;
}

function OnDoubleClick(){

	if(myArrayList.Count + b > 200)
	{
		flag = true;
		return;
	}
	
	var array1 = new ArrayList();
 	
	for(var i = 0; i < b; i++){
		array1.Add(Instantiate(gameObject));
		var l:GameObject = array1[i];
		var x = l.transform.position;
		x.x += Random.Range(-0.4,0.4);
		x.y += Random.Range(-0.4,0.4);
		l.transform.position = x;
	}
	
	score -= 10;
}

function OnMouseDown(){
	mouseClicks++;
    if(mouseClicksStarted)
	return;
    
    mouseClicksStarted = true;
    Invoke("checkMouseDoubleClick", mouseTimerLimit);
}

function checkMouseDoubleClick(){
	if(mouseClicks > 1){
		OnDoubleClick();
	}
    else{
    	OnSingleClick();
	}
	mouseClicksStarted = false;
    mouseClicks = 0;
}

function OnGUI(){	//needs to be modified for three levels
	GUI.Label(Rect(Screen.width - 110, 43, 50, 50), " " + d, style);	//display target value
	GUI.Label(Rect(Screen.width - 110, 93, 50, 50), " " + myArrayList.Count, style); //display count value
	GUI.Label(Rect(Screen.width/2 - 370, 43, 100, 100), " " + score, style); //display score
	
	if(d == myArrayList.Count)
	{
		
			GUI.Box(windowRect, optimality);
			//COORDINATES OF THE RECTANGLE HAS TO BE MODIFIED..i'LL DO IT TOMORROW!!!!
			GUI.Label(Rect(Screen.width - 110, 93, 50, 50), " " + (1000-least*10), style); //display optimal score
			GUI.Label(Rect(Screen.width - 110, 93, 50, 50), " " + score, style); //display user's score
			if(GUI.Button(Rect(Screen.width/2 - 40, Screen.height/2 + 100, 100, 20), "Proceed", style))
			{
				Application.LoadLevel("Bublz5");
			}
			else if(GUI.Button(Rect(Screen.width/2 + 40, Screen.height/2 + 100, 100, 100), "Play again", style))
			{
				Application.LoadLevel("Bublz4");
			}
		
	}
	
	if(flag)
	{
		GUI.Box(windowRect, messageBoxImage);
		
		if(GUI.Button(Rect(Screen.width/2 - 40, Screen.height/2 + 100, 100, 20), "Okay!", style))
		{
			flag = false;
		}
	}
}