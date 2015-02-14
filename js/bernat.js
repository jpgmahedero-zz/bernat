
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
var fotos = [ 
'cannon.png',
'abdullah.png',
              'abraham.png',
              'ahmed.png',
              'ayoub.png',
              'Bernie.png',
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

var l, r, u, d, speed=1, angle=1;
var cannonBody, cannonActor;

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

  console.log(fotos.length);

  var stage = new Stage("bernies_canvas");
  var texto = crearTexto();
  stage.addChild(texto);  

  
  stage.addEventListener(Event.ENTER_FRAME, onEnterFrame);

  // background
  //var bg = new Bitmap( new BitmapData("winter2.jpg") );
  var bg = new Bitmap( new BitmapData() );
  bg.scaleX = bg.scaleY = stage.stageHeight/512;
  stage.addChild(bg);
  stage.addEventListener(KeyboardEvent.KEY_DOWN, onKD);
  stage.addEventListener(KeyboardEvent.KEY_UP  , onKU);


  world = new b2World(new b2Vec2(0, 10),  true); 
  up = new b2Vec2(0, -4); // cuanto reacciona las bola al ratón

  // 1 metro = 100 pixels

  var bxFixDef   = new b2FixtureDef();   // box  fixture definition
  bxFixDef.shape = new b2PolygonShape();

  var ballFixDef   = new b2FixtureDef();   // ball fixture definition
  ballFixDef.shape = new b2CircleShape();

  bxFixDef.density   = ballFixDef.density = 1;

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


  bodyDef.type = b2Body.b2_dynamicBody;


  for(var i = 0; i < 1; i++)     {

    crearFoto(stage,fotos[i]);

  }
  
 cannonBody = crearCanon(stage);
  
}


  
  function onEnterFrame(e) {
       world.Step(1 / 60,  3,  3);
       world.ClearForces();
       
       //speed *= 0.9;
       if(u) speed += 1+speed*0.06;
       if(d) speed -= 1;
       
       //if(r) angle += speed * 0.003;
       //if(l) angle -= speed * 0.003;

       if(r) angle += 1;
       if(l) angle -= 1;

       var angulo = angle*180/Math.PI;
       //cannon.rotation = angulo;
       //cannon.rotation +=1;// angulo;
       //cannon.rotation = cannon.actor.rotation =10;// angulo;
       //cannon.actor.rotation +=1;// angulo;
       
       console.log("angle:"+angle);
       console.log("speed:"+speed);
       
       p = cannonBody.GetPosition();
       cannonActor.x = p.x*100;
       cannonActor.y = p.y*100;
       cannonActor.rotation = angulo*180/Math.PI;


       for(var i=0; i<actors.length; i++)
       {
            var body  = bodies[i];
            var actor = actors [i];
            var p = body.GetPosition();
            actor.x = p.x *100;   // updating actor
            actor.y = p.y *100;
            actor.rotation = body.GetAngle()*180/Math.PI;
       }
       //t1.x += 1;
       
  }
         
 function onKD (e)
          {
               //console.log(e.keyCode)
               if(e.keyCode == 37) l = true;               
               if(e.keyCode == 38) u = true;
               if(e.keyCode == 39) r = true;
               if(e.keyCode == 40) d = true;
          }
          
          function onKU (e)
          {
               if(e.keyCode == 37) l = false;
               if(e.keyCode == 38) u = false;
               if(e.keyCode == 39) r = false;
               if(e.keyCode == 40) d = false;
          }

      function onEnterFrameT1(e) 
          {
               var texto = e.target;
               texto.x += 2;
          }

          function Jump(e)
          {
               var a = e.currentTarget;  // current actor
               
               var i = actors.indexOf(a);
               //  cursor might be over ball bitmap, but not over a real ball
               //if (i>=65 && Math.sqrt(a.mouseX*a.mouseX + a.mouseY*a.mouseY) > 10) 
                //return;
               bodies[i].ApplyImpulse(up, bodies[i].GetWorldCenter());
          }

function crearTexto(){
  var f1 = new TextFormat("Times new Roman", 45, 0x880099, true, true);
   
  var t1;
  
  t1   = new TextField();
  t1.selectable = false; // default is true
  t1.setTextFormat(f1);
  t1.text = "Bernie's 110010's";
  t1.width = t1.textWidth; 
  t1.height = t1.textHeight;
  t1.x = t1.y = 20;
  t1.addEventListener(Event.ENTER_FRAME, onEnterFrameT1);

  return t1;
 

}


