Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = Get-Location
$pptDir = Join-Path $root "PP content"
$outFile = Join-Path $root "assets/js/ppt-content.js"

function Escape-Html([string]$s) {
  if ($null -eq $s) { return "" }
  return $s.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace('"', "&quot;")
}

function Normalize-Key([string]$topic) {
  $k = $topic.ToLower()
  $k = [regex]::Replace($k, "[^a-z0-9 ]", " ")
  $k = [regex]::Replace($k, "\s+", " ").Trim()
  return $k
}

function Resolve-TemplateKey([string]$topic) {
  $k = Normalize-Key $topic
  if ($k -match "getting started") { return "getting started" }
  if ($k -match "basic input and output") { return "basic input and output" }
  if ($k -match "conditional statements") { return "conditional statements" }
  if ($k -match "^loops?$") { return "loops" }
  if ($k -match "software development methodology") { return "software development methodology" }
  if ($k -match "types and casting") { return "types and casting" }
  if ($k -match "^arrays?$") { return "arrays" }
  if ($k -match "^strings?$") { return "strings" }
  if ($k -match "^functions?$") { return "functions" }
  if ($k -match "^pointers?$") { return "pointers" }
  if ($k -match "^structures?$") { return "structures" }
  if ($k -match "file input and output") { return "file input and output" }
  return "generic"
}

function Get-PptLines([string]$filePath) {
  $zip = [System.IO.Compression.ZipFile]::OpenRead($filePath)
  try {
    $entries = $zip.Entries |
      Where-Object { $_.FullName -like "ppt/slides/slide*.xml" } |
      Sort-Object { [int]([regex]::Match($_.FullName, "slide(\d+)\.xml$").Groups[1].Value) }

    $collected = New-Object System.Collections.Generic.List[string]

    foreach ($entry in $entries) {
      $stream = $entry.Open()
      try {
        $sr = New-Object System.IO.StreamReader($stream)
        $xml = $sr.ReadToEnd()
        $sr.Dispose()
      } finally {
        $stream.Dispose()
      }

      $doc = New-Object System.Xml.XmlDocument
      $doc.LoadXml($xml)
      $nsmgr = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
      $nsmgr.AddNamespace("a", "http://schemas.openxmlformats.org/drawingml/2006/main")

      $paras = $doc.SelectNodes("//a:p", $nsmgr)
      foreach ($p in $paras) {
        $parts = $p.SelectNodes(".//a:t", $nsmgr)
        if (-not $parts -or $parts.Count -eq 0) { continue }

        $text = (($parts | ForEach-Object { $_.InnerText }) -join "")
        $text = [regex]::Replace($text, "\s+", " ").Trim()

        if ([string]::IsNullOrWhiteSpace($text)) { continue }
        if ($text -match "^\d+$") { continue }

        if ($collected.Count -eq 0 -or $collected[$collected.Count - 1] -ne $text) {
          $collected.Add($text)
        }
      }
    }

    $seen = @{}
    $result = New-Object System.Collections.Generic.List[string]
    foreach ($line in $collected) {
      $key = $line.ToLower()
      if (-not $seen.ContainsKey($key)) {
        $seen[$key] = $true
        $result.Add($line)
      }
    }

    return ,$result.ToArray()
  } finally {
    $zip.Dispose()
  }
}

