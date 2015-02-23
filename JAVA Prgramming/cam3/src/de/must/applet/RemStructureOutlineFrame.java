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

package de.must.applet;

import java.util.Vector;

import de.must.middle.ApplConstStd;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.AwtConst;
import de.must.wuic.MustTextField;
import de.must.wuic.StructureOutlineFrame;

public class RemStructureOutlineFrame extends StructureOutlineFrame implements RemoteGUIComponent {
  
  public RemStructureOutlineFrame() {
    super(AppletGlobal.getInstance());
    creationEnding();
  }

  @Override
  public String getId() {
    return null; // not needed here
  }
 
  public void perform (Action action) {
    if (Constants.INITIALIZE.equals(action.toDo)) {
      setTitle(action.value);
      getTree().init();
    } else if (Constants.SET_VISIBLE.equals(action.toDo)) {
      setVisible(ApplConstStd.TRUE_STRING.equals(action.value));
      if (ApplConstStd.TRUE_STRING.equals(action.value) && targetTextField != null) {
        mustTree.expand(targetTextField.getText());
      }
    } else if (Constants.SET_TARGETTEXTFIELD.equals(action.toDo)) {
      targetTextField = (MustTextField)AppletGlobal.getInstance().getRemoteGUIComponent(action.value);
      buttonApply.setVisible(callback != null || targetTextField != null);
      mustTree.setTargetTextField(targetTextField);
    } else if (Constants.ADD_ITEM.equals(action.toDo)) {
      getTree().addItem(action.variant1, action.variant2);
    } else if (Constants.APPLY_TREE.equals(action.toDo)) {
      getTree().afterFill();
      initTree();
      if (targetTextField != null) {
        mustTree.expand(targetTextField.getText());
      }
      pack();
      int minWidth = 400;
      int minHeight = 500;
      int width = getSize().height;
      int height = getSize().height;
      if (height < height) height = minHeight;
      if (width < minWidth) width = minWidth;
      setSize(minWidth, minHeight);
      setLocation(AwtConst.getCenterLocation(getSize()));
    }
  }
  
  @Override
  protected void load() {
  }

  // -------------------------------------------------
  
  @Override
  public void setEditable(boolean value) {
    // not needed here
  }

  @Override
  public void setValue(String value) {
  }

  @Override
  public boolean isModified() {
    return false;
  }

  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
  }

  @Override
  public void selectAll() {
  }

}
