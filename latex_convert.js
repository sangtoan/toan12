function replaceShortansNumber(content) {
  // Biểu thức chính quy để tìm shortans{$số$} và thay thế bằng shortans{số}
  const regex = /\\shortans\{\$([0-9]+)\$\}/g;
  return content.replace(regex, '\\shortans{$1}');
}

function layCacNgoacLon(text) {
  let ngoacLon = [];
  let demNgoac = 0;
  let batDau = null;

  for (let i = 0; i < text.length; i++) {
      let kyTu = text[i];
      if (kyTu === "{") {
          if (demNgoac === 0) {
              batDau = i;
          }
          demNgoac += 1;
      } else if (kyTu === "}") {
          demNgoac -= 1;
          if (demNgoac === 0 && batDau !== null) {
              let ketThuc = i;
              ngoacLon.push([batDau, ketThuc]);
              batDau = null;
          }
      }
  }

  return ngoacLon;
}

function renderLatexInElement(element) {
  let exampleCount = 1;
  let dangCount = 1;
  let dnCount = 1;
  let dlCount = 1;
  let tcCount = 1;
  let noteCount = 1;

  function replaceLoigiai(content) {
      const regex = /\\loigiai\s*\{/g;

      let result = '';
      let lastIndex = 0;

      content.replace(regex, (match, offset, string) => {
          let startIndex = offset + match.length - 1; // Vị trí ngay sau dấu ngoặc mở
          let remainingString = string.slice(startIndex);
          let braces = layCacNgoacLon(remainingString);

          if (braces.length > 0) {
              let [batDau, ketThuc] = braces[0];
              let contentInside = remainingString.slice(batDau + 1, ketThuc);
              let transformedContent = `\\begin{lg}${contentInside}\\end{lg}`;

              // Append phần trước match, transformedContent, và cập nhật lastIndex
              result += content.slice(lastIndex, startIndex + batDau + 1) + transformedContent;
              lastIndex = startIndex + ketThuc + 1;
          }
          return match; // Không tìm thấy dấu ngoặc đóng hợp lệ
      });

      // Append phần còn lại của chuỗi nếu có
      result += content.slice(lastIndex);
      return result;
  }

  function replaceChoice(content) {
      const regex = /\\choice\s*\{/g;

      let result = '';
      let lastIndex = 0;

      content.replace(regex, (match, offset, string) => {
          let startIndex = offset + match.length - 1; // Vị trí ngay sau dấu ngoặc mở
          let remainingString = string.slice(startIndex);
          let braces = layCacNgoacLon(remainingString);

          if (braces.length >= 4) {
              let choices = braces.slice(0, 4).map(pair => remainingString.slice(pair[0] + 1, pair[1]));
              let labels = ['A', 'B', 'C', 'D'];
              let transformedChoices = '<div class="choices">' + choices.map((choice, index) => {
                  const isCorrect = choice.includes('\\True');
                  choice = choice.replace('\\True', '');
                  return `<div class="choice"><input type="radio" name="choice${exampleCount - 1}" value="${isCorrect}"> ${labels[index]}. ${choice}</div>`;
              }).join('') + '</div><div class="result"></div>';

              // Append phần trước match, transformedChoices, và cập nhật lastIndex
              result += content.slice(lastIndex, startIndex + braces[0][0] + 1) + transformedChoices;
              lastIndex = startIndex + braces[3][1] + 1;
          }
          return match; // Không tìm thấy đủ cặp dấu ngoặc
      });

      // Append phần còn lại của chuỗi nếu có
      result += content.slice(lastIndex);
      return result;
  }

  function replaceChoiceTF(content) {
      const regex = /\\choiceTF\s*\{/g;

      let result = '';
      let lastIndex = 0;

      content.replace(regex, (match, offset, string) => {
          let startIndex = offset + match.length - 1; // Vị trí ngay sau dấu ngoặc mở
          let remainingString = string.slice(startIndex);
          let braces = layCacNgoacLon(remainingString);

          if (braces.length >= 4) {
              let choices = braces.slice(0, 4).map(pair => remainingString.slice(pair[0] + 1, pair[1]));
              let labels = ['A', 'B', 'C', 'D'];
              let transformedChoices = '<div class="truefalse">' + choices.map((choice, index) => {
                  const isCorrect = choice.includes('\\True');
                  choice = choice.replace('\\True', '');
                  return `<div class="choice"><input type="radio" name="truefalse${exampleCount - 1}" value="${isCorrect}"> ${labels[index]}. ${choice}</div>`;
              }).join('') + '</div><div class="result"></div>';

              // Append phần trước match, transformedChoices, và cập nhật lastIndex
              result += content.slice(lastIndex, startIndex + braces[0][0] + 1) + transformedChoices;
              lastIndex = startIndex + braces[3][1] + 1;
          }
          return match; // Không tìm thấy đủ cặp dấu ngoặc
      });

      // Append phần còn lại của chuỗi nếu có
      result += content.slice(lastIndex);
      return result;
  }

  function replaceChoiceTFt(content) {
      const regex = /\\choiceTFt\s*\{/g;

      let result = '';
      let lastIndex = 0;

      content.replace(regex, (match, offset, string) => {
          let startIndex = offset + match.length - 1; // Vị trí ngay sau dấu ngoặc mở
          let remainingString = string.slice(startIndex);
          let braces = layCacNgoacLon(remainingString);

          if (braces.length >= 4) {
              let choices = braces.slice(0, 4).map(pair => remainingString.slice(pair[0] + 1, pair[1]));
              let labels = ['A', 'B', 'C', 'D'];
              let transformedChoices = '<div class="truefalse">' + choices.map((choice, index) => {
                  const isCorrect = choice.includes('\\True');
                  choice = choice.replace('\\True', '');
                  return `<div class="choice"><input type="radio" name="truefalset${exampleCount - 1}" value="${isCorrect}"> ${labels[index]}. ${choice}</div>`;
              }).join('') + '</div><div class="result"></div>';

              // Append phần trước match, transformedChoices, và cập nhật lastIndex
              result += content.slice(lastIndex, startIndex + braces[0][0] + 1) + transformedChoices;
              lastIndex = startIndex + braces[3][1] + 1;
          }
          return match; // Không tìm thấy đủ cặp dấu ngoặc
      });

      // Append phần còn lại của chuỗi nếu có
      result += content.slice(lastIndex);
      return result;
  }

  function replaceShortans(content) {
      content = replaceShortansNumber(content);
      const regex = /\\shortans\s*\{/g;

      let result = '';
      let lastIndex = 0;

      content.replace(regex, (match, offset, string) => {
          let startIndex = offset + match.length - 1; // Vị trí ngay sau dấu ngoặc mở
          let remainingString = string.slice(startIndex);
          let braces = layCacNgoacLon(remainingString);

          if (braces.length > 0) {
              let [batDau, ketThuc] = braces[0];
              let answer = remainingString.slice(batDau + 1, ketThuc).trim();
              let transformedAnswer = `<div class="shortans"><input type="text" name="fillblank${exampleCount - 1}" data-answer="${answer}"><div class="result"></div></div>`;

              // Append phần trước match, transformedAnswer, và cập nhật lastIndex
              result += content.slice(lastIndex, startIndex + batDau + 1) + transformedAnswer;
              lastIndex = startIndex + ketThuc + 1;
          }
          return match; // Không tìm thấy đủ cặp dấu ngoặc
      });

      // Append phần còn lại của chuỗi nếu có
      result += content.slice(lastIndex);
      return result;
  }

  function convertLatexToHTML(content) {
      // Convert sections
      content = content.replace(/\\section{([^}]+)}/g, '<h1>$1</h1>');
      content = content.replace(/\\subsection{([^}]+)}/g, '<h2>$1</h2>');
      content = content.replace(/\\subsubsection{([^}]+)}/g, '<h3>$1</h3>');
      content = content.replace(/\\paragraph{([^}]+)}/g, '<h4>$1</h4>');
      content = content.replace(/\\loigiai\s*\{/g, '');
      content = content.replace(/\\choice\s*\{/g, '');
      content = content.replace(/\\choiceTF\s*\{/g, '');
      content = content.replace(/\\choiceTFt\s*\{/g, '');
      content = content.replace(/\\vec\s*\{/g, '\\\overrightarrow{');
      content = content.replace(/\\shortans{/g, '');

      // Convert itemize
      content = content.replace(/\\begin{itemize}/g, '<ul>');
      content = content.replace(/\\end{itemize}/g, '</ul>');
      content = content.replace(/\\item\s+/g, '<li>');

      // Convert enumerate
      content = content.replace(/\\begin{enumerate}/g, '<ol>');
      content = content.replace(/\\end{enumerate}/g, '</ol>');
      content = content.replace(/\\item\s+/g, '<li>');

      // Convert display math $$...$$ to \[...\]
      content = content.replace(/\$\$([\s\S]+?)\$\$/g, '\\[$1\\]');

      // Convert inline math $...$ to \(...\)
      content = content.replace(/(?<!\$)\$([^\$]+?)\$(?!\$)/g, '\\($1\\)');

      // Convert example block
      content = content.replace(/\\begin{ex}/g, '<div class="example"><strong class="question">Câu ' + (exampleCount++) + ':</strong>');
      content = content.replace(/\\end{ex}/g, '</div>');

      // Convert dang block
      content = content.replace(/\\begin{dang}\[([^}]+)\]/g, '<div class="dang"><strong>Dạng ' + (dangCount++) + ': $1</strong><br>');
      content = content.replace(/\\begin{dang}/g, '<div class="dang"><strong>Dạng ' + (dangCount++) + ':</strong><br>');
      content = content.replace(/\\end{dang}/g, '</div>');

      // Convert dn block
      content = content.replace(/\\begin{dn}\[([^}]+)\]/g, '<div class="dn"><strong>Định nghĩa ' + (dnCount++) + ': $1</strong><br>');
      content = content.replace(/\\begin{dn}/g, '<div class="dn"><strong>Định nghĩa ' + (dnCount++) + ':</strong><br>');
      content = content.replace(/\\end{dn}/g, '</div>');

      // Convert dl block
      content = content.replace(/\\begin{dl}\[([^}]+)\]/g, '<div class="dl"><strong>Định lý ' + (dlCount++) + ': $1</strong><br>');
      content = content.replace(/\\begin{dl}/g, '<div class="dl"><strong>Định lý ' + (dlCount++) + ':</strong><br>');
      content = content.replace(/\\end{dl}/g, '</div>');

      // Convert tc block
      content = content.replace(/\\begin{tc}\[([^}]+)\]/g, '<div class="tc"><strong>Tính chất ' + (tcCount++) + ': $1</strong><br>');
      content = content.replace(/\\begin{tc}/g, '<div class="tc"><strong>Tính chất ' + (tcCount++) + ':</strong><br>');
      content = content.replace(/\\end{tc}/g, '</div>');

      // Convert note block
      content = content.replace(/\\begin{note}\[([^}]+)\]/g, '<div class="note"><strong>Chú ý ' + (noteCount++) + ': $1</strong><br>');
      content = content.replace(/\\begin{note}/g, '<div class="note"><strong>Chú ý ' + (noteCount++) + ':</strong><br>');
      content = content.replace(/\\end{note}/g, '</div>');

      // Convert lg block with toggle button
      content = content.replace(/\\begin{lg}([\s\S]+?)\\end{lg}/g, function(match, p1) {
          return '<div class="solution"><button onclick="toggleSolution(this)">Hiện lời giải</button><div class="solution-content" style="display: none;">' + p1 + '</div></div>';
      });

      // Convert line breaks \\ to <br>
      content = content.replace(/\\\\/g, '<br>');

      return content;
  }

  // Toggle solution visibility
  window.toggleSolution = function(button) {
      var solutionContent = button.nextElementSibling;
      if (solutionContent.style.display === "none" || solutionContent.style.display === "") {
          solutionContent.style.display = "block";
          button.textContent = "Ẩn lời giải";
      } else {
          solutionContent.style.display = "none";
          button.textContent = "Hiện lời giải";
      }
  };

  // Check if the selected answer is correct
  document.addEventListener('change', function(event) {
      if (event.target.name.startsWith('choice') || event.target.name.startsWith('truefalse') || event.target.name.startsWith('truefalset')) {
          const choices = event.target.closest('.choices, .truefalse');
          const result = choices.nextElementSibling;
          if (event.target.value === "true") {
              result.textContent = "Bạn đã chọn đúng!";
              result.style.display = "block";
              result.style.backgroundColor = "#e0ffe0";
              result.style.borderColor = "#00aa00";
          } else {
              result.textContent = "Bạn đã chọn sai!";
              result.style.display = "block";
              result.style.backgroundColor = "#ffe0e0";
              result.style.borderColor = "#aa0000";
          }
      }
  });

  // Check fill-in-the-blank answers
  document.addEventListener('blur', function(event) {
      if (event.target.name.startsWith('fillblank')) {
          const answer = event.target.getAttribute('data-answer');
          const result = event.target.nextElementSibling;
          if (parseFloat(event.target.value.trim()) === parseFloat(answer)) {
              result.textContent = "Bạn đã điền đúng!";
              result.style.display = "block";
              result.style.backgroundColor = "#e0ffe0";
              result.style.borderColor = "#00aa00";
          } else {
              result.textContent = "Bạn đã điền sai!";
              result.style.display = "block";
              result.style.backgroundColor = "#ffe0e0";
              result.style.borderColor = "#aa0000";
          }
      }
  }, true);

  // Replace \loigiai{...}, \choice{...}{...}{...}{...}, \choiceTF{...}{...}{...}{...}, \choiceTFt{...}{...}{...}{...}, and \shortans{...}
  let content = element.innerHTML;
  content = replaceLoigiai(content);
  content = replaceChoice(content);
  content = replaceChoiceTF(content);
  content = replaceChoiceTFt(content);
  content = replaceShortans(content);
  content = convertLatexToHTML(content);
  element.innerHTML = content;

  // Render math
  renderMathInElement(element, {
      delimiters: [
          {left: "\\(", right: "\\)", display: false},
          {left: "\\[", right: "\\]", display: true},
      ]
  });
}
