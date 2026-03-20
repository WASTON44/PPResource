/**
 * course-data.js
 * All course content defined as data - no code changes needed to add lessons.
 * Schema: modules[] -> lessons[] -> steps[]
 * Step types: "content" | "quiz" | "code"
 */

const COURSE_DATA = {
  title: "Introduction to C Programming",
  subtitle: "A structured, hands-on course for absolute beginners",
  version: "1.1.0",
  modules: [
    {
      id: "m1",
      title: "Module 1: C Foundations",
      icon: "M1",
      lessons: [
        {
          id: "m1l1",
          title: "Lesson 1: First Program and Build Workflow",
          steps: [
            {
              id: "m1l1s1",
              type: "content",
              title: "What C Is and Why It Matters",
              body: `
                <h2>Why learn C?</h2>
                <p>C is a general-purpose language designed for performance, portability, and control over memory. It is still widely used in operating systems, embedded firmware, networking tools, and performance-sensitive software.</p>
                <h3>Skills you build in C</h3>
                <ul>
                  <li>Precise thinking about data types and memory</li>
                  <li>Understanding how source code becomes executable machine code</li>
                  <li>Control flow and debugging habits that transfer to other languages</li>
                </ul>
                <div class="info-box">
                  <strong>Key takeaway:</strong> C is compact as a language, but deep in what it teaches.
                </div>
              `
            },
            {
              id: "m1l1s2",
              type: "content",
              title: "From Source Code to Running Program",
              body: `
                <h2>The C Build Pipeline</h2>
                <p>When you click Run, several stages happen behind the scenes:</p>
                <table class="info-table">
                  <thead><tr><th>Stage</th><th>What happens</th><th>Typical output</th></tr></thead>
                  <tbody>
                    <tr><td>Preprocessing</td><td>Expands <code>#include</code> and macros</td><td>Expanded source</td></tr>
                    <tr><td>Compilation</td><td>Transforms C code to assembly</td><td><code>.s</code> file</td></tr>
                    <tr><td>Assembly</td><td>Transforms assembly to object code</td><td><code>.o</code> file</td></tr>
                    <tr><td>Linking</td><td>Combines objects and libraries into one executable</td><td>Program binary</td></tr>
                  </tbody>
                </table>
                <p>If any stage fails, the program does not run. Reading compiler errors is part of normal development.</p>
              `
            },
            {
              id: "m1l1s3",
              type: "content",
              title: "Program Anatomy",
              body: `
                <h2>Structure of a minimal C program</h2>
                <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}</code></pre>
                <table class="info-table">
                  <thead><tr><th>Part</th><th>Role</th></tr></thead>
                  <tbody>
                    <tr><td><code>#include &lt;stdio.h&gt;</code></td><td>Declares standard input/output functions like <code>printf</code></td></tr>
                    <tr><td><code>int main(void)</code></td><td>Entry point where execution begins</td></tr>
                    <tr><td><code>{ ... }</code></td><td>Block boundaries for function body</td></tr>
                    <tr><td><code>return 0;</code></td><td>Exit status indicating success</td></tr>
                  </tbody>
                </table>
                <div class="warning-box">
                  <strong>Common mistake:</strong> every statement must end with a semicolon.
                </div>
              `
            },
            {
              id: "m1l1s4",
              type: "quiz",
              title: "Knowledge Check: return value",
              question: "What does <code>return 0;</code> at the end of <code>main()</code> mean?",
              options: [
                "Print the number 0 to the terminal",
                "Program completed successfully",
                "Reset all variables to 0",
                "Skip the rest of the program"
              ],
              correct: 1,
              explanation: "Correct. By convention, 0 means successful execution and non-zero values indicate errors."
            },
            {
              id: "m1l1s5",
              type: "code",
              title: "Exercise: Hello, World",
              instructions: `
                <p>Run the starter code once, then personalize the greeting text while keeping the same program structure.</p>
                <p>Your output only needs to include <strong>Hello, World!</strong> somewhere to pass this first exercise.</p>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`,
              expected_output: "Hello, World!",
              check_mode: "contains",
              hint: "Keep #include <stdio.h> and return 0; exactly as shown.",
              completion_message: "Great start. You compiled and ran your first C program."
            },
            {
              id: "m1l1s6",
              type: "quiz",
              title: "Predict the Output",
              question: `What will this program print?
<pre><code>#include &lt;stdio.h&gt;
int main(void) {
    printf("C\\n");
    printf("Course\\n");
    return 0;
}</code></pre>`,
              options: [
                "CCourse",
                "C on first line, Course on second line",
                "Course on first line, C on second line",
                "Compilation error"
              ],
              correct: 1,
              explanation: "Each printf call prints once, and each string ends with a newline."
            },
            {
              id: "m1l1s7",
              type: "code",
              title: "Exercise: Build Status Banner",
              instructions: `
                <p>Complete the second <code>printf</code> so the program prints:</p>
                <pre>Build started
Build complete</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    printf("Build started\\n");
    // Add one printf below for "Build complete"

    return 0;
}`,
              expected_output: "Build started\nBuild complete",
              check_mode: "exact",
              hint: "Add: printf(\"Build complete\\n\");",
              completion_message: "Nice. You can now produce multi-line output reliably."
            },
            {
              id: "m1l1s8",
              type: "quiz",
              title: "Knowledge Check: header usage",
              question: "Why do we include <code>stdio.h</code> in these examples?",
              options: [
                "To use printf declarations",
                "To enable loops",
                "To define int",
                "To make the compiler faster"
              ],
              correct: 0,
              explanation: "Correct. stdio.h provides declarations for standard input/output functions including printf."
            }
          ]
        },
        {
          id: "m1l2",
          title: "Lesson 2: Displaying Output with printf",
          steps: [
            {
              id: "m1l2s1",
              type: "content",
              title: "printf Basics and Format Specifiers",
              body: `
                <h2>Formatted output with <code>printf</code></h2>
                <p><code>printf</code> can print plain text and values from variables in one statement.</p>
                <pre><code>int age = 27;
float score = 93.5f;
printf("Age: %d, Score: %.1f\\n", age, score);</code></pre>
                <table class="info-table">
                  <thead><tr><th>Specifier</th><th>Data type</th><th>Example output</th></tr></thead>
                  <tbody>
                    <tr><td><code>%d</code></td><td>int</td><td>42</td></tr>
                    <tr><td><code>%f</code></td><td>float/double</td><td>3.140000</td></tr>
                    <tr><td><code>%.2f</code></td><td>float/double with precision</td><td>3.14</td></tr>
                    <tr><td><code>%c</code></td><td>char</td><td>A</td></tr>
                    <tr><td><code>%s</code></td><td>char array string</td><td>Hello</td></tr>
                  </tbody>
                </table>
              `
            },
            {
              id: "m1l2s2",
              type: "code",
              title: "Exercise: Intro Card",
              instructions: `
                <p>Print this exact three-line card:</p>
                <pre>Name: Ada Lovelace
Age: 27
Language: C</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    printf("Name: Ada Lovelace\\n");
    // Add two printf lines below

    return 0;
}`,
              expected_output: "Name: Ada Lovelace\nAge: 27\nLanguage: C",
              check_mode: "exact",
              hint: "Print Age on one line and Language on the next line.",
              completion_message: "Well done. You composed multi-line output correctly."
            },
            {
              id: "m1l2s3",
              type: "quiz",
              title: "Knowledge Check: integer specifier",
              question: "Which format specifier prints a decimal integer?",
              options: [
                "%f",
                "%c",
                "%d",
                "%s"
              ],
              correct: 2,
              explanation: "Correct. %d prints signed decimal integers."
            },
            {
              id: "m1l2s4",
              type: "content",
              title: "Escape Sequences, Width, and Precision",
              body: `
                <h2>Controlling text layout</h2>
                <p>Use escape sequences and format controls for readable output.</p>
                <table class="info-table">
                  <thead><tr><th>Token</th><th>Effect</th><th>Example</th></tr></thead>
                  <tbody>
                    <tr><td><code>\\n</code></td><td>New line</td><td>line break</td></tr>
                    <tr><td><code>\\t</code></td><td>Tab spacing</td><td>column alignment</td></tr>
                    <tr><td><code>%.1f</code></td><td>1 decimal place</td><td>92.5</td></tr>
                    <tr><td><code>%6d</code></td><td>minimum width 6</td><td>right-aligned integer</td></tr>
                  </tbody>
                </table>
                <pre><code>float completion = 92.5f;
printf("Completion: %.1f%%\\n", completion);</code></pre>
                <p>To print a literal percent sign, write <code>%%</code>.</p>
              `
            },
            {
              id: "m1l2s5",
              type: "code",
              title: "Exercise: Mini Report",
              instructions: `
                <p>Use the variables provided and print this exact output:</p>
                <pre>Bugs Open: 4
Coverage: 92.5%
Release Grade: A</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    int bugs = 4;
    float coverage = 92.5f;
    char grade = 'A';

    // Print the report lines here

    return 0;
}`,
              expected_output: "Bugs Open: 4\nCoverage: 92.5%\nRelease Grade: A",
              check_mode: "exact",
              hint: "Use %d for bugs, %.1f%% for coverage, and %c for grade.",
              completion_message: "Nice. You used multiple format specifiers in one report."
            },
            {
              id: "m1l2s6",
              type: "quiz",
              title: "Knowledge Check: escape sequences",
              question: "Which escape sequence inserts a horizontal tab in a string literal?",
              options: [
                "\\n",
                "\\t",
                "\\\\",
                "\\\""
              ],
              correct: 1,
              explanation: "Correct. \\t inserts a tab character."
            },
            {
              id: "m1l2s7",
              type: "code",
              title: "Exercise: Item Lines with Values",
              instructions: `
                <p>Print the following output using the variables provided:</p>
                <pre>Item: Keyboard, Qty: 3
Item: Mouse, Qty: 5</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    char item1[] = "Keyboard";
    char item2[] = "Mouse";
    int qty1 = 3;
    int qty2 = 5;

    // Print two lines in the required format

    return 0;
}`,
              expected_output: "Item: Keyboard, Qty: 3\nItem: Mouse, Qty: 5",
              check_mode: "exact",
              hint: "Use %s for item names and %d for quantities.",
              completion_message: "Great. You combined string and integer placeholders cleanly."
            }
          ]
        },
        {
          id: "m1l3",
          title: "Lesson 3: Variables, Types, and Expressions",
          steps: [
            {
              id: "m1l3s1",
              type: "content",
              title: "Declaring and Naming Variables",
              body: `
                <h2>Variables and data types</h2>
                <p>A variable is a named storage location. In C, you must declare it before use.</p>
                <pre><code>int count = 10;
float temperature = 36.6f;
char grade = 'A';</code></pre>
                <table class="info-table">
                  <thead><tr><th>Type</th><th>Use case</th><th>Typical size</th></tr></thead>
                  <tbody>
                    <tr><td><code>int</code></td><td>whole numbers</td><td>4 bytes</td></tr>
                    <tr><td><code>float</code></td><td>decimal values</td><td>4 bytes</td></tr>
                    <tr><td><code>double</code></td><td>higher precision decimal</td><td>8 bytes</td></tr>
                    <tr><td><code>char</code></td><td>single character</td><td>1 byte</td></tr>
                  </tbody>
                </table>
                <p>Use clear names like <code>studentScore</code> instead of one-letter names.</p>
              `
            },
            {
              id: "m1l3s2",
              type: "code",
              title: "Exercise: Declare and Print Variables",
              instructions: `
                <p>Complete the program to print this exact output:</p>
                <pre>Score: 95
Temperature: 36.6
Grade: A</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    int score = 95;
    // Add temp and grade declarations

    printf("Score: %d\\n", score);
    // Add print lines for temperature and grade

    return 0;
}`,
              expected_output: "Score: 95\nTemperature: 36.6\nGrade: A",
              check_mode: "exact",
              hint: "Use float temp = 36.6f; char grade = 'A'; and print temp with %.1f.",
              completion_message: "Perfect. You matched variable types to format specifiers."
            },
            {
              id: "m1l3s3",
              type: "quiz",
              title: "Knowledge Check: decimal value",
              question: "A GPA value like 3.85 should be stored in which type?",
              options: [
                "int",
                "char",
                "float",
                "void"
              ],
              correct: 2,
              explanation: "Correct. Decimal values need float or double, not int."
            },
            {
              id: "m1l3s4",
              type: "content",
              title: "Expressions, Constants, and Conversions",
              body: `
                <h2>Arithmetic and conversion behavior</h2>
                <p>C supports standard operators: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and <code>%</code>.</p>
                <h3>Important rule: integer division</h3>
                <pre><code>int a = 7;
int b = 2;
printf("%d\\n", a / b);   // prints 3</code></pre>
                <p>For decimal division, convert at least one operand:</p>
                <pre><code>printf("%.2f\\n", (float)a / b); // prints 3.50</code></pre>
                <h3>Constants</h3>
                <pre><code>const float TAX_RATE = 0.20f;</code></pre>
                <p>Use <code>const</code> when values should not be modified after initialization.</p>
              `
            },
            {
              id: "m1l3s5",
              type: "code",
              title: "Exercise: Arithmetic Results",
              instructions: `
                <p>Given <code>a = 8</code> and <code>b = 5</code>, print:</p>
                <pre>Sum: 13
Product: 40
Remainder: 3</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    int a = 8;
    int b = 5;

    int sum = a + b;
    // Add product and remainder variables

    printf("Sum: %d\\n", sum);
    // Print product and remainder

    return 0;
}`,
              expected_output: "Sum: 13\nProduct: 40\nRemainder: 3",
              check_mode: "exact",
              hint: "Use a * b for product and a % b for remainder.",
              completion_message: "Good work. You used arithmetic operators accurately."
            },
            {
              id: "m1l3s6",
              type: "code",
              title: "Exercise: Force Decimal Division",
              instructions: `
                <p>Make the program print exactly:</p>
                <pre>Result: 3.50</pre>
                <p>Use casting so the division is not truncated.</p>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    int a = 7;
    int b = 2;

    // Compute decimal result with casting
    float result = 0.0f;

    printf("Result: %.2f\\n", result);
    return 0;
}`,
              expected_output: "Result: 3.50",
              check_mode: "exact",
              hint: "Assign result as: (float)a / b;",
              completion_message: "Excellent. You correctly handled integer-to-float conversion."
            },
            {
              id: "m1l3s7",
              type: "quiz",
              title: "Knowledge Check: integer division",
              question: "What is the result of <code>7 / 2</code> when both operands are <code>int</code>?",
              options: [
                "3",
                "3.5",
                "4",
                "Compiler error"
              ],
              correct: 0,
              explanation: "Correct. Integer division truncates the fractional part."
            }
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "Module 2: Control Flow and Repetition",
      icon: "M2",
      lessons: [
        {
          id: "m2l1",
          title: "Lesson 1: Decision Making with if and else",
          steps: [
            {
              id: "m2l1s1",
              type: "content",
              title: "if, else if, and else",
              body: `
                <h2>Branching logic</h2>
                <p>Decision statements allow different code paths based on conditions.</p>
                <pre><code>if (score >= 90) {
    printf("A\\n");
} else if (score >= 80) {
    printf("B\\n");
} else {
    printf("Needs improvement\\n");
}</code></pre>
                <table class="info-table">
                  <thead><tr><th>Operator</th><th>Meaning</th></tr></thead>
                  <tbody>
                    <tr><td><code>==</code></td><td>equal to</td></tr>
                    <tr><td><code>!=</code></td><td>not equal</td></tr>
                    <tr><td><code>&gt;</code>, <code>&lt;</code></td><td>greater/less than</td></tr>
                    <tr><td><code>&gt;=</code>, <code>&lt;=</code></td><td>inclusive comparisons</td></tr>
                  </tbody>
                </table>
                <div class="warning-box">
                  <strong>Watch out:</strong> <code>=</code> assigns a value, while <code>==</code> compares values.
                </div>
              `
            },
            {
              id: "m2l1s2",
              type: "code",
              title: "Exercise: Grade Classifier",
              instructions: `
                <p>Complete the missing branch so that with <code>score = 85</code> the output is:</p>
                <pre>Grade: B</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    int score = 85;

    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        // Print Grade: B
    } else if (score >= 70) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: F\\n");
    }

    return 0;
}`,
              expected_output: "Grade: B",
              check_mode: "exact",
              hint: "Add printf(\"Grade: B\\n\"); in the 80+ branch.",
              completion_message: "Good. Your condition chain classifies in the correct order."
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
                "Big, Bigger, Biggest",
                "Big and Bigger",
                "Bigger only"
              ],
              correct: 2,
              explanation: "Correct. The first two independent if statements are true; the last one is false."
            },
            {
              id: "m2l1s4",
              type: "content",
              title: "Logical Operators for Compound Conditions",
              body: `
                <h2>Combining conditions</h2>
                <p>Use logical operators to combine comparisons:</p>
                <table class="info-table">
                  <thead><tr><th>Operator</th><th>Name</th><th>Example</th></tr></thead>
                  <tbody>
                    <tr><td><code>&amp;&amp;</code></td><td>AND</td><td><code>age &gt;= 18 &amp;&amp; hasId == 1</code></td></tr>
                    <tr><td><code>||</code></td><td>OR</td><td><code>isAdmin == 1 || isOwner == 1</code></td></tr>
                    <tr><td><code>!</code></td><td>NOT</td><td><code>!(score &lt; 50)</code></td></tr>
                  </tbody>
                </table>
                <p>Use parentheses to make intent explicit, especially when mixing operators.</p>
              `
            },
            {
              id: "m2l1s5",
              type: "code",
              title: "Exercise: Access Check",
              instructions: `
                <p>Write a condition that grants access when:</p>
                <ul>
                  <li>age is at least 18</li>
                  <li>and the user has either an ID or a ticket</li>
                </ul>
                <p>With the starter values, expected output is:</p>
                <pre>Access granted</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    int age = 20;
    int hasId = 1;
    int hasTicket = 0;

    if (/* write condition */) {
        printf("Access granted\\n");
    } else {
        printf("Access denied\\n");
    }

    return 0;
}`,
              expected_output: "Access granted",
              check_mode: "exact",
              hint: "Use: age >= 18 && (hasId == 1 || hasTicket == 1)",
              completion_message: "Strong work. You used AND/OR grouping correctly."
            },
            {
              id: "m2l1s6",
              type: "quiz",
              title: "Knowledge Check: assignment vs comparison",
              question: "Which condition correctly checks whether x is equal to 5?",
              options: [
                "if (x = 5)",
                "if (x == 5)",
                "if (x := 5)",
                "if (x equals 5)"
              ],
              correct: 1,
              explanation: "Correct. == compares values; = assigns a value."
            }
          ]
        },
        {
          id: "m2l2",
          title: "Lesson 2: Loops in Practice",
          steps: [
            {
              id: "m2l2s1",
              type: "content",
              title: "for Loop Mechanics",
              body: `
                <h2>Counted repetition</h2>
                <p>A <code>for</code> loop is ideal when the number of iterations is known.</p>
                <pre><code>for (int i = 1; i <= 5; i++) {
    printf("%d\\n", i);
}</code></pre>
                <table class="info-table">
                  <thead><tr><th>Section</th><th>Purpose</th></tr></thead>
                  <tbody>
                    <tr><td>initialization</td><td>runs once before loop starts</td></tr>
                    <tr><td>condition</td><td>checked before each iteration</td></tr>
                    <tr><td>update</td><td>runs after each iteration</td></tr>
                  </tbody>
                </table>
                <p>Most off-by-one bugs come from the loop condition (<code>&lt;</code> vs <code>&lt;=</code>).</p>
              `
            },
            {
              id: "m2l2s2",
              type: "code",
              title: "Exercise: Count to 5",
              instructions: `
                <p>Complete the loop body so the program prints:</p>
                <pre>1
2
3
4
5</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        // Print i
    }
    return 0;
}`,
              expected_output: "1\n2\n3\n4\n5",
              check_mode: "exact",
              hint: "Inside the loop: printf(\"%d\\n\", i);",
              completion_message: "Good. Your for loop executes the expected number of times."
            },
            {
              id: "m2l2s3",
              type: "content",
              title: "while Loop and Termination",
              body: `
                <h2>Condition-driven repetition</h2>
                <p>Use <code>while</code> when the stop point depends on changing state.</p>
                <pre><code>int n = 3;
while (n > 0) {
    printf("%d\\n", n);
    n--;
}</code></pre>
                <p>If the condition never becomes false, the loop never ends. Always confirm that loop variables are updated inside the loop body.</p>
              `
            },
            {
              id: "m2l2s4",
              type: "code",
              title: "Exercise: Multiplication Table",
              instructions: `
                <p>Use a loop to print the 3-times table from 1 to 5:</p>
                <pre>3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    int n = 3;

    for (int i = 1; i <= 5; i++) {
        // Print one table row
    }

    return 0;
}`,
              expected_output: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15",
              check_mode: "exact",
              hint: "Use printf(\"%d x %d = %d\\n\", n, i, n * i);",
              completion_message: "Great. You generated a computed sequence with a loop."
            },
            {
              id: "m2l2s5",
              type: "quiz",
              title: "Knowledge Check: loop iterations",
              question: `How many times does this loop run?
<pre><code>for (int i = 0; i < 3; i++) {
    printf("Hi\\n");
}</code></pre>`,
              options: [
                "2",
                "3",
                "4",
                "Infinite"
              ],
              correct: 1,
              explanation: "Correct. i takes values 0, 1, and 2, then stops when i becomes 3."
            },
            {
              id: "m2l2s6",
              type: "code",
              title: "Exercise: Running Total",
              instructions: `
                <p>Use a loop to add integers from 1 to 10 and print:</p>
                <pre>Total: 55</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    int total = 0;

    // Loop from 1 to 10 and add into total

    printf("Total: %d\\n", total);
    return 0;
}`,
              expected_output: "Total: 55",
              check_mode: "exact",
              hint: "for (int i = 1; i <= 10; i++) total += i;",
              completion_message: "Excellent. You used an accumulator pattern correctly."
            },
            {
              id: "m2l2s7",
              type: "quiz",
              title: "Predict the Output: while loop",
              question: `What is printed?
<pre><code>int n = 2;
while (n >= 0) {
    printf("%d\\n", n);
    n--;
}</code></pre>`,
              options: [
                "2 then 1",
                "2 then 1 then 0",
                "2 then 1 then 0 then -1",
                "Infinite loop"
              ],
              correct: 1,
              explanation: "Correct. The condition includes 0, so output is 2, 1, 0."
            },
            {
              id: "m2l2s8",
              type: "content",
              title: "Nested Loops",
              body: `
                <h2>Loops inside loops</h2>
                <p>Nested loops are useful for grids, tables, and patterns.</p>
                <pre><code>for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= row; col++) {
        printf("*");
    }
    printf("\\n");
}</code></pre>
                <p>Outer loop controls rows, inner loop controls items per row.</p>
              `
            },
            {
              id: "m2l2s9",
              type: "code",
              title: "Exercise: Star Triangle",
              instructions: `
                <p>Use nested loops to print exactly:</p>
                <pre>*
**
***
****</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    for (int row = 1; row <= 4; row++) {
        // Inner loop should print stars for this row
        for (int col = 1; col <= row; col++) {
            // Print one star (no newline here)
        }
        // Print newline at end of each row
    }
    return 0;
}`,
              expected_output: "*\n**\n***\n****",
              check_mode: "exact",
              hint: "Use printf(\"*\"); inside inner loop and printf(\"\\n\"); after it.",
              completion_message: "Nice. You used nested loops to generate structured output."
            }
          ]
        },
        {
          id: "m2l3",
          title: "Lesson 3: switch, break, and continue",
          steps: [
            {
              id: "m2l3s1",
              type: "content",
              title: "switch Statements and Loop Control",
              body: `
                <h2>When to use switch</h2>
                <p><code>switch</code> is useful when one value can match one of many fixed cases.</p>
                <pre><code>switch (day) {
    case 1: printf("Monday\\n"); break;
    case 2: printf("Tuesday\\n"); break;
    default: printf("Invalid\\n");
}</code></pre>
                <h3>Loop control keywords</h3>
                <ul>
                  <li><code>break</code> exits the nearest loop or switch block immediately</li>
                  <li><code>continue</code> skips to the next loop iteration</li>
                </ul>
              `
            },
            {
              id: "m2l3s2",
              type: "code",
              title: "Exercise: Day Name with switch",
              instructions: `
                <p>Complete the switch so that with <code>day = 3</code> the program prints:</p>
                <pre>Wednesday</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    int day = 3;

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            // Print Wednesday and break
            break;
        default:
            printf("Invalid day\\n");
    }

    return 0;
}`,
              expected_output: "Wednesday",
              check_mode: "exact",
              hint: "In case 3, print Wednesday then add break.",
              completion_message: "Good. You mapped case values to output correctly."
            },
            {
              id: "m2l3s3",
              type: "quiz",
              title: "Knowledge Check: fall-through",
              question: "If a <code>switch</code> case does not include <code>break</code>, what happens?",
              options: [
                "Compilation fails",
                "Execution continues into the next case",
                "Program exits immediately",
                "The condition is re-evaluated"
              ],
              correct: 1,
              explanation: "Correct. Without break, control falls through to subsequent cases."
            },
            {
              id: "m2l3s4",
              type: "code",
              title: "Exercise: Print Odd Numbers with continue",
              instructions: `
                <p>Use <code>continue</code> so the loop prints only odd numbers from 1 to 8:</p>
                <pre>1
3
5
7</pre>
              `,
              starter_code: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 8; i++) {
        if (i % 2 == 0) {
            // Skip even numbers
        }
        printf("%d\\n", i);
    }
    return 0;
}`,
              expected_output: "1\n3\n5\n7",
              check_mode: "exact",
              hint: "Inside the if block, use continue;",
              completion_message: "Great. continue let you skip unwanted iterations cleanly."
            },
            {
              id: "m2l3s5",
              type: "quiz",
              title: "Knowledge Check: break in loops",
              question: "Inside a loop, what does <code>break</code> do?",
              options: [
                "Skips just the current iteration",
                "Exits the loop immediately",
                "Restarts the loop from the beginning",
                "Only works in switch, not loops"
              ],
              correct: 1,
              explanation: "Correct. break terminates the current loop immediately."
            }
          ]
        }
      ]
    }
  ]
};

COURSE_DATA.subtitle = "An expanded, beginner-friendly C course with readings, quizzes, and code practice";
COURSE_DATA.version = "2.0.0";

function createContentStep(id, title, body) {
  return { id, type: "content", title, body };
}

function createQuizStep(id, title, question, options, correct, explanation) {
  return { id, type: "quiz", title, question, options, correct, explanation };
}

function createCodeStep(id, title, instructions, starterCode, expectedOutput, hint, completionMessage, checkMode = "exact") {
  return {
    id,
    type: "code",
    title,
    instructions,
    starter_code: starterCode,
    expected_output: expectedOutput,
    check_mode: checkMode,
    hint,
    completion_message: completionMessage
  };
}

function createStandardLesson(id, title, firstContent, secondContent, quiz, code) {
  return {
    id,
    title,
    steps: [
      createContentStep(`${id}s1`, firstContent.title, firstContent.body),
      createContentStep(`${id}s2`, secondContent.title, secondContent.body),
      createQuizStep(`${id}s3`, quiz.title, quiz.question, quiz.options, quiz.correct, quiz.explanation),
      createCodeStep(`${id}s4`, code.title, code.instructions, code.starter_code, code.expected_output, code.hint, code.completion_message, code.check_mode)
    ]
  };
}

function createFinalLesson(id, title, content, firstQuiz, code, finalQuiz) {
  return {
    id,
    title,
    steps: [
      createContentStep(`${id}s1`, content.title, content.body),
      createQuizStep(`${id}s2`, firstQuiz.title, firstQuiz.question, firstQuiz.options, firstQuiz.correct, firstQuiz.explanation),
      createCodeStep(`${id}s3`, code.title, code.instructions, code.starter_code, code.expected_output, code.hint, code.completion_message, code.check_mode),
      createQuizStep(`${id}s4`, finalQuiz.title, finalQuiz.question, finalQuiz.options, finalQuiz.correct, finalQuiz.explanation)
    ]
  };
}

function createModule(number, name, lessons) {
  return {
    id: `m${number}`,
    title: `Module ${number}: ${name}`,
    icon: String(number),
    lessons
  };
}

const ADDITIONAL_MODULES = [
  createModule(3, "Software Development Methodology", [
    createStandardLesson(
      "m3l1",
      "Lesson 1: Analysis and Planning",
      {
        title: "Why Process Matters",
        body: `
          <h2>Why use a development method?</h2>
          <p>A method gives you a repeatable way to solve problems. Instead of guessing, you decide what the program should do, sketch a solution, write small pieces, and check the result.</p>
          <table class="info-table">
            <thead><tr><th>Stage</th><th>Main question</th></tr></thead>
            <tbody>
              <tr><td>Analysis</td><td>What problem are we solving?</td></tr>
              <tr><td>Design</td><td>How will the solution work?</td></tr>
              <tr><td>Implementation</td><td>How do we turn the plan into code?</td></tr>
              <tr><td>Verification</td><td>Does the program meet the requirements?</td></tr>
            </tbody>
          </table>
          <div class="info-box">
            <strong>Study tip:</strong> For small student programs, even one minute of planning can save ten minutes of debugging.
          </div>
        `
      },
      {
        title: "Turning Problems into Requirements",
        body: `
          <h2>Analysis means asking the right questions</h2>
          <p>Before you code, write down the program inputs, the processing steps, and the final output. This keeps the work focused and makes testing easier later.</p>
          <h3>Simple analysis checklist</h3>
          <ul>
            <li>What information comes in?</li>
            <li>What calculation or rule must the program apply?</li>
            <li>What should the program print?</li>
            <li>What sample values can you test first?</li>
          </ul>
          <div class="warning-box">
            <strong>Common mistake:</strong> Starting to type code before the output is clear usually leads to extra rework.
          </div>
        `
      },
      {
        title: "Knowledge Check: Analysis",
        question: "Which task belongs in the analysis stage before you start coding?",
        options: [
          "Identify the inputs, the processing rule, and the required output",
          "Start writing loops immediately",
          "Replace all variable names with x and y",
          "Skip testing until the whole program is finished"
        ],
        correct: 0,
        explanation: "Analysis is about understanding the job first: inputs, rules, and expected results."
      },
      {
        title: "Code Lab: Input, Process, Output",
        instructions: `
          <p>Finish the program so it prints this exact trace:</p>
          <pre>Inputs: length and width
Process: area = length * width
Output: Area: 24</pre>
          <p>This exercise models the analysis stage by making the program show its inputs, processing step, and final output.</p>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int length = 6;
    int width = 4;
    int area = length * width;

    printf("Inputs: length and width\\n");
    printf("Process: area = length * width\\n");
    // Print the final output line below

    return 0;
}`,
        expected_output: "Inputs: length and width\nProcess: area = length * width\nOutput: Area: 24",
        hint: "Use printf(\"Output: Area: %d\\n\", area);",
        completion_message: "Good. You linked inputs, processing, and output before adding extra complexity."
      }
    ),
    createStandardLesson(
      "m3l2",
      "Lesson 2: Design, Implementation, and Verification",
      {
        title: "Design Before You Type",
        body: `
          <h2>Design turns requirements into steps</h2>
          <p>A design can be simple. For beginner programs, a short list of steps or a little pseudocode is often enough.</p>
          <pre><code>1. Read or define the values
2. Perform the calculation
3. Print the result</code></pre>
          <p>Design gives your implementation a clear direction and reduces random trial-and-error coding.</p>
        `
      },
      {
        title: "Verification Means Checking the Result",
        body: `
          <h2>Verification asks: did the code meet the requirement?</h2>
          <p>After writing the program, test it with known values. Compare the actual output with the output you expected during analysis.</p>
          <h3>Useful beginner tests</h3>
          <ul>
            <li>A normal case that should work first time</li>
            <li>A boundary value near a rule change</li>
            <li>An easy value you can calculate by hand</li>
          </ul>
          <div class="info-box">
            <strong>Remember:</strong> Running the code is not enough. You still need to check whether the output is correct.
          </div>
        `
      },
      {
        title: "Knowledge Check: Verification",
        question: "A program gives a discount when total >= 50. Which test set best checks the rule?",
        options: [
          "Only test total = 100",
          "Test totals 49, 50, and 51",
          "Only test total = 0",
          "Do not test until the whole project is finished"
        ],
        correct: 1,
        explanation: "Boundary values around the rule change tell you whether the comparison is correct."
      },
      {
        title: "Code Lab: From Design to Output",
        instructions: `
          <p>Complete the final line so the designed calculation is fully verified. The program should print:</p>
          <pre>Subtotal: 18
Tax: 2
Total: 20</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int subtotal = 18;
    int tax = 2;
    int total = subtotal + tax;

    printf("Subtotal: %d\\n", subtotal);
    printf("Tax: %d\\n", tax);
    // Print the total line below

    return 0;
}`,
        expected_output: "Subtotal: 18\nTax: 2\nTotal: 20",
        hint: "Use printf(\"Total: %d\\n\", total);",
        completion_message: "Good. You turned a simple design into code and verified the final result."
      }
    ),
    createFinalLesson(
      "m3l3",
      "Lesson 3: Debugging Workflow",
      {
        title: "A Simple Debugging Loop",
        body: `
          <h2>Debugging is a normal part of development</h2>
          <p>Most bugs can be handled with a repeatable loop: reproduce the problem, inspect the code carefully, change one thing, and test again.</p>
          <h3>Good debugging habits</h3>
          <ul>
            <li>Read the error message and line number first</li>
            <li>Check the variable values and formula you used</li>
            <li>Change one issue at a time</li>
            <li>Retest after every fix</li>
          </ul>
        `
      },
      {
        title: "Diagnosis Check",
        question: `What is wrong with this condition?<br><pre><code>if (score = 10) {
    printf("Perfect\\n");
}</code></pre>`,
        options: [
          "It uses assignment instead of comparison",
          "The braces are illegal in C",
          "printf cannot be used inside if",
          "The variable name score is reserved"
        ],
        correct: 0,
        explanation: "Use == for comparison. A single = assigns a value instead."
      },
      {
        title: "Debug Lab: Fix the Calculation",
        instructions: `
          <p>This starter program has a logic bug. Fix it so the output becomes:</p>
          <pre>Area: 24</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int length = 6;
    int width = 4;
    int area = length + width;

    printf("Area: %d\\n", area);
    return 0;
}`,
        expected_output: "Area: 24",
        hint: "Check the formula used to calculate area.",
        completion_message: "Good catch. You fixed the logic, then verified the result."
      },
      {
        title: "Knowledge Check: Retesting",
        question: "After fixing one bug, what should you do next?",
        options: [
          "Retest the program and compare the output again",
          "Assume every other part now works",
          "Rename all variables before running it",
          "Skip straight to the final submission"
        ],
        correct: 0,
        explanation: "A fix is not complete until you run the code again and confirm the behavior."
      }
    )
  ]),
  createModule(4, "Types and Casting", [
    createStandardLesson(
      "m4l1",
      "Lesson 1: Core Data Types",
      {
        title: "Choosing the Right Type",
        body: `
          <h2>Types describe the kind of data a variable stores</h2>
          <p>In C, you must choose a type before you use a variable. A good type choice makes your program easier to read and less likely to lose information.</p>
          <table class="info-table">
            <thead><tr><th>Type</th><th>Typical use</th></tr></thead>
            <tbody>
              <tr><td><code>int</code></td><td>Whole numbers such as counts and ages</td></tr>
              <tr><td><code>double</code></td><td>Decimal values such as prices and averages</td></tr>
              <tr><td><code>char</code></td><td>A single character such as a grade</td></tr>
            </tbody>
          </table>
        `
      },
      {
        title: "Printing Values Correctly",
        body: `
          <h2>Type and format specifier must match</h2>
          <p>When you print a value, choose the correct format specifier for that type.</p>
          <table class="info-table">
            <thead><tr><th>Specifier</th><th>Use</th></tr></thead>
            <tbody>
              <tr><td><code>%d</code></td><td>Print an integer</td></tr>
              <tr><td><code>%.2f</code></td><td>Print a decimal with two places</td></tr>
              <tr><td><code>%c</code></td><td>Print one character</td></tr>
            </tbody>
          </table>
          <div class="warning-box">
            <strong>Common mistake:</strong> A wrong format specifier can produce confusing output even when the stored value is correct.
          </div>
        `
      },
      {
        title: "Knowledge Check: Type Choice",
        question: "Which type is the best fit for storing a price like 4.50?",
        options: [
          "double",
          "int",
          "char",
          "void"
        ],
        correct: 0,
        explanation: "A price needs decimal places, so a floating-point type such as double is appropriate."
      },
      {
        title: "Code Lab: Match the Types",
        instructions: `
          <p>Complete the final output line so the program prints:</p>
          <pre>Count: 12
Price: 4.50
Grade: B</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int count = 12;
    double price = 4.50;
    char grade = 'B';

    printf("Count: %d\\n", count);
    printf("Price: %.2f\\n", price);
    // Print the grade line below

    return 0;
}`,
        expected_output: "Count: 12\nPrice: 4.50\nGrade: B",
        hint: "Use printf(\"Grade: %c\\n\", grade);",
        completion_message: "Good. You matched each variable type to the correct output format."
      }
    ),
    createStandardLesson(
      "m4l2",
      "Lesson 2: Implicit and Explicit Conversion",
      {
        title: "What Implicit Conversion Does",
        body: `
          <h2>C can change types automatically inside expressions</h2>
          <p>This is called implicit conversion. It is useful, but you still need to understand what C is doing with your data.</p>
          <pre><code>int a = 7;
int b = 2;
int answer = a / b;   // answer becomes 3</code></pre>
          <p>Because both values are integers, the fractional part is discarded.</p>
        `
      },
      {
        title: "Using Casts Intentionally",
        body: `
          <h2>A cast changes the type used in an expression</h2>
          <p>You can force a value to be treated as another type when needed.</p>
          <pre><code>double average = (double)(a + b) / 2;</code></pre>
          <p>The cast above tells C to perform decimal division instead of integer division.</p>
          <div class="info-box">
            <strong>Rule of thumb:</strong> Cast before the division if you want a decimal result.
          </div>
        `
      },
      {
        title: "Knowledge Check: Integer Division",
        question: "If both variables are int, what is the result of 7 / 2 in C?",
        options: [
          "3",
          "3.5",
          "4",
          "2.5"
        ],
        correct: 0,
        explanation: "Integer division keeps the whole-number part and drops the fraction."
      },
      {
        title: "Code Lab: Accurate Average",
        instructions: `
          <p>Use a cast so the program prints this exact result:</p>
          <pre>Average: 6.50</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int x = 9;
    int y = 4;
    double average = (double)(x + y) / 2;

    printf("Average: %.2f\\n", average);
    return 0;
}`,
        expected_output: "Average: 6.50",
        hint: "The cast must happen before the division so the expression keeps its decimal part.",
        completion_message: "Correct. The cast preserved the fractional result."
      }
    ),
    createFinalLesson(
      "m4l3",
      "Lesson 3: Casting and Format-Specifier Bugs",
      {
        title: "Debugging Type Problems",
        body: `
          <h2>Type bugs often look like almost-correct output</h2>
          <p>If a decimal disappears, the program may be doing integer math. If the output looks strange, the format specifier may not match the stored type.</p>
          <ul>
            <li>Check the variable type first</li>
            <li>Check the operators in the expression</li>
            <li>Check the format specifier in printf</li>
          </ul>
        `
      },
      {
        title: "Diagnosis Check",
        question: `Why does this code print 2.00 instead of 2.50?<br><pre><code>int distance = 5;
int time = 2;
double speed = distance / time;
printf("Speed: %.2f\\n", speed);</code></pre>`,
        options: [
          "Because distance / time uses integer division first",
          "Because %.2f always rounds down",
          "Because double cannot store decimals",
          "Because printf changes the value to an int"
        ],
        correct: 0,
        explanation: "The division happens before assignment to speed, so 5 / 2 becomes 2."
      },
      {
        title: "Debug Lab: Fix the Speed",
        instructions: `
          <p>Fix the type bug so the program prints:</p>
          <pre>Speed: 2.50</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int distance = 5;
    int time = 2;
    double speed = distance / time;

    printf("Speed: %.2f\\n", speed);
    return 0;
}`,
        expected_output: "Speed: 2.50",
        hint: "Cast one side of the division to double before dividing.",
        completion_message: "Good. You found the integer-division bug and corrected it."
      },
      {
        title: "Knowledge Check: What a Cast Does",
        question: "What does (double)count do in an expression?",
        options: [
          "It converts count for that expression",
          "It permanently changes the variable type",
          "It prints count as text",
          "It rounds count to the nearest integer"
        ],
        correct: 0,
        explanation: "A cast changes how the value is treated in that expression only."
      }
    )
  ]),
  createModule(5, "Arrays", [
    createStandardLesson(
      "m5l1",
      "Lesson 1: Declaring and Indexing Arrays",
      {
        title: "What an Array Stores",
        body: `
          <h2>An array stores multiple values of the same type</h2>
          <p>Use an array when you want one variable name to represent a sequence of related items.</p>
          <pre><code>int scores[5] = {72, 68, 81, 90, 77};</code></pre>
          <p>The array above stores five integers in order.</p>
        `
      },
      {
        title: "Arrays Start at Index 0",
        body: `
          <h2>Indexing tells C which element you want</h2>
          <p>The first array element is at index 0, not 1. For an array of size 5, the valid indices are 0 to 4.</p>
          <table class="info-table">
            <thead><tr><th>Expression</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>scores[0]</code></td><td>First element</td></tr>
              <tr><td><code>scores[4]</code></td><td>Last element in a 5-item array</td></tr>
            </tbody>
          </table>
          <div class="warning-box">
            <strong>Common mistake:</strong> Accessing index 5 in a 5-item array is out of bounds.
          </div>
        `
      },
      {
        title: "Knowledge Check: First Index",
        question: "What is the first valid index of int scores[5]?",
        options: [
          "0",
          "1",
          "4",
          "5"
        ],
        correct: 0,
        explanation: "C arrays are zero-indexed, so the first element is at index 0."
      },
      {
        title: "Code Lab: First and Last Values",
        instructions: `
          <p>Use array indexes so the program prints:</p>
          <pre>First: 72
Last: 77</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int scores[5] = {72, 68, 81, 90, 77};

    printf("First: %d\\n", scores[0]);
    // Print the last value below

    return 0;
}`,
        expected_output: "First: 72\nLast: 77",
        hint: "The last valid index in a 5-element array is 4.",
        completion_message: "Good. You used direct indexing to read the first and last values."
      }
    ),
    createStandardLesson(
      "m5l2",
      "Lesson 2: Traversal and Aggregation",
      {
        title: "Looping Through an Array",
        body: `
          <h2>Traversal means visiting each element in order</h2>
          <p>A loop is the usual way to process every item in an array.</p>
          <pre><code>for (int i = 0; i < 5; i++) {
    printf("%d\\n", scores[i]);
}</code></pre>
          <p>The loop variable moves from the first valid index to the last.</p>
        `
      },
      {
        title: "Totals and Running Results",
        body: `
          <h2>Arrays and loops work well together</h2>
          <p>You can accumulate totals, count matches, or find the largest value by reading one element at a time.</p>
          <pre><code>int total = 0;
