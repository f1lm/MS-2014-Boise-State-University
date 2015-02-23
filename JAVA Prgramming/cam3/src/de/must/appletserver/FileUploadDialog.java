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

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.io.Logger;
import de.must.io.TextFile;
import de.must.util.HtmlPiece;

public abstract class FileUploadDialog extends HTMLDialog {
  
  private class Item {
    String label;
    FileSpecification fileSpec;
    public Item(String label, FileSpecification fileSpec) {
      this.label = label;
      this.fileSpec = fileSpec;
    }
  }
  
  protected static final String CHARSET_PARAMETER_NAME_FOR_USER_CHOICE = "charsetuserchoice";
  private static final String[] charsets = new String[]{null, TextFile.ENCODING_ANSI, TextFile.ENCODING_UTF8, TextFile.ENCODING_UNICODE};
  private static final String[] charsetLabels = new String[]{"<Standard>", "ANSI", TextFile.ENCODING_UTF8, TextFile.ENCODING_UNICODE};
  private Vector<Item> items = new Vector<Item>();
  private String charset;
  
  public FileUploadDialog (SessionData sessionData) {
    super(sessionData);
  }
  
  public FileSpecification addUploader(String label) {
    FileSpecification uploader = new FileSpecification(sessionData);
    Item item = new Item(label, uploader);
    items.add(item);
    return uploader;
  }

  public void writeInitialRemoteView(ToAppletWriter out) {
    writeHeader(out);
    out.println("<center><b>" + getTitle() + "</b></center><br />");
    out.println("<form action=\"" + sessionData.appletCodebase + Constants.MAIN_SERVLET + "\" method=\"post\" enctype=\"multipart/form-data\")>");
    out.println("<input type=\"hidden\" name=" + "\"" + Constants.SESSION + "\"" + " value=\"" + sessionData.sessionId + "\">");
    out.println("<input type=\"hidden\" name=" + "\"" + Constants.HTML_DIALOG_ID + "\"" + " value=\"" + getDialogId() + "\">");
    out.println("<table>");
    extendBeforeFileList(out);
    Iterator<Item> iterator = items.iterator();
    while (iterator.hasNext()) {
      out.println("<tr>");
      Item item = iterator.next();
      out.println("<td>");
      if (!item.label.equals("")) out.println(item.label + ":");
      out.println("</td><td>");
      out.println(item.fileSpec.getCreationTag());
      out.println("</td>");
      out.println("</tr>");
    }
    out.println("<tr>");
    out.println("<td>");
    out.println("Charset:");
    out.println("</td><td>");
    out.println("<select size=\"1\" name=\"" + CHARSET_PARAMETER_NAME_FOR_USER_CHOICE + "\"");
    out.println(">");
    String encoding = System.getProperty("file.encoding");
    for (int i = 0; i < charsetLabels.length; i++) {
      out.println("<option ");
      if (charsets[i] != null && charsets[i].equals(encoding)
       || "ANSI_X3.4-1968".equals(encoding) && TextFile.ENCODING_UTF8.equals(charsets[i]) // workaround for 1&1 linux 09.11.12 
      ) {
        out.println("selected ");
      }
      out.println("value=\"" + charsetLabels[i] + "\">" + HtmlPiece.getHtmlRepresentation(charsetLabels[i]) + "</option>");
    }
    out.println("</select>");
    out.println("</td>");
    out.println("</tr>");
    // gives "ANSI_X3.4-1968" from virtual linux server 09.11.12: out.println("<tr><td>System.getProperty(\"file.encoding\") = </td><td>" + encoding + "</td></tr>");
    extendAfterFileList(out);
    out.println("</table>");
    out.println("<br>");
    out.println("<center>");
    out.println("<input type=\"submit\" name=" + "\"" + NAME_FOR_OK_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_OK_BUTTON") + "\">");
    out.println("&nbsp;&nbsp;");
    out.println("<input type=\"submit\" name=" + "\"" + NAME_FOR_CANCEL_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_CANCEL_BUTTON") + "\">");
    out.println("</center>");
    out.println("</form>");
    writeFooter(out);
  }

  protected void extendBeforeFileList(ToAppletWriter out) {}
  protected void extendAfterFileList(ToAppletWriter out) {}
  
  /**
   * Synchronizes user input and internal mirrored values by delegating to each
   * input element of this group to fetch its value from the request.
   * @param request the current request
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    if (request.getMethod().equals("GET")) return; // nothing to fetch - don't override object's values
    Iterator<Item> iterator = items.iterator();
    while (iterator.hasNext()) {
      Item item = iterator.next();
      item.fileSpec.fetchYourValueFromRequest(request);
    }
    charset = request.getParameter(CHARSET_PARAMETER_NAME_FOR_USER_CHOICE);
    if (charset != null) for (int i = 0; i < charsets.length; i++) {
      if (charsetLabels[i].equals(charset)) {
        charset = charsets[i];
      }
    }
    super.fetchValuesFromRequest(request);
  }
  
  protected String getCharset() {
    return charset;
  }

  protected BufferedReader getBufferedReader(GeneralizedRequest request, FileSpecification fileSpec, String charsetName) {
    InputStream is = request.getInputStream(fileSpec.getName());
    if (is != null) try {
      BufferedReader bure = null;
      if (charsetName != null) {
        bure = new BufferedReader(new InputStreamReader(is, charsetName));
      } else {
        bure = new BufferedReader(new InputStreamReader(is));
      }
      try {
        bure.mark(10000);
        if (bure.read() == -1) return null;
        bure.reset();
      } catch (IOException e) {
        Logger.getInstance().error(getClass(), e);
      }
      return bure;
    } catch (UnsupportedEncodingException e) {
      addErrorMessage(e.getMessage());
      Logger.getInstance().error(getClass(), e);
    }
    return null;
  }

  protected BufferedInputStream getBufferedInputStream(GeneralizedRequest request, FileSpecification fileSpec) {
    return new BufferedInputStream(request.getInputStream(fileSpec.getName()));
  }
  
}
