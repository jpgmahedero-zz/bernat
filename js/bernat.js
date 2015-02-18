
var b2Vec2      = Box2D.Common.Math.b2Vec2,
    b2BodyDef   = Box2D.Dynamics.b2BodyDef,
    b2Body      = Box2D.Dynamics.b2Body,
    b2FixtureDef    = Box2D.Dynamics.b2FixtureDef,
    b2World     = Box2D.Dynamics.b2World,
    b2PolygonShape  = Box2D.Collision.Shapes.b2PolygonShape;
    b2CircleShape   = Box2D.Collision.Shapes.b2CircleShape;

var world;
var bodies = []; // instances of b2Body (from Box2D)
var actors = []; // instances of Bitmap (from IvanK)
var up;
var act = []; 
var destroy_list=[];
var stage;
var images = [ 

'abdullah.png',
              'abraham.png',
              'ahmed.png',
              'ayoub.png',
              'bilawal.png',
              'camino.png',
              'cristina.png',
              'cristobal.png',
              'danileon.png',
              'eguizabal.png',
              'frandy.png',
              'isaac.png',
              'ismael.png',
              'ivanayora.png',
              'jonathan2.png',
              'jordi.png',
              'joseluis.png',
              'josue.png',
              'leslie.png',
              'mahamadou.png',
              'mahtab.png',
              'mendoza.png',
              'moha.png',
              'ricard.png',
              'seydou.png',
              'shamas.png',

              'sufian.png',
              'taimoor.png',
              'umar.png',
              'xinsen.png',
              'ahsan.png',
              'albert.png',
              'alex.png',
              'alfonso.png',
              'alikhalid.png',
              'andres.png',
              'angel.png',
              'ashimu.png',
              'chaimae.png',
              'danielarias.png',
              'david.png',
              'dcordoba.png',
              'dfuentes.png',
              'dgazquez.png',
              'dilawar.png',
              'edgar.png',
              'erwin.png',
              'gianluca.png',
              'igot.png',
              'ivanayora.png',
              'jantonio.png',
              'javi.png',
              'jesus.png',
              'jonathan.png',
              'juanheredia.png',
              'kevin.png',
              'marccabrera.png',
              'marcgarrido.png',
              'naveed.png',
              'noelia.png',
              'omenacho.png',
              'sergi.png',
              'usman.png',
              'yeray.png',
              'yoandy.png'

              ];

var KEY_LEFT=false, KEY_RIGHT=false, KEY_UP=false, KEY_DOWN=false, speed=1, angle=0;
var bernie={};
var estadoCannon='parado';

var doh = "doh";
var doh32 = "doh32";
var crash = "crash";
var audioManifest;

function setupManifest() {
    manifest = [{
        src:  "audio/doh.ogg",
        id: "doh"
    }, {
        src:  "audio/doh32.ogg",
        id: "doh32"
    }, {
        src:  "audio/crash.ogg",
        id: "crash"
    }
 
    ];
    
}
 
function startPreload() {
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);         
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
}             

function handleFileLoad(event) {
    console.log("A file has loaded of type: " + event.item.type);
    if(event.item.id == "logo"){
        console.log("Logo is loaded");
        //create bitmap here
    }
}
 
 
function loadError(evt) {
    console.log("Error!",evt.text);
}

function handleFileProgress(event) {
    //progressText.text = (preload.progress*100|0) + " % Loaded";
    console.log(preload.progress*100 + " % Loaded")
    //stage.update();
}
 
function loadComplete(event) {
    console.log("Finished Loading Assets");
}


function preload_doh () {
  createjs.Sound.registerSound({id:"soundId", src:"assets/music.ogg"});
    createjs.Sound.registerSound("audio/doh.ogg", doh);
 
}


function playSoundDoh (sound) {
        createjs.Sound.play(doh);        
}

function playSoundDoh32 (sound) {        
        createjs.Sound.play(doh32); 
}
 
 function playSoundCrash (sound) {        
        createjs.Sound.play(crash); 
}         
function init() {   

    //preload_doh();

setupManifest();
startPreload();
    stage = new Stage("bernies_canvas");
    
    

    
    stage.addEventListener(Event.ENTER_FRAME, onEnterFrame);
    stage.addEventListener(KeyboardEvent.KEY_DOWN, onKEY_DOWN);
    stage.addEventListener(KeyboardEvent.KEY_UP  , onKEY_UP);

    world = new b2World(new b2Vec2(0, 2),  true); 
    setUpCollisions(world);


    up = new b2Vec2(0, -4); // cuanto reacciona las bola al ratón

    crearFondo();  
    // pause 3s

    crearBernie();

    var textFormat = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("Hi ha coses a la vida...",0,100,textFormat);

    // pausa 10s
    textFormat = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("...que es poden evitar",0,150,textFormat);
    textFormat = new TextFormat("Times new Roman", 20, 0x880099, true, true);
    crearTexto("fes servir els cursors",0,200,textFormat);

    //crearAlumnos();

    //crearTextoPiano(); // " D'altres no tant..."
    textFormat = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("... D'altres no tant...",0,250, textFormat);
    //crearPiano();
    
    //// pausa 3s
    textFormat = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("i d'altres.. NO ES PODEN EVITAR MAI!!",0,300, textFormat);
    playSoundDoh32();
    //dispararYoandys();
    

    //// pausa 3s
    textFormat = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("N'hi ha tambe d'inevitables",0,350, textFormat);



    // pausa 3s
    textFormat = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("Pero mes agradables!!!",0,400, textFormat);
    //crearSSD();

    textFormat = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("Feiciltats 110010's",0,450, textFormat);
                
    
}