for (int i = 0; i < 4; i++) {
    total += sales[i];
}</code></pre>
        `
      },
      {
        title: "Knowledge Check: Loop Bound",
        question: "Which loop condition correctly visits every element of int nums[5]?",
        options: [
          "i < 5",
          "i <= 5",
          "i < 4",
          "i == 5"
        ],
        correct: 0,
        explanation: "For a 5-element array, the valid indices are 0 through 4, so i < 5 is correct."
      },
      {
        title: "Code Lab: Sum the Array",
        instructions: `
          <p>Use the loop to print this exact total:</p>
          <pre>Total: 24</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int sales[4] = {3, 5, 7, 9};
    int total = 0;

    for (int i = 0; i < 4; i++) {
        total += sales[i];
    }

    printf("Total: %d\\n", total);
    return 0;
}`,
        expected_output: "Total: 24",
        hint: "The loop already visits all four elements. Focus on the total that the array produces.",
        completion_message: "Good. You combined looping and accumulation to process the whole array."
      }
    ),
    createFinalLesson(
      "m5l3",
      "Lesson 3: Bounds and Off-by-One Bugs",
      {
        title: "Common Array Bugs",
        body: `
          <h2>Most array bugs are indexing bugs</h2>
          <p>Beginners often use the wrong final index or stop the loop too early. These mistakes can drop values or read memory that does not belong to the array.</p>
          <ul>
            <li>Use the array size to set the loop bound</li>
            <li>Check whether the last valid index is size - 1</li>
            <li>Read the loop header and body together</li>
          </ul>
        `
      },
      {
        title: "Diagnosis Check",
        question: "Which bug would make a loop miss the last element of a 5-item array?",
        options: [
          "Using i < 4 instead of i < 5",
          "Using i = 0 as the starting value",
          "Printing nums[i] inside the loop",
          "Declaring total before the loop"
        ],
        correct: 0,
        explanation: "Stopping at i < 4 only visits indices 0 through 3, so the last element is skipped."
      },
      {
        title: "Debug Lab: Fix the Loop Bound",
        instructions: `
          <p>The program below misses part of the array. Fix it so the output is:</p>
          <pre>Sum: 30</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int temps[5] = {2, 4, 6, 8, 10};
    int sum = 0;

    for (int i = 0; i < 4; i++) {
        sum += temps[i];
    }

    printf("Sum: %d\\n", sum);
    return 0;
}`,
        expected_output: "Sum: 30",
        hint: "Check whether the loop visits all five elements.",
        completion_message: "Correct. Off-by-one mistakes are small in code but big in effect."
      },
      {
        title: "Knowledge Check: Out of Bounds",
        question: "Why is nums[5] invalid for int nums[5]?",
        options: [
          "Because valid indices are 0 through 4",
          "Because arrays cannot be indexed in C",
          "Because index 5 always means the first element",
          "Because nums[5] is only valid for char arrays"
        ],
        correct: 0,
        explanation: "A 5-element array has indices 0, 1, 2, 3, and 4 only."
      }
    )
  ]),
  createModule(6, "Strings", [
    createStandardLesson(
      "m6l1",
      "Lesson 1: Char Arrays and the Null Terminator",
      {
        title: "A C String Is a Char Array",
        body: `
          <h2>Strings in C are stored as arrays of char</h2>
          <p>There is no built-in string type in C. Instead, text is stored as a sequence of characters ending with a special marker called the null terminator.</p>
          <pre><code>char word[] = "code";</code></pre>
          <p>The compiler stores the letters and a final <code>\\0</code> to mark the end.</p>
        `
      },
      {
        title: "Printing Strings and Characters",
        body: `
          <h2>Use the right format for text</h2>
          <p>Use <code>%s</code> to print a full string and <code>%c</code> to print one character from it.</p>
          <table class="info-table">
            <thead><tr><th>Specifier</th><th>Use</th></tr></thead>
            <tbody>
              <tr><td><code>%s</code></td><td>Whole string</td></tr>
              <tr><td><code>%c</code></td><td>Single character</td></tr>
            </tbody>
          </table>
        `
      },
      {
        title: "Knowledge Check: String End",
        question: "What marks the end of a C string in memory?",
        options: [
          "\\0",
          "\\n",
          ";",
          "EOF"
        ],
        correct: 0,
        explanation: "C strings end with the null terminator \\0."
      },
      {
        title: "Code Lab: Print a Word and Its First Letter",
        instructions: `
          <p>Complete the final line so the program prints:</p>
          <pre>Word: code
