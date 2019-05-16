'use strict';

goog.provide('Blockly.Blocks.parallel');

goog.require('Blockly.Blocks');

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
    this.appendStatementInput("JOB")
        .setCheck(null)
        .appendField("With job function");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['work'] = {
  init: function() {
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField("Declare work class");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['create_worker'] = {
  init: function() {
    this.appendValueInput("NUMWORKERS")
        .setCheck("Number")
        .appendField("Create");
    this.appendDummyInput()
        .appendField("Workers");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['jobs'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize jobs as  ")
        .appendField(new Blockly.FieldDropdown([["coarse","COARSE"], ["fine","FINE"], ["mix","MIX"]]), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['start_work'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Start work");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['join_worker'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Main thread joins worker threads");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['main_block'] = {
  init: function() {
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField("Main");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['distribute_work'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Distribute jobs to workers");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

