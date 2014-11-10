//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * Toolbar declarations. Define here which functionallity is to be represented
 * by which icon.
 * @author Christoph Mueller
 */
public final class ToolBar extends MustToolBar {

  public ToolBar(SessionData sessionData) {
    super(sessionData);
  }

  protected void addIndividualItems() {
    addItem(new ToolBarIcon("menu.jpg"), MainMenu.class, getResourceString("TEXT_MENU"));
    addItem(new ToolBarIcon("enq.jpg"), CookbookEnquiry.class, getResourceString("TEXT_LOOKING_FOR_EXISTING_RECEIPTS"));
    addItem(new ToolBarIcon("new.jpg"), CookbookAdministration.class, getResourceString("TEXT_ENTER_NEW_RECEIPT"));
    addItem(new ToolBarIcon("type.jpg"), TypeAdministration.class, getResourceString("TEXT_CREATE_OR_MODIFY_RECEIPT_TYPES"));
  }

}


