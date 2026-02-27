/**
 * ppt-content.js
 * Title-guided university intro C modules.
 * Format mirrors the original: content, quiz, code, quiz.
 */

(() => {
  function esc(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function list(items) {
    return items.map(x => `<li>${esc(x)}</li>`).join("");
  }

  function tableRows(items) {
    return items.map(([a, b]) => `<tr><td><code>${esc(a)}</code></td><td>${esc(b)}</td></tr>`).join("");
  }

  function bodyOverview(s) {
    return `
      <h2>${esc(s.name)}: Core Concepts</h2>
      <p>${esc(s.summary)}</p>
      <h3>Learning Outcomes</h3>
      <ul>${list(s.outcomes)}</ul>
      <h3>Module Focus</h3>
      <ul>${list(s.focus)}</ul>
      <div class="info-box"><strong>Study Tip:</strong> ${esc(s.tip)}</div>
    `;
  }

  function bodyGuide(s) {
    return `
      <h2>${esc(s.name)}: Guided Example</h2>
      <p>${esc(s.guide)}</p>
      <pre><code>${esc(s.example)}</code></pre>
      <table class="info-table">
        <thead><tr><th>Syntax</th><th>Meaning</th></tr></thead>
        <tbody>${tableRows(s.syntax)}</tbody>
      </table>
      <ul>${list(s.takeaways)}</ul>
    `;
  }

  const SPECS = [
    {
      name: "Getting Started",
      summary: "Introduce C program structure and the compile-run cycle used in first-year labs.",
      outcomes: ["Identify required parts of a basic C program.", "Explain what the compiler produces."],
      focus: ["Program execution starts at main().", "Readable structure reduces errors."],
      tip: "Write and run tiny examples often.",
      guide: "Use this as your baseline program shape.",
      example: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`,
      syntax: [["int main(void)", "Entry point."], ["return 0;", "Successful completion."]],
      takeaways: ["Small compile-run loops are the fastest way to improve."],
      quiz1: {
        title: "Knowledge Check",
        question: "Which function starts execution in C?",
        options: ["printf()", "main()", "return()", "scanf()"],
        correct: 1,
        explanation: "C starts execution in main()."
      },
      lab: {
        title: "Code Lab: First Output",
        instructions: "<p>Print exactly:</p><pre>Welcome to C\nLet's code.</pre>",
        starter: `#include <stdio.h>

int main(void) {
    printf("Welcome to C\\n");
    printf("Let's code.\\n");
    return 0;
}`,
        expected: "Welcome to C\nLet's code.",
        mode: "exact",
        hint: "Use two printf calls and \\n.",
        done: "Good start. Your first program runs correctly."
      },
      quiz2: {
        title: "Quick Check",
        question: "What does return 0 in main indicate?",
        options: ["Print 0", "Program finished successfully", "Reset memory", "Skip code"],
        correct: 1,
        explanation: "Return code 0 conventionally means success."
      }
    },
    {
      name: "Basic Input and Output",
      summary: "Practice formatted output and understand why input needs variable addresses.",
      outcomes: ["Use printf with common specifiers.", "Explain & with scanf."],
      focus: ["Type/specifier matching is essential.", "Input writes values into memory."],
      tip: "Print variables frequently while developing.",
      guide: "This print pattern appears in almost every beginner exercise.",
      example: `#include <stdio.h>

int main(void) {
    int age = 19;
    float avg = 72.5f;
    printf("Age: %d\\n", age);
    printf("Average: %.1f\\n", avg);
    return 0;
}`,
      syntax: [["%d", "Integer."], ["%.1f", "Float with one decimal place."]],
      takeaways: ["Correct formatting improves readability and grading clarity."],
      quiz1: {
        title: "Knowledge Check",
        question: "Which specifier prints an integer?",
        options: ["%f", "%d", "%s", "%c"],
        correct: 1,
        explanation: "%d prints decimal integers."
      },
      lab: {
        title: "Code Lab: Student Summary",
        instructions: "<p>Print exactly:</p><pre>Name: Alex\nAge: 19\nAverage: 72.5</pre>",
        starter: `#include <stdio.h>

int main(void) {
    char name[] = "Alex";
    int age = 19;
    float average = 72.5f;

    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("Average: %.1f\\n", average);
    return 0;
}`,
        expected: "Name: Alex\nAge: 19\nAverage: 72.5",
        mode: "exact",
        hint: "Use %s, %d, then %.1f.",
        done: "Output matches the required format."
      },
      quiz2: {
        title: "Quick Check",
        question: "Why is & used in scanf(\"%d\", &age)?",
        options: ["To print age", "To pass age's address", "To cast age", "To end input"],
        correct: 1,
        explanation: "scanf needs the variable address to store input."
      }
    },
    {
      name: "Conditional Statements",
      summary: "Build decision logic using if, else if, and else.",
      outcomes: ["Write valid branch conditions.", "Trace branch behavior for test values."],
      focus: ["Branch order matters.", "Test boundary values explicitly."],
      tip: "Dry-run conditions before coding.",
      guide: "Range checking with else-if is a standard pattern.",
      example: `#include <stdio.h>

int main(void) {
    int score = 74;
    if (score >= 80) printf("A\\n");
    else if (score >= 70) printf("B\\n");
    else printf("C\\n");
    return 0;
}`,
      syntax: [["if (cond)", "Run block if true."], ["else if", "Check next condition."]],
      takeaways: ["Use braces consistently for readability."],
      quiz1: {
        title: "Knowledge Check",
        question: "Which structure supports ordered multiple conditions?",
        options: ["for + while", "if + else if + else", "switch + main", "printf + scanf"],
        correct: 1,
        explanation: "if / else if / else is the standard ordered branch chain."
      },
      lab: {
        title: "Code Lab: Distinction Rule",
        instructions: "<p>With score=68, print Distinction (>=70), Merit (>=60), or Pass.</p>",
        starter: `#include <stdio.h>

int main(void) {
    int score = 68;
    if (score >= 70) printf("Distinction\\n");
    else if (score >= 60) printf("Merit\\n");
    else printf("Pass\\n");
    return 0;
}`,
        expected: "Merit",
        mode: "exact",
        hint: "68 should match the second branch.",
        done: "Your branch logic is correct."
      },
      quiz2: {
        title: "Quick Check",
        question: "With x=4, what prints? if (x % 2 == 0) printf(\"Even\"); else printf(\"Odd\");",
        options: ["Odd", "Even", "Both", "Nothing"],
        correct: 1,
        explanation: "4 is even, so the true branch prints Even."
      }
    },
    {
      name: "Loops",
      summary: "Use for and while loops for repetition and accumulation.",
      outcomes: ["Build valid loop headers.", "Avoid infinite loops and off-by-one issues."],
      focus: ["for for known counts.", "while for condition-driven repetition."],
      tip: "Track loop variables in a quick table while debugging.",
      guide: "Counting and totals are core loop applications.",
      example: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`,
      syntax: [["for (init; cond; update)", "Count-controlled loop."], ["i++", "Increment by one."]],
      takeaways: ["Always verify start, stop, and update together."],
      quiz1: {
        title: "Knowledge Check",
        question: "How many iterations: for (int i=0; i<4; i++)?",
        options: ["3", "4", "5", "Infinite"],
        correct: 1,
        explanation: "i takes 0,1,2,3: four iterations."
      },
      lab: {
        title: "Code Lab: Running Total",
        instructions: "<p>Sum 1 to 5 and print:</p><pre>Total: 15</pre>",
        starter: `#include <stdio.h>

int main(void) {
    int total = 0;
    for (int i = 1; i <= 5; i++) total += i;
    printf("Total: %d\\n", total);
    return 0;
}`,
        expected: "Total: 15",
        mode: "exact",
        hint: "Start total at 0, then add i each iteration.",
        done: "Good. You used iteration to aggregate values."
      },
      quiz2: {
        title: "Quick Check",
        question: "What is the main risk if a loop variable is never updated?",
        options: ["Compiler crash", "Infinite loop", "Auto recursion", "Type conversion"],
        correct: 1,
        explanation: "Condition may never become false."
      }
    },
    {
      name: "Software Development Methodology",
      summary: "Apply engineering workflow: plan, design, implement, and test.",
      outcomes: ["Explain why process improves quality.", "Describe testing's role in validation."],
      focus: ["Planning reduces rework.", "Testing validates requirements."],
      tip: "Spend a few minutes planning before coding.",
      guide: "The same process scales from labs to production systems.",
      example: `#include <stdio.h>

int main(void) {
    printf("Plan\\n");
    printf("Design\\n");
    printf("Implement\\n");
    printf("Test\\n");
    return 0;
}`,
      syntax: [["Plan", "Define requirements."], ["Test", "Verify behavior."]],
      takeaways: ["Debugging is part of development, not a separate phase."],
      quiz1: {
        title: "Knowledge Check",
        question: "Which activity should happen before coding?",
        options: ["Deployment", "Planning and design", "Compression", "Refactoring old code"],
        correct: 1,
        explanation: "Design decisions should guide implementation."
      },
      lab: {
        title: "Code Lab: Process Trace",
        instructions: "<p>Print exactly:</p><pre>Plan\nDesign\nImplement\nTest</pre>",
        starter: `#include <stdio.h>

int main(void) {
    printf("Plan\\n");
    printf("Design\\n");
    printf("Implement\\n");
    printf("Test\\n");
    return 0;
}`,
        expected: "Plan\nDesign\nImplement\nTest",
        mode: "exact",
        hint: "One stage per line.",
        done: "Good. Your workflow output is clear and correct."
      },
      quiz2: {
        title: "Quick Check",
        question: "Why is testing essential?",
        options: ["Increase file size", "Verify behavior meets requirements", "Avoid comments", "Prevent functions"],
        correct: 1,
        explanation: "Testing confirms correctness against expectations."
      }
    },
    {
      name: "Types and Casting",
      summary: "Understand numeric types, precision, and conversion behavior.",
      outcomes: ["Choose suitable numeric types.", "Use explicit casting intentionally."],
      focus: ["int is whole numbers.", "Casting controls expression type."],
      tip: "Print intermediate values when checking type behavior.",
      guide: "One cast can change output significantly.",
      example: `#include <stdio.h>

int main(void) {
    int a = 7, b = 2;
    double r = (double)a / b;
    printf("Result: %.2f\\n", r);
    return 0;
}`,
      syntax: [["(double)x", "Explicit cast to double."], ["%.2f", "Two-decimal output."]],
      takeaways: ["Know where integer truncation occurs."],
      quiz1: {
        title: "Knowledge Check",
        question: "What does (int)x do?",
        options: ["Declares x as int permanently", "Converts x for that expression", "Prints x as int", "Rounds x always"],
        correct: 1,
        explanation: "It converts the value in that expression context."
      },
      lab: {
        title: "Code Lab: Decimal Average",
        instructions: "<p>Compute average of 9 and 4 and print:</p><pre>Average: 6.50</pre>",
        starter: `#include <stdio.h>

int main(void) {
    int x = 9, y = 4;
    double avg = (double)(x + y) / 2;
    printf("Average: %.2f\\n", avg);
    return 0;
}`,
        expected: "Average: 6.50",
        mode: "exact",
        hint: "Cast before division.",
        done: "Correct. You preserved decimal precision."
      },
      quiz2: {
        title: "Quick Check",
        question: "double d=8.9; int i=d; what is i?",
        options: ["9", "8", "8.9", "Compile error"],
        correct: 1,
        explanation: "Assignment to int truncates the fractional part."
      }
    },
    {
      name: "Arrays",
      summary: "Store same-type values and process them with indexed loops.",
      outcomes: ["Declare and initialize arrays.", "Use safe index bounds."],
      focus: ["C arrays start at index 0.", "Out-of-bounds access is undefined."],
      tip: "Write valid index range before writing loops.",
      guide: "Array traversal underpins many data-processing tasks.",
      example: `#include <stdio.h>

int main(void) {
    int a[4] = {3, 6, 9, 12};
    for (int i = 0; i < 4; i++) printf("%d\\n", a[i]);
    return 0;
}`,
      syntax: [["a[0]", "First element."], ["a[n-1]", "Last valid index for size n."]],
      takeaways: ["Keep loop condition aligned with array size."],
      quiz1: {
        title: "Knowledge Check",
        question: "First valid index of int marks[5]?",
        options: ["1", "0", "-1", "5"],
        correct: 1,
        explanation: "C arrays are zero-indexed."
      },
      lab: {
        title: "Code Lab: Sum Array",
        instructions: "<p>Sum values and print:</p><pre>Sum: 30</pre>",
        starter: `#include <stdio.h>

int main(void) {
    int nums[5] = {2, 4, 6, 8, 10};
    int sum = 0;
    for (int i = 0; i < 5; i++) sum += nums[i];
    printf("Sum: %d\\n", sum);
    return 0;
}`,
        expected: "Sum: 30",
        mode: "exact",
        hint: "Use sum += nums[i] inside the loop.",
        done: "Good. You combined arrays with iteration."
      },
      quiz2: {
        title: "Quick Check",
        question: "Invalid index for int data[5]?",
        options: ["0", "2", "4", "5"],
        correct: 3,
        explanation: "Valid indices are 0 through 4."
      }
    },
    {
      name: "Strings",
      summary: "Represent text as null-terminated char arrays.",
      outcomes: ["Print strings with %s.", "Access characters with indexes."],
      focus: ["Strings end with \\0.", "String indexing follows array rules."],
      tip: "If output is odd, check string termination and indices.",
      guide: "String handling reuses array and character fundamentals.",
      example: `#include <stdio.h>

int main(void) {
    char topic[] = "Strings";
    printf("Topic: %s\\n", topic);
    printf("First: %c\\n", topic[0]);
    return 0;
}`,
      syntax: [["%s", "Print string."], ["\\0", "Null terminator."]],
      takeaways: ["Use %c for one char and %s for full string."],
      quiz1: {
        title: "Knowledge Check",
        question: "What marks the end of a C string?",
        options: ["\\n", "\\0", ";", "EOF"],
        correct: 1,
        explanation: "C strings terminate with null character \\0."
      },
      lab: {
        title: "Code Lab: String Output",
        instructions: "<p>Print exactly:</p><pre>Topic: Strings\nFirst: S</pre>",
        starter: `#include <stdio.h>

int main(void) {
    char topic[] = "Strings";
    printf("Topic: %s\\n", topic);
    printf("First: %c\\n", topic[0]);
    return 0;
}`,
        expected: "Topic: Strings\nFirst: S",
        mode: "exact",
        hint: "Use topic[0] for the first character.",
        done: "Correct. You printed both string and char forms."
      },
      quiz2: {
        title: "Quick Check",
        question: "Which specifier prints a C string?",
        options: ["%c", "%d", "%s", "%f"],
        correct: 2,
        explanation: "%s is the string format specifier."
      }
    },
    {
      name: "Functions",
      summary: "Organize logic into reusable units with parameters and returns.",
      outcomes: ["Define and call simple functions.", "Use return values in main."],
      focus: ["Functions improve modularity.", "Parameters are passed by value by default."],
      tip: "Prototype first when organizing larger files.",
      guide: "This pattern supports clean, testable code.",
      example: `#include <stdio.h>

int square(int n) {
    return n * n;
}

int main(void) {
    printf("%d\\n", square(4));
    return 0;
}`,
      syntax: [["int f(int x)", "Function signature."], ["return expr;", "Return a value."]],
      takeaways: ["Short focused functions are easier to test and maintain."],
      quiz1: {
        title: "Knowledge Check",
        question: "Why use functions?",
        options: ["Avoid variables", "Organize reusable logic", "Replace main", "Force recursion"],
        correct: 1,
        explanation: "Functions provide reuse and structure."
      },
      lab: {
        title: "Code Lab: Cube Function",
        instructions: "<p>Create and call a function so output is:</p><pre>Cube: 27</pre>",
        starter: `#include <stdio.h>

int cube(int n) {
    return n * n * n;
}

int main(void) {
    int result = cube(3);
    printf("Cube: %d\\n", result);
    return 0;
}`,
        expected: "Cube: 27",
        mode: "exact",
        hint: "Call cube(3) and print the return value.",
        done: "Good. You implemented and used a helper function."
      },
      quiz2: {
        title: "Quick Check",
        question: "Regular function arguments in C are passed by:",
        options: ["Reference", "Value", "Pointer only", "Alias"],
        correct: 1,
        explanation: "C uses pass-by-value unless you pass pointers."
      }
    },
    {
      name: "Pointers",
      summary: "Use addresses and dereferencing for indirect data access.",
      outcomes: ["Declare pointer variables.", "Use * and & correctly."],
      focus: ["Pointers store addresses.", "Dereferencing reads/writes pointed values."],
      tip: "Think explicitly about variable, address, and value-at-address.",
      guide: "Pointer basics are foundational for advanced C topics.",
      example: `#include <stdio.h>

int main(void) {
    int value = 25;
    int *p = &value;
    printf("Value: %d\\n", *p);
    return 0;
}`,
      syntax: [["&x", "Address of x."], ["*p", "Value at address p."]],
      takeaways: ["Never dereference an uninitialized pointer."],
      quiz1: {
        title: "Knowledge Check",
        question: "What does &variable return?",
        options: ["Value", "Address", "Type", "Boolean"],
        correct: 1,
        explanation: "& returns the variable's address."
      },
      lab: {
        title: "Code Lab: Pointer Update",
        instructions: "<p>Increase value by 5 through pointer and print:</p><pre>Value: 15</pre>",
        starter: `#include <stdio.h>

int main(void) {
    int value = 10;
    int *p = &value;
    *p = *p + 5;
    printf("Value: %d\\n", value);
    return 0;
}`,
        expected: "Value: 15",
        mode: "exact",
        hint: "Update through *p, then print value.",
        done: "Correct. You changed data through indirection."
      },
      quiz2: {
        title: "Quick Check",
        question: "Which declares a pointer to int?",
        options: ["int p;", "int *p;", "int &p;", "pointer p;"],
        correct: 1,
        explanation: "The * in declaration marks a pointer type."
      }
    },
    {
      name: "Structures",
      summary: "Group related fields into custom record types with struct.",
      outcomes: ["Define struct types.", "Access members using dot syntax."],
      focus: ["Structs model real entities.", "Field names improve readability."],
      tip: "Use domain-specific member names, not single letters.",
      guide: "Structs are standard in data modeling assignments.",
      example: `#include <stdio.h>

struct Student {
    char name[20];
    int id;
};

int main(void) {
    struct Student s = {"Mina", 1024};
    printf("%s %d\\n", s.name, s.id);
    return 0;
}`,
      syntax: [["struct Type { ... };", "Define structure type."], ["x.member", "Access member on variable x."]],
      takeaways: ["Structs reduce complexity compared with parallel arrays."],
      quiz1: {
        title: "Knowledge Check",
        question: "Main purpose of a struct?",
        options: ["Looping", "Grouping related fields", "Auto memory cleanup", "Replacing functions"],
        correct: 1,
        explanation: "Structs group related fields into one type."
      },
      lab: {
        title: "Code Lab: Point Record",
        instructions: "<p>Create a point and print:</p><pre>Point: (3, 4)</pre>",
        starter: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point p = {3, 4};
    printf("Point: (%d, %d)\\n", p.x, p.y);
    return 0;
}`,
        expected: "Point: (3, 4)",
        mode: "exact",
        hint: "Use p.x and p.y in printf.",
        done: "Good. You defined and used a simple structure."
      },
      quiz2: {
        title: "Quick Check",
        question: "How do you access age in struct variable student?",
        options: ["student->age", "student.age", "student::age", "age.student"],
        correct: 1,
        explanation: "Use dot notation for struct variables."
      }
    },
    {
      name: "File Input and Output",
      summary: "Introduce FILE streams and the open-read/write-close lifecycle.",
      outcomes: ["Identify core file API calls.", "Explain why files must be closed."],
      focus: ["fopen returns a FILE pointer.", "fclose releases resources safely."],
      tip: "Always check fopen for NULL before reading or writing.",
      guide: "This is the conceptual baseline before full file labs.",
      example: `#include <stdio.h>

int main(void) {
    FILE *fp = fopen("notes.txt", "w");
    if (fp == NULL) return 1;
    fprintf(fp, "Hello\\n");
    fclose(fp);
    return 0;
}`,
      syntax: [["fopen(path, mode)", "Open stream."], ["fclose(fp)", "Close stream and flush buffers."]],
      takeaways: ["Every successful fopen should have a matching fclose."],
      quiz1: {
        title: "Knowledge Check",
        question: "Which function opens a file stream?",
        options: ["printf()", "fopen()", "scanf()", "malloc()"],
        correct: 1,
        explanation: "fopen is the standard file open function."
      },
      lab: {
        title: "Code Lab: File Workflow Trace",
        instructions: "<p>Print exactly:</p><pre>Open\nRead/Write\nClose</pre>",
        starter: `#include <stdio.h>

int main(void) {
    printf("Open\\n");
    printf("Read/Write\\n");
    printf("Close\\n");
    return 0;
}`,
        expected: "Open\nRead/Write\nClose",
        mode: "exact",
        hint: "One line per lifecycle stage.",
        done: "Correct. You captured the core file I/O flow."
      },
      quiz2: {
        title: "Quick Check",
        question: "Why is fclose important?",
        options: ["To speed loops", "To release file resources and flush writes", "To define FILE type", "To cast data"],
        correct: 1,
        explanation: "fclose finalizes writes and releases the stream handle."
      }
    }
  ];

  function toModule(spec, i) {
    const mid = `pptm${i + 1}`;
    const lid = `${mid}l1`;
    return {
      id: mid,
      title: `Module ${i + 1}: ${spec.name}`,
      icon: String(i + 1),
      lessons: [
        {
          id: lid,
          title: spec.name,
          steps: [
            { id: `${lid}s1`, type: "content", title: "Overview Notes", body: bodyOverview(spec) },
            { id: `${lid}s2`, type: "content", title: "Guided Example", body: bodyGuide(spec) },
            {
              id: `${lid}s3`,
              type: "quiz",
              title: spec.quiz1.title,
              question: spec.quiz1.question,
              options: spec.quiz1.options,
              correct: spec.quiz1.correct,
              explanation: spec.quiz1.explanation
            },
            {
              id: `${lid}s4`,
              type: "code",
              title: spec.lab.title,
              instructions: spec.lab.instructions,
              starter_code: spec.lab.starter,
              expected_output: spec.lab.expected,
              check_mode: spec.lab.mode,
              hint: spec.lab.hint,
              completion_message: spec.lab.done
            },
            {
              id: `${lid}s5`,
              type: "quiz",
              title: spec.quiz2.title,
              question: spec.quiz2.question,
              options: spec.quiz2.options,
              correct: spec.quiz2.correct,
              explanation: spec.quiz2.explanation
            }
          ]
        }
      ]
    };
  }

  const modules = SPECS.map(toModule);

  if (typeof COURSE_DATA === "undefined") return;
  COURSE_DATA.title = "Introduction to C Programming";
  COURSE_DATA.subtitle = "University-style modules with readings, quizzes, and coding practice";
  COURSE_DATA.modules = modules;
})();
