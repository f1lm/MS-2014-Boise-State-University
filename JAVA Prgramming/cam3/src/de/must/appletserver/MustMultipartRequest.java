/*
 * Copyright (c) 2002-2012 Christoph Mueller. All rights reserved.
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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import de.must.io.Logger;

/**
 * Class to separate file upload parts from parameters. Basic methods are
 * similar to those of HttpServletRequest.
 * @see GeneralizedRequest
 * @author Christoph Mueller
 */
public class MustMultipartRequest {

  private HttpServletRequest request;
  private String clientCharset;
  private Hashtable<String, String> parameters; 
  private Hashtable<String, InputStream> fileInputStreams;

  /**
   * Constructs a new MustMultipartRequest.
   * @param request the standard HttpServletRequest
   * @throws IOException
   * @throws ServletException
   * @throws IllegalStateException
   */
  public MustMultipartRequest(HttpServletRequest request) {
    this.request = request;
  }
  
  public void setClientCharset(String clientCharset) {
    this.clientCharset = clientCharset;
  }

  private void getValuesIfNotDoneYet() {
    if (parameters == null) {
      parameters = new Hashtable<String, String>(); 
      fileInputStreams = new Hashtable<String, InputStream>();
      getValues();
    }
  }
  
  private void getValues() {
    try {
      for (Part part : request.getParts()) {
        String header = part.getHeader("content-disposition");
//        int posFilename;
        if ((/*posFilename =*/ header.indexOf("filename=\"")) != -1) {
//          int posQuote2 = header.indexOf("\"", posFilename + 10);
//          String fileName = header.substring(posFilename + 10, posQuote2);
          fileInputStreams.put(part.getName(), part.getInputStream());
        } else {
          BufferedReader reader = null;
          if (clientCharset != null) {
            reader = new BufferedReader(new InputStreamReader(part.getInputStream(), clientCharset));
          } else {
            reader = new BufferedReader(new InputStreamReader(part.getInputStream()));
          }
          StringBuilder value = new StringBuilder();
          char[] buffer = new char[1000];
          for (int length = 0; (length = reader.read(buffer)) > 0;) {
            value.append(buffer, 0, length);
          }
          parameters.put(part.getName(), value.toString());
        }
      }
    } catch (IllegalStateException e) {
      Logger.getInstance().error(getClass(), e);
    } catch (UnsupportedEncodingException e) {
      Logger.getInstance().error(getClass(), e);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    } catch (ServletException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }

  /**
   * Returns the parameter value of the parameter name as specified.
   * @param name the name of the parameter to read
   * @return the parameter value
   */
  public String getParameter(String name) {
    getValuesIfNotDoneYet();
    return parameters.get(name);
  }

  public InputStream getInputStream(String name) {
    getValuesIfNotDoneYet();
    return fileInputStreams.get(name);
  }
  
}

