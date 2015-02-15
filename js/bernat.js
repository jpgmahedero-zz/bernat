
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

var soundID = "Thunder";
                
              
function preload_sonidos () {
    createjs.Sound.registerSound("audio/doh.ogg", soundID);
}

      function playSound (event) {
        console.log(event);
        createjs.Sound.play(soundID);
        console.log('sonido');
      }
          
function init() {   

    preload_sonidos();


    stage = new Stage("bernies_canvas");
    var texto = crearTexto();
    stage.addChild(texto);  

    
    stage.addEventListener(Event.ENTER_FRAME, onEnterFrame);
    stage.addEventListener(KeyboardEvent.KEY_DOWN, onKEY_DOWN);
    stage.addEventListener(KeyboardEvent.KEY_UP  , onKEY_UP);

    world = new b2World(new b2Vec2(0, 10),  true); 
    setUpCollisions(world);


    up = new b2Vec2(0, -4); // cuanto reacciona las bola al ratón

    crearFondo();  

    var options = {};
    for(var i = 0; i < 1; i++)     {

        options={shape:'ball', scale:0.5,width:269,height:269,random:true};
        alumno = crearActor(images[i],options);
        stage.addChild(alumno.sprite);
        actors.push(alumno);

    }
   
    options={shape:'box', scale:0.5,width:269,height:269,random:false, position:{x:2,y:1}};
    bernie = crearActor('Bernie.png',options);
    stage.addChild(bernie.sprite);
    actors.push(bernie);  

    bernie.sprite.addEventListener(MouseEvent.CLICK,playSound);  

              
    
}

function crearActor(image, options){

  var bodyDef = new b2BodyDef();
  bodyDef.type = b2Body.b2_dynamicBody;

  var fixtureDef = new b2FixtureDef();   

  if (options.shape == 'ball'){
    fixtureDef.shape = new b2CircleShape();
    fixtureDef.shape.SetRadius(options.scale);
  }else{
    fixtureDef.shape = new b2PolygonShape();
    fixtureDef.shape.SetAsBox(1,1);
  }

  if (options.random == true){
    bodyDef.position.Set(Math.random()*7, -5 + Math.random()*5);
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
    //sprite.scaleX = sprite.scaleY = 0.3 + Math.random()*0.7;    // "half width"
    sprite.scaleX = sprite.scaleY = options.scale;    // "half width"
    sprite.addChild(bitmap);
    sprite.addEventListener(MouseEvent.MOUSE_MOVE, Jump);  

    
   
    var actor={};

    actor.body = body;
    actor.sprite =  sprite;
    actor.sprite.body = body;

   
    return actor;



}

function setUpCollisions(world){
  var listener = new Box2D.Dynamics.b2ContactListener;
    listener.BeginContact = function(contact) {
      console.log(contact);
        console.log(contact.GetFixtureA().GetBody().GetUserData());
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
      
    /*switch ( moveState )
    {
      case MS_LEFT:  if ( vel.x > -5 ) force = -50;  break;
      case MS_STOP:  force = vel.x * -10; break;
      case MS_RIGHT: if ( vel.x <  5 ) force =  50; break;
    }*/
    bernie.body.ApplyForce(new b2Vec2(force,0), bernie.body.GetWorldCenter());
    //body->ApplyForce( b2Vec2(force,0), body->GetWorldCenter() );

       
      for(var i=0; i<actors.length; i++){

          var body  = actors[i].body;
          var sprite = actors[i].sprite;
          var p = body.GetPosition();
          sprite.x = p.x *100;   // updating sprite
          sprite.y = p.y *100;
          sprite.rotation = body.GetAngle()*180/Math.PI;
      }
      //bernie.body.x =bernie.sprite.x +=speed;
      //bernie.body.rotation = bernie.sprite.rotation = angle*180/Math.PI;
       
  }
         
function onKEY_DOWN (e)          {
    console.log(e.keyCode)
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

      function onEnterFrameText(e) 
          {
               var texto = e.target;
               //texto.x += 2;
               texto.text = speed;
          }

          function Jump(e)
          {
               var sprite = e.currentTarget;  // current sprite
               
              // var actor = actors.indexOf(i);
               //  cursor might be over ball bitmap, but not over a real ball
               //if (i>=65 && Math.sqrt(a.mouseX*a.mouseX + a.mouseY*a.mouseY) > 10) 
                //return;

               sprite.body.ApplyImpulse(up, sprite.body.GetWorldCenter());
          }

function crearTexto(){
  var f1 = new TextFormat("Times new Roman", 45, 0x880099, true, true);
   
  var t1;
  
  t1   = new TextField();
  t1.selectable = false; // default is true
  t1.setTextFormat(f1);
  t1.text = "Hi ha coses a la vida que són evitables....";
  t1.width = t1.textWidth; 
  t1.height = t1.textHeight;
  t1.x = t1.y = 309;
  t1.addEventListener(Event.ENTER_FRAME, onEnterFrameText);

  return t1;
 

}






function dispara(){

    var foto ='yoandy.png';
    
    
    
    

  /*  
    var p = cannon.body.GetPosition();


    bola.sprite.x = p.x *100;   // updating sprite
    bola.sprite.y = p.y *100;
    bola.sprite.rotation = bola.body.GetAngle()*180/Math.PI;
*/
    
      options={shape:'ball', scale:0.5,width:200,height:269,random:false, position:{x:1,y:1}};

    bola = crearActor('yoandy.png',options);
    bola.body.SetPositionAndAngle(new b2Vec2(2,1),0);
    stage.addChild(bola.sprite);
    actors.push(bola);

    bola.sprite.addEventListener(MouseEvent.CLICK, function(){
      
      //angle = cannon.body.GetAngle();
      console.log('cannon.body.GetAngle():'+cannon.body.GetAngle());
      console.log('cannon.body.rotation:'+cannon.body.rotation);
      //console.log('cannon.sprite.rotation:'+cannon.sprite.rotation);
      
      var x = Math.cos(cannon.body.rotation)/1;
      var y = Math.sin(cannon.body.rotation)/1;
      console.log('x:'+ x +  '  y:'+y);
      bola.sprite.body.ApplyImpulse(new b2Vec2( x*10,y), bola.sprite.body.GetWorldCenter())
      
      console.log("eeeee2");
      
    });  
   
  

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
    world.CreateBody(bodyDef).CreateFixture(bxFixDef);


    // left wall
    bxFixDef.shape.SetAsBox(1, 100);
    bodyDef.position.Set(-1, 3);
    world.CreateBody(bodyDef).CreateFixture(bxFixDef);

    // right wall
    bxFixDef.shape.SetAsBox(1, 100);
    bodyDef.position.Set(stage.stageWidth/100 + 1, 3);
    world.CreateBody(bodyDef).CreateFixture(bxFixDef);
}
     