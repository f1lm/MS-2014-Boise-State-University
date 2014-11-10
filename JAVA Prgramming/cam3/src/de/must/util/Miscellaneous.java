package de.must.util;

public class Miscellaneous {

  private static TermSwapping termSwapping;

  /**
   * Sets the application's term swapper.
   * @param termSwapping the term swapper to set
   */
  public static void setTermSwapping(TermSwapping termSwapping) {
    Miscellaneous.termSwapping = termSwapping;
  }

  /**
   * Returns term's replacement. Use method setTermSwapping to establish an individual replacement algorithm.
   * @param originalTerm the original term
   * @return term's replacement
   * @see Miscellaneous#setTermSwapping(TermSwapping)
   */
  public static synchronized String getReplacement(String originalTerm) {
    if (termSwapping != null) return termSwapping.getReplacement(originalTerm);
    else return originalTerm;
  }

}