First: c</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    char word[] = "code";

    printf("Word: %s\\n", word);
    // Print the first character below

    return 0;
}`,
        expected_output: "Word: code\nFirst: c",
        hint: "Use word[0] with the %c format specifier.",
        completion_message: "Good. You printed the full string and then a single character from it."
      }
    ),
    createStandardLesson(
      "m6l2",
      "Lesson 2: Accessing and Updating Characters",
      {
        title: "Strings Follow Array Rules",
        body: `
          <h2>You can read a string one character at a time</h2>
          <p>Because strings are char arrays, indexing works the same way as with any other array.</p>
          <pre><code>char word[] = "map";
char first = word[0];</code></pre>
          <p>You can also change a character by assigning a new value at a valid index.</p>
        `
      },
      {
        title: "Safe String Habits",
        body: `
          <h2>Keep your string code simple and deliberate</h2>
          <ul>
            <li>Know which index you are reading or writing</li>
            <li>Use %s for text and %c for one character</li>
            <li>Remember that the visible letters stop before the null terminator</li>
          </ul>
        `
      },
      {
        title: "Knowledge Check: Printing Text",
        question: "Which format specifier prints a full C string?",
        options: [
          "%s",
          "%c",
          "%d",
          "%.2f"
        ],
        correct: 0,
        explanation: "%s prints the whole string, while %c prints one character."
      },
      {
        title: "Code Lab: Update the First Letter",
        instructions: `
          <p>Change the first character so the program prints:</p>
          <pre>Word: cap</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    char word[] = "map";

    // Change the first letter here
    printf("Word: %s\\n", word);
    return 0;
}`,
        expected_output: "Word: cap",
        hint: "Assign 'c' to word[0].",
        completion_message: "Correct. You updated a single character inside the string."
      }
    ),
    createFinalLesson(
      "m6l3",
      "Lesson 3: String Debugging",
      {
        title: "Common String Mistakes",
        body: `
          <h2>String bugs usually come from indexing or format confusion</h2>
          <p>If the wrong character prints, check the index. If the wrong amount of text prints, check whether you used %s or %c.</p>
          <ul>
            <li>Index 0 is the first visible character</li>
            <li>The last visible character is before the null terminator</li>
            <li>%c prints one character, not the whole array</li>
          </ul>
        `
      },
      {
        title: "Diagnosis Check",
        question: "Which index stores the last visible character of char word[] = \"code\"?",
        options: [
          "3",
          "4",
          "0",
          "5"
        ],
        correct: 0,
        explanation: "The visible letters are at indices 0, 1, 2, and 3. Index 4 stores the null terminator."
      },
      {
        title: "Debug Lab: Fix the Last Letter",
        instructions: `
          <p>The program prints the wrong character. Fix it so the output becomes:</p>
          <pre>Last: e</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    char word[] = "code";

    printf("Last: %c\\n", word[2]);
    return 0;
}`,
        expected_output: "Last: e",
        hint: "Count the character positions carefully from index 0.",
        completion_message: "Good. You traced the index correctly and fixed the output."
      },
      {
        title: "Knowledge Check: %c vs %s",
        question: "When should you use %c instead of %s?",
        options: [
          "When printing one character from a string",
          "When printing the whole string",
          "When printing an integer length",
          "When printing a decimal average"
        ],
        correct: 0,
        explanation: "%c is for one character. Use %s for a full C string."
      }
    )
  ]),
  createModule(7, "Functions", [
    createStandardLesson(
      "m7l1",
      "Lesson 1: Defining and Calling Functions",
      {
        title: "Why Functions Help",
        body: `
          <h2>Functions break a program into named tasks</h2>
          <p>A function lets you group a useful piece of logic and call it when needed. This improves readability and avoids repeating code.</p>
          <pre><code>int doubleValue(int n) {
    return n * 2;
}</code></pre>
        `
      },
      {
        title: "Function Shape",
        body: `
          <h2>A function has a return type, a name, and parameters</h2>
          <p>The return type tells C what kind of value comes back. Parameters are the input values the function needs.</p>
          <table class="info-table">
            <thead><tr><th>Part</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td>Return type</td><td><code>int</code></td></tr>
              <tr><td>Name</td><td><code>doubleValue</code></td></tr>
              <tr><td>Parameter</td><td><code>int n</code></td></tr>
            </tbody>
          </table>
        `
      },
      {
        title: "Knowledge Check: Why Use Functions?",
        question: "What is a main benefit of using functions?",
        options: [
          "They organize reusable logic",
          "They remove the need for main",
          "They force every program to use pointers",
          "They replace all variables"
        ],
        correct: 0,
        explanation: "Functions help you organize logic into small reusable pieces."
      },
      {
        title: "Code Lab: Call the Function",
        instructions: `
          <p>Complete the final line so the program prints:</p>
          <pre>Result: 14</pre>
        `,
        starter_code: `#include <stdio.h>

