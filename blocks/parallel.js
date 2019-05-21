'use strict';

goog.provide('Blockly.Blocks.parallel');

goog.require('Blockly.Blocks');

// Blockly.Blocks['class'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Class Name")
//         .appendField(new Blockly.FieldTextInput("default"), "CNAME");
//     this.appendDummyInput()
//         .appendField("Extends")
//         .appendField(new Blockly.FieldTextInput("default"), "ENAME");
//     this.appendDummyInput()
//         .appendField("Implements")
//         .appendField(new Blockly.FieldTextInput("default"), "INAME");
//     this.appendStatementInput("NAME")
//         .setCheck(null);
//     this.setColour(230);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };




Blockly.Blocks['work'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Declare Work class");
    this.setColour(230);
 this.setTooltip("This block creates a Class with a method to compute work. complex numbers");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['sequential'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Start work on 1 task");
    this.appendValueInput("SIZE")
        .setCheck("Number")
        .appendField("With task size");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Run the compute work method from the work class.");
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

Blockly.Blocks['timer'] = {
  init: function() {
    this.appendStatementInput("TIME_STATEMENT")
        .setCheck(null)
        .appendField("timer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Blockly.Blocks['create_worker'] = {
//   init: function() {
//     this.appendValueInput("NUMWORKERS")
//         .setCheck("Number")
//         .appendField("Create");
//     this.appendDummyInput()
//         .appendField("Workers");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };


// Blockly.Blocks['start_work'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Start work");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };


// Blockly.Blocks['join_worker'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Main thread joins worker threads");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };


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

