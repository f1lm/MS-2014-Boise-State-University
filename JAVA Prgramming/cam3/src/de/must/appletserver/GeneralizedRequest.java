/*
 * Copyright (c) 2001-2012 Christoph Mueller. All rights reserved.
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

import de.must.io.Logger;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;

import javax.servlet.http.HttpServletRequest;

/**
 * A container for different request types.
 * Allows us to treat different request types generalized Thus, we don't have 
 * to care if we handle multipart request (file upload) or standard requests.
 * @author Christoph Mueller
 */
public class GeneralizedRequest {

  private HttpServletRequest request;
  private MustMultipartRequest multipartRequest;
  private String dirName = ".";
  
	/**
	 * Constructs a new generalized request.
   * Most important is the fact that getParameter() works in the same manner in both cases:
   * multipart and standard form.
	 * Parses parameters and file parts and buffers the file content if the 
	 * content type is multipart.
	 * @param request the standard HttpServletRequest
	 */
  public GeneralizedRequest(HttpServletRequest request) {
    this.request = request;
    multipartRequest = null;
    String contentType = request.getContentType();
    if (contentType != null && contentType.toLowerCase().indexOf("multipart") > -1) {
      multipartRequest = new MustMultipartRequest(request);
    }  
  }
  
  public void setClientCharset(String clientCharset) {
    multipartRequest.setClientCharset(clientCharset);
  }

	/**
	 * Returns the standard HttpServletRequest
	 * @return the standard HttpServletRequest
	 */
  public HttpServletRequest getStandardRequest() {
    return request;
  }   
  
  /**
   * Returns the multipart request if it is one. Else returns null.
   * @return the multipart request 
   */
  public MustMultipartRequest getMultipartRequest() {
    return multipartRequest;
  }   
  
	/**
	 * Returns the parameter value of the parameter name as specified.
	 * This is done no matter if the request is multipart or standard.
	 * @param name the name of the parameter to read
	 * @return the parameter value
	 */
  public String getParameter(String name) {
    return getParameter(name, null);
  }
  
  public String getParameter(String name, String clientCharset) {
    String parameter;
    if (multipartRequest != null) {
      parameter = multipartRequest.getParameter(name);
      if (parameter == null) parameter = request.getParameter(name); // URL parameters are not part of the form!
    } else {
      parameter = request.getParameter(name);
    }
    if (parameter != null && clientCharset != null && !clientCharset.equals(Charset.defaultCharset().name())) {
      try {
        parameter = new String(parameter.getBytes("8859_1"), clientCharset);
      } catch (UnsupportedEncodingException e) {
        Logger.getInstance().error(getClass(), e);
      }
    }
    return parameter;
  }
 
  public InputStream getInputStream(String name) {
    return multipartRequest.getInputStream(name);
  }

	/**
	 * Returns the request method.
	 * @return the method
	 */
  public String getMethod() {
    return request.getMethod();
  }   
  
}

