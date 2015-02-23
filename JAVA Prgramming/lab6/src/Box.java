

import java.text.DecimalFormat;

public class Box
{
	private double width;
	private double height;
	private double depth;
	private boolean full;
	private double volume;
	private double surfaceArea;
	private String name;
	
	public Box(double width, double height, double depth)
	{
		this.width=width;
		this.height=height;
		this.depth=depth;
		this.volume=depth*height*width;
		full = false;
		
	}
 public void setWidth(double newWidth){
	 this.width=newWidth;
 }
 public void setHeight(double newHeight){
	 this.height=newHeight;
 }
 public void setDepth(double newDepth){
	 this.depth=newDepth;
 }
 public void setFull(boolean newFull){
	 this.full=newFull;
 }
 public void setName(String name){
	 this.name=name;
 }
 public void setVolume(){
	this.volume=volume;
 }
	public double getWidth(){
		
		return width;
		}
	public double getHeight(){
		return height;
	}
	public double getDepth(){
		return depth;
	}
	public boolean getFull(){
		return full;
	}
	public String getName(){
		return name;
	}
	public double volume(){
		//volume=width*height*depth;
		return volume;
	}
	public double surfaceArea(){
		surfaceArea=2*width*depth+2*width*height+2*depth*height;
		return surfaceArea;
	}
	DecimalFormat fmt1=new DecimalFormat("0.00");
	public String toString(){
		
		return (name + " width: " + fmt1.format(width) + " height: "+ fmt1.format(height) + " depth: " + fmt1.format(depth) + " full: "+full + " volume" + fmt1.format(volume));
	}
	
}
