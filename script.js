async function translateText() {
    const text = document.getElementById("inputText").value.trim();
    const source = document.getElementById("sourceLanguage").value;
    const target = document.getElementById("targetLanguage").value;
    const output = document.getElementById("outputText");

    if (text === "") {
        alert("Please enter some text.");
        return;
    }

    output.value = "Translating...";

    try {
        const response = await fetch("/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                source: source,
                target: target
            })
        });

        const data = await response.json();

        if (response.ok) {
            output.value = data.translatedText;
        } else {
            output.value = data.error || "Translation failed.";
        }

    } catch (error) {
        output.value = "Unable to connect to the server.";
        console.error(error);
    }
}

function copyText() {
    const output = document.getElementById("outputText");

    if (output.value.trim() === "") {
        alert("Nothing to copy.");
        return;
    }

    navigator.clipboard.writeText(output.value)
        .then(() => {
            alert("Translated text copied!");
        })
        .catch(() => {
            alert("Copy failed.");
        });
}

function speakText() {
    const text = document.getElementById("outputText").value;

    if (text.trim() === "") {
        alert("Nothing to speak.");
        return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(utterance);
}