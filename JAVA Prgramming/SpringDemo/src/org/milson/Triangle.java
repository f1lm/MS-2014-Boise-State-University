package org.milson;

import java.util.List;

public class Triangle {

	// private String type;
	// private int height;
	//
	// public void draw() {
	// System.out.println("Triangle Drawn : " + getType() + " with height : "
	// + getHeight());
	//
	// }
	//
	// public Triangle(int height) {
	// this.height = height;
	// }
	//
	// public Triangle(String type) {
	// this.type = type;
	// }
	//
	// public Triangle(String type, int height) {
	// this.type = type;
	// this.height = height;
	// }
	//
	// public String getType() {
	// return type;
	// }
	//
	// public int getHeight() {
	// return height;
	// }
	//
	// // public void setHeight(int height) {
	// // this.height = height;
	// // }
	//
	// // public void setType(String type) {
	// // this.type = type;
	// // }

	private Point pointA;
	public Triangle(Point pointA, Point pointB, Point pointC) {
		this.pointA = pointA;
		this.pointB = pointB;
		this.pointC = pointC;
	}

	private Point pointB;
	private Point pointC;

	public Point getPointA() {
		return pointA;
	}

	public void setPointA(Point pointA) {
		this.pointA = pointA;
	}

	public Point getPointB() {
		return pointB;
	}

	public void setPointB(Point pointB) {
		this.pointB = pointB;
	}

	public Point getPointC() {
		return pointC;
	}

	public void setPointC(Point pointC) {
		this.pointC = pointC;
	}

	public void draw() {
		System.out.println("Triangle Drawn : PointA ( " + getPointA().getX()
				+ ", " + getPointA().getY() + " )");
		System.out.println("PointB ( " + getPointB().getX() + ", "
				+ getPointB().getY() + " )");
		System.out.println("PointC ( " + getPointC().getX() + ", "
				+ getPointC().getY() + " )");

	}

	// private List<Point> points;
	//
	// public List<Point> getPoints() {
	// return points;
	// }
	//
	// public void setPoints(List<Point> points) {
	// this.points = points;
	// }
	//
	// public void draw() {
	// for (Point point : points) {
	// System.out.println("Point = " + point.getX() + ", " + point.getY());
	// }
	//
	// }

}
