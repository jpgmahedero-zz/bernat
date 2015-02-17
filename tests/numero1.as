package
{
	// import quick box2d
	import com.actionsnippet.qbox.*;

    // other stuff
    import flash.utils.Dictionary;
	import flash.utils.getDefinitionByName;


    public class PhysicsData extends Object
	{
		// ptm ratio
        public var ptm_ratio:Number = 32;
		
		// the physcis data 
		var dict:Dictionary;
		
        public function createBody(name:String, sim:QuickBox2D, xPos:Number, yPos:Number):QuickObject
        {
			var fixture:Array = dict[name][0];

           	return sim.addPoly({
                        x:xPos, y:yPos, 
                        density:fixture[0], 
                        friction:fixture[1], 
                        restitution:fixture[2],
                        categoryBits: fixture[3],
                        maskBits:fixture[4],
                        groupIndex: fixture[5],
                        verts:fixture[8],
						skin:getDefinitionByName(name)
                        });							
			}
		
        public function PhysicsData(): void
		{
			dict = new Dictionary();
			

			dict["numero1"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',
											[

                                                [   56/ptm_ratio, 1351/ptm_ratio  ,  84/ptm_ratio, 1340/ptm_ratio  ,  246/ptm_ratio, 1319/ptm_ratio  ,  1057/ptm_ratio, 1302/ptm_ratio  ,  1126/ptm_ratio, 1319/ptm_ratio  ,  0/ptm_ratio, 1439/ptm_ratio  ,  6/ptm_ratio, 1412/ptm_ratio  ,  24/ptm_ratio, 1379/ptm_ratio  ] ,
                                                [   989/ptm_ratio, 31/ptm_ratio  ,  1006/ptm_ratio, 51/ptm_ratio  ,  1024/ptm_ratio, 103/ptm_ratio  ,  1026/ptm_ratio, 1090/ptm_ratio  ,  523/ptm_ratio, 84/ptm_ratio  ,  634/ptm_ratio, 1/ptm_ratio  ,  921/ptm_ratio, 0/ptm_ratio  ,  956/ptm_ratio, 9/ptm_ratio  ] ,
                                                [   43/ptm_ratio, 1575/ptm_ratio  ,  20/ptm_ratio, 1550/ptm_ratio  ,  7/ptm_ratio, 1523/ptm_ratio  ,  1/ptm_ratio, 1496/ptm_ratio  ,  0/ptm_ratio, 1439/ptm_ratio  ,  1228/ptm_ratio, 1600/ptm_ratio  ,  107/ptm_ratio, 1600/ptm_ratio  ,  72/ptm_ratio, 1592/ptm_ratio  ] ,
                                                [   1318/ptm_ratio, 1544/ptm_ratio  ,  1302/ptm_ratio, 1565/ptm_ratio  ,  1254/ptm_ratio, 1594/ptm_ratio  ,  1228/ptm_ratio, 1600/ptm_ratio  ,  0/ptm_ratio, 1439/ptm_ratio  ,  1126/ptm_ratio, 1319/ptm_ratio  ,  1332/ptm_ratio, 1432/ptm_ratio  ,  1333/ptm_ratio, 1503/ptm_ratio  ] ,
                                                [   107/ptm_ratio, 484/ptm_ratio  ,  90/ptm_ratio, 464/ptm_ratio  ,  367/ptm_ratio, 193/ptm_ratio  ,  416/ptm_ratio, 170/ptm_ratio  ,  323/ptm_ratio, 515/ptm_ratio  ,  168/ptm_ratio, 514/ptm_ratio  ,  138/ptm_ratio, 505/ptm_ratio  ] ,
                                                [   165/ptm_ratio, 230/ptm_ratio  ,  237/ptm_ratio, 224/ptm_ratio  ,  90/ptm_ratio, 464/ptm_ratio  ,  72/ptm_ratio, 412/ptm_ratio  ,  71/ptm_ratio, 331/ptm_ratio  ,  84/ptm_ratio, 288/ptm_ratio  ,  112/ptm_ratio, 254/ptm_ratio  ,  139/ptm_ratio, 237/ptm_ratio  ] ,
                                                [   1254/ptm_ratio, 1594/ptm_ratio  ,  1302/ptm_ratio, 1565/ptm_ratio  ,  1281/ptm_ratio, 1582/ptm_ratio  ] ,
                                                [   634/ptm_ratio, 1/ptm_ratio  ,  523/ptm_ratio, 84/ptm_ratio  ,  556/ptm_ratio, 41/ptm_ratio  ,  571/ptm_ratio, 26/ptm_ratio  ,  592/ptm_ratio, 12/ptm_ratio  ] ,
                                                [   72/ptm_ratio, 412/ptm_ratio  ,  90/ptm_ratio, 464/ptm_ratio  ,  80/ptm_ratio, 446/ptm_ratio  ] ,
                                                [   1024/ptm_ratio, 103/ptm_ratio  ,  1006/ptm_ratio, 51/ptm_ratio  ,  1016/ptm_ratio, 69/ptm_ratio  ] ,
                                                [   1315/ptm_ratio, 1386/ptm_ratio  ,  1324/ptm_ratio, 1402/ptm_ratio  ,  1332/ptm_ratio, 1432/ptm_ratio  ,  1126/ptm_ratio, 1319/ptm_ratio  ,  1244/ptm_ratio, 1337/ptm_ratio  ,  1277/ptm_ratio, 1350/ptm_ratio  ,  1295/ptm_ratio, 1363/ptm_ratio  ] ,
                                                [   84/ptm_ratio, 288/ptm_ratio  ,  71/ptm_ratio, 331/ptm_ratio  ,  75/ptm_ratio, 310/ptm_ratio  ] ,
                                                [   302/ptm_ratio, 213/ptm_ratio  ,  90/ptm_ratio, 464/ptm_ratio  ,  237/ptm_ratio, 224/ptm_ratio  ] ,
                                                [   367/ptm_ratio, 193/ptm_ratio  ,  90/ptm_ratio, 464/ptm_ratio  ,  302/ptm_ratio, 213/ptm_ratio  ] ,
                                                [   480/ptm_ratio, 126/ptm_ratio  ,  1029/ptm_ratio, 1266/ptm_ratio  ,  1036/ptm_ratio, 1283/ptm_ratio  ,  320/ptm_ratio, 1281/ptm_ratio  ,  323/ptm_ratio, 515/ptm_ratio  ,  416/ptm_ratio, 170/ptm_ratio  ] ,
                                                [   1029/ptm_ratio, 1266/ptm_ratio  ,  480/ptm_ratio, 126/ptm_ratio  ,  523/ptm_ratio, 84/ptm_ratio  ,  1026/ptm_ratio, 1090/ptm_ratio  ] ,
                                                [   1057/ptm_ratio, 1302/ptm_ratio  ,  314/ptm_ratio, 1297/ptm_ratio  ,  320/ptm_ratio, 1281/ptm_ratio  ,  1036/ptm_ratio, 1283/ptm_ratio  ] ,
                                                [   1057/ptm_ratio, 1302/ptm_ratio  ,  295/ptm_ratio, 1309/ptm_ratio  ,  314/ptm_ratio, 1297/ptm_ratio  ] ,
                                                [   1057/ptm_ratio, 1302/ptm_ratio  ,  246/ptm_ratio, 1319/ptm_ratio  ,  295/ptm_ratio, 1309/ptm_ratio  ]
											]
										]

									];

		}
	}
}
