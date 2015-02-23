package de.jugs.cookbook;

import de.must.markup.MainStd;


/**
 * This is the only class directly visible to the user. All requests pass this
 * gate. Cameleon OSP will try to assign an existing session. If not possible,
 * a new session is created and assigned.
 * <br>
 * <br> May I suggest one thing? Do not try to understand the sample application
 *      primarily by following the path how the request is worked off. Instead,
 *      try to follow this imagination:
 * <br> 1. For each application fragment: Which type of module is it?
 *         How is it supported by the framework?
 * <br> 2. What does a framework need to know at least, to build the
 *         application you want to create?
 * <br> 3. Where could the framework ask me for details, which it cannot know
 *         by standard?
 * <br>
 * The technical way to realize this paradigm is using the modifier abstract
 * – inside the super classes individual information are requested that way.
 * Your application is demanded to provide the information. E.g. in this class,
 * the framework is asking you:
 * <br> 1. What are your global objects? I need to know your database
 *         connection!
 * <br> 2. What is your session class? I need to know which layout you want to
 *         use and which menu items and toolbar option you like ...
 * <br> Hint: to keep the documentation maintainable, method descriptions are
 * to be found inside the framework components. Look in the API doc of the super
 * class to understand what the framework wants from you. Thus, we haven't this
 * documentation redundantly in each application. And it keeps the individual
 * classes small, which increases clearness.
 * @author Christoph Mueller
 */
public final class Main extends MainStd {

  protected Class<Session> getSessionClass() {
    return Session.class;
  }

  protected void initWithFirstRequestInfos(String realPath) {
    Global.getInstance().createOrCheckConnections();
  }

}
