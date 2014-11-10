/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

package de.must.middle;

public class ApplConstStd {

  public static final String APPLET_VERSION_PLACEHOLDER = "AppletVersion";  
  public static final String TRUE_STRING = "true";
  public static final String FALSE_STRING = "false";

  public static final int SECURITY_NORMAL = 0;
  public static final int SECURITY_EXTENDED = 1;
  public static final long millisPerDay = 1000 * 60 * 60 * 24;
  public static final String MAIN_SEPARATOR = "|";

  public static final int TYPE_HIERARCHY_BY_LENGTH = 0;
  public static final int TYPE_HIERARCHY_BY_SPACE = 1; // not supported, yet
  public static final int TYPE_HIERARCHY_NONE = 9;
  
  public static final String CAMELEON_TIMESTAMP_FORMAT = "yyyy-MM-dd HH:mm:ss.SSS";
  public static final String CAMELEON_DATE_FORMAT = "yyyy-MM-dd";
  
  public static final String UNIT_PAGES = "P";
  public static final String UNIT_LABELS = "L";
  
  public static final int LIST_DEPENDENCE_WITHOUT = 0;
  public static final int LIST_DEPENDENCE_ACTIVE_SINGLE_SELECTION_ONLY = 1;
  public static final int LIST_DEPENDENCE_ACTIVE_MULTIPLE_SELECTION = 2;

}
