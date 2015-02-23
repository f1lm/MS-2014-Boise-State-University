/*
 * Copyright (c) 1999-2010 Christoph Mueller. All rights reserved.
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

package de.must.dataobj;

/**
 * Data change event. Used for synchronization of data presentations, e.g.
 * to update a ComboBox when a new entry was added by an administration.
 * @author Christoph Mueller
 */
public class DataChangedEvent {

  public static final int INSERTION_MODE = 0;
  public static final int UPDATE_MODE = 1;
  public static final int DELETION_MODE = 2;
  public static final String[] modeDescription = new String[] {
    "inserted",
    "updated",
    "deleted",
  };
  private int mode;
  public static final int SINGLE_TYPE = 0;
  public static final int NOT_THE_LAST_OF_A_SEQUENCE_TYPE = 1;
  public static final int SUMMARY_TYPE = 2;
  private int sequenceType;
  private String entityName;
  private Class<?> sender;
  private Identifier identifier;

  /**
   * Constructs a new DataChangedEvent. To prevent repeated change
   * consequences, it may be indicated that more updates on the same entity
   * follow by using mode <code>{@link #NOT_THE_LAST_OF_A_SEQUENCE_TYPE}</code>
   * @param entityName the name of the entity that was changed
   * @param mod the data change mode which may be
   * <code>{@link #INSERTION_MODE}</code>,
   * <code>{@link #UPDATE_MODE}</code>
   * or <code>{@link #DELETION_MODE}</code>
   * @param sequenceType the sequence type which may be
   * <code>{@link #SINGLE_TYPE}</code>,
   * <code>{@link #NOT_THE_LAST_OF_A_SEQUENCE_TYPE}</code> or
   * <code>{@link #SUMMARY_TYPE}</code>
   * @param sender the class who causes the change event
   * @identifyValueInt the affected primary key
   */
  public DataChangedEvent(String entityName, int mode, int sequenceType, Class<?> sender, Identifier identifier) {
    this(entityName, mode, sequenceType, sender);
    this.identifier = identifier;
  }

  /**
   * Contructs a new DataChangedEvent. To prevent repeated change
   * consequences, it may be indicated that more updates on the same entity
   * follow by using mode <code>{@link #NOT_THE_LAST_OF_A_SEQUENCE_TYPE}</code>
   * @param entityName the name of the entity that was changed
   * @param mod the data change mode which may be
   * <code>{@link #INSERTION_MODE}</code>,
   * <code>{@link #UPDATE_MODE}</code>
   * or <code>{@link #DELETION_MODE}</code>
   * @param sequenceType the sequence type which may be
   * <code>{@link #SINGLE_TYPE}</code>,
   * <code>{@link #NOT_THE_LAST_OF_A_SEQUENCE_TYPE}</code> or
   * <code>{@link #SUMMARY_TYPE}</code>
   * @param sender the class who causes the change event
   */
  private DataChangedEvent(String entityName, int mode, int sequenceType, Class<?> sender) {
    this.entityName = entityName;
    this.mode = mode;
    this.sequenceType = sequenceType;
    this.sender = sender;
  }

  /**
   * Returns the entity name.
   * @return the entity name
   */
  public String getEntityName() {
    return entityName;
  }

  /**
   * Returns the change mode.
   * @return the change mode
   * @see #INSERTION_MODE
   * @see #UPDATE_MODE
   * @see #DELETION_MODE
   */
  public int getMode() {
    return mode;
  }

  /**
   * Returns the sequence type.
   * @return the sequence type
   */
  public int getSequenceType() {
    return sequenceType;
  }

  /**
   * Returns the sender.
   * @return the sender
   */
  public Class<?> getSender() {
    return sender;
  }

  /**
   * Returns the identifier (primary key) of the affected row if available.
   * @return the identifier (primary key) of the affected row
   */
  public Identifier getIdentifier() {
    return identifier;
  }

	public String toString() {
		return this.getClass().getName()
      + " / " + getEntityName()
      + " / " + getIdentifier().toString()
      + " / " + modeDescription[getMode()]
    ;
	}

}