int doubleValue(int n) {
    return n * 2;
}

int main() {
    int result = doubleValue(7);
    // Print result below

    return 0;
}`,
        expected_output: "Result: 14",
        hint: "Use printf(\"Result: %d\\n\", result);",
        completion_message: "Good. You defined a function, called it, and used the returned value."
      }
    ),
    createStandardLesson(
      "m7l2",
      "Lesson 2: Parameters, Returns, and Scope",
      {
        title: "Parameters Carry Data In",
        body: `
          <h2>Parameters let the same function work with different values</h2>
          <p>Instead of hard-coding numbers, pass them into the function.</p>
          <pre><code>int area(int width, int height) {
    return width * height;
}</code></pre>
          <p>This function can calculate many rectangles, not just one.</p>
        `
      },
      {
        title: "Local Variables and Prototypes",
        body: `
          <h2>Function variables live only inside that function</h2>
          <p>A variable created inside a function is local to that function. If you place a function below main, add a prototype first so the compiler knows its shape.</p>
          <pre><code>int area(int width, int height);</code></pre>
        `
      },
      {
        title: "Knowledge Check: Pass by Value",
        question: "Regular function arguments in C are passed by:",
        options: [
          "Value",
          "Reference",
          "Arrow",
          "Alias"
        ],
        correct: 0,
        explanation: "C passes normal function arguments by value unless you pass a pointer."
      },
      {
        title: "Code Lab: Use Parameters",
        instructions: `
          <p>Complete the final line so the program prints:</p>
          <pre>Area: 20</pre>
        `,
        starter_code: `#include <stdio.h>

