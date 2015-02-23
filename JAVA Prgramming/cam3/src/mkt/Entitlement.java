//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

/**
 * @author Christoph Mueller
 */
public class Entitlement extends de.must.middle.EntitlementStd {

  public static final int AREA_REC = 1;
  public static final int AREA_ADM = 2;
  public static final int AREA_SEC = 3;

  public Entitlement() {
  }

  public boolean isEntitled(int area) {
    switch (area) {
      case AREA_REC: return true;
      case AREA_ADM:
        return true;
    }
    return false;
  }

}

