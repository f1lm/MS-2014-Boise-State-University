/*
 * Copyright (c) 2002 Christoph Mueller and Jason Hunter.
 * All rights reserved.
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

import de.must.io.FileBuffer;

import java.io.IOException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

//import com.oreilly.servlet.multipart.MultipartParser;
//import com.oreilly.servlet.multipart.Part;
//import com.oreilly.servlet.multipart.FilePart;
//import com.oreilly.servlet.multipart.ParamPart;

/**
 * Class to separate file upload parts from parameters. Basic methods are
 * similar to those of HttpServletRequest.
 * This MustMultipartRequest is intended to be an adapter to Jason Hunter's
 * library com.oreilly.servlet.multipart.* - see www.servlets.com
 * File content is buffered. Thus, we can e.g. check all input before we do
 * any writing actions. Also, this approach allows us to name the files freely.
 * @see GeneralizedRequest
 * @author Christoph Mueller
 */
public class MustMultipartRequest {

  protected Hashtable<String, Vector<String>> parameters = new Hashtable<String, Vector<String>>(); 
  protected Hashtable<String, FileBuffer> fileBuffers = new Hashtable<String, FileBuffer>();

	/**
	 * Constructs a new MustMultipartRequest.
	 * @param request the standard HttpServletRequest
	 * @throws IOException
	 */
  public MustMultipartRequest(HttpServletRequest request)
    throws IOException {
     de.must.io.Logger.getInstance().info(getClass(), "Mulitpart request components are not activated.");
     de.must.io.Logger.getInstance().info(getClass(), "Download them from http://www.servlets.com");
     de.must.io.Logger.getInstance().info(getClass(), "Then uncomment the MustMultipartRequest import statements and the body of this method to activate it");
//    int maxPostSize = 1024 * 1024;
//
//    MultipartParser parser = new MultipartParser(request, maxPostSize);
//    Part part;
//
//    while ((part = parser.readNextPart()) != null) {
//      String name = part.getName();
//      if (part.isParam()) {
//        // It's a parameter part, add it to the vector of values
//        ParamPart paramPart = (ParamPart) part;
//        String value = paramPart.getStringValue();
//        Vector existingValues = (Vector)parameters.get(name);
//        if (existingValues == null) {
//          existingValues = new Vector();
//          parameters.put(name, existingValues);
//        }
//        existingValues.addElement(value);
//      }
//      else if (part.isFile()) {
//        // It's a file part
//        FilePart filePart = (FilePart)part;
//        FileBuffer fileBuffer = new FileBuffer(filePart.getInputStream());
//        fileBuffer.setOriginalFileName(filePart.getFileName());
//        fileBuffers.put(name, fileBuffer);
//      }
//    }
  } 
  
	/**
	 * Returns the parameter value of the parameter name as specified.
	 * @param name the name of the parameter to read
	 * @return the parameter value
	 */
  public String getParameter(String name) {
    try {
      Vector<String> values = (Vector<String>)parameters.get(name);
      if (values == null || values.size() == 0) {
        return null;
      }
      String value = (String)values.elementAt(values.size() - 1);
      return value;
    }
    catch (Exception e) {
      return null;
    }
  }

	/**
	 * Returns the file buffer of the file name as specified.
	 * @param name the name of the file buffer
	 * @return the file buffer
	 */
  public FileBuffer getFileBuffer(String name) {
    return (FileBuffer)fileBuffers.get(name);
  }
  
}

