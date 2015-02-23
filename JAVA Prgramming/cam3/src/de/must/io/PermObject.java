/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

package de.must.io;

import java.io.*;

/**
 * @author Christoph Mueller
 */
public class PermObject {

  public PermObject () {
  }

  /**
   * Writes an object as file.
   * @param fileName the name of the file containing the serialized object
   * @param objectToBeSaved the object to be serialized
   */
  static public void write(File file, Object objectToBeSaved) {
    try {
      ObjectOutput s =  new ObjectOutputStream(new FileOutputStream(file) );
      s.writeObject(objectToBeSaved);
      s.close();
    }
    catch (IOException e) {
      de.must.io.Logger.getInstance().error(e);
    }
  }

  /**
   * Returns a deserialized object. 
   * @param fileName the name of the file containing the serialized object
   * @return a deserialized object
   */
  static public Object read(File file) {
    try {
      ObjectInputStream s = new ObjectInputStream(new FileInputStream(file));
      Object readObject = s.readObject();
      s.close();
      return(readObject);
    }
    catch (IOException e) {
      de.must.io.Logger.getInstance().error(e);
    }
    catch (ClassNotFoundException e) {
      de.must.io.Logger.getInstance().error(e);
    }
    return null;
  }

}