$quizTemplates = @{
  "getting started" = @{
    question = "Which function is the entry point of a C program?"
    options = @("printf()", "main()", "#include", "return")
    correct = 1
    explanation = "Program execution begins in main()."
  }
  "basic input and output" = @{
    question = "Which function is most commonly used to display text in C?"
    options = @("scanf()", "printf()", "puts()", "main()")
    correct = 1
    explanation = "printf() prints formatted output to the console."
  }
  "conditional statements" = @{
    question = "Which keyword chain is used for multiple decision branches in C?"
    options = @("for / while", "if / else if / else", "switch / for", "do / return")
    correct = 1
    explanation = "if / else if / else handles ordered branching conditions."
  }
  "loops" = @{
    question = "Which loop is best when you know the number of iterations in advance?"
    options = @("while", "do-while", "for", "if")
    correct = 2
    explanation = "for loops are ideal for counted repetition."
  }
  "software development methodology" = @{
    question = "What usually comes before writing code in a structured workflow?"
    options = @("Deploy to users", "Define the problem and plan the solution", "Delete test data", "Skip directly to debugging")
    correct = 1
    explanation = "Good methodology starts with requirements, planning, and design."
  }
  "types and casting" = @{
    question = "What does an explicit cast like (int)x do?"
    options = @("Declares a new variable", "Converts x to int for that expression", "Prints x as int", "Rounds x in memory permanently")
    correct = 1
    explanation = "A cast converts a value type for the current expression."
  }
  "arrays" = @{
    question = "How are array elements indexed in C?"
    options = @("From 1", "From -1", "From 0", "From the array size")
    correct = 2
    explanation = "C arrays use zero-based indexing."
  }
  "strings" = @{
    question = "In C, what marks the end of a string in a char array?"
    options = @("A period", "A null terminator \0", "A newline", "A space")
    correct = 1
    explanation = "C strings end with the null character \0."
  }
  "functions" = @{
    question = "Why do we use functions in C programs?"
    options = @("To avoid variables", "To repeat code manually", "To organize reusable logic", "To replace main()")
    correct = 2
    explanation = "Functions improve reuse, readability, and maintainability."
  }
  "pointers" = @{
    question = "What does the & operator return in C?"
    options = @("The value stored in a pointer", "The address of a variable", "A boolean result only", "The size of a variable")
    correct = 1
    explanation = "& gives the memory address of a variable."
  }
  "structures" = @{
    question = "What is a struct mainly used for in C?"
    options = @("Loop control", "Grouping related data fields", "Automatic memory cleanup", "Replacing arrays")
    correct = 1
    explanation = "struct groups different fields under one type."
  }
  "file input and output" = @{
    question = "Which function is used to open a file in C?"
    options = @("printf()", "fopen()", "scanf()", "malloc()")
    correct = 1
    explanation = "fopen() opens files with a chosen mode like r, w, or a."
  }
  "generic" = @{
    question = "What is the best way to improve programming skill?"
    options = @("Read slides only", "Practice writing and testing code", "Memorize keywords only", "Skip debugging")
    correct = 1
    explanation = "Programming skill improves through deliberate practice and debugging."
  }
}

