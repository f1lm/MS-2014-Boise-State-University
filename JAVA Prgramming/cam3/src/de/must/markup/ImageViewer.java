/*
 * Copyright (c) 1999-2001 Christoph Mueller. All rights reserved.
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

package de.must.markup;

/**
 * @author Christoph Mueller
 */
public class ImageViewer extends MustInputField {

  protected SessionData sessionData;
  private static String defaultClassName;
  protected String className;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;
  protected String imageDirectory;
  protected String imageToDisplay;
  
  public ImageViewer(SessionData sessionData, String imageDirectory) {
    super("imgView");
    this.sessionData = sessionData;
    this.imageDirectory = imageDirectory;
  }  

  public void setImageToDisplay(String newImageToDisplay) {
    this.imageToDisplay = newImageToDisplay;
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    if (imageToDisplay == null) return "";
    StringBuffer tag = new StringBuffer();
    tag.append("<img src=\"" + imageToDisplay + "\"");
    if (className != null) tag.append(" class=\"" + className + "\"");
    if (additionalTagFragments != null) tag.append(" " + additionalTagFragments);
    if (toolTipText != null) {
      tag.append(" alt=\"" + toolTipText + "\"");
    }
    tag.append(">");
    if (comment != null && !comment.equals("")) {
      tag.append(" " + comment);
    }
    return tag.toString();
  }

	/**
	 * @see de.must.markup.Markupable#fetchYourValueFromRequest(GeneralizedRequest)
	 */
	public void fetchYourValueFromRequest(GeneralizedRequest request) {
	}

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}

