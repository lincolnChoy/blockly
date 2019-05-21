'use strict';

goog.provide('Blockly.Blocks.parallel');

goog.require('Blockly.Blocks');



Blockly.Blocks['task_two_worker'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Declare Worker class")
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['task_two_work'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Declare Work class");
      this.setColour(230);
   this.setTooltip("This block creates a Class with a method to compute work. complex numbers");
   this.setHelpUrl("");
    }
};


Blockly.Blocks['start_timer'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("start timer");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['stop_timer'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("stop timer");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };


Blockly.Blocks['task_two_jobs'] = {
  init: function() {
    this.appendValueInput("NUMTASK")
        .setCheck("Number")
        .appendField("Initialize");
    this.appendDummyInput()
        .appendField("jobs as")
        .appendField(new Blockly.FieldDropdown([["coarse-grained tasks","COARSE"], ["fine-grained tasks","FINE"], ["mixed size tasks","MIX"]]), "SIZE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['task_two_main_block'] = {
  init: function() {
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField("Main");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['task_two_distribute_work'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Distribute jobs to workers");
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["With workers equal to your cores.","CORE"], ["With a worker per task","TASK"]]), "THREADS");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("This block will describes how the task will be distributed.");
   this.setHelpUrl("");
    }
  };