int area(int width, int height) {
    return width * height;
}

int main() {
    int roomArea = area(4, 5);
    // Print roomArea below

    return 0;
}`,
        expected_output: "Area: 20",
        hint: "Use printf(\"Area: %d\\n\", roomArea);",
        completion_message: "Good. You passed values into a function and printed the returned answer."
      }
    ),
    createFinalLesson(
      "m7l3",
      "Lesson 3: Function Debugging",
      {
        title: "How to Debug a Function",
        body: `
          <h2>Check the function body, the call, and the expected result</h2>
          <p>If a function gives the wrong answer, inspect the formula first. Then check that you are calling it with the right arguments and printing the returned value correctly.</p>
        `
      },
      {
        title: "Diagnosis Check",
        question: `Why is this function wrong for squaring a number?<br><pre><code>int square(int n) {
    return n + n;
}</code></pre>`,
        options: [
          "It adds the value instead of multiplying it",
          "It should return a char",
          "It cannot use a parameter",
          "It must always be below main"
        ],
        correct: 0,
        explanation: "A square multiplies the value by itself. n + n doubles it instead."
      },
      {
        title: "Debug Lab: Fix the Square Function",
        instructions: `
          <p>Repair the function so the program prints:</p>
          <pre>Square: 25</pre>
        `,
        starter_code: `#include <stdio.h>

