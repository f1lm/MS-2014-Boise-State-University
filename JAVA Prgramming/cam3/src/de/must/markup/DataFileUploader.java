package de.must.markup;

import de.must.dataobj.DataObject;

/**
 * @author Christoph Mueller
 */
public class DataFileUploader extends FileUploader implements Storable {

  public static final int FILENAME_DIVIDED = 0;
  public static final int DIRECTORY_DIVIDED = 1;
  private int divideType = FILENAME_DIVIDED;
  private DataObject assignedDataObject;

	/**
	 * Constructor for DataFileUploader.
	 * @param saveDirectory
	 */
	public DataFileUploader(String saveDirectory, DataObject assignedDataObject) {
		this(saveDirectory, null, assignedDataObject);
	}

	/**
	 * Constructor for DataFileUploader.
	 * @param saveDirectory
	 * @param name
	 */
	public DataFileUploader(String saveDirectory, String name, DataObject assignedDataObject) {
		super(saveDirectory, name);
    this.assignedDataObject = assignedDataObject;
	}

  public int getDivideType() {
    return divideType;
  }

  public void setDivideType(int divideType) {
    this.divideType = divideType;
  }

	/**
	 * @see de.must.markup.Storable#loadValue()
	 */
	public void loadValue() {
	}

	/**
	 * @see de.must.markup.Storable#isFilled()
	 */
	public boolean isFilled() {
		return fileBuffer != null;
	}

	/**
	 * @see de.must.markup.Storable#isModified()
	 */
	public boolean isModified() {
		return isFilled();
	}

	/**
	 * @see de.must.markup.Storable#isRequirementUnfulfilled()
	 */
	public boolean isRequirementUnfulfilled() {
    if (required & !isFilled()) return true;
    return false;
	}

	/**
	 * @see de.must.markup.Storable#saveValue()
	 */
	public void saveValue() {
    String id = Integer.toString(assignedDataObject.getIdentifier().getIntIdentifier());
    switch (divideType) {
			case FILENAME_DIVIDED:
        setFileNameWithoutExtension(id);
				break;
			default:
        setSubdirectoryName(id);
				break;
		}
    writeFile();
	}

}

