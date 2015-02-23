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

package de.must.applet;

/**
 * The action wished by the server to be executed on the remote client. 
 * @author Christoph Mueller
 */
public class Action {
  
  public String concerningSubLevel1;
  public String toDo;
  public String label;
  public String id;
  public int length;
  public String value;
  public String variant1;
  public String variant2;
  public String variant3;
  public String variant4;
  public String variant5;
  public String variant6;
  public String variant7;
  public String variant8;
  public String variant9;
  public String variant10;
  public String variant11;
  public String variant12;
  public String nonstandardPanel;
  public int nonstandardPos = -1;
  
  public int getValueAsInt() {
    return Integer.valueOf(value);
  }

  public int getVariant1AsInt() {
    return Integer.valueOf(variant1);
  }

  public int getVariant2AsInt() {
    return Integer.valueOf(variant2);
  }

  public int getVariant3AsInt() {
    return Integer.valueOf(variant3);
  }

  public int getVariant4AsInt() {
    return Integer.valueOf(variant4);
  }

  public int getVariant5AsInt() {
    return Integer.valueOf(variant5);
  }

  public int getVariant6AsInt() {
    return Integer.valueOf(variant6);
  }

  public int getVariant7AsInt() {
    return Integer.valueOf(variant7);
  }

  public int getVariant8AsInt() {
    return Integer.valueOf(variant8);
  }

  public int getVariant9AsInt() {
    return Integer.valueOf(variant9);
  }

  public int getVariant10AsInt() {
    return Integer.valueOf(variant10);
  }

  public int getVariant11AsInt() {
    return Integer.valueOf(variant11);
  }

  public int getVariant12AsInt() {
    return Integer.valueOf(variant12);
  }

}
