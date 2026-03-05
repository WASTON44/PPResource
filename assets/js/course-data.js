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
