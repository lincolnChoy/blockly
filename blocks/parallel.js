'use strict';

goog.provide('Blockly.Blocks.parallel');

goog.require('Blockly.Blocks');


Blockly.Blocks['something'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck("Number")
          .appendField("Something");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
