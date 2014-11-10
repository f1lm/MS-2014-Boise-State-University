/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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
 * Text file for e.g. protocol (output) use.
 * <pre><code>
 * Sample:
 *     Protocol protocol = new Protocol ("MyProt");
 *       // or simply
 *     Protocol protocol = new Protocol ();
 *     protocol.addEntry("what we want to protocol");
 *     protocol.addEntry("more");
 *     ...
 * </code></pre>
 * @author Christoph Mueller
 */
public class Protocol {
  int entryCount;
  private File protocol;
  private FileWriter protocolWriter;

  /**
   * Constructs a new protocol file with the default name "Protocol.txt"
   * @throws IOException
   */
  public Protocol() throws IOException {
    openProtocol("Protocol.txt");
  }

  /**
   * Constructs a new protocol file with the specified file name
   * @param fileName the name of the file
   * @throws IOException
   */
  public Protocol(String fileName) throws IOException {
    openProtocol(fileName);
  }

  private void openProtocol(String fileName) throws IOException {
    protocol = new File(fileName);
    protocolWriter = new FileWriter(protocol);
    entryCount = 0;
  }
  
  public String getAbsolutePath() {
    return protocol.getAbsolutePath();
  }

  /**
   * Adds an entry to the protocol file.
   * @param entry the entry to add
   */
  public void addEntry(String entry) {
    entryCount++;
    try {
      protocolWriter.write(entry + "\r\n");
      protocolWriter.flush(); // damit auch ohne Aufruf von finalize und damit close immer etwas geschrieben wird
    }
    catch ( IOException e2 ) {
      Logger.getInstance().error(getClass(), e2);
    }
  }

  /**
   * Closes the protocol file.
   */
  public void close() {
    try {
      protocolWriter.close();
    }
    catch ( IOException e2 ) {
      Logger.getInstance().error(getClass(), e2);
    }
  }

  /**
   * Closes the file.
   */
  protected void finalize() {
    try {
      protocolWriter.close();
    }
    catch ( IOException e2 ) {
      Logger.getInstance().error(getClass(), e2);
    }
    try {
      super.finalize ();
    }
    catch ( Throwable t ) {
    }
  }

}

