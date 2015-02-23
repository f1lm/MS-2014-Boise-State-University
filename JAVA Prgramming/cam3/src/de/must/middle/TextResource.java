/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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
package de.must.middle;

import java.util.Hashtable;
import java.util.ListResourceBundle;
import java.util.Locale;

import de.must.io.Logger;

/**
 * Resource class for text in different languages depending on the locale.
 * @author Christoph Mueller
 */
public class TextResource {
  
  private static Hashtable<Locale, ListResourceBundle> bundles = new Hashtable<Locale, ListResourceBundle>();
  
  /**
   * Returns the appropriate translation of the needed text
   * @param key the key of text to retrieve
   * @param locale the locale for which the text is to be translated
   * @return the appropriate translation of the needed text
   */
  public static String getText(String key, Locale locale) {
    ListResourceBundle bundle = bundles.get(locale);
    if (bundle == null) {
      Logger.getInstance().debug(TextResource.class, "Creating text resource for " + locale);
      if (locale.getLanguage().equals(Locale.GERMAN.getLanguage())) {
        bundle = new Res_de_DE();
      } else {
        bundle = new Res();
      }
      bundles.put(locale, bundle);
    }
    return bundle.getString(key);
  }

}