function crearFoto(stage, nomFoto){

  var bodyDef = new b2BodyDef();
  bodyDef.type = b2Body.b2_dynamicBody;

  var ballFixDef   = new b2FixtureDef();   // ball fixture definition
  ballFixDef.shape = new b2CircleShape();

  // 1. Define a body with position, damping, etc.
    bodyDef.position.Set(Math.random()*7, -5 + Math.random()*5);

    // 2. Use the world object to create the body.
    var body = world.CreateBody(bodyDef);

    // 3. Define fixtures with a shape, friction, density, etc.
    // FUERA DEL BLUCLE. COMPARTIDO POR TODAS LAS INSTANCIAS
    // var ballFixDef   = new b2FixtureDef();   // ball fixture definition
    //  ballFixDef.shape = new b2CircleShape();               
    //  bxFixDef.density   = ballFixDef.density = 1;
    //var scale = 0.2 + Math.random()*0.3;    
    var scale = 0.5;   
    ballFixDef.shape.SetRadius(scale);

    // 4.                   Create fixtures on the body.
    body.CreateFixture(ballFixDef);    // ball
    bodies.push(body);


    // PARTE DE LA LIBRERIA IVANK 
    //var nomFoto =  fotos[2]; // incluir cada foto 1 vez
    var bitmapData = new BitmapData("images/" + nomFoto);
    var bitmap = new Bitmap( bitmapData);  
    bitmap.x = bitmap.y = -134;
    bitmap.name = nomFoto;


    var actor = new Sprite(); 
    actor.scaleX = actor.scaleY =0.3 + Math.random()*0.7;    // "half width"
    if (nomFoto == 'Bernie.png')
      actor.scaleX = actor.scaleY = 0.8;    // "half width"
    actor.addChild(bitmap);

    actor.addEventListener(MouseEvent.MOUSE_MOVE, Jump);  
    //bitmap.addEventListener(MouseEvent.CLICK, playSound);  

    if (nomFoto === 'Bernie.png'){
      bitmap.addEventListener(MouseEvent.CLICK, playSound);  
      console.log("bitmap.addEventListener(MouseEvent.CLICK, playSound);  ");
    }

    stage.addChild(actor);
    actors.push(actor);


    cannonActor = actor;
    cannonBody = body;



}

function crearCanon(stage){


  var bodyDef = new b2BodyDef();
  bodyDef.type = b2Body.b2_dynamicBody;

  var ballFixDef   = new b2FixtureDef();   // ball fixture definition

  ballFixDef.shape = new b2PolygonShape();

  // 1. Define a body with position, damping, etc.
    bodyDef.position.Set(Math.random()*7, -5 + Math.random()*5);
    bodyDef.position.Set(10,0);
    // 2. Use the world object to create the body.
    var body = world.CreateBody(bodyDef);

    var scale = 0.5;   
     ballFixDef.shape.SetAsBox(1,1);
    //ballFixDef.shape.SetRadius(0.5);

    // 4.                   Create fixtures on the body.
    body.CreateFixture(ballFixDef);    // ball
    bodies.push(body);


    // PARTE DE LA LIBRERIA IVANK 
    //var nomFoto =  fotos[2]; // incluir cada foto 1 vez
    var bitmapData = new BitmapData("images/cannon.png");
    var bitmap = new Bitmap( bitmapData);  
    bitmap.x = -134;
    bitmap.y = -269;
    bitmap.name = 'cannon';


    var actor = new Sprite(); 
    actor.scaleX = actor.scaleY = 1;
    actor.addChild(bitmap);
    actor.addEventListener(MouseEvent.MOUSE_MOVE, Jump);  
    //actor.rotation=10;


    stage.addChild(actor);
    actors.push(actor);

    

return body;


}

function debugDraw(){

  var debugDraw = new b2DebugDraw();
debugDraw.SetSprite(document.getElementById("c").getContext("2d"));
debugDraw.SetDrawScale(SCALE);
debugDraw.SetFillAlpha(0.3);
debugDraw.SetLineThickness(1.0);
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
world.SetDebugDraw(debugDraw)
}
/*
          applyImpulse = function(bodyId, degrees, power) {
    var body = this.bodiesMap[bodyId];
    body.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power,
                                 Math.sin(degrees * (Math.PI / 180)) * power),
                                 body.GetWorldCenter());

}*/
     