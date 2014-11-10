/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

package de.must.appletserver;

import java.io.*;

/**
 * File upload component.
 * @author Christoph Mueller
 */
public class FileSpecification {

  private static int instanceCounter = 0;
  
  protected String name;
  protected String toolTipText;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;
  protected InputStream fileInputStream;

  public FileSpecification(SessionData sessionData) {
    this((String)null);
  }

  public FileSpecification(String name) {
    if (name != null) this.name = name;
    else this.name = "ImgUp" + ++instanceCounter;
  }

  public String getName() {
    return name;
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    String tag;
    tag = "<input type=\"file\" name=\"" + name + "\"";
    tag += " size=\"60\"";
    if (additionalTagFragments != null) tag += " " + additionalTagFragments;
    if (toolTipText != null) {
      tag += " onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"";
    }
    tag += ">";
    return tag;
  }

  public void fetchYourValueFromRequest(GeneralizedRequest request) {
    fileInputStream = request.getInputStream(name);
  }

}