function crearTexto(text, x,y, textFormat){
   
  var textField  = new TextField();
  textField.selectable = false; // default is true
  textField.setTextFormat(textFormat);
  textField.text = text;
  textField.width = textField.textWidth; 
  textField.height = textField.textHeight;
  textField.x =x;
  textField.y = y;
  textField.addEventListener(Event.ENTER_FRAME, onEnterFrameText);
  stage.addChild(textField);
}

function crearBernie(){
    var options = {};
    options={
        shape:'box', 
        scale:0.5,
        width:269, height:269,
        random:false, 
        position:{  x:5,y:2},
            fixtureDef:{  restitution : 0.7,
                          friction : 0.5,
                          density : 0.5
                        }
      };
    bernie = crearActor('Bernie.png',options);
    stage.addChild(bernie.sprite);
    actors.push(bernie);  

    bernie.sprite.addEventListener(MouseEvent.CLICK,playSoundDoh);  

}
function crearAlumnos(){

  // pausa 1s cada alumno
  for(var i = 0; i < 40; i++)     {

      options={shape:'ball', scale:0.5,width:269,height:269,random:true};
      alumno = crearActor(images[i],options);
      stage.addChild(alumno.sprite);
      actors.push(alumno);
  }
}


function crearActor(image, options){

  var bodyDef = new b2BodyDef();
  bodyDef.type = b2Body.b2_dynamicBody;

  var fixtureDef = new b2FixtureDef();   

  if (options.shape == 'ball'){
    fixtureDef.shape = new b2CircleShape();
    fixtureDef.shape.SetRadius(options.scale);
   
  } 
  if (options.shape== 'box'){
    fixtureDef.shape = new b2PolygonShape();
    fixtureDef.shape.SetAsBox(1,1);  
  }
  if (options.fixtureDef){
    fixtureDef.restitution = options.restitution;
    fixtureDef.friction = options.friction;
    fixtureDef.density = options.density;
  }else{ // default values for fixtureDef
    fixtureDef.restitution = 1;
    fixtureDef.friction = 0.3
    fixtureDef.density = 1
  }

  if (options.random == true){
    bodyDef.position.Set(Math.random()*7, -5 + Math.random()*5);
    bodyDef.angle = Math.random() * Math.PI * 2;
    bodyDef.angle = 0;

  }else{
    bodyDef.position.Set(options.position.x, options.position.y);
    //bodyDef.position.Set(1,1);
  }
    var body = world.CreateBody(bodyDef);
    body.CreateFixture(fixtureDef);    // ball

  var bitmapData = new BitmapData("images/" + image);
  var bitmap = new Bitmap( bitmapData);  
  bitmap.x = -options.width/2;
  bitmap.y = -options.height/2;
  

  var sprite = new Sprite(); 
  
  sprite.scaleX = sprite.scaleY = options.scale;    
  sprite.addChild(bitmap);
  sprite.rotation = body.GetAngle()*180 / Math.PI;
  //sprite.addEventListener(MouseEvent.MOUSE_MOVE, Jump);  

  
 
  var actor={};

  body.nombre = image;
  body.sprite = sprite;

  actor.body = body;
  actor.sprite =  sprite;
  var force;
  if (options.random){
      force=3;
     if (Math.random() > 0.5){
      force*=-1;
    }
      
      body.ApplyImpulse(new b2Vec2(force,0), body.GetWorldCenter());   
  }

    return actor;



}

function crearPiano(){
    var options = {};
    options={shape:'box', scale:1,width:269,height:313,random:false, position:{x:bernie.body.GetPosition().x,y:0}};
    var piano = crearActor('Piano.png',options);
    stage.addChild(piano.sprite);
    actors.push(piano);  

}

function dispararYoandys(){
    
    
    for (var i=0; i < 100 ; i++){
      var options = {};
      options={
          shape:'ball', 
          scale:0.5,
          width:269, height:313,
          random:false, 
          position:{ x:bernie.body.GetPosition().x+1,
                    y:0
          }
      };
      var yoandy = crearActor('yoandy.png',options);
      stage.addChild(yoandy.sprite);
      actors.push(yoandy);  
    }
}