int square(int n) {
    return n + n;
}

int main() {
    printf("Square: %d\\n", square(5));
    return 0;
}`,
        expected_output: "Square: 25",
        hint: "A square uses the same number twice in a multiplication.",
        completion_message: "Good. You fixed the function logic rather than changing the test value."
      },
      {
        title: "Knowledge Check: Prototype Purpose",
        question: "What is the main purpose of a function prototype?",
        options: [
          "To tell the compiler a function's name, return type, and parameters",
          "To store the return value permanently",
          "To replace the function body",
          "To make every function global"
        ],
        correct: 0,
        explanation: "A prototype tells the compiler what the function looks like before it is used."
      }
    )
  ]),
  createModule(8, "Pointers", [
    createStandardLesson(
      "m8l1",
      "Lesson 1: Addresses and Dereferencing",
      {
        title: "A Pointer Stores an Address",
        body: `
          <h2>Pointers let you work with memory addresses directly</h2>
          <p>A normal variable stores a value. A pointer stores the address where a value lives.</p>
          <pre><code>int value = 12;
int *p = &value;</code></pre>
          <p>The <code>&</code> operator means "address of".</p>
        `
      },
      {
        title: "Dereferencing Reads the Value",
        body: `
          <h2>The * symbol has two pointer jobs</h2>
          <p>In a declaration, <code>*</code> means "pointer to". In an expression, <code>*p</code> means "the value stored at the address in p".</p>
          <table class="info-table">
            <thead><tr><th>Syntax</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>&value</code></td><td>Address of value</td></tr>
              <tr><td><code>*p</code></td><td>Value stored at address p</td></tr>
            </tbody>
          </table>
        `
      },
      {
        title: "Knowledge Check: Address Of",
        question: "What does &value produce in C?",
        options: [
          "The address of value",
          "The type of value",
          "The size of value",
          "A copy of value as text"
        ],
        correct: 0,
        explanation: "&value gives the memory address where the variable is stored."
      },
      {
        title: "Code Lab: Read Through a Pointer",
        instructions: `
          <p>Complete the final line so the program prints:</p>
          <pre>Value: 12</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int value = 12;
    int *p = &value;

    // Print the value through the pointer below

    return 0;
}`,
        expected_output: "Value: 12",
        hint: "Use *p inside printf.",
        completion_message: "Good. You used dereferencing to read the value stored through the pointer."
      }
    ),
    createStandardLesson(
      "m8l2",
      "Lesson 2: Pointers in Function Calls",
      {
        title: "Why Pass an Address to a Function",
        body: `
          <h2>Pointers let a function modify the original variable</h2>
          <p>Normal arguments are passed by value, so the function receives a copy. If you want the function to change the original data, pass its address.</p>
          <pre><code>void addBonus(int *score) {
    *score += 5;
}</code></pre>
        `
      },
      {
        title: "Read Pointer Code Slowly",
        body: `
          <h2>Track three things when you read pointer code</h2>
          <ul>
            <li>The variable and its current value</li>
            <li>The address stored in the pointer</li>
            <li>The value reached by dereferencing the pointer</li>
          </ul>
          <p>This habit makes pointer code much easier to follow.</p>
        `
      },
      {
        title: "Knowledge Check: Why Pass &score?",
        question: "Why would you pass &score into a function?",
        options: [
          "So the function can change the original score",
          "So the function can avoid using return",
          "So the function can print without printf",
          "So the compiler can rename the variable"
        ],
        correct: 0,
        explanation: "Passing the address lets the function work with the original variable in memory."
      },
      {
        title: "Code Lab: Update a Value by Address",
        instructions: `
          <p>Use the pointer-based helper so the program prints:</p>
          <pre>Score: 20</pre>
        `,
        starter_code: `#include <stdio.h>

