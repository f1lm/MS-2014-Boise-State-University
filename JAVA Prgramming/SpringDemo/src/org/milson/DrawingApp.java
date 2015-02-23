package org.milson;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class DrawingApp {

	public static void main(String[] args) {
		// Triangle triangle = new Triangle();
		// BeanFactory factory = new XmlBeanFactory(new
		// FileSystemResource("spring.xml"));
		// Triangle triangle = (Triangle) factory.getBean("triangle");

		// ApplicationContext context = new ClassPathXmlApplicationContext(
		// "spring.xml");
		// Triangle triangle = (Triangle) context.getBean("triangle");
		// triangle.draw();

		// Point pointA = new Point();
		// pointA.setX(100);
		// pointA.setY(0);
		//
		// Triangle triangle = new Triangle();
		// triangle.setPointA(pointA);
		// triangle.draw();

		ApplicationContext context = new ClassPathXmlApplicationContext(
				"spring.xml");

		Triangle triangle = (Triangle) context.getBean("triangle");

		// Alias
		// Triangle triangle = (Triangle) context.getBean("triangle-alias");

		// Point point = (Point) context.getBean("zeroPoint");
		// System.out.println(point.getX());

		triangle.draw();

	}
}
