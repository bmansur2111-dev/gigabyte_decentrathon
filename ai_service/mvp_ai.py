import google.generativeai as genai

# Твой API ключ (получи его в Google AI Studio)
genai.configure(api_key="ТВОЙ_КЛЮЧ")
model = genai.GenerativeModel('gemini-1.5-flash')

def analyze_candidate(essay_text):
    prompt = f"""
    Ты — эксперт приемной комиссии университета inVision U. 
    Оцени кандидата по его эссе по следующим критериям (0-10):
    1. Лидерский потенциал
    2. Опыт и навыки
    3. Мотивация
    
    Текст эссе: {essay_text}
    
    Верни ответ в формате JSON:
    {{
      "scores": {{"leadership": 0, "skills": 0, "motivation": 0}},
      "summary": "Краткое объяснение оценки (Explainable AI)",
      "verdict": "Рекомендовать / Сомневаюсь / Отклонить"
    }}
    """
    
    response = model.generate_content(prompt)
    return response.text

# Пример теста
# print(analyze_candidate("Я организовал турнир по робототехнике в Кокшетау..."))