void addBonus(int *score) {
    *score += 5;
}

int main() {
    int score = 15;
    addBonus(&score);
    printf("Score: %d\\n", score);
    return 0;
}`,
        expected_output: "Score: 20",
        hint: "The function already changes the pointed-to value by 5.",
        completion_message: "Good. You used a pointer parameter to update the original variable."
      }
    ),
    createFinalLesson(
      "m8l3",
      "Lesson 3: Pointer Safety and Debugging",
      {
        title: "Be Careful with Pointer Setup",
        body: `
          <h2>Most pointer bugs start before dereferencing</h2>
          <p>If the pointer does not point at a valid variable, reading or writing through it is unsafe.</p>
          <ul>
            <li>Initialize the pointer before you use *p</li>
            <li>Use & when you want an address</li>
            <li>Read declarations and expressions separately</li>
          </ul>
        `
      },
      {
        title: "Diagnosis Check",
        question: "What is the problem with an uninitialized pointer?",
        options: [
          "It does not point to a known valid address",
          "It always points to zero safely",
          "It automatically stores the value of the variable name",
          "It can only be used with char variables"
        ],
        correct: 0,
        explanation: "An uninitialized pointer can point anywhere, so dereferencing it is unsafe."
      },
      {
        title: "Debug Lab: Fix the Pointer Setup",
        instructions: `
          <p>The pointer is set up incorrectly. Fix the program so it prints:</p>
          <pre>Value: 9</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    int value = 9;
    int *p = value;

    printf("Value: %d\\n", *p);
    return 0;
}`,
        expected_output: "Value: 9",
        hint: "A pointer to value needs the variable's address, not the value itself.",
        completion_message: "Correct. You fixed the pointer setup by storing the address."
      },
      {
        title: "Knowledge Check: Writing Through a Pointer",
        question: "What does *p = 7; do when p points to a valid int variable?",
        options: [
          "It changes the pointed-to value to 7",
          "It changes the address stored in p",
          "It turns p into an integer",
          "It frees the pointer"
        ],
        correct: 0,
        explanation: "*p = 7 writes a new value into the variable that p points to."
      }
    )
  ]),
  createModule(9, "Structures", [
    createStandardLesson(
      "m9l1",
      "Lesson 1: Declaring Structs",
      {
        title: "Why Structs Exist",
        body: `
          <h2>A struct groups related fields into one record</h2>
          <p>Use a struct when several values describe the same real thing, such as a student, a book, or a point on a graph.</p>
          <pre><code>struct Student {
    char name[20];
    int id;
};</code></pre>
        `
      },
      {
        title: "Accessing Members with Dot Notation",
        body: `
          <h2>Use the dot operator to read a member from a struct variable</h2>
          <pre><code>struct Student s = {"Mina", 1024};
printf("%s %d\\n", s.name, s.id);</code></pre>
          <p>Each member name makes the code more readable than using separate unrelated variables.</p>
        `
      },
      {
        title: "Knowledge Check: Struct Purpose",
        question: "What is the main purpose of a struct in C?",
        options: [
          "To group related fields into one type",
          "To replace loops",
          "To avoid using functions",
          "To print text faster"
        ],
        correct: 0,
        explanation: "Structs let you model one entity using several named fields."
      },
      {
        title: "Code Lab: Print a Student Record",
        instructions: `
          <p>Complete the final line so the program prints:</p>
          <pre>Mina 1024</pre>
        `,
        starter_code: `#include <stdio.h>

