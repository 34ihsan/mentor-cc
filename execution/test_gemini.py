# C:\Users\sinan\Desktop\projeler\New_Staredu\test_gemini.py
from gemini_coder_client import GeminiCoderClient

# 1. Client'ı oluştur (API key'ini buraya yaz)
client = GeminiCoderClient(api_key="your-actual-api-key-here")

# 2. Prompt'u hazırla
prompt = "Python'da bir fibonacci fonksiyonu yaz"

# 3. API'yi çağır
print("🚀 API çağrısı yapılıyor...")
result = client.generate(prompt)

# 4. Sonucu kontrol et
print("\n✅ API yanıtı alındı!")
print(f"Trajectory ID: {result.get('trajectory_id', 'yok')}")

# 5. İçeriği göster
if 'content' in result:
    content = result['content']
    if content.startswith('base64:'):
        # Base64 ile kodlanmışsa decode et
        import base64
        b64_data = content[7:]  # 'base64:' önekini kaldır
        decoded = base64.b64decode(b64_data).decode('utf-8', errors='replace')
        print("\n📄 İçerik (base64'den çözüldü):")
        print(decoded)
    else:
        # Normal içerik
        print("\n📄 İçerik:")
        print(content)

# 6. Varsa diğer alanları göster
for key, value in result.items():
    if key != 'content':
        print(f"\n{key}: {value}")