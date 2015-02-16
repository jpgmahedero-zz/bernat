var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

var world;
var bodies = []; // instances of b2Body (from Box2D)
var actors = []; // instances of Bitmap (from IvanK)
var up;
var act = [];
var destroy_list = [];
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

var KEY_LEFT = false,
    KEY_RIGHT = false,
    KEY_UP = false,
    KEY_DOWN = false,
    speed = 1,
    angle = 0;
var bernie = {};
var estadoCannon = 'parado';

var doh = "doh";
var doh32 = "doh32";
var crash = "doh32";

function preload_doh() {
    createjs.Sound.registerSound("audio/doh.ogg", doh);
}

function preload_doh32() {

    createjs.Sound.registerSound("audio/doh32.wav", doh32);
}

function preload_crash() {

    createjs.Sound.registerSound("audio/crash.wav", crash);
}

function playSoundDoh(sound) {
    createjs.Sound.play(doh);
}

function playSoundDoh32(sound) {
    createjs.Sound.play(doh32);
}

function playSoundCrash(sound) {
    createjs.Sound.play(crash);
}

function init() {

    preload_doh();

    stage = new Stage("bernies_canvas");

    stage.addEventListener(Event.ENTER_FRAME, onEnterFrame);
    stage.addEventListener(KeyboardEvent.KEY_DOWN, onKEY_DOWN);
    stage.addEventListener(KeyboardEvent.KEY_UP, onKEY_UP);

    world = new b2World(new b2Vec2(0, 2), true);
    setUpCollisions(world);


    up = new b2Vec2(0, -4); // cuanto reacciona las bola al ratón

    crearFondo();
    // pause 3s
    crearBernie();
    crearTextoIntro1(); // "Hi ha coses ala vida..."
    // pausa 10s
    crearTextoIntro2(); // "...que son evitables"

    crearAlumnos();

    crearTextoPiano(); // " D'altres no tant..."
    crearPiano();

    // pausa 3s
    crearTextoYoandy(); // " D'altres son impossible!!"
    dispararYoandys();

    // pausa 3s
    //crearTextoFelitats1(); // " Altres tambe son invenitables pero mes agradables"
    // pausa 3s
    //crearTextoFelitats2(); // " Felicitats 110010s"
    //crearSSD();
}

function crearBernie() {
    var options = {};
    options = {
        shape: 'box',
        scale: 0.5,
        width: 269,
        height: 269,
        random: false,
        position: {
            x: 5,
            y: 0
        }
    };
    bernie = crearActor('Bernie.png', options);
    stage.addChild(bernie.sprite);
    actors.push(bernie);

    bernie.sprite.addEventListener(MouseEvent.CLICK, playSoundDoh);

}

function crearAlumnos() {

    // pausa 1s cada alumno
    for (var i = 0; i < 40; i++) {

        options = {
            shape: 'ball',
            scale: 0.5,
            width: 269,
            height: 269,
            random: true
        };
        alumno = crearActor(images[i], options);
        stage.addChild(alumno.sprite);
        actors.push(alumno);
    }
}


function crearActor(image, options) {

    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;

    var fixtureDef = new b2FixtureDef();

    if (options.shape == 'ball') {
        fixtureDef.shape = new b2CircleShape();
        fixtureDef.shape.SetRadius(options.scale);
        fixtureDef.restitution = 1;
        fixtureDef.friction = 0.3
        fixtureDef.density = 1
    } else {
        fixtureDef.shape = new b2PolygonShape();
        fixtureDef.shape.SetAsBox(1, 1);
        fixtureDef.restitution = 1;
        fixtureDef.friction = 0.3
        fixtureDef.density = 1
    }

    if (options.random == true) {
        bodyDef.position.Set(Math.random() * 7, -5 + Math.random() * 5);
        //Math.random() * (max - min) + min;
        // bodyDef.angle = Math.random() * (2*Math.PI - 0) + 0;
        bodyDef.angle = Math.random() * Math.PI * 2;
        bodyDef.angle = 0;

    } else {
        bodyDef.position.Set(options.position.x, options.position.y);
        //bodyDef.position.Set(1,1);
    }
    var body = world.CreateBody(bodyDef);
    body.CreateFixture(fixtureDef); // ball

    var bitmapData = new BitmapData("images/" + image);
    var bitmap = new Bitmap(bitmapData);
    bitmap.x = -options.width / 2;
    bitmap.y = -options.height / 2;


    var sprite = new Sprite();
    //sprite.scaleX = sprite.scaleY = 0.3 + Math.random()*0.7;    // "half width"
    sprite.scaleX = sprite.scaleY = options.scale; // "half width"
    sprite.addChild(bitmap);
    sprite.rotation = body.GetAngle() * 180 / Math.PI;
    //sprite.addEventListener(MouseEvent.MOUSE_MOVE, Jump);



    var actor = {};

    body.nombre = image;
    body.sprite = sprite;

    actor.body = body;
    actor.sprite = sprite;
    var force;
    if (options.random) {
        force = 3;
        if (Math.random() > 0.5) {
            force *= -1;
        }

        body.ApplyImpulse(new b2Vec2(force, 0), body.GetWorldCenter());
    }

    return actor;



}

