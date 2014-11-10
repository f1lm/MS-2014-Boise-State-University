package lab9;

public class Switcher {
	private static boolean swithchThem(boolean[] a,boolean[] b){
		if(a.length!=b.length){
			return false;
		}
		else{
			boolean tmp=a[0];
			a[0]=b[0];
			b[0]=tmp;
			return true;
		}
		
	}

}
