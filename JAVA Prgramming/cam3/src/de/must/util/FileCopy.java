/*
 * Copyright (c) 1999-2005 Christoph Mueller. All rights reserved.
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

package de.must.util;

import java.io.*;

/**
 * Copies files with their windows attributes.
 * @author Christoph Mueller
 */
public class FileCopy {

  /**
   * Copies a file preferring win copy style.
   * @param fromFileName the name of the file to copy
   * @param toFileName the name of the copy
   * @return true if copy was successful
   */
  public static boolean copyFile(String fromFileName, String toFileName) {
  	return copyFile(fromFileName, toFileName, true);
  }
  
  /**
   * Copies a file.
   * @param fromFileName the name of the file to copy
   * @param toFileName the name of the copy
   * @param useWinCopyIfPossible whether win copy is preferred (keeping windows attributes)
   * @return true if no exception occurred
   */
  public static boolean copyFile(String fromFileName, String toFileName, boolean useWinCopyIfPossible) {
  	if (!useWinCopyIfPossible || !System.getProperty("os.name").toLowerCase().startsWith("windows")) return copyFileBinary(fromFileName, toFileName);
    String cmd = "bin/FileCopy.exe from[" + fromFileName + "] to[" + toFileName + "]";
    try {
      Runtime.getRuntime().exec(cmd);
    }
    catch (Exception e) {
      cmd = "FileCopy.exe from[" + fromFileName + "] to[" + toFileName + "]";
      try {
        Runtime.getRuntime().exec(cmd);
      }
      catch (Exception e2) {
        de.must.io.Logger.getInstance().info(FileCopy.class, cmd);
        de.must.io.Logger.getInstance().error(FileCopy.class, e2);
        return false;
      }
    }
    return true;
  }

  /**
   * Copies a file reading and writing bytes.
   * @param fromFileName
   * @param toFileName
   * @return true if copy was successful
   */
  private static boolean copyFileBinary(String fromFileName, String toFileName) {
  	boolean result = true;
		FileInputStream fromStream = null;
		FileOutputStream toStream = null;
		try {
			fromStream = new FileInputStream(fromFileName);
			toStream = new FileOutputStream(toFileName);
			byte[] buffer = new byte[256];
			int bytesRead;
			while ((bytesRead = fromStream.read(buffer)) != -1) {
				toStream.write(buffer, 0, bytesRead);
			}
		} catch (IOException e) {
		  de.must.io.Logger.getInstance().error(FileCopy.class, e);
		  result = false;
		} finally {
			try {
				if (fromStream != null) fromStream.close();
			} catch (IOException e) {
			}
			try {
				if (toStream != null) toStream.close();
			} catch (IOException e) {
			}
		}
		return result;
	}
  
 }
