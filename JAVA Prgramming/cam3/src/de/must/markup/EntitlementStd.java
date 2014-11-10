/*
 * Copyright (c) 2010 Christoph Mueller. All rights reserved.
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

package de.must.markup;

/**
 * Entitlement Management.
 * Menu items may ask here action classes about their subject area.
 * Menus have to be told, what kind of subject area they are.
 * @author Christoph Mueller
 */
public abstract class EntitlementStd {

  public static final int AREA_GENERAL = 0;
  public static final int AREA_ROOT = 9;

  public static final int LEVEL_NOTHING = 0;
  public static final int LEVEL_VIEW = 1;
  public static final int LEVEL_ADD = 2;
  public static final int LEVEL_CHANGE = 3;
  public static final int LEVEL_DELETE = 4;
  public static final int LEVEL_ALL = 9;

  protected SessionData sessionData;

  /**
   * Constructs a new entitlement manager.
   * @param sessionData the session's global data
   */
  public EntitlementStd(SessionData sessionData) {
    this.sessionData = sessionData;
  }

  /**
   * Returns the access level of the menu as specified.
   * @param mustmenu the menu to check access
   * @return the level - e.g. may be viewed only
   */
  public int getLevel(MustMenu mustMenu) {
    return getLevel(mustMenu.getSubjectArea());
  }

  /**
   * Returns whether a menu item may be accessed.
   * @param mustMenuItem the menu item to check access
   * @return true if the menu item is to be accessed.
   */
  public boolean isEntitled(MustMenuItem mustMenuItem) {
    Class<? extends Invokable> classWishedToInvoke = mustMenuItem.getActionClass();
    if (classWishedToInvoke == null) return true; // e.g. FreeAction;
    int minimunLevel = LEVEL_VIEW;
    try  {
      minimunLevel = classWishedToInvoke.getField("standardLevel").getInt(new Object()/* (?) */);
    } catch(NoSuchFieldException nsfe) {
      // de.must.io.Logger.getInstance().error(getClass(), nsfe); // Ok, this may occur.
    } catch(Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return (getLevel(classWishedToInvoke) >= minimunLevel);
  }

  /**
   * Returns the access level of the menu item as specified.
   * @param mustMenuItem the menu item to check access
   * @return the level - e.g. may be viewed only
   */
  public int getLevel(MustMenuItem mustMenuItem) {
    return getLevel(mustMenuItem.getActionClass());
  }

  /**
   * Returns the access level of the dialog as specified.
   * @param dialog the dialog to check access
   * @return the level - e.g. may be viewed only
   */
  public int getLevel(Dialog dialog) {
    return getLevel(dialog.getClass());
  }

  /**
   * Returns the access level of any class as specified.
   * @param classWishedToInvoke the class to check access
   * @return the level - e.g. may be viewed only
   */
  private int getLevel(Class<? extends Invokable> classWishedToInvoke) {
    de.must.io.Logger.getInstance().debug(getClass(), "Entitlement check for " + classWishedToInvoke);
    try  {
      int subjectArea = classWishedToInvoke.getField("subjectArea").getInt(new Object()/* (?) */);
      de.must.io.Logger.getInstance().debug(getClass(), "Subject area: " + subjectArea);
      de.must.io.Logger.getInstance().debug(getClass(), "getLevel(subjectArea) = " + getLevel(subjectArea));
      return getLevel(subjectArea);
    } catch(NoSuchFieldException nsfe) {
      // de.must.io.Logger.getInstance().error(getClass(), nsfe); // Ok, this may occur.
    } catch(Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return getLevel(AREA_GENERAL);
  }

  /**
   * Returns what the logged in user may do in this context. This is
   * represented by the returned level.
   * Prefered way to regulate entitlement.
   * @param subjectArea the subject area of the context
   * @return the level - e.g. may be viewed only
   */
  protected abstract int getLevel(int subjectArea);

}
