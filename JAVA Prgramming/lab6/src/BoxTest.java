import java.util.Random;




public class BoxTest {

	public static void main(String[] args){
		double width=4;
		 double height=5;
		 double depth=2;
		 
		 Box mybox=new Box(width, height, depth);
		 System.out.println("mybox"+mybox.toString());
		 
		 
		 mybox.setWidth(2);
		 mybox.setHeight(3);
		 mybox.setDepth(1);
		
		 mybox.setVolume();
			
		 mybox.setFull(true);
		 
		 System.out.println("mybox: " +mybox.toString());
		 System.out.println("surface area : " + mybox.surfaceArea()+ " volume: " +mybox.volume());
		 Random rand=new Random();
		 int i;
		 Box boxMax=new Box(0,0,0);
		 double maxVolume=0;
		 for(i=1;i<=5;i++){
			 
		width=rand.nextDouble();
		height=rand.nextDouble();
		depth=rand.nextDouble();
		boolean full=rand.nextBoolean();
		Box box1=new Box(width, height, depth);
		box1.setFull(full);
		box1.setVolume();//setting volume to printls
		
		box1.setName("box" + i);
		System.out.println("\n"+box1.toString());
		
		if(box1.volume()>boxMax.volume()){
			
		boxMax=box1;	
		}
		
		
		 }
		 System.out.println(boxMax);
	}
	
}
