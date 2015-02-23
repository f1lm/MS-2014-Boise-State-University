/*
 * Copyright (c) 2004 Christoph Mueller. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * THIS SOFTWARE IS PROVIDED BY CHRISTOPH MUELLER ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHRISTOPH MUELLER OR
 * HIS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package de.must.util;

/**
 * Simple cryptography utility to have a framework-central class to coordinate 
 * cryptgraphical aspects.
 * Before using in critical context, replace algorithm by state-of-the-art
 * cryptography utilities.
 * @author Christoph Mueller
 */
public class Crypt {
  
  private static char[] chars1 = "1234567890QWERTZUIOPÜASDFGHJKLÖÄYXCVBNM;:_qwertzuiopü+asdfghjklöä#<yxcvbnm,.-!§$%&/()=?".toCharArray();
  private static char[] chars2 = "t,zXCu+bIOYV5KL67nöäPÖÄfg#<haÜASDFG!y123TH90EJ.§ü%&/(l$iop-BNM;:ZU_xqQWdjkwe)=?sr48Rcvm".toCharArray();

  /**
   * Sets the encrypt table for individual needs. Both char sequences must be
   * of the same length. Method encrypt converts chars from 1 to 2, method 
   * decrypt from 2 to 1.
	 * @param charSequence1 a sequence of chars as a String
	 * @param charSequence2 a different sequence of chars as a String
	 */
	public static void setEncryptTable(String charSequence1, String charSequence2) {
    chars1 = charSequence1.toCharArray();
    chars2 = charSequence2.toCharArray();
  }

	public Crypt() {
	}
  
  /**
   * Encrypts a phrase (password).
	 * @param phrase the phrase to encrypt
	 * @return the encrypted phrase
	 */
	public static String encrypt(String phrase) {
    char[] result = phrase.toCharArray();
    for (int i = 0; i < result.length; i++) {
      for (int j = 0; j < chars1.length; j++) {
        if (chars1[j] == result[i]) {
          result[i] = chars2[j];
          break;
        }
      }
    }
    return String.valueOf(result);
  }

  /**
   * Decrypts a phrase (password).
   * @param phrase the phrase to decrypt
   * @return the decrypted phrase
   */
  public static String decrypt(String phrase) {
    char[] result = phrase.toCharArray();
    for (int i = 0; i < result.length; i++) {
      for (int j = 0; j < chars2.length; j++) {
        if (chars2[j] == result[i]) {
          result[i] = chars1[j];
          break;
        }
      }
    }
    return String.valueOf(result);
  }

}
