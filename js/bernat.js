
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

var l=false, r=false, u, d, speed=1, angle=0;
var cannon={};
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
    up = new b2Vec2(0, -4); // cuanto reacciona las bola al ratón

    crearFondo();  

    var options = {};
    for(var i = 0; i < 1; i++)     {

        options={shape:'ball', scale:0.5,width:269,height:269,random:true};
        alumno = crearActor(images[i],options);
        stage.addChild(alumno.sprite);
        actors.push(alumno);

    }
    options={shape:'box', scale:0.5,width:200,height:269,random:false, position:{x:1,y:1}};
    cannon = crearActor('cannon.png',options);
    stage.addChild(cannon.sprite);
    actors.push(cannon);
    
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
    sprite.scaleX = sprite.scaleY = 1;    // "half width"
    sprite.addChild(bitmap);
    sprite.addEventListener(MouseEvent.MOUSE_MOVE, Jump);  
    
   
    var actor={};

    actor.body = body;
    actor.sprite =  sprite;
    actor.sprite.body = body;

   
    return actor;



}
  
  function onEnterFrame(e) {
      world.Step(1 / 60,  3,  3);
      world.ClearForces();

      if(u) speed += 1;
      if(d) speed -= 1;
      
      if(r) angle += 0.03;
      if(l) angle -= 0.03;
          
      
       
       
      for(var i=0; i<actors.length; i++){

          var body  = actors[i].body;
          var sprite = actors[i].sprite;
          var p = body.GetPosition();
          sprite.x = p.x *100;   // updating sprite
          sprite.y = p.y *100;
          sprite.rotation = body.GetAngle()*180/Math.PI;
      }

      cannon.body.rotation = cannon.sprite.rotation = angle*180/Math.PI;
       
  }
         
function onKEY_DOWN (e)          {
    console.log(e.keyCode)
    if(e.keyCode == 37) l = true;               
    if(e.keyCode == 38) u = true;
    if(e.keyCode == 39) r = true;
    if(e.keyCode == 40) d = true;
    if(e.keyCode == 32) {
      KEY_SPACE = true;
      dispara();
    }
}
          
function onKEY_UP (e){
    if(e.keyCode == 37) l = false;
    if(e.keyCode == 38) u = false;
    if(e.keyCode == 39) r = false;
    if(e.keyCode == 40) d = false;
    if(e.keyCode == 40) KEY_SPACE = false;
}

      function onEnterFrameT1(e) 
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
  t1.text = "Bernie's 110010's";
  t1.width = t1.textWidth; 
  t1.height = t1.textHeight;
  t1.x = t1.y = 309;
  t1.addEventListener(Event.ENTER_FRAME, onEnterFrameT1);

  return t1;
 

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

function dispara(){

    var foto ='yoandy.png';
    var bola = crearAlumno('yoandy');
    //cannon.body.SetPosition(2,1);
    
    bola.body.SetPositionAndAngle(new b2Vec2(1,1),0);
    
    

    
    var p = bola.body.GetPosition();


    bola.sprite.x = p.x *100;   // updating sprite
    bola.sprite.y = p.y *100;
    bola.sprite.rotation = bola.body.GetAngle()*180/Math.PI;


  stage.addChild(bola.sprite);
  actors.push(bola);



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
     