document.addEventListener("DOMContentLoaded", function() {
    var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
        mode: "markdown",
        lineNumbers: true,
        theme: "default"
    });

    function updatePreview() {
        var preview = document.getElementById("preview");
        var markdownText = editor.getValue();
        preview.innerHTML = marked.parse(markdownText);
        updateStatus();
    }

    editor.on("change", updatePreview);

    window.insertText = function(startTag, endTag) {
        var doc = editor.getDoc();
        var cursor = doc.getCursor();
        var selectedText = doc.getSelection();
        doc.replaceSelection(startTag + selectedText + endTag);
    };

    window.insertHeading = function() {
        insertText("#", "");
    };

    window.insertQuote = function() {
        insertText("> ", "");
    };

    window.insertList = function(type) {
        if (type === 'unordered') {
            insertText("- ", "");
        } else {
            insertText("1. ", "");
        }
    };

    window.insertLink = function() {
        insertText("[", "](https://)");
    };

    window.insertImage = function() {
        insertText("![", "](https://)");
    };

    window.insertEmbedVideo = function() {
        insertText('<a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE" target="_blank"><img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg" alt="IMAGE ALT TEXT HERE" width="1920" height="540" border="10" /></a>', '');
    };

    window.insertCode = function() {
        insertText("```\n", "\n```");
    };

    window.insertTable = function() {
        var tableMarkdown = "\n|  Header 1   |  Header 2   |\n| ----------- | ----------- |\n| Row 1 Col 1 | Row 1 Col 2 |\n| Row 2 Col 1 | Row 2 Col 2 |\n";
        insertText(tableMarkdown, "");
    };

    window.insertHorizontalRule = function() {
        insertText("---\n", "");
    };

    window.insertFontAwesome = function() {
        insertText('<i class="fa-brands fa-markdown"></i>', '');
    };

    window.insertBoxed = function() {
        insertText('<table><td>Text Here</td></table>', '');
    };

    window.insertSup = function() {
        insertText('1<sup>2</sup>', '');
    };

    window.insertMaterialIcon = function() {
        insertText('<i class="material-icons">description</i>', '');
    };

    window.clearEditor = function() {
        editor.setValue("");
    };

    window.downloadMd = function() {
        var markdownText = editor.getValue();
        downloadFile("output.md", markdownText);
    };

    window.downloadHtml = function() {
        var markdownText = editor.getValue();
        var htmlText = marked.parse(markdownText);
        downloadFile("output.html", htmlText);
    };

    function downloadFile(filename, content) {
        var blob = new Blob([content], { type: 'text/plain' });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    window.toggleFullScreen = function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };
});

document.getElementById('githubButton').addEventListener('click', function() {
    window.open('https://github.com/ufuayk', '_blank');
});
