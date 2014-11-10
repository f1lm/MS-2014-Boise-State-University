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

package de.must.appletserver;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import de.must.io.Logger;

public abstract class MustServlet extends HttpServlet {

  public static final boolean UTF8 = false;
  private static final boolean verbose = false;
  
  protected boolean firstInstanciatonDone = false;
  protected Logger logger = Logger.getInstance();
  
  /**
   * Called by the server (via the service method) to allow a servlet to handle a GET request.
   * @param request an HttpServletRequest object that contains the request the client has made of the servlet
   * @param response an HttpServletResponse object that contains the response the servlet sends to the client
   * @throws java.io.IOException if an input or output error is detected when the servlet handles the GET request
   * @throws javax.servlet.ServletException if the request for the GET could not be handled
   */
  public void doGet(HttpServletRequest request,
                    HttpServletResponse response)
    throws IOException, ServletException {
    de.must.io.Logger.getInstance().debug(getClass(), "Method doGet");
    if (!firstInstanciatonDone) {
      firstInstanciatonDone = true;
      // before JDK 1.4: String realPath = request.getRealPath("/");
      String realPath = request.getSession().getServletContext().getRealPath("/");
      if (!realPath.endsWith("/") && !realPath.endsWith("\\")) realPath += "/";
      if (realPath.indexOf("Users\\Christoph Müller\\workspace") != -1) {
        realPath = "C:\\Users\\Christoph Müller\\workspace\\pfb\\"; // Laptop
      }
      initWithFirstRequestInfos(realPath);
    }
    handlePostOrGetWhatever(new GeneralizedRequest(request), response);
  }

  /**
   * Called by the server (via the service method) to allow a servlet to handle a POST request.
   * @param request an HttpServletRequest object that contains the request the client has made of the servlet
   * @param response an HttpServletResponse object that contains the response the servlet sends to the client
   * @throws java.io.IOException if an input or output error is detected when the servlet handles the POST request
   * @throws javax.servlet.ServletException if the request for the GET could not be handled
   */
  public void doPost(HttpServletRequest request,
                     HttpServletResponse response)
    throws IOException, ServletException {
    de.must.io.Logger.getInstance().debug(getClass(), "Method doPost");
    GeneralizedRequest generalizedRequest = new GeneralizedRequest(request);
    if (verbose) debugParameters(generalizedRequest);
    handlePostOrGetWhatever(generalizedRequest, response);
  }

  private void debugParameters(GeneralizedRequest request) {
    Logger.getInstance().info(getClass(), "showing parameters now ...");
    Enumeration<String> e = request.getStandardRequest().getParameterNames();
    while (e.hasMoreElements()) {
      String name = (String)e.nextElement();
      String value = request.getParameter(name);
      Logger.getInstance().info(getClass(), name + " = " + value);
    }
    Logger.getInstance().info(getClass(), "method: "  + request.getMethod());
  }

  /**
   * Initialize your application at the first moment where details about the
   * application is known by data of the first request. By using realPath you 
   * may find a configuration file and setup your database connection.
   * @param realPath the real path of application's location ending with a slash
   */
  protected abstract void initWithFirstRequestInfos(String realPath);

  protected abstract void handlePostOrGetWhatever(GeneralizedRequest request, HttpServletResponse response) throws IOException, ServletException;
  
}
