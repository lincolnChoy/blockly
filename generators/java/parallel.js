'use strict';

goog.provide('Blockly.Java.parallel');

goog.require('Blockly.Java');

  Blockly.Java['class'] = function(block) {
    var text_cname = block.getFieldValue('CNAME');
    var text_ename = block.getFieldValue('ENAME');
    var text_iname = block.getFieldValue('INAME');
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = `public class `;
    if (text_cname != 'default') {
      code += text_cname + ' ';
    } else {
      code += 'replace_class_name';
    }
    if (text_ename != 'default') {
      code += 'extends ' + text_ename + ' ';
    }
    if (text_iname != 'default') {
      code += 'implements ' + text_iname + ' ';
    }
    code += '{\n';
    if (statements_name != '') {
      code += statements_name;
    }
    code += '}';
    return code;
  };

  Blockly.Java['worker'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var statements_job = Blockly.Java.statementToCode(block, 'JOB');
    var code = `    static class Worker extends Thread {
      
        public Worker() {
        }
      
        @Override
        public void run() {
          ${statements_job}
        }\n   }\n`;
    return code;
  };


  Blockly.Java['create_worker'] = function(block) {
    var value_numworkers = Blockly.Java.valueToCode(block, 'NUMWORKERS', Blockly.JavaScript.ORDER_ATOMIC);
    var code = '    ArrayList<Worker> workerList = new ArrayList<Worker>();\n';
    // TODO: Assemble JavaScript into code variable.
      code += `
      for (int i = 0; i < ${value_numworkers}; i++){
          workerList.add(new Worker());\n
      }\n`
    return code;
  };

  Blockly.Java['start_work'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
    for (int i = 0; i < workerList.size; i++) {
    workerList.get(i).start();
    };\n`;
    return code;
  };

  Blockly.Java['join_worker'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
    try {
      for (int i = 0; i < workerList.size; i++) {
          workerList.get(i).join();
      }\n
    } catch (InterruptedException e) {
        e.printStackTrace();
    }`;
    return code;
  };

  