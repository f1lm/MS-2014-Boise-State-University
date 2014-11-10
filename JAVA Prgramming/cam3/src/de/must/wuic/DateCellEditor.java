package de.must.wuic;

import java.util.Date;

import javax.swing.DefaultCellEditor;

public class DateCellEditor extends DefaultCellEditor {
  
  private MustDateField dateField;
  
  public DateCellEditor() {
    super(new MustDateField());
    dateField = (MustDateField)editorComponent;
    delegate = new EditorDelegate() {
      public void setValue(Object value) {
        dateField.setDate((Date)value);
      }
      public Object getCellEditorValue() {
        return dateField.getSqlDate();
      }
    };
    dateField.addActionListener(delegate);
  }

}
