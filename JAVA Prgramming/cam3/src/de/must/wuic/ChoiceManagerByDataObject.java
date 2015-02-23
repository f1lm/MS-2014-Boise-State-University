/*
 * Copyright (c) 2013-2014 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import java.util.Collections;
import java.util.Vector;

import de.must.dataobj.DataObject;
import de.must.dataobj.WhereCondition;
import de.must.io.Logger;
import de.must.util.Callback;

/**
 * A choice manager whose valid items are filled by a data object.
 * @author Christoph Mueller
 */
public class ChoiceManagerByDataObject extends ChoiceManager {
  
  private DataObject sourceDataObject;
  private String sourceColumnName;
  private String additionalWhereConditionFragment;
  
  /**
   * Constructs a new choice manager to be filled by a data object.
   * @param textField  the text field whose input is to be completed. 
   * @param sourceDataObject  the data object containing valid items
   * @param sourceColumnName  the name of the column containing the valid items
   */
  public ChoiceManagerByDataObject(MustTextField textField, DataObject sourceDataObject, String sourceColumnName) {
    this(textField, sourceDataObject, sourceColumnName, null);
  }
  
  /**
   * Constructs a new choice manager to be filled by a data object.
   * @param textField  the text field whose input is to be completed. 
   * @param sourceDataObject  the data object containing valid items
   * @param sourceColumnName  the name of the column containing the valid items
   * @param callback  the callback after user has chosen
   */
  public ChoiceManagerByDataObject(MustTextField textField, DataObject sourceDataObject, String sourceColumnName, Callback callback) {
    super(textField, callback);
    this.sourceDataObject = sourceDataObject;
    this.sourceColumnName = sourceColumnName;
  }
  
  public void setAdditionalWhereConditionFragment(String additionalWhereConditionFragment) {
    this.additionalWhereConditionFragment = additionalWhereConditionFragment;
  }

  @Override
  protected Vector<String> getChoice(String fragment) {
    Vector<String> result = new Vector<String>();
    int counter = 0;
    WhereCondition whereCondition = new WhereCondition(sourceDataObject);
    whereCondition.append(sourceColumnName, fragment + "%");
    if (additionalWhereConditionFragment != null) {
      whereCondition.append(additionalWhereConditionFragment);
    }
    Logger.getInstance().debug(getClass(), "searching for: " + whereCondition.toString());
    sourceDataObject.select(sourceColumnName, whereCondition);
    while (isStillRelevant() && sourceDataObject.nextRow()) {
      String item = sourceDataObject.getText(sourceColumnName);
      if (!result.contains(item)) {
        if (++counter > choiceLimit) {
          result = null;
          break;
        }
        result.add(item);
      }
    }
    sourceDataObject.closeQuery();
    if (result != null) Collections.sort(result);
    return result;
  }

}