$codeTemplates = @{
  "getting started" = @{
    title = "Code Lab: First Program"
    instructions = "<p>Write and run a minimal C program that prints <code>Hello, World!</code>.</p>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    printf(`"Hello, World!\n`");`n    return 0;`n}"
    expected_output = "Hello, World!"
    check_mode = "contains"
    hint = "Use printf(`"Hello, World!\n`"); inside main()."
    completion_message = "Great. You compiled and ran your first C program."
  }
  "basic input and output" = @{
    title = "Code Lab: Formatted Output"
    instructions = "<p>Print a name and a score on separate lines using <code>printf</code>.</p><pre>Name: Alex\nScore: 42</pre>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    char name[] = `"Alex`";`n    int score = 42;`n`n    printf(`"Name: %s\n`", name);`n    printf(`"Score: %d\n`", score);`n    return 0;`n}"
    expected_output = "Name: Alex`nScore: 42"
    check_mode = "exact"
    hint = "Use %s for strings and %d for integers."
    completion_message = "Nice. You used formatted output with placeholders."
  }
  "conditional statements" = @{
    title = "Code Lab: Pass or Fail"
    instructions = "<p>Use an <code>if/else</code> block to print <code>Pass</code> when score is 50 or above.</p>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    int score = 68;`n`n    if (score >= 50) {`n        printf(`"Pass\n`");`n    } else {`n        printf(`"Fail\n`");`n    }`n    return 0;`n}"
    expected_output = "Pass"
    check_mode = "exact"
    hint = "Check score >= 50 in the condition."
    completion_message = "Good. Your branch logic works correctly."
  }
  "loops" = @{
    title = "Code Lab: Counting Loop"
    instructions = "<p>Use a <code>for</code> loop to print numbers 1 to 5, one per line.</p>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    for (int i = 1; i <= 5; i++) {`n        printf(`"%d\n`", i);`n    }`n    return 0;`n}"
    expected_output = "1`n2`n3`n4`n5"
    check_mode = "exact"
    hint = "Start i at 1 and continue while i <= 5."
    completion_message = "Nice. Your loop produced the expected sequence."
  }
  "software development methodology" = @{
    title = "Code Lab: Workflow Trace"
    instructions = "<p>Print the core software workflow stages in order.</p><pre>Plan\nDesign\nCode\nTest</pre>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    printf(`"Plan\n`");`n    printf(`"Design\n`");`n    printf(`"Code\n`");`n    printf(`"Test\n`");`n    return 0;`n}"
    expected_output = "Plan`nDesign`nCode`nTest"
    check_mode = "exact"
    hint = "Use one printf per stage."
    completion_message = "Great. You modelled a simple development flow."
  }
  "types and casting" = @{
    title = "Code Lab: Type Casting"
    instructions = "<p>Cast a decimal value to <code>int</code> and print both values.</p><pre>Original: 9.75\nCasted: 9</pre>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    float value = 9.75f;`n    int whole = (int)value;`n`n    printf(`"Original: %.2f\n`", value);`n    printf(`"Casted: %d\n`", whole);`n    return 0;`n}"
    expected_output = "Original: 9.75`nCasted: 9"
    check_mode = "exact"
    hint = "Use (int)value to truncate the decimal part."
    completion_message = "Good. You applied explicit casting correctly."
  }
  "arrays" = @{
    title = "Code Lab: Array Sum"
    instructions = "<p>Sum the values in an integer array and print the result.</p><pre>Sum = 30</pre>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    int nums[5] = {2, 4, 6, 8, 10};`n    int sum = 0;`n`n    for (int i = 0; i < 5; i++) {`n        sum += nums[i];`n    }`n`n    printf(`"Sum = %d\n`", sum);`n    return 0;`n}"
    expected_output = "Sum = 30"
    check_mode = "exact"
    hint = "Accumulate each element with sum += nums[i]."
    completion_message = "Nice. You iterated through an array and computed a total."
  }
  "strings" = @{
    title = "Code Lab: String Output"
    instructions = "<p>Store text in a character array and print it.</p><pre>Message: C is fun</pre>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    char message[] = `"C is fun`";`n    printf(`"Message: %s\n`", message);`n    return 0;`n}"
    expected_output = "Message: C is fun"
    check_mode = "exact"
    hint = "Use %s with printf for a C string."
    completion_message = "Good. You printed a string from a char array."
  }
  "functions" = @{
    title = "Code Lab: Simple Function"
    instructions = "<p>Create and call a function that returns the sum of two integers.</p><pre>Result = 12</pre>"
    starter_code = "#include <stdio.h>`n`nint add(int a, int b) {`n    return a + b;`n}`n`nint main() {`n    int result = add(5, 7);`n    printf(`"Result = %d\n`", result);`n    return 0;`n}"
    expected_output = "Result = 12"
    check_mode = "exact"
    hint = "Define add() before main() or provide a prototype."
    completion_message = "Great. You defined and called a reusable function."
  }
  "pointers" = @{
    title = "Code Lab: Pointer Basics"
    instructions = "<p>Create a pointer to an integer and print the value through the pointer.</p><pre>Value = 25</pre>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    int value = 25;`n    int *ptr = &value;`n`n    printf(`"Value = %d\n`", *ptr);`n    return 0;`n}"
    expected_output = "Value = 25"
    check_mode = "exact"
    hint = "*ptr accesses the value stored at the address in ptr."
    completion_message = "Nice. You used & and * to work with pointers."
  }
  "structures" = @{
    title = "Code Lab: Struct Record"
    instructions = "<p>Create a struct variable and print one of its fields.</p><pre>Name: Sam</pre>"
    starter_code = "#include <stdio.h>`n`nstruct Student {`n    char name[20];`n    int age;`n};`n`nint main() {`n    struct Student s = {`"Sam`", 20};`n    printf(`"Name: %s\n`", s.name);`n    return 0;`n}"
    expected_output = "Name: Sam"
    check_mode = "exact"
    hint = "Use dot notation like s.name to access struct members."
    completion_message = "Good. You created and accessed a structure."
  }
  "file input and output" = @{
    title = "Code Lab: File API Plan"
    instructions = "<p>Print the three key file-handling stages in order.</p><pre>Open\nRead/Write\nClose</pre>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    printf(`"Open\n`");`n    printf(`"Read/Write\n`");`n    printf(`"Close\n`");`n    return 0;`n}"
    expected_output = "Open`nRead/Write`nClose"
    check_mode = "exact"
    hint = "Use one printf line per stage."
    completion_message = "Great. You mapped the core file I/O lifecycle."
  }
  "generic" = @{
    title = "Code Lab: Basic Output"
    instructions = "<p>Print one line of output from main().</p>"
    starter_code = "#include <stdio.h>`n`nint main() {`n    printf(`"Practice complete\n`");`n    return 0;`n}"
    expected_output = "Practice complete"
    check_mode = "exact"
    hint = "Use printf inside main()."
    completion_message = "Step completed."
  }
}

$files = Get-ChildItem -Path $pptDir -Filter *.pptx |
  Sort-Object @{ Expression = { if ($_.BaseName -match "^\s*(\d+)") { [int]$matches[1] } else { 999 } } }, Name

$modules = @()
$moduleIndex = 0

foreach ($file in $files) {
  $moduleIndex++

  $topic = [regex]::Replace($file.BaseName, "^\s*\d+\.\s*", "").Trim()
  if ([string]::IsNullOrWhiteSpace($topic)) {
    $topic = $file.BaseName
  }

  $templateKey = Resolve-TemplateKey $topic
  $quiz = $quizTemplates[$templateKey]
  if (-not $quiz) { $quiz = $quizTemplates["generic"] }

  $code = $codeTemplates[$templateKey]
  if (-not $code) { $code = $codeTemplates["generic"] }

  $lines = Get-PptLines $file.FullName
  if (-not $lines -or $lines.Count -eq 0) {
    $lines = @("Slide text could not be extracted for this presentation.")
  }

  $overview = @($lines | Select-Object -First 10)
  $keypoints = @($lines | Select-Object -Skip 10 -First 12)

  if ($keypoints.Count -lt 6) {
    $keypoints = @($lines | Select-Object -Skip 4 -First 12)
  }
  if ($keypoints.Count -eq 0) {
    $keypoints = @($overview)
  }

  $overviewItems = ($overview | ForEach-Object { "<li>$((Escape-Html $_))</li>" }) -join "`n"
  $keypointItems = ($keypoints | ForEach-Object { "<li>$((Escape-Html $_))</li>" }) -join "`n"

  $body1 = "<h2>$(Escape-Html $topic): Overview</h2>`n<p>This reading page summarizes the main ideas from <code>$(Escape-Html $file.Name)</code>.</p>`n<ul>`n$overviewItems`n</ul>"
  $body2 = "<h2>$(Escape-Html $topic): Key Concepts</h2>`n<p>Use these points to prepare for the quiz and coding task.</p>`n<ul>`n$keypointItems`n</ul>"

  $mid = "pptm$moduleIndex"
  $lid = "${mid}l1"

  $steps = @(
    [ordered]@{
      id = "${lid}s1"
      type = "content"
      title = "Overview Notes"
      body = $body1
    },
    [ordered]@{
      id = "${lid}s2"
      type = "content"
      title = "Concept Summary"
      body = $body2
    },
    [ordered]@{
      id = "${lid}s3"
      type = "quiz"
      title = "Knowledge Check"
      question = $quiz.question
      options = $quiz.options
      correct = [int]$quiz.correct
      explanation = $quiz.explanation
    },
    [ordered]@{
      id = "${lid}s4"
      type = "code"
      title = $code.title
      instructions = $code.instructions
      starter_code = $code.starter_code
      expected_output = $code.expected_output
      check_mode = $code.check_mode
      hint = $code.hint
      completion_message = $code.completion_message
    }
  )

  $module = [ordered]@{
    id = $mid
    title = "Module ${moduleIndex}: $topic"
    icon = "$moduleIndex"
    lessons = @(
      [ordered]@{
        id = $lid
        title = $topic
        steps = $steps
      }
    )
  }

  $modules += [PSCustomObject]$module
}

$json = $modules | ConvertTo-Json -Depth 12

$js = @"
/**
 * ppt-content.js
 * Generated from PPT files in PP content.
 * Each PPT file is one module with reading, quiz, and coding steps.
 */

(() => {
  const PPT_MODULES = $json;

  if (typeof COURSE_DATA === "undefined") return;
  COURSE_DATA.title = "C Programming Course";
  COURSE_DATA.subtitle = "PPT-guided modules with reading, quiz, and coding practice";
  COURSE_DATA.modules = PPT_MODULES;
})();
"@

[System.IO.File]::WriteAllText($outFile, $js, [System.Text.UTF8Encoding]::new($false))
Write-Output $outFile
