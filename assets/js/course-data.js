/**
 * course-data.js
 * All course content defined as data — no code changes needed to add lessons.
 * Schema: modules[] → lessons[] → steps[]
 * Step types: "content" | "quiz" | "code"
 */

const COURSE_DATA = {
  title: "Introduction to C Programming",
  subtitle: "A structured, hands-on course for absolute beginners",
  version: "1.0.0",
  modules: [
    {
      id: "m1",
      title: "Module 1: C Basics",
      icon: "🔵",
      lessons: [
        {
          id: "m1l1",
          title: "Lesson 1: Your First C Program",
          steps: [
            {
              id: "m1l1s1",
              type: "content",
              title: "What is C?",
              body: `
                <h2>What is the C Programming Language?</h2>
                <p>C is a <strong>general-purpose programming language</strong> created in the early 1970s. It remains one of the most widely used languages in the world today, powering everything from operating systems to embedded devices.</p>
                <h3>Why learn C?</h3>
                <ul>
                  <li>🔧 <strong>Foundational</strong> — Understanding C makes learning other languages (Java, Python, C++) much easier</li>
                  <li>⚡ <strong>Fast</strong> — C programs run close to the hardware, making them extremely efficient</li>
                  <li>🖥️ <strong>Universal</strong> — Used in operating systems (Linux, Windows), embedded systems, and game engines</li>
                  <li>💡 <strong>Teaches fundamentals</strong> — Memory management, data types, and algorithms all make sense in C</li>
                </ul>
                <blockquote>
                  <p>"C is quirky, flawed, and an enormous success." — Dennis Ritchie, creator of C</p>
                </blockquote>
                <p>In this course you will write, compile, and run real C programs — all inside your browser, no installation needed.</p>
              `
            },
            {
              id: "m1l1s2",
              type: "content",
              title: "Program Structure",
              body: `
                <h2>The Structure of a C Program</h2>
                <p>Every C program follows the same basic structure. Let's break it down:</p>
                <pre><code>#include &lt;stdio.h&gt;

int main() {
    // Your code goes here
    return 0;
}</code></pre>
                <table class="info-table">
                  <thead><tr><th>Part</th><th>Meaning</th></tr></thead>
                  <tbody>
                    <tr><td><code>#include &lt;stdio.h&gt;</code></td><td>Imports the standard input/output library so we can use <code>printf</code></td></tr>
                    <tr><td><code>int main()</code></td><td>The entry point — every C program starts here</td></tr>
                    <tr><td><code>{ ... }</code></td><td>Curly braces mark the start and end of a block of code</td></tr>
                    <tr><td><code>return 0;</code></td><td>Tells the operating system the program finished successfully</td></tr>
                    <tr><td><code>// comment</code></td><td>A comment — the compiler ignores it, it's for humans to read</td></tr>
                  </tbody>
                </table>
                <div class="info-box">
                  <strong>📌 Key Rule:</strong> Every statement in C ends with a semicolon <code>;</code>. Forgetting one is one of the most common beginner mistakes!
                </div>
              `
            },
            {
              id: "m1l1s3",
              type: "quiz",
              title: "Knowledge Check",
              question: "What does <code>return 0;</code> at the end of <code>main()</code> indicate?",
              options: [
                "The program found zero errors",
                "The program finished successfully and returned status code 0 to the OS",
                "The main function returns the number zero as a value to display",
                "It resets the program counter to the beginning"
              ],
              correct: 1,
              explanation: "Correct! By convention, returning 0 from <code>main()</code> tells the operating system that the program completed without errors. Any non-zero return value indicates an error condition."
            },
            {
              id: "m1l1s4",
              type: "code",
              title: "Exercise: Hello, World!",
              instructions: `
                <p>It's time to write your first C program! The classic first program in any language prints <strong>Hello, World!</strong> to the screen.</p>
                <p>The code is already written for you. Click <strong>Run Code</strong> to see it execute, then read the output in the console below.</p>
                <p>Once you've run it successfully, try changing the message inside the quotes to something else and run it again!</p>
              `,
              starter_code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
              expected_output: "Hello, World!",
              check_mode: "contains",
              hint: "Make sure you have #include <stdio.h> at the top. The \\n inside the string creates a new line.",
              completion_message: "🎉 Excellent! You've run your first C program! Notice how printf() sends text to the screen, and \\n moves the cursor to a new line."
            },
            {
              id: "m1l1s5",
              type: "quiz",
              title: "Predict the Output",
              question: `What will this program print?
<pre><code>#include &lt;stdio.h&gt;
int main() {
    printf("Line 1\\n");
    printf("Line 2\\n");
    return 0;
}</code></pre>`,
              options: [
                "Line 1 Line 2 (on one line)",
                "Line 1\nLine 2 (on two separate lines)",
                "Line1\nLine2",
                "The program will not compile"
              ],
              correct: 1,
              explanation: "Correct! Each <code>printf()</code> call prints its text, and the <code>\\n</code> at the end of each string causes a new line. So \"Line 1\" appears on the first line and \"Line 2\" on the second."
            }
          ]
        },
        {
          id: "m1l2",
          title: "Lesson 2: Displaying Output",
          steps: [
            {
              id: "m1l2s1",
              type: "content",
              title: "The printf() Function",
              body: `
                <h2>Displaying Output with printf()</h2>
                <p>The <code>printf()</code> function is your main tool for displaying information. It stands for <em>print formatted</em>.</p>
                <h3>Basic Usage</h3>
                <pre><code>printf("Your text here\\n");</code></pre>
                <h3>Escape Sequences</h3>
                <p>Inside a string, special characters are written with a backslash:</p>
                <table class="info-table">
                  <thead><tr><th>Sequence</th><th>Effect</th></tr></thead>
                  <tbody>
                    <tr><td><code>\\n</code></td><td>New line</td></tr>
                    <tr><td><code>\\t</code></td><td>Tab (indent)</td></tr>
                    <tr><td><code>\\\\</code></td><td>Literal backslash</td></tr>
                    <tr><td><code>\\"</code></td><td>Literal double quote</td></tr>
                  </tbody>
                </table>
                <h3>Format Specifiers</h3>
                <p>You can embed variables in your output using <strong>format specifiers</strong>:</p>
                <pre><code>int age = 25;
printf("I am %d years old.\\n", age);</code></pre>
                <table class="info-table">
                  <thead><tr><th>Specifier</th><th>Type</th><th>Example</th></tr></thead>
                  <tbody>
                    <tr><td><code>%d</code></td><td>Integer</td><td><code>printf("%d", 42);</code> → <em>42</em></td></tr>
                    <tr><td><code>%f</code></td><td>Float/Double</td><td><code>printf("%f", 3.14);</code> → <em>3.140000</em></td></tr>
                    <tr><td><code>%s</code></td><td>String</td><td><code>printf("%s", "hello");</code> → <em>hello</em></td></tr>
                    <tr><td><code>%c</code></td><td>Character</td><td><code>printf("%c", 'A');</code> → <em>A</em></td></tr>
                  </tbody>
                </table>
              `
            },
            {
              id: "m1l2s2",
              type: "code",
              title: "Exercise: Formatted Output",
              instructions: `
                <p>Modify the program below to print a short introduction in this exact format:</p>
                <pre>Name: Ada Lovelace
Age: 27
Language: C</pre>
                <p>Each item should be on its own line. Use the starter code as your base and fill in the <code>printf()</code> statements.</p>
              `,
              starter_code: `#include <stdio.h>

int main() {
    printf("Name: Ada Lovelace\\n");
    // Add two more printf statements below:
    // print "Age: 27"
    // print "Language: C"
    
    return 0;
}`,
              expected_output: "Name: Ada Lovelace\nAge: 27\nLanguage: C",
              check_mode: "exact",
              hint: "Add printf(\"Age: 27\\n\"); and printf(\"Language: C\\n\"); after the first printf.",
              completion_message: "✅ Well done! You've used multiple printf() calls to display formatted output."
            },
            {
              id: "m1l2s3",
              type: "quiz",
              title: "Knowledge Check: Format Specifiers",
              question: "Which format specifier should you use to print a <strong>decimal integer</strong> with <code>printf()</code>?",
              options: [
                "%s",
                "%f",
                "%d",
                "%c"
              ],
              correct: 2,
              explanation: "Correct! <code>%d</code> is used for decimal (base-10) integers. Use <code>%f</code> for floating-point numbers, <code>%s</code> for strings, and <code>%c</code> for single characters."
            }
          ]
        },
        {
          id: "m1l3",
          title: "Lesson 3: Variables and Data Types",
          steps: [
            {
              id: "m1l3s1",
              type: "content",
              title: "Variables and Data Types",
              body: `
                <h2>Storing Data: Variables</h2>
                <p>A <strong>variable</strong> is a named location in memory that stores a value. Before you can use a variable in C, you must <em>declare</em> it by specifying its <strong>type</strong> and <strong>name</strong>.</p>
                <pre><code>int age = 25;
float price = 9.99;
char grade = 'A';
</code></pre>
                <h3>Common Data Types</h3>
                <table class="info-table">
                  <thead><tr><th>Type</th><th>Stores</th><th>Example</th><th>Size</th></tr></thead>
                  <tbody>
                    <tr><td><code>int</code></td><td>Whole numbers</td><td><code>int count = 10;</code></td><td>4 bytes</td></tr>
                    <tr><td><code>float</code></td><td>Decimal numbers (single precision)</td><td><code>float pi = 3.14f;</code></td><td>4 bytes</td></tr>
                    <tr><td><code>double</code></td><td>Decimal numbers (double precision)</td><td><code>double e = 2.718;</code></td><td>8 bytes</td></tr>
                    <tr><td><code>char</code></td><td>A single character</td><td><code>char c = 'X';</code></td><td>1 byte</td></tr>
                  </tbody>
                </table>
                <h3>Naming Rules</h3>
                <ul>
                  <li>Must start with a letter or underscore (<code>_</code>)</li>
                  <li>Can contain letters, digits, and underscores</li>
                  <li>Case-sensitive: <code>age</code> and <code>Age</code> are different variables</li>
                  <li>Cannot use reserved keywords like <code>int</code>, <code>return</code>, <code>for</code></li>
                </ul>
                <div class="info-box">
                  <strong>💡 Best Practice:</strong> Use descriptive names like <code>studentAge</code> rather than <code>x</code>. Your future self will thank you!
                </div>
              `
            },
            {
              id: "m1l3s2",
              type: "code",
              title: "Exercise: Declare and Print Variables",
              instructions: `
                <p>Complete the program to declare three variables and print them. Your output should be:</p>
                <pre>Score: 95
Temperature: 36.6
Grade: A</pre>
                <p>Declare:</p>
                <ul>
                  <li>An <code>int</code> variable called <code>score</code> with value <code>95</code></li>
                  <li>A <code>float</code> variable called <code>temp</code> with value <code>36.6</code></li>
                  <li>A <code>char</code> variable called <code>grade</code> with value <code>'A'</code></li>
                </ul>
              `,
              starter_code: `#include <stdio.h>

int main() {
    // Declare your variables here
    int score = 95;
    // Add float temp and char grade below:
    
    printf("Score: %d\\n", score);
    // Add printf for temp (use %.1f for 1 decimal place)
    // Add printf for grade (use %c)
    
    return 0;
}`,
              expected_output: "Score: 95\nTemperature: 36.6\nGrade: A",
              check_mode: "exact",
              hint: "Use 'float temp = 36.6f;' and 'char grade = \\'A\\';'. For printf, use '%.1f' for one decimal place and '%c' for a character.",
              completion_message: "🌟 Perfect! You've used three different data types. Notice how different format specifiers match different types."
            },
            {
              id: "m1l3s3",
              type: "quiz",
              title: "Knowledge Check: Data Types",
              question: "A student's GPA is <strong>3.85</strong>. Which C data type is most appropriate to store it?",
              options: [
                "int — because grades are numeric",
                "char — because it's a short value",
                "float — because it's a decimal number",
                "string — because it looks like text"
              ],
              correct: 2,
              explanation: "Correct! <code>float</code> (or <code>double</code> for more precision) is the right choice for decimal numbers. <code>int</code> only stores whole numbers — using it would truncate 3.85 to just 3. There is no <code>string</code> type built into C."
            },
            {
              id: "m1l3s4",
              type: "code",
              title: "Exercise: Arithmetic",
              instructions: `
                <p>C can perform arithmetic using standard operators: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and <code>%</code> (modulo — gives the remainder).</p>
                <p>Complete the program so it prints:</p>
                <pre>Sum: 13
Product: 40
Remainder: 3</pre>
                <p>Given: <code>a = 8</code> and <code>b = 5</code></p>
              `,
              starter_code: `#include <stdio.h>

int main() {
    int a = 8;
    int b = 5;
    
    int sum = a + b;
    // Calculate product (a * b) and remainder (a % b)
    
    printf("Sum: %d\\n", sum);
    // Print product and remainder
    
    return 0;
}`,
              expected_output: "Sum: 13\nProduct: 40\nRemainder: 3",
              check_mode: "exact",
              hint: "Add 'int product = a * b;' and 'int remainder = a % b;', then add the corresponding printf statements.",
              completion_message: "🔢 Great arithmetic! The % operator gives the remainder — 8 % 5 = 3 because 8 = 5×1 + 3."
            }
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "Module 2: Control Flow",
      icon: "🟢",
      lessons: [
        {
          id: "m2l1",
          title: "Lesson 1: Making Decisions",
          steps: [
            {
              id: "m2l1s1",
              type: "content",
              title: "if / else Statements",
              body: `
                <h2>Making Decisions: if / else</h2>
                <p>Programs often need to <strong>make decisions</strong> — executing different code depending on conditions. C uses <code>if</code>, <code>else if</code>, and <code>else</code> for this.</p>
                <h3>Syntax</h3>
                <pre><code>if (condition) {
    // runs if condition is true
} else if (other_condition) {
    // runs if other_condition is true
} else {
    // runs if none of the above are true
}</code></pre>
                <h3>Comparison Operators</h3>
                <table class="info-table">
                  <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
                  <tbody>
                    <tr><td><code>==</code></td><td>Equal to</td><td><code>x == 5</code></td></tr>
                    <tr><td><code>!=</code></td><td>Not equal to</td><td><code>x != 0</code></td></tr>
                    <tr><td><code>&gt;</code></td><td>Greater than</td><td><code>x &gt; 10</code></td></tr>
                    <tr><td><code>&lt;</code></td><td>Less than</td><td><code>x &lt; 10</code></td></tr>
                    <tr><td><code>&gt;=</code></td><td>Greater than or equal</td><td><code>x &gt;= 18</code></td></tr>
                    <tr><td><code>&lt;=</code></td><td>Less than or equal</td><td><code>x &lt;= 100</code></td></tr>
                  </tbody>
                </table>
                <div class="warning-box">
                  <strong>⚠️ Common Mistake:</strong> Don't confuse <code>=</code> (assignment) with <code>==</code> (comparison)!
                  Writing <code>if (x = 5)</code> sets x to 5 (always true). You want <code>if (x == 5)</code>.
                </div>
                <h3>Example: Grade Classifier</h3>
                <pre><code>int score = 72;
if (score >= 70) {
    printf("Pass\\n");
} else {
    printf("Fail\\n");
}</code></pre>
              `
            },
            {
              id: "m2l1s2",
              type: "code",
              title: "Exercise: Grade Classifier",
              instructions: `
                <p>Write a program that classifies a score into a grade band. Given <code>score = 85</code>, print the appropriate grade:</p>
                <ul>
                  <li>90 and above → <code>Grade: A</code></li>
                  <li>80–89 → <code>Grade: B</code></li>
                  <li>70–79 → <code>Grade: C</code></li>
                  <li>Below 70 → <code>Grade: F</code></li>
                </ul>
                <p>With <code>score = 85</code>, the output should be:</p>
                <pre>Grade: B</pre>
              `,
              starter_code: `#include <stdio.h>

int main() {
    int score = 85;
    
    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        // What goes here?
    } else if (score >= 70) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: F\\n");
    }
    
    return 0;
}`,
              expected_output: "Grade: B",
              check_mode: "exact",
              hint: "The missing branch should print \"Grade: B\\n\" — just follow the pattern of the other branches.",
              completion_message: "✅ Excellent! Your if/else chain correctly classifies the score. Notice how the conditions are checked top to bottom and the first true one executes."
            },
            {
              id: "m2l1s3",
              type: "quiz",
              title: "Predict the Output",
              question: `What does this code print?
<pre><code>int x = 10;
if (x > 5) {
    printf("Big\\n");
}
if (x > 8) {
    printf("Bigger\\n");
}
if (x > 12) {
    printf("Biggest\\n");
}</code></pre>`,
              options: [
                "Big",
                "Big\nBigger\nBiggest",
                "Big\nBigger",
                "Bigger"
              ],
              correct: 2,
              explanation: "Correct! x = 10 satisfies both <code>x > 5</code> and <code>x > 8</code>, so both print. But <code>x > 12</code> is false (10 is not greater than 12), so \"Biggest\" is not printed. Because these are three separate <code>if</code> statements (not <code>else if</code>), all three are evaluated independently."
            }
          ]
        },
        {
          id: "m2l2",
          title: "Lesson 2: Loops",
          steps: [
            {
              id: "m2l2s1",
              type: "content",
              title: "The for Loop",
              body: `
                <h2>Repeating Actions: The for Loop</h2>
                <p>A <strong>loop</strong> repeats a block of code multiple times. The <code>for</code> loop is ideal when you know exactly how many times you want to loop.</p>
                <h3>Syntax</h3>
                <pre><code>for (initialiser; condition; update) {
    // repeated code
}</code></pre>
                <table class="info-table">
                  <thead><tr><th>Part</th><th>Purpose</th><th>Example</th></tr></thead>
                  <tbody>
                    <tr><td><strong>Initialiser</strong></td><td>Runs once before the loop starts</td><td><code>int i = 0</code></td></tr>
                    <tr><td><strong>Condition</strong></td><td>Checked before each iteration — loop continues while true</td><td><code>i &lt; 5</code></td></tr>
                    <tr><td><strong>Update</strong></td><td>Runs after each iteration</td><td><code>i++</code></td></tr>
                  </tbody>
                </table>
                <h3>Example: Count to 5</h3>
                <pre><code>for (int i = 1; i <= 5; i++) {
    printf("%d\\n", i);
}</code></pre>
                <p>Output:</p>
                <pre>1
2
3
4
5</pre>
                <div class="info-box">
                  <strong>💡 Note:</strong> <code>i++</code> is shorthand for <code>i = i + 1</code>. Similarly, <code>i--</code> decrements by 1.
                </div>
              `
            },
            {
              id: "m2l2s2",
              type: "code",
              title: "Exercise: Count to 5",
              instructions: `
                <p>Write a <code>for</code> loop that counts from <strong>1 to 5</strong>, printing each number on its own line:</p>
                <pre>1
2
3
4
5</pre>
                <p>Use the loop variable <code>i</code> starting at 1 and going up to and including 5.</p>
              `,
              starter_code: `#include <stdio.h>

int main() {
    // Write a for loop that counts from 1 to 5
    for (int i = 1; i <= 5; i++) {
        // Print i here
    }
    
    return 0;
}`,
              expected_output: "1\n2\n3\n4\n5",
              check_mode: "exact",
              hint: "Inside the loop body, add: printf(\"%d\\n\", i);",
              completion_message: "🔁 Loops working! Your for loop counted from 1 to 5. Try changing the upper bound to count higher!"
            },
            {
              id: "m2l2s3",
              type: "content",
              title: "The while Loop",
              body: `
                <h2>The while Loop</h2>
                <p>The <code>while</code> loop repeats as long as a condition remains true. Use it when you <em>don't know in advance</em> how many iterations you need.</p>
                <h3>Syntax</h3>
                <pre><code>while (condition) {
    // repeated code
}</code></pre>
                <h3>Example: Countdown</h3>
                <pre><code>int n = 3;
while (n > 0) {
    printf("%d\\n", n);
    n--;
}
printf("Go!\\n");</code></pre>
                <p>Output:</p>
                <pre>3
2
1
Go!</pre>
                <div class="warning-box">
                  <strong>⚠️ Infinite Loops:</strong> If the condition never becomes false, the loop runs forever. Always make sure your loop variable is updated inside the loop body!
                </div>
                <h3>for vs while — When to Use Which?</h3>
                <table class="info-table">
                  <thead><tr><th>Use</th><th>When</th></tr></thead>
                  <tbody>
                    <tr><td><code>for</code></td><td>You know how many iterations (counting)</td></tr>
                    <tr><td><code>while</code></td><td>You loop until some condition changes</td></tr>
                  </tbody>
                </table>
              `
            },
            {
              id: "m2l2s4",
              type: "code",
              title: "Exercise: Multiplication Table",
              instructions: `
                <p>Use a <code>for</code> loop to print the 3× multiplication table from 1 to 5:</p>
                <pre>3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15</pre>
                <p>Use the variable <code>n = 3</code> and loop from <code>i = 1</code> to <code>i = 5</code>.</p>
              `,
              starter_code: `#include <stdio.h>

int main() {
    int n = 3;
    
    for (int i = 1; i <= 5; i++) {
        // Print: n x i = (n*i)
        // e.g. printf("%d x %d = %d\\n", n, i, n*i);
    }
    
    return 0;
}`,
              expected_output: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15",
              check_mode: "exact",
              hint: "Inside the loop, add: printf(\"%d x %d = %d\\n\", n, i, n * i);",
              completion_message: "🏆 Outstanding! You've printed the entire 3× table using a loop. This pattern — generating a series of related values — is fundamental to programming."
            },
            {
              id: "m2l2s5",
              type: "quiz",
              title: "Knowledge Check: Loops",
              question: "How many times will this loop body execute?<br><pre><code>for (int i = 0; i < 3; i++) {\n    printf(\"Hi\\n\");\n}</code></pre>",
              options: [
                "2 times",
                "3 times",
                "4 times",
                "Infinite — there is no stop condition"
              ],
              correct: 1,
              explanation: "Correct! The loop starts at i = 0 and continues while i < 3. So it runs for i = 0, i = 1, and i = 2 — that's 3 iterations. After i++ makes i = 3, the condition i < 3 becomes false and the loop stops."
            }
          ]
        }
      ]
    }
  ]
};
