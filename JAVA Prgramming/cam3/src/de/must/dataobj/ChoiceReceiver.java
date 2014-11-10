package de.must.dataobj;

/**
 * Callback interface after a user has choosen an entry from a list.
 * Usage sample:
 * <pre><code>
  private void chooseMyEntity() {
    MyChooser myChooser = MyChooser(); // Instance of SimpleDataListFrame
    myChooser.setReceiver(new ChoiceReceiver() {
      public void receiveChoice(Identifier identifier) {
        // set text in text field
        // load additional data
        toFront();
      }
    });
    myChooser.show();
  }
 * </code></pre> 
 * @author Christoph Mueller
 */
public interface ChoiceReceiver {

	/**
   * Receive the entry choosen by user and do things you like depending on the choice.
	 * @param identifier the identifier of the choosen entry
	 */
	public void receiveChoice(Identifier identifier);

}
