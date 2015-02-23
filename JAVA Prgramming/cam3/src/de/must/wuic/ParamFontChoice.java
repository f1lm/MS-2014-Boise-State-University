package de.must.wuic;

import de.must.middle.ParameterStore;
import de.must.util.KeyValuePairNum;

public class ParamFontChoice extends ParamChoice {

  public ParamFontChoice(ParameterStore parameterStore, ParameterStore.Entry entry) {
    super(parameterStore, new KeyValuePairNum[] {
      new KeyValuePairNum(0, WuicGlobal.getInstance().getResourceString("TEXT_STANDARD")),  
      new KeyValuePairNum(8, "8"),  
      new KeyValuePairNum(10, "10"),  
      new KeyValuePairNum(11, "11"),  
      new KeyValuePairNum(12, "12"),  
      new KeyValuePairNum(14, "14"),  
      new KeyValuePairNum(16, "16"),  
      new KeyValuePairNum(18, "18"),  
      new KeyValuePairNum(20, "20"),  
    }, entry.getKey());
  }

}
