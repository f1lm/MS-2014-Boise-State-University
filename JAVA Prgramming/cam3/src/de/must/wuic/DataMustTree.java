/*
 * Copyright (c) 1999-2011 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.*;
import javax.swing.tree.*;

/**
 * Reads systems from database tables or simple text files and offers them in a tree structure.
 * @author Christoph Mueller
 */
public class DataMustTree extends MustTree {

  public DataMustTree(int type) {
    super(type);
  }

  /**
   *
   * @param doSystem
   */
  public void loadFrom(DataObject doSystem) {
    loadFrom(doSystem, null);
  }

  /**
   *
   * @param doSystem
   */
  public void loadFrom(DataObject doSystem, String whereCondition) {
    String idName = doSystem.getAttributes()[0].getFieldName();
    String descriptionName = doSystem.getAttributes()[1].getFieldName();
    loadFrom(doSystem, idName, descriptionName, whereCondition);
  }

  /**
   *
   * @param doSystem
   * @param idName
   * @param descriptionName
   */
  public void loadFrom(DataObject doSystem, String idName, String descriptionName) {
    loadFrom(doSystem, idName,  descriptionName, null);
  }

  /**
   * Loads tree using source data object as specified.
   * @param doSystem the source data object to be used
   * @param idName
   * @param descriptionName
   * @return the total number of entries
   */
  public int loadFrom(DataObject doSystem, String idName, String descriptionName, String whereCondition) {
    StringBuffer query = new StringBuffer();
    query.append("select * from " + doSystem.getTableName());
    if (whereCondition != null) {
      query.append(" where " + whereCondition);
    }
    query.append(" order by " + idName);
    if (!doSystem.openQuery(query.toString())) {
      levelNode[0] = new DefaultMutableTreeNode("not needed");
      rootNode.add(levelNode[0]);
      tree.expandRow(0);
      return 0;
    }
    int line = 0;
    while (doSystem.nextRow()) {
      line++;
      addItem(doSystem.getText(idName), doSystem.getText(descriptionName));
    }
    afterFill();
    return line;
  }

}
