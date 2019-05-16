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
      
        private ArrayList<Integer> privateWork;

        public Worker(ArrayList<Integer> privateWork) {
            this.privateWork = privateWork;
        }
      
        @Override
        public void run() {
            System.out.println("The thread is "+Thread.currentThread().getId() + " and has started");\n`
    if (statements_job) {
      code += statements_job;
    } else {
      code += `
            for (Integer amount: privateWork) {
                Work.computeWork(amount);
            }`;
    }
    
    code += `
        System.out.println("The thread is "+Thread.currentThread().getId() + " and is complete");
        }\n
    }\n`;
    return code;
  };


  Blockly.Java['work'] = function(block) {
    var statements_name = Blockly.Java.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.

    var code = `
    public static class Work {

        public static void computeWork(int value) {\n`
          
      if (statements_name) {
        code += '           ' + statements_name;
      } else {
        code += `
            double xmin = -1.0;
            double ymin = -1.0;
            double width = 2.0;
            double height = 2.0;
            for (int i = 0; i < value; i++) {
                for (int j = 0; j < value; j++) {
                    double x = xmin + i * width / value;
                    double y = ymin + j * height / value;
                    Complex z = new Complex(x, y);
                    newton(z);
                }
            }\n`;
      }
      code += `
        }
    
        private static class Complex {
            private final double re;   // the real part
            private final double im;   // the imaginary part
            
            // create a new object with the given real and imaginary parts
            public Complex(double real, double imag) {
                re = real;
                im = imag;
            }
            
            // return a string representation of the invoking Complex object
            public String toString() {
                if (im == 0) return re + "";
                if (re == 0) return im + "i";
                if (im <  0) return re + " - " + (-im) + "i";
                return re + " + " + im + "i";
            }
      
            public double abs()   { return Math.hypot(re, im); } 
      
            // return a new Complex object whose value is (this - b)
            public Complex minus(Complex b) {
                Complex a = this;
                double real = a.re - b.re;
                double imag = a.im - b.im;
                return new Complex(real, imag);
            }
      
            // return a new Complex object whose value is (this * b)
            public Complex times(Complex b) {
                Complex a = this;
                double real = a.re * b.re - a.im * b.im;
                double imag = a.re * b.im + a.im * b.re;
                return new Complex(real, imag);
            }
      
            // return a new Complex object whose value is the reciprocal of this
            public Complex reciprocal() {
                double scale = re*re + im*im;
                return new Complex(re / scale, -im / scale);
            }
      
            // return a / b
            public Complex divides(Complex b) {
                Complex a = this;
                return a.times(b.reciprocal());
            }
        }
        
        private static Color newton(Complex z) {
            double EPSILON = 0.00000001;
            Complex four = new Complex(4, 0);
            Complex one = new Complex(1, 0);
            Complex root1 = new Complex(1, 0);
            Complex root2 = new Complex(-1, 0);
            Complex root3 = new Complex(0, 1);
            Complex root4 = new Complex(0, -1);
            for (int i = 0; i < 100; i++) {
                Complex f = z.times(z).times(z).times(z).minus(one);
                Complex fp = four.times(z).times(z).times(z);
                z = z.minus(f.divides(fp));
                if (z.minus(root1).abs() <= EPSILON) return Color.WHITE;
                if (z.minus(root2).abs() <= EPSILON) return Color.RED;
                if (z.minus(root3).abs() <= EPSILON) return Color.GREEN;
                if (z.minus(root4).abs() <= EPSILON) return Color.BLUE;
            }
            return Color.BLACK;
        }
      
        public static void performIO(int i) {
            try {
                Thread.sleep(i);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
      }\n`
    return code;
  };


  Blockly.Java['create_worker'] = function(block) {
    var value_numworkers = Blockly.Java.valueToCode(block, 'NUMWORKERS', Blockly.Java.ORDER_ATOMIC);
    var code = 'ArrayList<Worker> workerList = new ArrayList<Worker>();\n';
    // TODO: Assemble JavaScript into code variable.
      code += `
      for (int i = 0; i < ${value_numworkers}; i++){
          workerList.add(new Worker(iwork));\n
      }\n`
    return code;
  };

  Blockly.Java['start_work'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
    for (int i = 0; i < workerList.size(); i++) {
        workerList.get(i).start();
    };\n`;
    return code;
  };

  Blockly.Java['join_worker'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
    try {
      for (int i = 0; i < workerList.size(); i++) {
          workerList.get(i).join();
      }\n
    } catch (InterruptedException e) {
        e.printStackTrace();
    }`;
    return code;
  };

  Blockly.Java['main_block'] = function(block) {
    var statements_name = Blockly.Java.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = `
    public static void main(String[] args) {
    ${statements_name}\n    }\n`;
    return code;
  };

  Blockly.Java['distribute_work'] = function(block) {

    
  // TODO: Assemble JavaScript into code variable.
  var code = `\n
    /* This block distributes the tasks evenly to the workers */
    int numWorkers = Runtime.getRuntime().availableProcessors();
    int numTasksPerWorker = itemsToProcess.size()/numWorkers;
    ArrayList<Worker> workers = new ArrayList<>();

    for (int i = 0; i < numWorkers; i++) {
        ArrayList<Integer> privateWork = new ArrayList<>();
        privateWork.addAll(itemsToProcess.subList(numTasksPerWorker*i, numTasksPerWorker*(i+1)));
      
        Worker w = new Worker(privateWork);
        workers.add(w);
        w.start();
    }

    for (Worker w: workers) {
        try {
            w.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    /* ----------------------------------- */\n
    `;
  return code;
  };

  Blockly.Java['jobs'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var code = `
    ArrayList<Integer> itemsToProcess = new ArrayList<Integer>();
		
    int numItems = 100;`

    if (dropdown_name == 'COARSE') {
        code +=`
    int granularityOfTask = 300;

    //-- Add the items to a list
    for (int i = 0; i < numItems; i++) {
        itemsToProcess.add(granularityOfTask);
    }`;
    } else if (dropdown_name == 'FINE') {
        code +=`
    int granularityOfTask = 40;  

    //-- Add the items to a list
    for (int i = 0; i < numItems; i++) {
        itemsToProcess.add(granularityOfTask);
    }`;
    } else {
        code +=`
    int granularityOfFineTask = 40;
    int granularityOfCoarseTask = 300;

    int temp = 0;
    //-- Add the items to a list
    for (int i = 0; i < numItems; i++) {
        temp = (Math.random() <= 0.5) ? 1 : 2;
        if (temp == 1) {
            itemsToProcess.add(granularityOfFineTask);
        } else {
            itemsToProcess.add(granularityOfCoarseTask);
        }
    }`;
    }

    code += '\n';
    return code;
  };
