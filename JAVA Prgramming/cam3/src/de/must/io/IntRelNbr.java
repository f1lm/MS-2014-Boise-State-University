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

package de.must.io;

import java.io.*;

/**
 * @author Christoph Mueller
 */
public class IntRelNbr {
  static private RandomAccessFile intRelNbrFile;

  /**
   *
   * @param entity
   * @return
   */
  public static int newNbr(String entity) {
    long lastFilePointer = 0;
    byte searchBytes[] = new byte[4];
    byte entityBytes[] = new byte[4];
    searchBytes = entity.getBytes();
    int workNbr = 0;
    try {
      // de.must.io.Logger.getInstance().info(getClass(), "Search-Bytes: " + searchBytes);
      intRelNbrFile = new RandomAccessFile("IntRelNbr.txt", "rw");
      intRelNbrFile.seek(0);
      while (intRelNbrFile.getFilePointer() < intRelNbrFile.length() - 1 & /* !entityBytes.equals(searchBytes) */ entityBytes[0] != searchBytes[0]) {
        intRelNbrFile.read(entityBytes);
        lastFilePointer = intRelNbrFile.getFilePointer();
        workNbr = intRelNbrFile.readInt();
        // de.must.io.Logger.getInstance().info(getClass(), entityBytes);
      }
      if (/* entityBytes.equals(searchBytes) */ entityBytes[0] == searchBytes[0]) {
        intRelNbrFile.seek(lastFilePointer);
        intRelNbrFile.writeInt(++workNbr);
      }
      else {
        workNbr = 1;
        de.must.io.Logger.getInstance().info("vor Write");
        intRelNbrFile.write(searchBytes);
        intRelNbrFile.writeInt(workNbr);
      }
    intRelNbrFile.close();
    }
    catch ( IOException e2 ) {
      de.must.io.Logger.getInstance().info("caught: " + e2 );
    }
    return workNbr;
  }

}