struct Student {
    char name[20];
    int id;
};

int main() {
    struct Student s = {"Mina", 1024};
    // Print the student record below

    return 0;
}`,
        expected_output: "Mina 1024",
        hint: "Use s.name with %s and s.id with %d.",
        completion_message: "Good. You read both members from a simple struct variable."
      }
    ),
    createStandardLesson(
      "m9l2",
      "Lesson 2: Initializing and Using Records",
      {
        title: "Struct Variables Model Real Data",
        body: `
          <h2>Structs make data easier to reason about</h2>
          <p>Once you define the type, you can create variables that represent books, products, points, or other domain objects.</p>
          <pre><code>struct Book {
    char title[30];
    int pages;
};</code></pre>
        `
      },
      {
        title: "Readable Field Names Matter",
        body: `
          <h2>Good member names explain the data</h2>
          <p>Names such as <code>title</code>, <code>pages</code>, and <code>price</code> make the program easier to understand than single-letter field names.</p>
          <div class="info-box">
            <strong>Tip:</strong> A struct is most useful when the member names help the reader understand the record immediately.
          </div>
        `
      },
      {
        title: "Knowledge Check: Member Access",
        question: "How do you access the pages member of struct variable book?",
        options: [
          "book.pages",
          "book->pages",
          "pages.book",
          "book::pages"
        ],
        correct: 0,
        explanation: "Use dot notation when you have a normal struct variable."
      },
      {
        title: "Code Lab: Print a Book Record",
        instructions: `
          <p>Complete the final line so the program prints:</p>
          <pre>Book: C Basics (240 pages)</pre>
        `,
        starter_code: `#include <stdio.h>

struct Book {
    char title[30];
    int pages;
};

int main() {
    struct Book book = {"C Basics", 240};
    // Print the book record below

    return 0;
}`,
        expected_output: "Book: C Basics (240 pages)",
        hint: "Use book.title and book.pages inside printf.",
        completion_message: "Good. You printed a record in a readable format."
      }
    ),
    createFinalLesson(
      "m9l3",
      "Lesson 3: Struct Member Debugging",
      {
        title: "Struct Bugs Are Usually Access Bugs",
        body: `
          <h2>Most beginner struct bugs come from using the wrong member</h2>
          <p>If the output looks almost right, check that each printed value comes from the correct field and in the correct order.</p>
        `
      },
      {
        title: "Diagnosis Check",
        question: "Which operator should you use to access a member on a normal struct variable?",
        options: [
          ".",
          "->",
          "::",
          "&"
        ],
        correct: 0,
        explanation: "Use dot notation for a normal struct variable."
      },
      {
        title: "Debug Lab: Fix the Printed Point",
        instructions: `
          <p>The point is printed in the wrong order. Fix the code so it prints:</p>
          <pre>Point: (3, 4)</pre>
        `,
        starter_code: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main() {
    struct Point p = {3, 4};
    printf("Point: (%d, %d)\\n", p.y, p.x);
    return 0;
}`,
        expected_output: "Point: (3, 4)",
        hint: "Check whether the x and y fields are printed in the correct order.",
        completion_message: "Good. You matched each printed value to the correct member."
      },
      {
        title: "Knowledge Check: Why Structs Help",
        question: "Why is a struct often better than several unrelated variables?",
        options: [
          "It keeps related data together under one meaningful type",
          "It makes every program shorter automatically",
          "It removes the need for arrays",
          "It prevents all bugs"
        ],
        correct: 0,
        explanation: "Structs improve organization by grouping related fields into one record."
      }
    )
  ]),
  createModule(10, "File Input and Output", [
    createStandardLesson(
      "m10l1",
      "Lesson 1: FILE Pointers and Open Modes",
      {
        title: "What File I/O Does",
        body: `
          <h2>File input and output lets programs work with stored data</h2>
          <p>Instead of only printing to the screen, a program can read information from a file or write new information into one.</p>
          <pre><code>FILE *fp = fopen("report.txt", "w");</code></pre>
          <p><code>FILE *</code> is the type used to work with a file stream.</p>
        `
      },
      {
        title: "Common File Modes",
        body: `
          <h2>The mode tells fopen what kind of access you want</h2>
          <table class="info-table">
            <thead><tr><th>Mode</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>"r"</code></td><td>Read an existing file</td></tr>
              <tr><td><code>"w"</code></td><td>Write a new file or replace old content</td></tr>
              <tr><td><code>"a"</code></td><td>Append to the end of a file</td></tr>
            </tbody>
          </table>
          <div class="warning-box">
            <strong>Note:</strong> In this course, file exercises are simulated so they stay predictable in the browser.
          </div>
        `
      },
      {
        title: "Knowledge Check: Opening a File",
        question: "Which standard function opens a file stream in C?",
        options: [
          "fopen()",
          "printf()",
          "malloc()",
          "scanf()"
        ],
        correct: 0,
        explanation: "fopen opens a file and returns a FILE pointer."
      },
      {
        title: "Code Lab: Show the Open Mode",
        instructions: `
          <p>This is a simulated file-workflow exercise. Complete the final line so the program prints:</p>
          <pre>Open file
Mode: w</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    char mode[] = "w";

    printf("Open file\\n");
    // Print the mode below

    return 0;
}`,
        expected_output: "Open file\nMode: w",
        hint: "Use %s to print the mode string.",
        completion_message: "Good. You identified the write mode used for opening a file for output."
      }
    ),
    createStandardLesson(
      "m10l2",
      "Lesson 2: Read, Write, and Close Workflow",
      {
        title: "The Usual File Workflow",
        body: `
          <h2>Most file tasks follow the same order</h2>
          <ol>
            <li>Open the file</li>
            <li>Read from it or write to it</li>
            <li>Close the file</li>
          </ol>
          <p>Keeping this order in mind helps you reason about what the program is doing.</p>
        `
      },
      {
        title: "Check for Errors Early",
        body: `
          <h2>Always check whether fopen succeeded</h2>
          <p>If fopen returns <code>NULL</code>, the file could not be opened. Good programs check this before trying to read or write.</p>
          <pre><code>if (fp == NULL) {
    return 1;
}</code></pre>
        `
      },
      {
        title: "Knowledge Check: NULL Check",
        question: "Why should you check fp == NULL after fopen()?",
        options: [
          "Because the open operation may have failed",
          "Because NULL automatically closes the file",
          "Because fopen always returns NULL first",
          "Because NULL means the file is empty"
        ],
        correct: 0,
        explanation: "A NULL return means the file could not be opened successfully."
      },
      {
        title: "Code Lab: Simulate the Workflow",
        instructions: `
          <p>This browser-safe exercise represents the file workflow. Complete the missing line so the program prints:</p>
          <pre>Open
Write
Close</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    printf("Open\\n");
    printf("Write\\n");
    // Print the final workflow step below

    return 0;
}`,
        expected_output: "Open\nWrite\nClose",
        hint: "The last workflow step is closing the file.",
        completion_message: "Good. You captured the standard open-write-close sequence."
      }
    ),
    createFinalLesson(
      "m10l3",
      "Lesson 3: File Workflow Debugging",
      {
        title: "Debugging File Logic",
        body: `
          <h2>File bugs often come from the wrong step or wrong mode</h2>
          <p>If a program should save data but opens the file in read mode, the workflow is wrong before any write happens. Missing fclose is another common mistake.</p>
          <ul>
            <li>Check the mode string first</li>
            <li>Check for a NULL open result</li>
            <li>Make sure every successful open is followed by close</li>
          </ul>
        `
      },
      {
        title: "Diagnosis Check",
        question: "A program needs to save results to a file. Which mode should it use?",
        options: [
          "\"w\"",
          "\"r\"",
          "\"EOF\"",
          "\"%s\""
        ],
        correct: 0,
        explanation: "\"w\" is the standard write mode."
      },
      {
        title: "Debug Lab: Fix the Workflow Trace",
        instructions: `
          <p>This simulated workflow prints the wrong middle step. Fix it so the output becomes:</p>
          <pre>Open
Write
Close</pre>
        `,
        starter_code: `#include <stdio.h>

int main() {
    printf("Open\\n");
    printf("Read\\n");
    printf("Close\\n");
    return 0;
}`,
        expected_output: "Open\nWrite\nClose",
        hint: "The program is meant to save data, not read it.",
        completion_message: "Good. You corrected the workflow so it matches the task."
      },
      {
        title: "Knowledge Check: Why fclose Matters",
        question: "Why is fclose(fp) important after successful file work?",
        options: [
          "It releases the file resource and finalizes the workflow",
          "It turns the file into an int",
          "It changes read mode into write mode",
          "It removes the need for fopen next time"
        ],
        correct: 0,
        explanation: "Closing the file cleanly is part of correct resource management and completes the workflow."
      }
    )
  ])
];

COURSE_DATA.modules.push(...ADDITIONAL_MODULES);
