package org.olive;

import java.io.ObjectInputStream.GetField;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import org.olivepress.olives.Kalamata;
import org.olivepress.olives.Laguria;
import org.olivepress.olives.Olive;
import org.olivepress.press.PressOlive;

import InterfaceExample.OlivePress;

public class App {

	public static void main(String[] args) {

		ArrayList<Olive> olives = new ArrayList<>();

		// int[] a1 = new int[3];
		//
		// int a11[] = new int[3];
		//
		// int[] a3 = { 1, 2, 3, 4 };

		// String[][] states = new String[3][2];
		//
		// states[0][0] = "California";
		// states[0][1] = "Sacremanto";
		// states[1][0] = "Idaho";
		// states[1][1] = "Boise";
		// states[2][0] = "Oregon";
		// states[2][1] = "Salem";
		//
		// for (int i = 0; i < states.length; i++) {
		// StringBuilder sb = new StringBuilder();
		// for (int j = 0; j < states[i].length; j++) {
		// //System.out.println(states[i][j]);
		// if(j==0){
		// sb.append("The Capitol city of ");
		// }else{
		// sb.append(" is ");
		// }
		// sb.append(states[i][j]);
		// }
		// System.out.println(sb);
		// }

		//
		// Olive olive;
		// olive = new Olive(3);
		// olives.add(olive);
		//
		// olive = new Olive(5);
		// olives.add(olive);
		//
		// olive = new Olive(10);
		// olives.add(olive);
		//
		// PressOlive press = new PressOlive();
		// press.getOil(olives);
		// System.out.println(press.getTotalOil());

		// Olive[] olives = { new Kalamata(), new Laguria(), new Kalamata() };
		//
		// PressOlive press = new PressOlive();
		// press.getTotalOil(olives);

		Olive olive;
		olive = new Kalamata();
		System.out.println(olive.name);
		olives.add(olive);

		olive = new Laguria();
		System.out.println(olive.name);
		olives.add(olive);

		olive = new Olive(10);
		System.out.println(olive.name);
		olives.add(olive);

		PressOlive press = new PressOlive();
		press.getOil(olives);
		System.out.println(press.getTotalOil());

		Kalamata olive1 = (Kalamata) olives.get(0);
		System.out.println("Olive 1 is from " + olive1.getOrigin());

		// Laguria olive2 = (Laguria) olives.get(1);
		// olive2.getO

		OlivePress op = new OlivePress();
		op.getOil(olives);

	}
}
