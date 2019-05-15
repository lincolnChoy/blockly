'use strict';

goog.provide('Blockly.Java.parallel');

goog.require('Blockly.Java');

  Blockly.Java['something'] = function(block) {
    var value_name = Blockly.Java.valueToCode(block, 'NAME', Blockly.Java.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `x = "${value_name}";\nSystem.out.println(x);`;
    return code;
  };

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
    var code = `static class Worker extends Thread {

    private int value;
      
    public Worker(int value) {
       this.value = value;
    }
      
    @Override
    public void run() {
      Work.computeWork(value);
    }\n}`;
    return code;
  };


  Blockly.Java['create_worker'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    var value_numjobs = Blockly.JavaScript.valueToCode(block, 'NUMJOBS', Blockly.JavaScript.ORDER_ATOMIC);
    var value_jobsize = Blockly.JavaScript.valueToCode(block, 'JOBSIZE', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `Thread ${text_name} = new Worker(${value_jobsize});\n`;
    return code;
  };