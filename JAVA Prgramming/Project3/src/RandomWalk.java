import java.awt.Point;
import java.util.ArrayList;
import java.util.Random;
/**
 * 
 * @author ypariyar
 *
 */
public class RandomWalk {
	//attributes
	private long seed;
	private int gridSize;
	private Random rand;
	private Point startingPoint;
	private Point endingPoint;
	ArrayList<Point> path;
	private boolean done;
	private Point local;
/*constructor
 * Initializes the instance variables and the starting point of the walk,
 *  but doesn't create the walk. Creates a random number generator with a seed.
 * 
 */
	public RandomWalk(int gridSize, long seed) {
		rand = new Random(seed);
		this.gridSize = gridSize;
		this.seed = seed;
		startingPoint = new Point(0, 0);
		path = new ArrayList<Point>();
		path.add(startingPoint);
		endingPoint = new Point(gridSize - 1, gridSize - 1);
		done=false;
	}
	/*
	 * Initializes the instance variables and the starting point of the walk,
	 *  but doesn't create the walk. Creates a random number generator without a seed.
	 */

	public RandomWalk(int gridSize) {
		rand = new Random();
		this.gridSize = gridSize;
		startingPoint = new Point(0, 0);
		path = new ArrayList<Point>();
		path.add(startingPoint);
		endingPoint = new Point(gridSize - 1, gridSize - 1);
		done = false;

	}

	public void createWalk() {
		while (!done) {
			step();
			
			
		}
		
	}
	/*
	 * If the path gets stuck, clear the path and start over at [0,0].
	 */
	public boolean stuck(){
		local = path.get(path.size() - 1);
		if(local.x-1>=0){
			if(!path.contains(new Point(local.x-1,local.y)))
				return false;
		}
		if(local.x+1<=endingPoint.x){
			if(!path.contains(new Point(local.x+1,local.y)))
				return false;
		}
		if(local.y-1>=0){
			if(!path.contains(new Point(local.x,local.y-1)))
				return false;
		}
		if(local.y+1<=endingPoint.y){
			if(!path.contains(new Point(local.x,local.y+1)))
				return false;
		}
		return true;

		
		
	}
	/*Makes the walk go one more step.
	 * 
	 */

	public void step() {
		
		int rand1 = rand.nextInt(4);
		local = path.get(path.size() - 1);

		if (rand1 == 1) {
			if (local.x < endingPoint.x) {
				local = new Point(local.x + 1, local.y);
				
				if(!path.contains(local)){
					path.add(local);
				}
				
			}
		} else if(rand1==2) {
			
			if (local.y < endingPoint.y) {
				local = new Point(local.x, local.y + 1);
				
				if(!path.contains(local)){
					path.add(local);
				}
				
			}
		
		}
		else if(rand1==3){
			if(local.y>0){
				local = new Point(local.x, local.y - 1);
				if(!path.contains(local)){
					path.add(local);
				}
				
				
			}
			
		}
		else{
			if(local.x>0){
				local = new Point(local.x - 1, local.y);
				if(!path.contains(local)){
					path.add(local);
				}
				
			}
		}
		if(stuck()){
			System.out.println("Stuck");
			path.clear();
			path.add(startingPoint);
			}
		if (local.x == endingPoint.x && local.y == endingPoint.y) {
			done = true;
		}
		
		
		

	}
    //Returns true if the random walk is complete.
	
	public boolean isDone() {
		return done;
	}
	//Getter to get reference to the random walk path.

	public ArrayList<Point> getPath() {
		return path;
	}
	
	
	//Returns the path as a nicely formatted string as shown below:
	public String toString(){
		String pa=""
	
				;
		  for(Point p:path){
			  pa=pa + "[" + p.x + "," + p.y +"] ";
		  }
		  return pa;
	  }
	
  
}
