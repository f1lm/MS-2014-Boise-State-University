/*
 * Copyright (c) 2002 Christoph Mueller. All rights reserved.
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

import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;

/**
 * Container for file data. Holds the data as submitted while construction
 * and writes it to file via method moveContentTo, afterwards the buffer is
 * set to null.
 * For now, it's a simple RAM buffer. If necessary, it may be cached to disk
 * without touching the applications using the buffer.
 * @author Christoph Mueller
 */
public class FileBuffer {

  private static final int DEFAULT_BUFFER_SIZE = 1024 * 1024;
  private byte[] internalBuffer;
  private int size;
  private String originalFileName;
  private Exception exceptionWhileBuffering = null;

  /**
   * Constructor for FileBuffer.
   * @param input the input stream to fill the buffer
   */
  public FileBuffer(InputStream input) {
    this(input, DEFAULT_BUFFER_SIZE);
  }

	/**
	 * Constructor for FileBuffer. If the buffer's size doesn't have enough capacity,
   * an exception is stored for later validation checks and the internal buffer is
   * set to null.
   * @param input the input stream to fill the buffer
	 */
	public FileBuffer(InputStream input, int bufferSize) {
    size=0;
    int read;
    internalBuffer = null; 
    byte[] segment = new byte[8 * 1024];
    try {
		  while((read = input.read(segment)) != -1) {
        // allocate buffer space only if necessary:
        if (internalBuffer == null) internalBuffer = new byte[bufferSize];
		    for (int i = 0; i < read; i++) {
					internalBuffer[size + i] = segment[i];
				}
		    size += read;
		  }
		} catch (IOException ioe) {
      de.must.io.Logger.getInstance().error(getClass(), ioe);
      internalBuffer = null;
    } catch (ArrayIndexOutOfBoundsException aie) {
      exceptionWhileBuffering = new FileBufferOverflowException();
      internalBuffer = null;
    }
    if (size == 0) internalBuffer = null;
	}

  /**
   * Returns the exceptionWhileBuffering.
   * @return Exception
   */
  public Exception getExceptionWhileBuffering() {
    return exceptionWhileBuffering;
  }

  /**
   * Sets the original file name. May be used to reuse it in the server
   * file system or to use just the file extension.
   * @param originalFileName The original file name to set
   */
  public void setOriginalFileName(String originalFileName) {
    this.originalFileName = originalFileName;
  }

  /**
   * Returns the original file name.
   * @return the original file name
   */
  public String getOriginalFileName() {
    return originalFileName;
  }


  /**
   * Returns true if the file buffer is empty
   * @return true if the file buffer is empty
   */
  public boolean isEmtpy() {
    return (internalBuffer == null);
  }


	/**
	 * Move the content of the buffer to an output stream and sets the buffer to null.
	 * @param out the output stream where the data is to send
	 * @throws IOException
	 */
  public void moveContentTo(OutputStream out) throws IOException {
    int toWrite;
    int written = 0;
    byte[] segment = new byte[8 * 1024];
    toWrite = segment.length;
    while(written < size) {
      if (written + toWrite > size) {
        toWrite = size - written;
        segment = new byte[toWrite];
      }
      for (int i = 0; i < toWrite; i++) {
        segment[i] = internalBuffer[written + i];
      }
      out.write(segment, 0, toWrite);
      written += toWrite;
    }
    internalBuffer = null;
  }
  
  class FileBufferOverflowException extends Exception {
  	/**
		 * @see java.lang.Throwable#getMessage()
		 */
		public String getMessage() {
			return "File to big!";
		}

  }
  
}

