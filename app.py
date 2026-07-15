from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator

app = Flask(__name__)

# Supported Languages
LANGUAGES = {
    "en": "English",
    "hi": "Hindi",
    "te": "Telugu",
    "ta": "Tamil",
    "ml": "Malayalam",
    "kn": "Kannada",
    "fr": "French",
    "es": "Spanish",
    "de": "German",
    "it": "Italian",
    "ja": "Japanese",
    "ko": "Korean",
    "ru": "Russian",
    "zh-CN": "Chinese",
    "ar": "Arabic"
}


@app.route("/")
def home():
    return render_template("index.html", languages=LANGUAGES)


@app.route("/translate", methods=["POST"])
def translate():
    try:
        data = request.get_json()

        text = data.get("text", "").strip()
        source = data.get("source")
        target = data.get("target")

        if not text:
            return jsonify({"error": "Please enter some text."}), 400

        translated = GoogleTranslator(
            source=source,
            target=target
        ).translate(text)

        return jsonify({
            "translatedText": translated
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route("/languages")
def languages():
    return jsonify(LANGUAGES)


if __name__ == "__main__":
    app.run(debug=True, port=5001)