function crearPiano() {
    var options = {};
    options = {
        shape: 'box',
        scale: 0.5,
        width: 269,
        height: 313,
        random: false,
        position: {
            x: bernie.body.GetPosition().x,
            y: 0
        }
    };
    var piano = crearActor('piano.png', options);
    stage.addChild(piano.sprite);
    actors.push(piano);

}

function dispararYoandys() {

    playSoundCrash();
    for (var i = 0; i < 100; i++) {
        var options = {};
        options = {
            shape: 'ball',
            scale: 0.5,
            width: 269,
            height: 313,
            random: false,
            position: {
                x: bernie.body.GetPosition().x + 1,
                y: 0
            }
        };
        var yoandy = crearActor('yoandy.png', options);
        stage.addChild(yoandy.sprite);
        actors.push(yoandy);
    }
}

function setUpCollisions(world) {
    var listener = new Box2D.Dynamics.b2ContactListener;
    listener.BeginContact = function(contact) {
        var bodyA = contact.GetFixtureA().GetBody();
        var bodyB = contact.GetFixtureB().GetBody();

        //console.log(bodyA.nombre + " <---> " + bodyB.nombre);
        if (bodyA.nombre == 'suelo' && bodyA.nombre != 'Bernie.png') {
            destroy_list.push(bodyB);
        }

        if (bodyA.nombre == 'Bernie.png' || bodyB.nombre == 'Bernie.png') {
            if (bodyA.nombre == 'Piano.png' || bodyB.nombre == 'Piano.png') {
                playSoundDoh();
            } else {
                playSoundCrash();
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
    world.Step(1 / 60, 3, 3);
    world.ClearForces();
    removeActors();
    var vel = bernie.body.GetLinearVelocity(); // vel = body->GetLinearVelocity();
    var force = 0;
    if (KEY_LEFT) {
        if (vel.x > -5) force = -50;
    } else
        // TODO: Possible bug en aquest else ??
        if (KEY_RIGHT) {
            if (vel.x < 5) force = 50;
        } else {
            force = vel.x * -10;
        }

        bernie.body.ApplyForce(new b2Vec2(force, 0), bernie.body.GetWorldCenter());

        for (var i = 0; i < actors.length; i++) {

            var body = actors[i].body;
            var sprite = actors[i].sprite;
            var p = body.GetPosition();
            sprite.x = p.x * 100; // updating sprite
            sprite.y = p.y * 100;
            sprite.rotation = body.GetAngle() * 180 / Math.PI;
        }
}

function removeActors() {
    // eliminar de la lista de cuerpos de Box2D y su correspondiente Sprite
    for (var i = 0; i < destroy_list.length; i++) {
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
    destroy_list = [];
}

function onKEY_DOWN(e) {
    console.log(e.keyCode)
    if (e.keyCode == 37) KEY_LEFT = true;
    if (e.keyCode == 38) KEY_UP = true;
    if (e.keyCode == 39) KEY_RIGHT = true;
    if (e.keyCode == 40) KEY_DOWN = true;
    if (e.keyCode == 32) {
        KEY_SPACE = true;
        dispara();
    }
}

function onKEY_UP(e) {
    if (e.keyCode == 37) KEY_LEFT = false;
    if (e.keyCode == 38) KEY_UP = false;
    if (e.keyCode == 39) KEY_RIGHT = false;
    if (e.keyCode == 40) KEY_DOWN = false;
    if (e.keyCode == 40) KEY_SPACE = false;
}

function onEnterFrameText(e) {
    var texto = e.target;
    texto.x += 2;
}

function crearTexto(text, x, y, textFormat) {

    var textField = new TextField();
    textField.selectable = false; // default is true
    textField.setTextFormat(textFormat);
    textField.text = text;
    textField.width = textField.textWidth;
    textField.height = textField.textHeight;
    textField.x = 0;
    textField.y = 100;
    textField.addEventListener(Event.ENTER_FRAME, onEnterFrameText);
    stage.addChild(textField);
}

function crearTextoIntro1() {
    var tf = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("Hi ha coses a la vida...", 0, 100, tf);

}

function crearTextoIntro2() {
    var tf = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("...que es poden evitar", 0, 150, tf);
    f1 = new TextFormat("Times new Roman", 20, 0x880099, true, true);
    crearTexto("fes servir els cursors", 0, 190, tf);
}

function crearTextoPiano() {
    var tf = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("... d'altres no tant", 0, 200, tf);

}

function crearTextoYoandy() {
    var tf = new TextFormat("Times new Roman", 60, 0x880099, true, true);
    crearTexto("... y d'altres son IMPOSSIBLE D'EVITAR!!", 0, 200, tf);
}


function crearFondo() {
    // background
    //var bg = new Bitmap( new BitmapData("winter2.jpg") );
    var bg = new Bitmap(new BitmapData());
    bg.scaleX = bg.scaleY = stage.stageHeight / 512;
    stage.addChild(bg);

    // 1 metro = 100 pixels

    var bxFixDef = new b2FixtureDef(); // box  fixture definition
    bxFixDef.shape = new b2PolygonShape();
    bxFixDef.density = 1;

    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_staticBody;

    // create ground
    bxFixDef.shape.SetAsBox(10, 1);
    bodyDef.position.Set(9, stage.stageHeight / 100 + 1);
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
    bodyDef.position.Set(stage.stageWidth / 100 + 1, 3);
    var bodyRight = world.CreateBody(bodyDef)
    bodyRight.nombre = 'right';
    bodyRight.CreateFixture(bxFixDef);
}
