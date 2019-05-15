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



Blockly.Blocks['class'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Class Name")
        .appendField(new Blockly.FieldTextInput("default"), "CNAME");
    this.appendDummyInput()
        .appendField("Extends")
        .appendField(new Blockly.FieldTextInput("default"), "ENAME");
    this.appendDummyInput()
        .appendField("Implements")
        .appendField(new Blockly.FieldTextInput("default"), "INAME");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['worker'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Define Worker");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['create_worker'] = {
  init: function() {
    this.appendValueInput("NUMJOBS")
        .setCheck("Number")
        .appendField("Create Worker called")
        .appendField(new Blockly.FieldTextInput("default"), "NAME")
        .appendField("with");
    this.appendValueInput("JOBSIZE")
        .setCheck("Number")
        .appendField("jobs of size");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