function crearSSD(){
  var options = {};
    options={
            shape:'box', 
            scale:1,
            width:360,height:235,
            random:false, 
            position:{  x:bernie.body.GetPosition().x,
                        y:0
                      },
            fixtureDef:{  restitution : 1,
                          friction : 1,
                          density : 1
                        }
            }

    var ssd = crearActor('Ssd.png',options);
    stage.addChild(ssd.sprite);
    actors.push(ssd);  

}

function setUpCollisions(world){
  var listener = new Box2D.Dynamics.b2ContactListener;
    listener.BeginContact = function(contact) {
      var bodyA = contact.GetFixtureA().GetBody();
      var bodyB = contact.GetFixtureB().GetBody();

      console.log(bodyA.nombre + " <---> " + bodyB.nombre);
      if (bodyA.nombre =='suelo' && bodyA.nombre != 'Bernie.png'){
        destroy_list.push(bodyB);
      }

      if (bodyA.nombre =='Bernie.png' || bodyB.nombre == 'Bernie.png'){
        if (bodyA.nombre =='Piano.png' || bodyB.nombre == 'Piano.png'){
          playSoundCrash();
        }else{
          playSoundDoh();
        }

      }
        
        //237375__squareal__car-crash.wav();
      

    }
    listener.EndContact = function(contact) {
        // console.log(contact.GetFixtureA().GetBody().GetUserData());
    }
    listener.PostSolve = function(contact, impulse) {
        
    }
    listener.PreSolve = function(contact, oldManifold) {

    }
    world.SetContactListener(listener);

}
  
  function onEnterFrame(e) {
      world.Step(1 / 60,  3,  3);
      world.ClearForces();

          
     removeActors();
       

      var vel = bernie.body.GetLinearVelocity(); // vel = body->GetLinearVelocity();
      var force = 0;
      if(KEY_LEFT){
        if (vel.x>-5) force=-50;
      }else
      if(KEY_RIGHT) {
        if (vel.x<5) force=50;
      }else{
        force=vel.x*-10;
      }
        
      bernie.body.ApplyForce(new b2Vec2(force,0), bernie.body.GetWorldCenter());
       
      for(var i=0; i<actors.length; i++){

          var body  = actors[i].body;
          var sprite = actors[i].sprite;
          var p = body.GetPosition();
          sprite.x = p.x *100;   // updating sprite
          sprite.y = p.y *100;
          sprite.rotation = body.GetAngle()*180/Math.PI;
          
      }
       
  }

  function removeActors(){
     // eliminar de la lista de cuerpos de Box2D y su correspondiente Sprite
      for (var i =0; i < destroy_list.length; i++) {
        var body = destroy_list[i];
        stage.removeChild(body.sprite);

        /*for (var actor in actors){
          if (actor.body == body){
            actors.splice()
          }

        }*/
        world.DestroyBody(body);

      }
      // resetear la lista de
      destroy_list=[];
  }
         
function onKEY_DOWN (e)          {

    if(e.keyCode == 37) KEY_LEFT = true;               
    if(e.keyCode == 38) KEY_UP = true;
    if(e.keyCode == 39) KEY_RIGHT = true;
    if(e.keyCode == 40) KEY_DOWN = true;
    if(e.keyCode == 32) {
      KEY_SPACE = true;
      dispara();
    }
}
          
function onKEY_UP (e){
    if(e.keyCode == 37) KEY_LEFT = false;
    if(e.keyCode == 38) KEY_UP = false;
    if(e.keyCode == 39) KEY_RIGHT = false;
    if(e.keyCode == 40) KEY_DOWN = false;
    if(e.keyCode == 40) KEY_SPACE = false;
}

function onEnterFrameText(e)     {
         var texto = e.target;
         texto.x += 2;         
    }

     
function crearFondo(){
  // background
    //var bg = new Bitmap( new BitmapData("winter2.jpg") );
    var bg = new Bitmap( new BitmapData() );
    bg.scaleX = bg.scaleY = stage.stageHeight/512;
    stage.addChild(bg);


   
    // 1 metro = 100 pixels

    var bxFixDef   = new b2FixtureDef();   // box  fixture definition
    bxFixDef.shape = new b2PolygonShape();    
    bxFixDef.density  = 1;

    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_staticBody;

    // create ground
    bxFixDef.shape.SetAsBox(10, 1);
    bodyDef.position.Set(9, stage.stageHeight/100 + 1);
    var bodyGround = world.CreateBody(bodyDef);
    bodyGround.nombre = 'suelo';
    bodyGround.CreateFixture(bxFixDef);


    // left wall
    bxFixDef.shape.SetAsBox(1, 100);
    bodyDef.position.Set(-1, 3);
    var bodyleft = world.CreateBody(bodyDef);
    bodyleft.nombre = 'left';
    bodyleft.CreateFixture(bxFixDef);

    // right wall
    bxFixDef.shape.SetAsBox(1, 100);
    bodyDef.position.Set(stage.stageWidth/100 + 1, 3);
    var bodyRight = world.CreateBody(bodyDef)
    bodyRight.nombre ='right';
    bodyRight.CreateFixture(bxFixDef);
}
     