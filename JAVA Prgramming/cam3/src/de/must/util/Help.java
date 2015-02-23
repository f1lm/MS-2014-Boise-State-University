/*
 * Copyright (c) 1999-2003 Christoph Mueller. All rights reserved.
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

/**
 * Link from help context to help content via browser presentation.
 * All components implementing the ContextHelp interface support method
 * setHelpContext, which may be used to assign a position in the manual.
 * @author Christoph Mueller
 */
public class Help {

  /**
   * Shows the default page of the application.
   * @return true of the specified page was reachable
   */
  public static boolean show() {
    return showTopic("Index", null);
  }

  /**
   * Shows the help page as specified by topic. Actually, the topic is the name
   * of a html page.
   * @param topic the topic of the help to show
   * @return true of the specified page was reachable
   */
  public static boolean showTopic(String topic) {
    return showTopic(topic, null);
  }

  /**
   * Shows the help page as specified by topic and target.
   * Actually, the topic is the name of a HTML page, and the target is the
   * target inside this page.
   * @param topic the topic of the help to show
   * @param target the target of the help to show
   * @return true of the specified page was reachable
   */
  public static boolean showTopic(String topic, String target) {
    if (topic.startsWith("http://") && target == null) {
      return Browser.visitURL(topic);
    }
    String codeBase;
    String helpBase;
    int binIndex;
    codeBase = System.getProperty("user.dir");
    binIndex = codeBase.lastIndexOf("\\bin");
    if (binIndex == -1) binIndex = codeBase.lastIndexOf("/bin");
    if (binIndex == -1) helpBase = codeBase + "/help"; // Win 98 doesn't like regular slash
    else helpBase = codeBase.substring(0, binIndex) + "/help"; // Win 98 doesn't like regular slash
    if (target == null) return Browser.visitURL("file://" + helpBase + "/" + topic + ".htm");
    else return Browser.visitURL("file://" + helpBase + "/" + topic + ".htm" + "#" + target);
  }

  /**
   * Shows the context help of a Container.
   * If help is demanded via F1, the most special help is shown.
   * Sample: If the field is help context defined, this context is used.
   * If not, the context of the Frame is used . . .
   * @param field the field, from where the help is requested.
   * @return true of the specified page was reachable
   */
  public static void showContextHelp(java.awt.Container field) {
    boolean contextHelp = false;
    // de.must.io.Logger.getInstance().info(getClass(), "Context help requested for " + field);
    java.awt.Container temp = field;
    while (temp != null) {
      try {
        // de.must.io.Logger.getInstance().info(getClass(), "Trying help for " + temp);
        de.must.wuic.ContextHelp ContextHelp = (de.must.wuic.ContextHelp)temp;
        if (ContextHelp.getHelpTopic() != null) {
          if (ContextHelp.getHelpTarget() != null) {
            showTopic(ContextHelp.getHelpTopic(), ContextHelp.getHelpTarget());
            contextHelp = true;
          }
          else {
            showTopic(ContextHelp.getHelpTopic());
            contextHelp = true;
          }
          break;
        }
      }
      catch (Exception e) {}
      try {temp = temp.getParent();} catch (Exception e) {}
    }
    if (!contextHelp) showTopic("Index");
  }

}
