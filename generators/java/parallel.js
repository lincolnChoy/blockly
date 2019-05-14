'use strict';

goog.provide('Blockly.Java.parallel');

goog.require('Blockly.Java');

  Blockly.Java['something'] = function(block) {
    var value_name = Blockly.Java.valueToCode(block, 'NAME', Blockly.Java.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `x = "${value_name}";\nSystem.out.println(x);`;
    return code;
  };