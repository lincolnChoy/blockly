'use strict';

goog.provide('Blockly.Java.parallel');

goog.require('Blockly.Java');

  // Blockly.Java['class'] = function(block) {
  //   var text_cname = block.getFieldValue('CNAME');
  //   var text_ename = block.getFieldValue('ENAME');
  //   var text_iname = block.getFieldValue('INAME');
  //   var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  //   // TODO: Assemble JavaScript into code variable.
  //   var code = `public class `;
  //   if (text_cname != 'default') {
  //     code += text_cname + ' ';
  //   } else {
  //     code += 'replace_class_name';
  //   }
  //   if (text_ename != 'default') {
  //     code += 'extends ' + text_ename + ' ';
  //   }
  //   if (text_iname != 'default') {
  //     code += 'implements ' + text_iname + ' ';
  //   }
  //   code += '{\n';
  //   if (statements_name != '') {
  //     code += statements_name;
  //   }
  //   code += '}';
  //   return code;
  // };


  Blockly.Java['task_three_worker'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var dropdown_name = block.getFieldValue('NAME');
    var statements_job = Blockly.Java.statementToCode(block, 'JOB');
    if (dropdown_name == 'DYNAMIC') {
      var code = `
    static class WorkerSharingTasks extends Thread {
      
        private ConcurrentLinkedQueue<Integer> sharedQueue;
      
        public WorkerSharingTasks(ConcurrentLinkedQueue<Integer> sharedQueue) {
          this.sharedQueue = sharedQueue;
        }
      
        @Override
        public void run() {
            System.out.println("Thread " + Thread.currentThread().getId() + " has started");\n`
      if (statements_job) {
        code += statements_job;
      } else {
        code += `
            int count = 0;
            Integer amount;
            while ((amount = sharedQueue.poll()) != null ) {
                Work.computeWork(amount);
                count++;
            }`;
      }
    } else {
      var code = `
    static class Worker extends Thread {
      
        private ArrayList<Integer> privateWork;

        public Worker(ArrayList<Integer> privateWork) {
            this.privateWork = privateWork;
        }
      
        @Override
        public void run() {
            System.out.println("Thread " + Thread.currentThread().getId() + " has started");\n`
      if (statements_job) {
        code += statements_job;
      } else {
        code += `
            int count = 0;
            for (Integer amount: privateWork) {
                Work.computeWork(amount);
                count++;
            }`;
      }
    }
    
    code += `
        System.out.println("Thread " + Thread.currentThread().getId() + " and has completed " + count + " tasks");
        }\n
    }\n`;
    return code;
  };


  Blockly.Java['task_three_work'] = function(block) {
    // TODO: Assemble JavaScript into code variable.

    var code = `
    public static class Work {

        public static void computeWork(int value) {

            double xmin = -1.0;
            double ymin = -1.0;
            double width = 2.0;
            double height = 2.0;
            for (int i = 0; i < value; i++) {
                for (int j = 0; j < value; j++) {
                    double x = xmin + i * width / value;
                    double y = ymin + j * height / value;
                    Complex z = new Complex(x, y);
                    Complex.newton(z);
                }
            }
        }


        public static class Complex {
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
            
            public static Color newton(Complex z) {
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
        }
    }\n`
    return code;
  };


  // Blockly.Java['create_worker'] = function(block) {
  //   var value_numworkers = Blockly.Java.valueToCode(block, 'NUMWORKERS', Blockly.Java.ORDER_ATOMIC);
  //   var code = 'ArrayList<Worker> workerList = new ArrayList<Worker>();\n';
  //   // TODO: Assemble JavaScript into code variable.
  //     code += `
  //     for (int i = 0; i < ${value_numworkers}; i++){
  //         workerList.add(new Worker(iwork));\n
  //     }\n`
  //   return code;
  // };

  // Blockly.Java['start_work'] = function(block) {
  //   // TODO: Assemble JavaScript into code variable.
  //   var code = `
  //   for (int i = 0; i < workerList.size(); i++) {
  //       workerList.get(i).start();
  //   };\n`;
  //   return code;
  // };

  // Blockly.Java['join_worker'] = function(block) {
  //   // TODO: Assemble JavaScript into code variable.
  //   var code = `
  //   try {
  //     for (int i = 0; i < workerList.size(); i++) {
  //         workerList.get(i).join();
  //     }\n
  //   } catch (InterruptedException e) {
  //       e.printStackTrace();
  //   }`;
  //   return code;
  // };

  Blockly.Java['task_three_main_block'] = function(block) {
    var statements_name = Blockly.Java.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = `
    public static void main(String[] args) {
    ${statements_name}\n    }\n`;
    return code;
  };

  Blockly.Java['task_three_distribute_work'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var code = '';
  // TODO: Assemble JavaScript into code variable.
  if (dropdown_name == 'DYNAMIC') {
    code += `\n
    /* This block distributes the tasks dynamically to the workers */`;
  } else {
    code += `\n
    /* This block distributes the tasks statically to the workers */`;
  }

  code += `
    int numWorkers = Runtime.getRuntime().availableProcessors();`

  if (dropdown_name == 'DYNAMIC') {
    code += `
    ArrayList<WorkerSharingTasks> workers = new ArrayList<>();

    ConcurrentLinkedQueue<Integer> sharedQueue = new ConcurrentLinkedQueue<>();
    sharedQueue.addAll(itemsToProcess);
    
        for (int i = 0; i < numWorkers; i++) {
            WorkerSharingTasks w = new WorkerSharingTasks(sharedQueue);
            workers.add(w);
            w.start();
        }
    
        for (WorkerSharingTasks w: workers) {
            try {
                w.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        /* ----------------------------------- */\n`;

  } else {
    code +=`
    ArrayList<Worker> workers = new ArrayList<>();
    int numTasksPerWorker = itemsToProcess.size()/numWorkers;
    int extraTasks = numTasks % numTasksPerWorker;

    int offset = 0;
    for (int i = 0; i < numWorkers; i++) {
        ArrayList<Integer> privateWork = new ArrayList<>();

        if (extraTasks > 0) {
            privateWork.addAll(itemsToProcess.subList(numTasksPerWorker*i + offset, numTasksPerWorker*(i+1) + 1 + offset));
            offset++;
            extraTasks--;
        } else {
            privateWork.addAll(itemsToProcess.subList(numTasksPerWorker*i + offset, numTasksPerWorker*(i+1) + offset));
        }
        
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
    /* ----------------------------------- */\n`;
  }

  return code;
  };

  Blockly.Java['task_three_jobs'] = function(block) {
    var value_numtask = Blockly.JavaScript.valueToCode(block, 'NUMTASK', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_size = block.getFieldValue('SIZE');
    var code = `
    ArrayList<Integer> itemsToProcess = new ArrayList<Integer>();
		
    int numTasks = ${value_numtask};`

    if (dropdown_size == 'COARSE') {
        code +=`
    int granularityOfTask = 300;

    //-- Add the items to a list
    for (int i = 0; i < numTasks; i++) {
        itemsToProcess.add(granularityOfTask);
    }`;
    } else if (dropdown_size == 'FINE') {
        code +=`
    int granularityOfTask = 1;  

    //-- Add the items to a list
    for (int i = 0; i < numTasks; i++) {
        itemsToProcess.add(granularityOfTask);
    }`;
    } else {
        code +=`
    int granularityOfFineTask = 1;
    int granularityOfCoarseTask = 300;

    for (int i = 0; i < numTasks; i++) {
        if (i > numTasks/15) {
            itemsToProcess.add(granularityOfCoarseTask);
        }
        else {
            if (i % 5 ==0) {
                itemsToProcess.add(granularityOfCoarseTask);
            }
            else {
                itemsToProcess.add(granularityOfFineTask);
            }
            
        }
    }`;
    }

    code += '\n';
    return code;
  };

  
  Blockly.Java['start_timer'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
    long startTime = System.currentTimeMillis();\n`;
    return code;
  };

  Blockly.Java['stop_timer'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
    long totalTime = System.currentTimeMillis() - startTime;
    System.out.println("Total time = " + totalTime + " milliseconds");\n`;
    return code;
  };
