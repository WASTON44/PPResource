/**
 * ppt-content.js
 * Generated from PPT files in PP content.
 * Each PPT file is one module with reading, quiz, and coding steps.
 */

(() => {
  const PPT_MODULES = [
    {
        "id":  "pptm1",
        "title":  "Module 1: Getting Started",
        "icon":  "1",
        "lessons":  [
                        {
                            "id":  "pptm1l1",
                            "title":  "Getting Started",
                            "steps":  [
                                          {
                                              "id":  "pptm1l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eGetting Started: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e1. Getting Started.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eComputer Programming\u003c/li\u003e\n\u003cli\u003eGetting Started\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eLearn the C Programming Language\u003c/li\u003e\n\u003cli\u003eCreate, debug and execute C programs\u003c/li\u003e\n\u003cli\u003eWhy Learn Programming in C?\u003c/li\u003e\n\u003cli\u003eas a student you will program during your study\u003c/li\u003e\n\u003cli\u003eas an engineer you will program during your early career\u003c/li\u003e\n\u003cli\u003eevery field of Electronics, Electrical Engineering and Computer Science uses programming to implement applications\u003c/li\u003e\n\u003cli\u003eC is the most compact language to start with\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm1l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eGetting Started: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003ethe principles and practices of good programming with C carry over to all other languages (e.g. C++, Java, Matlab, VHDL)\u003c/li\u003e\n\u003cli\u003emost embedded device (e.g. mobile phone ) programming is done in C\u003c/li\u003e\n\u003cli\u003eHow to Learn Programming\u003c/li\u003e\n\u003cli\u003eYou are taught the “vocabulary” of the C language i.e. the keywords\u003c/li\u003e\n\u003cli\u003eYou are taught the “grammar” of the C language i.e. the syntax\u003c/li\u003e\n\u003cli\u003eBUT\u003c/li\u003e\n\u003cli\u003eThe only way to learn programming is to doprogramming\u003c/li\u003e\n\u003cli\u003elike all engineering, software engineering or programming is a creative discipline – unlike other modules you have to be creative from the start of the module!\u003c/li\u003e\n\u003cli\u003eWeekly Module Delivery\u003c/li\u003e\n\u003cli\u003epersonal study time is essential\u003c/li\u003e\n\u003cli\u003eif you don’t practice programming you will fail!\u003c/li\u003e\n\u003cli\u003eLecture\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm1l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "Which function is the entry point of a C program?",
                                              "options":  [
                                                              "printf()",
                                                              "main()",
                                                              "#include",
                                                              "return"
                                                          ],
                                              "correct":  1,
                                              "explanation":  "Program execution begins in main()."
                                          },
                                          {
                                              "id":  "pptm1l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: First Program",
                                              "instructions":  "\u003cp\u003eWrite and run a minimal C program that prints \u003ccode\u003eHello, World!\u003c/code\u003e.\u003c/p\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",
                                              "expected_output":  "Hello, World!",
                                              "check_mode":  "contains",
                                              "hint":  "Use printf(\"Hello, World!\\n\"); inside main().",
                                              "completion_message":  "Great. You compiled and ran your first C program."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm2",
        "title":  "Module 2: Basic Input and Output",
        "icon":  "2",
        "lessons":  [
                        {
                            "id":  "pptm2l1",
                            "title":  "Basic Input and Output",
                            "steps":  [
                                          {
                                              "id":  "pptm2l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eBasic Input and Output: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e2. Basic Input and Output.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eComputer Programmingwith C\u003c/li\u003e\n\u003cli\u003eBasic input and output\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003eprint output from a program using printf\u003c/li\u003e\n\u003cli\u003einput values into an executing program using scanf\u003c/li\u003e\n\u003cli\u003ecorrectly use the syntax of printf and be confident with the concept of conversion specifiers\u003c/li\u003e\n\u003cli\u003erecognise how numbers are stored in the memory of a computerand be familiar with the concept of the address of a variable\u003c/li\u003e\n\u003cli\u003ecorrectly use the syntax of scanf and remember the importance of the \u0026amp; operator\u003c/li\u003e\n\u003cli\u003eprintf\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm2l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eBasic Input and Output: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eprintf(”%f and %d and %c\\n”,x,y,z);\u003c/li\u003e\n\u003cli\u003elist of variables\u003c/li\u003e\n\u003cli\u003eplaceholders are conversion specifiers for each variable\u003c/li\u003e\n\u003cli\u003ethe text to be printed has placeholders for each of the variables in the variable list\u003c/li\u003e\n\u003cli\u003ethese placeholders are conversion specifierswhichcorrespond to the type of each variable\u003c/li\u003e\n\u003cli\u003efloat x;\u003c/li\u003e\n\u003cli\u003einty;\u003c/li\u003e\n\u003cli\u003echar z;\u003c/li\u003e\n\u003cli\u003eprintfconversion specifiers\u003c/li\u003e\n\u003cli\u003eConversion\u003c/li\u003e\n\u003cli\u003eVariable Type\u003c/li\u003e\n\u003cli\u003eExample\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm2l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "Which function is most commonly used to display text in C?",
                                              "options":  [
                                                              "scanf()",
                                                              "printf()",
                                                              "puts()",
                                                              "main()"
                                                          ],
                                              "correct":  1,
                                              "explanation":  "printf() prints formatted output to the console."
                                          },
                                          {
                                              "id":  "pptm2l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: Formatted Output",
                                              "instructions":  "\u003cp\u003ePrint a name and a score on separate lines using \u003ccode\u003eprintf\u003c/code\u003e.\u003c/p\u003e\u003cpre\u003eName: Alex\\nScore: 42\u003c/pre\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint main() {\n    char name[] = \"Alex\";\n    int score = 42;\n\n    printf(\"Name: %s\\n\", name);\n    printf(\"Score: %d\\n\", score);\n    return 0;\n}",
                                              "expected_output":  "Name: Alex\nScore: 42",
                                              "check_mode":  "exact",
                                              "hint":  "Use %s for strings and %d for integers.",
                                              "completion_message":  "Nice. You used formatted output with placeholders."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm3",
        "title":  "Module 3: Conditional Statements",
        "icon":  "3",
        "lessons":  [
                        {
                            "id":  "pptm3l1",
                            "title":  "Conditional Statements",
                            "steps":  [
                                          {
                                              "id":  "pptm3l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eConditional Statements: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e3. Conditional Statements.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eComputer Programmingwith C\u003c/li\u003e\n\u003cli\u003eConditional Statements\u003c/li\u003e\n\u003cli\u003eReview\u003c/li\u003e\n\u003cli\u003eC Program Structure\u003c/li\u003e\n\u003cli\u003emain()\u003c/li\u003e\n\u003cli\u003e{\u003c/li\u003e\n\u003cli\u003e}\u003c/li\u003e\n\u003cli\u003eVariable declarations\u003c/li\u003e\n\u003cli\u003eProgram statements\u003c/li\u003e\n\u003cli\u003eComment header: title, author, date, description\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm3l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eConditional Statements: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003ePreprocessor directives #include #define\u003c/li\u003e\n\u003cli\u003estatements are executed sequentially (i.e. one after the other in the order they are written)\u003c/li\u003e\n\u003cli\u003eDebugging is a Skill to Practice\u003c/li\u003e\n\u003cli\u003eStage 1 Debugging\u003c/li\u003e\n\u003cli\u003eGetting the syntax of your code correct so your program will compile and create an executable file\u003c/li\u003e\n\u003cli\u003eStage 2 Debugging\u003c/li\u003e\n\u003cli\u003eYour code may compile but may not “do” what you intended it to do\u003c/li\u003e\n\u003cli\u003eNeed to modify your code so it does “do” what what you intended it to do\u003c/li\u003e\n\u003cli\u003eYou learn by getting it wrong, then putting it right\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003eunderstand conditional branching decisions\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm3l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "Which keyword chain is used for multiple decision branches in C?",
                                              "options":  [
                                                              "for / while",
                                                              "if / else if / else",
                                                              "switch / for",
                                                              "do / return"
                                                          ],
                                              "correct":  1,
                                              "explanation":  "if / else if / else handles ordered branching conditions."
                                          },
                                          {
                                              "id":  "pptm3l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: Pass or Fail",
                                              "instructions":  "\u003cp\u003eUse an \u003ccode\u003eif/else\u003c/code\u003e block to print \u003ccode\u003ePass\u003c/code\u003e when score is 50 or above.\u003c/p\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint main() {\n    int score = 68;\n\n    if (score \u003e= 50) {\n        printf(\"Pass\\n\");\n    } else {\n        printf(\"Fail\\n\");\n    }\n    return 0;\n}",
                                              "expected_output":  "Pass",
                                              "check_mode":  "exact",
                                              "hint":  "Check score \u003e= 50 in the condition.",
                                              "completion_message":  "Good. Your branch logic works correctly."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm4",
        "title":  "Module 4: Loops",
        "icon":  "4",
        "lessons":  [
                        {
                            "id":  "pptm4l1",
                            "title":  "Loops",
                            "steps":  [
                                          {
                                              "id":  "pptm4l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eLoops: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e4. Loops.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eComputer Programmingwith C\u003c/li\u003e\n\u003cli\u003eLoops\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003eunderstand repeated code execution and the term “loop”\u003c/li\u003e\n\u003cli\u003ebe able to use for statements to create loops\u003c/li\u003e\n\u003cli\u003ebe able to use while statements to create loops\u003c/li\u003e\n\u003cli\u003ebe able to use do while statements to create loops\u003c/li\u003e\n\u003cli\u003ea looprepeatsthe execution of a code block\u003c/li\u003e\n\u003cli\u003ea loop will repeat until a termination condition is met\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm4l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eLoops: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eC provides the following loop constructs\u003c/li\u003e\n\u003cli\u003ethe for loop\u003c/li\u003e\n\u003cli\u003ethe while loop\u003c/li\u003e\n\u003cli\u003ethe do while loop\u003c/li\u003e\n\u003cli\u003efor loops\u003c/li\u003e\n\u003cli\u003eincrement loop variable\u003c/li\u003e\n\u003cli\u003ei=i+1\u003c/li\u003e\n\u003cli\u003econditional expression\u003c/li\u003e\n\u003cli\u003ei\u0026lt;5?\u003c/li\u003e\n\u003cli\u003einitialise loop variable\u003c/li\u003e\n\u003cli\u003ei=0\u003c/li\u003e\n\u003cli\u003estatement\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm4l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "Which loop is best when you know the number of iterations in advance?",
                                              "options":  [
                                                              "while",
                                                              "do-while",
                                                              "for",
                                                              "if"
                                                          ],
                                              "correct":  2,
                                              "explanation":  "for loops are ideal for counted repetition."
                                          },
                                          {
                                              "id":  "pptm4l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: Counting Loop",
                                              "instructions":  "\u003cp\u003eUse a \u003ccode\u003efor\u003c/code\u003e loop to print numbers 1 to 5, one per line.\u003c/p\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint main() {\n    for (int i = 1; i \u003c= 5; i++) {\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}",
                                              "expected_output":  "1\n2\n3\n4\n5",
                                              "check_mode":  "exact",
                                              "hint":  "Start i at 1 and continue while i \u003c= 5.",
                                              "completion_message":  "Nice. Your loop produced the expected sequence."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm5",
        "title":  "Module 5: Software Development Methodology",
        "icon":  "5",
        "lessons":  [
                        {
                            "id":  "pptm5l1",
                            "title":  "Software Development Methodology",
                            "steps":  [
                                          {
                                              "id":  "pptm5l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eSoftware Development Methodology: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e5. Software Development Methodology.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eProcedural Programming\u003c/li\u003e\n\u003cli\u003eSoftware Development Methodology\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003eunderstand the stages of the software development process\u003c/li\u003e\n\u003cli\u003eappreciate the need to fully understand the problem and design the solution before beginning to code\u003c/li\u003e\n\u003cli\u003eappreciate the use of multiple test inputs to verify full functionality of a program\u003c/li\u003e\n\u003cli\u003eSoftware Development Cycle\u003c/li\u003e\n\u003cli\u003e(1) Analysis\u003c/li\u003e\n\u003cli\u003eunderstand the task\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm5l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eSoftware Development Methodology: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003e(2) Design\u003c/li\u003e\n\u003cli\u003ecreate pseudocode or flow chart\u003c/li\u003e\n\u003cli\u003e(3) Implementation\u003c/li\u003e\n\u003cli\u003ewrite C code\u003c/li\u003e\n\u003cli\u003e(4) Verification\u003c/li\u003e\n\u003cli\u003etest full functionality\u003c/li\u003e\n\u003cli\u003eProgramming Task\u003c/li\u003e\n\u003cli\u003eif a number is even then it is divisible by 2 (i.e. num div 2 equals 0)\u003c/li\u003e\n\u003cli\u003eif a number is odd it is not divisible by 2 (i.e. num div 2 equals 1)\u003c/li\u003e\n\u003cli\u003emodulo division gives remainder i.e. 8 mod 2 = 0, 9 mod 2 = 1\u003c/li\u003e\n\u003cli\u003eso if result of modulo division by 2 is 0 the number is even\u003c/li\u003e\n\u003cli\u003eand if result of modulo division by 2 is 1 the number is odd\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm5l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "What usually comes before writing code in a structured workflow?",
                                              "options":  [
                                                              "Deploy to users",
                                                              "Define the problem and plan the solution",
                                                              "Delete test data",
                                                              "Skip directly to debugging"
                                                          ],
                                              "correct":  1,
                                              "explanation":  "Good methodology starts with requirements, planning, and design."
                                          },
                                          {
                                              "id":  "pptm5l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: Workflow Trace",
                                              "instructions":  "\u003cp\u003ePrint the core software workflow stages in order.\u003c/p\u003e\u003cpre\u003ePlan\\nDesign\\nCode\\nTest\u003c/pre\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint main() {\n    printf(\"Plan\\n\");\n    printf(\"Design\\n\");\n    printf(\"Code\\n\");\n    printf(\"Test\\n\");\n    return 0;\n}",
                                              "expected_output":  "Plan\nDesign\nCode\nTest",
                                              "check_mode":  "exact",
                                              "hint":  "Use one printf per stage.",
                                              "completion_message":  "Great. You modelled a simple development flow."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm6",
        "title":  "Module 6: Types and Casting",
        "icon":  "6",
        "lessons":  [
                        {
                            "id":  "pptm6l1",
                            "title":  "Types and Casting",
                            "steps":  [
                                          {
                                              "id":  "pptm6l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eTypes and Casting: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e5. Types and Casting.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eComputer Programmingwith C\u003c/li\u003e\n\u003cli\u003eTypes and casting\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003eshow how numbers are represented on a computer\u003c/li\u003e\n\u003cli\u003euse the integer type modifiers unsigned, long and short and additional conversion specifiers\u003c/li\u003e\n\u003cli\u003euse the additional conversion specifiers and control the appearance of printed float variables\u003c/li\u003e\n\u003cli\u003euse the double type and appropriate conversion specifiers\u003c/li\u003e\n\u003cli\u003eexploit that char and int variables can be used interchanegeably\u003c/li\u003e\n\u003cli\u003eunderstand implicit type conversion rules in mixed-type expressions and in assignment statements\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm6l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eTypes and Casting: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eappreciate the use of explicit casting in mixed-type expressions and assignment statements\u003c/li\u003e\n\u003cli\u003eBinary Number Representation\u003c/li\u003e\n\u003cli\u003eThe Decimal Number System is a positional number system with a base of 10 and decimal digits 0,1,2,3,4,5,6,7,8,9\u003c/li\u003e\n\u003cli\u003eThe Binary Number System is a positional number system with a base of 2 and binary digits 0 and 1\u003c/li\u003e\n\u003cli\u003ethe binary digits 0 and 1 are also known as bits (b(inary dig)its)\u003c/li\u003e\n\u003cli\u003eThe Binary Number System is used to represent numbers on a digital computers where the two states (ON and OFF) of a transistor are used to represent the binary digits (0 and 1)\u003c/li\u003e\n\u003cli\u003e=\u003c/li\u003e\n\u003cli\u003e+ 0\u003c/li\u003e\n\u003cli\u003e+ 16\u003c/li\u003e\n\u003cli\u003e+ 8\u003c/li\u003e\n\u003cli\u003e+ 2\u003c/li\u003e\n\u003cli\u003e+ 50\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm6l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "What does an explicit cast like (int)x do?",
                                              "options":  [
                                                              "Declares a new variable",
                                                              "Converts x to int for that expression",
                                                              "Prints x as int",
                                                              "Rounds x in memory permanently"
                                                          ],
                                              "correct":  1,
                                              "explanation":  "A cast converts a value type for the current expression."
                                          },
                                          {
                                              "id":  "pptm6l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: Type Casting",
                                              "instructions":  "\u003cp\u003eCast a decimal value to \u003ccode\u003eint\u003c/code\u003e and print both values.\u003c/p\u003e\u003cpre\u003eOriginal: 9.75\\nCasted: 9\u003c/pre\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint main() {\n    float value = 9.75f;\n    int whole = (int)value;\n\n    printf(\"Original: %.2f\\n\", value);\n    printf(\"Casted: %d\\n\", whole);\n    return 0;\n}",
                                              "expected_output":  "Original: 9.75\nCasted: 9",
                                              "check_mode":  "exact",
                                              "hint":  "Use (int)value to truncate the decimal part.",
                                              "completion_message":  "Good. You applied explicit casting correctly."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm7",
        "title":  "Module 7: Arrays",
        "icon":  "7",
        "lessons":  [
                        {
                            "id":  "pptm7l1",
                            "title":  "Arrays",
                            "steps":  [
                                          {
                                              "id":  "pptm7l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eArrays: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e6. Arrays.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eComputer Programmingwith C\u003c/li\u003e\n\u003cli\u003eArrays\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003eunderstand the usefulness of arrays in conveniently representing many variables of the same type\u003c/li\u003e\n\u003cli\u003euse indexing terms to access individual elements of an array\u003c/li\u003e\n\u003cli\u003euse loops to conveniently access elements of an array\u003c/li\u003e\n\u003cli\u003ework with one-dimensional and two-dimensional arrays\u003c/li\u003e\n\u003cli\u003einitialise contents of an array\u003c/li\u003e\n\u003cli\u003epopluate elements of an array with values\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm7l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eArrays: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003esingle dimension arrays\u003c/li\u003e\n\u003cli\u003eint age[10]; /*declares an array age of 10 integer elements*/\u003c/li\u003e\n\u003cli\u003efloat height[5]; /*declares an array height of 5 float elements*/\u003c/li\u003e\n\u003cli\u003echar name[2]; /*declares an array height of 2 char elements*/\u003c/li\u003e\n\u003cli\u003earrays gather multiple items of data of the same type in a convenient way\u003c/li\u003e\n\u003cli\u003e/*10 individual variables for 10 students*/\u003c/li\u003e\n\u003cli\u003eint age0, age1, age2, age3, age4, age5, age6, age7, age8, age9;\u003c/li\u003e\n\u003cli\u003e/*5 individual variables*/\u003c/li\u003e\n\u003cli\u003efloat height0, height1, height2, height3, height4;\u003c/li\u003e\n\u003cli\u003e/*2 individual variables*/\u003c/li\u003e\n\u003cli\u003echar name0,name1;\u003c/li\u003e\n\u003cli\u003eare replaced by\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm7l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "How are array elements indexed in C?",
                                              "options":  [
                                                              "From 1",
                                                              "From -1",
                                                              "From 0",
                                                              "From the array size"
                                                          ],
                                              "correct":  2,
                                              "explanation":  "C arrays use zero-based indexing."
                                          },
                                          {
                                              "id":  "pptm7l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: Array Sum",
                                              "instructions":  "\u003cp\u003eSum the values in an integer array and print the result.\u003c/p\u003e\u003cpre\u003eSum = 30\u003c/pre\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint main() {\n    int nums[5] = {2, 4, 6, 8, 10};\n    int sum = 0;\n\n    for (int i = 0; i \u003c 5; i++) {\n        sum += nums[i];\n    }\n\n    printf(\"Sum = %d\\n\", sum);\n    return 0;\n}",
                                              "expected_output":  "Sum = 30",
                                              "check_mode":  "exact",
                                              "hint":  "Accumulate each element with sum += nums[i].",
                                              "completion_message":  "Nice. You iterated through an array and computed a total."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm8",
        "title":  "Module 8: Strings",
        "icon":  "8",
        "lessons":  [
                        {
                            "id":  "pptm8l1",
                            "title":  "Strings",
                            "steps":  [
                                          {
                                              "id":  "pptm8l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eStrings: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e7. Strings.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eProcedural Programmingwith C\u003c/li\u003e\n\u003cli\u003eStrings\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003erecognise strings as arrays of characters\u003c/li\u003e\n\u003cli\u003eread and write strings\u003c/li\u003e\n\u003cli\u003einvestigate individual elements of a string using array indexing\u003c/li\u003e\n\u003cli\u003euse string library functions in string.h\u003c/li\u003e\n\u003cli\u003euse string conversion functions in stdlib.h\u003c/li\u003e\n\u003cli\u003euse functions in ctype.h\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm8l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eStrings: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003ewhat is a string?\u003c/li\u003e\n\u003cli\u003ea string is a concatenated sequence of characters\u003c/li\u003e\n\u003cli\u003ea string literal is any sequence of characters enclosed in double quotation marks\u003c/li\u003e\n\u003cli\u003eprintf(“This is a string”);\u003c/li\u003e\n\u003cli\u003ea string literal can include punctuation and formatting sequences or escape sequences\u003c/li\u003e\n\u003cli\u003eprintf(“This is \\t also a, string\\n”);\u003c/li\u003e\n\u003cli\u003ewhen a string is stored in memory it is terminated by the null character represented as escape sequence \\0\u003c/li\u003e\n\u003cli\u003ee.g. the string literal “Paul” is stored in memory as\u003c/li\u003e\n\u003cli\u003eif there are n characters in a string, n+1 memory locations are required to store it i.e. n locations for the characters of the string and an extra location for the null character\u003c/li\u003e\n\u003cli\u003eP\u003c/li\u003e\n\u003cli\u003ea\u003c/li\u003e\n\u003cli\u003eu\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm8l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "In C, what marks the end of a string in a char array?",
                                              "options":  [
                                                              "A period",
                                                              "A null terminator \\0",
                                                              "A newline",
                                                              "A space"
                                                          ],
                                              "correct":  1,
                                              "explanation":  "C strings end with the null character \\0."
                                          },
                                          {
                                              "id":  "pptm8l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: String Output",
                                              "instructions":  "\u003cp\u003eStore text in a character array and print it.\u003c/p\u003e\u003cpre\u003eMessage: C is fun\u003c/pre\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint main() {\n    char message[] = \"C is fun\";\n    printf(\"Message: %s\\n\", message);\n    return 0;\n}",
                                              "expected_output":  "Message: C is fun",
                                              "check_mode":  "exact",
                                              "hint":  "Use %s with printf for a C string.",
                                              "completion_message":  "Good. You printed a string from a char array."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm9",
        "title":  "Module 9: Functions",
        "icon":  "9",
        "lessons":  [
                        {
                            "id":  "pptm9l1",
                            "title":  "Functions",
                            "steps":  [
                                          {
                                              "id":  "pptm9l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eFunctions: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e8. Functions.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eProcedural Programmingwith C\u003c/li\u003e\n\u003cli\u003eFunctions\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003ecreate your own functions\u003c/li\u003e\n\u003cli\u003edemonstrate the usefulness of functions in writing well structured programs\u003c/li\u003e\n\u003cli\u003eunderstand what is meant by pass-by-value\u003c/li\u003e\n\u003cli\u003eunderstand what is meant by pass-by-reference and its implications\u003c/li\u003e\n\u003cli\u003ea function is essentially a small program with it’s own declarations and statements written to perform a well-defined task\u003c/li\u003e\n\u003cli\u003efunctions are used to divide programs into smaller pieces which makes it easier to understand\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm9l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eFunctions: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003efunctions are executed when they are called from within the main program\u003c/li\u003e\n\u003cli\u003edefining a function\u003c/li\u003e\n\u003cli\u003efloat area(floatr)\u003c/li\u003e\n\u003cli\u003e{\u003c/li\u003e\n\u003cli\u003efloata;\u003c/li\u003e\n\u003cli\u003ea = 3.141 * r * r;\u003c/li\u003e\n\u003cli\u003ereturn a;\u003c/li\u003e\n\u003cli\u003e}\u003c/li\u003e\n\u003cli\u003efunction name is area\u003c/li\u003e\n\u003cli\u003eparameter to be received into the function\u003c/li\u003e\n\u003cli\u003evariables can be declared inside a function\u003c/li\u003e\n\u003cli\u003ethese variables are ‘local’ to the function and only exist for duration of function execution\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm9l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "Why do we use functions in C programs?",
                                              "options":  [
                                                              "To avoid variables",
                                                              "To repeat code manually",
                                                              "To organize reusable logic",
                                                              "To replace main()"
                                                          ],
                                              "correct":  2,
                                              "explanation":  "Functions improve reuse, readability, and maintainability."
                                          },
                                          {
                                              "id":  "pptm9l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: Simple Function",
                                              "instructions":  "\u003cp\u003eCreate and call a function that returns the sum of two integers.\u003c/p\u003e\u003cpre\u003eResult = 12\u003c/pre\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = add(5, 7);\n    printf(\"Result = %d\\n\", result);\n    return 0;\n}",
                                              "expected_output":  "Result = 12",
                                              "check_mode":  "exact",
                                              "hint":  "Define add() before main() or provide a prototype.",
                                              "completion_message":  "Great. You defined and called a reusable function."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm10",
        "title":  "Module 10: Pointers",
        "icon":  "10",
        "lessons":  [
                        {
                            "id":  "pptm10l1",
                            "title":  "Pointers",
                            "steps":  [
                                          {
                                              "id":  "pptm10l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003ePointers: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e9. Pointers.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eProcedural Programmingwith C\u003c/li\u003e\n\u003cli\u003ePointers\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003erecognise a pointer variable as a variable that stores an address\u003c/li\u003e\n\u003cli\u003euse the indirection operator * with a pointer variable\u003c/li\u003e\n\u003cli\u003eexploit the close relationship between pointers and arrays\u003c/li\u003e\n\u003cli\u003eaddress of byte 0\u003c/li\u003e\n\u003cli\u003eaddress of byte 1\u003c/li\u003e\n\u003cli\u003eaddress of byte 2\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm10l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003ePointers: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eHow variables are stored\u003c/li\u003e\n\u003cli\u003ea byte is an 8-bit binary number\u003c/li\u003e\n\u003cli\u003ememory is divided into bytes\u003c/li\u003e\n\u003cli\u003eevery byte has a unique address\u003c/li\u003e\n\u003cli\u003eif there are n bytes in memory then addresses range from 0 to n-1\u003c/li\u003e\n\u003cli\u003ebyte 0\u003c/li\u003e\n\u003cli\u003ebyte 1\u003c/li\u003e\n\u003cli\u003ebyte 2\u003c/li\u003e\n\u003cli\u003ebyte n-1\u003c/li\u003e\n\u003cli\u003e…….\u003c/li\u003e\n\u003cli\u003eaddress of byte n-1\u003c/li\u003e\n\u003cli\u003eAddress\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm10l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "What does the \u0026 operator return in C?",
                                              "options":  [
                                                              "The value stored in a pointer",
                                                              "The address of a variable",
                                                              "A boolean result only",
                                                              "The size of a variable"
                                                          ],
                                              "correct":  1,
                                              "explanation":  "\u0026 gives the memory address of a variable."
                                          },
                                          {
                                              "id":  "pptm10l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: Pointer Basics",
                                              "instructions":  "\u003cp\u003eCreate a pointer to an integer and print the value through the pointer.\u003c/p\u003e\u003cpre\u003eValue = 25\u003c/pre\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint main() {\n    int value = 25;\n    int *ptr = \u0026value;\n\n    printf(\"Value = %d\\n\", *ptr);\n    return 0;\n}",
                                              "expected_output":  "Value = 25",
                                              "check_mode":  "exact",
                                              "hint":  "*ptr accesses the value stored at the address in ptr.",
                                              "completion_message":  "Nice. You used \u0026 and * to work with pointers."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm11",
        "title":  "Module 11: Structures",
        "icon":  "11",
        "lessons":  [
                        {
                            "id":  "pptm11l1",
                            "title":  "Structures",
                            "steps":  [
                                          {
                                              "id":  "pptm11l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eStructures: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e10. Structures.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eComputer Programmingwith C\u003c/li\u003e\n\u003cli\u003eStructures\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003ecreate a new structure tag\u003c/li\u003e\n\u003cli\u003edeclare variables of a structure tag\u003c/li\u003e\n\u003cli\u003eaccess individual elements of a structure variable\u003c/li\u003e\n\u003cli\u003ecreate nested structures\u003c/li\u003e\n\u003cli\u003epass structures to a function\u003c/li\u003e\n\u003cli\u003ereturn a structure from a function\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm11l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eStructures: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003ecreate arrays of structures and pass them to a function\u003c/li\u003e\n\u003cli\u003estruct\u003c/li\u003e\n\u003cli\u003ea structure in C is a composite of several variables, of any type, which constitute related information e.g. the record for a person may include name, address, age, date of birth etc…\u003c/li\u003e\n\u003cli\u003ethe declaration of a new structure requires the struct keyword followed by a structure tag e.gperson_record is a new structure tag\u003c/li\u003e\n\u003cli\u003ethe element variables are declared within a code block, terminated by ;\u003c/li\u003e\n\u003cli\u003e/* person_record is a new structure*/\u003c/li\u003e\n\u003cli\u003estructperson_record\u003c/li\u003e\n\u003cli\u003e{\u003c/li\u003e\n\u003cli\u003echar name[50];\u003c/li\u003e\n\u003cli\u003echar address[4][50];\u003c/li\u003e\n\u003cli\u003eint age;\u003c/li\u003e\n\u003cli\u003efloat height;\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm11l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "What is a struct mainly used for in C?",
                                              "options":  [
                                                              "Loop control",
                                                              "Grouping related data fields",
                                                              "Automatic memory cleanup",
                                                              "Replacing arrays"
                                                          ],
                                              "correct":  1,
                                              "explanation":  "struct groups different fields under one type."
                                          },
                                          {
                                              "id":  "pptm11l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: Struct Record",
                                              "instructions":  "\u003cp\u003eCreate a struct variable and print one of its fields.\u003c/p\u003e\u003cpre\u003eName: Sam\u003c/pre\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nstruct Student {\n    char name[20];\n    int age;\n};\n\nint main() {\n    struct Student s = {\"Sam\", 20};\n    printf(\"Name: %s\\n\", s.name);\n    return 0;\n}",
                                              "expected_output":  "Name: Sam",
                                              "check_mode":  "exact",
                                              "hint":  "Use dot notation like s.name to access struct members.",
                                              "completion_message":  "Good. You created and accessed a structure."
                                          }
                                      ]
                        }
                    ]
    },
    {
        "id":  "pptm12",
        "title":  "Module 12: File Input and Output",
        "icon":  "12",
        "lessons":  [
                        {
                            "id":  "pptm12l1",
                            "title":  "File Input and Output",
                            "steps":  [
                                          {
                                              "id":  "pptm12l1s1",
                                              "type":  "content",
                                              "title":  "Overview Notes",
                                              "body":  "\u003ch2\u003eFile Input and Output: Overview\u003c/h2\u003e\n\u003cp\u003eThis reading page summarizes the main ideas from \u003ccode\u003e11. File Input and Output.pptx\u003c/code\u003e.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eComputer Programmingwith C\u003c/li\u003e\n\u003cli\u003eFile Input and Output\u003c/li\u003e\n\u003cli\u003eReview\u003c/li\u003e\n\u003cli\u003eObjectives\u003c/li\u003e\n\u003cli\u003eafter this section you should be able to:\u003c/li\u003e\n\u003cli\u003eunderstand how streams are used to control flow of data in and out of programs\u003c/li\u003e\n\u003cli\u003eopen text files for reading and writing\u003c/li\u003e\n\u003cli\u003eopen binary files for reading and writing\u003c/li\u003e\n\u003cli\u003euse functions fscanf, fprintf, fread, fwrite, fgetc, fputc, fgets, fputs to read and write from files\u003c/li\u003e\n\u003cli\u003eknow how to stop reading at the end of a file\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm12l1s2",
                                              "type":  "content",
                                              "title":  "Concept Summary",
                                              "body":  "\u003ch2\u003eFile Input and Output: Key Concepts\u003c/h2\u003e\n\u003cp\u003eUse these points to prepare for the quiz and coding task.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003einput and output streams\u003c/li\u003e\n\u003cli\u003ethere is a physical interface between the processor and the screen i.e. the primary output device\u003c/li\u003e\n\u003cli\u003ethere is a physical interface between the processor and the keyboard i.e. the primary input device\u003c/li\u003e\n\u003cli\u003ethe C compiler hides all the detail of the physical input/output interfaces from the user and C programs access the input and output devices via the streamsstdin and stdout\u003c/li\u003e\n\u003cli\u003estdout\u003c/li\u003e\n\u003cli\u003estdin\u003c/li\u003e\n\u003cli\u003ethere is a different physical interface between the processor and all types of input/output device e.g. to/from a hard disk, from a CD ROM or to/from the internet\u003c/li\u003e\n\u003cli\u003ethe C compiler hides all the detail of the physical input/output interfaces from the user\u003c/li\u003e\n\u003cli\u003eC programs access all devices and files via streams which operate similarly for every input/output device\u003c/li\u003e\n\u003cli\u003efilestream1\u003c/li\u003e\n\u003cli\u003efilestream2\u003c/li\u003e\n\u003cli\u003eFILE type\u003c/li\u003e\n\u003c/ul\u003e"
                                          },
                                          {
                                              "id":  "pptm12l1s3",
                                              "type":  "quiz",
                                              "title":  "Knowledge Check",
                                              "question":  "Which function is used to open a file in C?",
                                              "options":  [
                                                              "printf()",
                                                              "fopen()",
                                                              "scanf()",
                                                              "malloc()"
                                                          ],
                                              "correct":  1,
                                              "explanation":  "fopen() opens files with a chosen mode like r, w, or a."
                                          },
                                          {
                                              "id":  "pptm12l1s4",
                                              "type":  "code",
                                              "title":  "Code Lab: File API Plan",
                                              "instructions":  "\u003cp\u003ePrint the three key file-handling stages in order.\u003c/p\u003e\u003cpre\u003eOpen\\nRead/Write\\nClose\u003c/pre\u003e",
                                              "starter_code":  "#include \u003cstdio.h\u003e\n\nint main() {\n    printf(\"Open\\n\");\n    printf(\"Read/Write\\n\");\n    printf(\"Close\\n\");\n    return 0;\n}",
                                              "expected_output":  "Open\nRead/Write\nClose",
                                              "check_mode":  "exact",
                                              "hint":  "Use one printf line per stage.",
                                              "completion_message":  "Great. You mapped the core file I/O lifecycle."
                                          }
                                      ]
                        }
                    ]
    }
];

  if (typeof COURSE_DATA === "undefined") return;
  COURSE_DATA.title = "C Programming Course";
  COURSE_DATA.subtitle = "PPT-guided modules with reading, quiz, and coding practice";
  COURSE_DATA.modules = PPT_MODULES;
})();