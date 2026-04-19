# gemini_coder_client.py
import requests
import base64
import logging
from typing import Any, Dict, Optional, Union

# Logging ayarları
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GeminiCoderClient:
    """Gemini Coder API istemcisi - otomatik temizleme özellikli"""
    
    def __init__(self, api_key: str, base_url: str = "https://api.gemini-coder.com"):
        self.api_key = api_key
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        })
    
    def _clean_text(self, text: str) -> str:
        """Metni UTF-8 için temizle"""
        if not isinstance(text, str):
            return str(text)
            
        try:
            # Test et
            text.encode('utf-8').decode('utf-8')
            return text
        except UnicodeError as e:
            # Logla
            logger.warning(f"⚠️ Bozuk UTF-8 tespit edildi (uzunluk: {len(text)})")
            logger.warning(f"   Hata: {e}")
            
            # Base64'e çevir
            b64 = base64.b64encode(text.encode('utf-8', errors='replace')).decode('ascii')
            return f"base64:{b64}"
    
    def _clean_response(self, data: Any) -> Any:
        """Response'u recursively temizle"""
        if isinstance(data, str):
            return self._clean_text(data)
        elif isinstance(data, dict):
            return {k: self._clean_response(v) for k, v in data.items()}
        elif isinstance(data, (list, tuple)):
            return [self._clean_response(item) for item in data]
        return data
    
    def generate(self, prompt: str, **kwargs) -> Dict[str, Any]:
        """Kod üret - otomatik temizlemeli"""
        
        # İsteği hazırla
        payload = {
            "prompt": prompt,
            **kwargs
        }
        
        try:
            # API çağrısı
            logger.info(f"API çağrısı yapılıyor... (prompt: {prompt[:50]}...)")
            response = self.session.post(
                f"{self.base_url}/generate",
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            
            # Yanıtı al
            raw_data = response.json()
            
            # Trajectory ID'yi al (varsa)
            trajectory_id = raw_data.get('trajectory_id', 'bilinmiyor')
            
            # TEMİZLE!
            clean_data = self._clean_response(raw_data)
            
            # Eğer temizleme yapıldıysa logla
            if clean_data != raw_data:
                logger.info(f"✅ Trajectory {trajectory_id}: Yanıt temizlendi")
            
            return clean_data
            
        except requests.exceptions.RequestException as e:
            logger.error(f"❌ API hatası: {e}")
            raise
        except Exception as e:
            logger.error(f"❌ Beklenmeyen hata: {e}")
            raise
    
    def generate_stream(self, prompt: str, **kwargs):
        """Stream yanıtı için - her chunk'ı temizle"""
        
        payload = {
            "prompt": prompt,
            "stream": True,
            **kwargs
        }
        
        try:
            with self.session.post(
                f"{self.base_url}/generate",
                json=payload,
                stream=True,
                timeout=30
            ) as response:
                response.raise_for_status()
                
                for line in response.iter_lines():
                    if line:
                        # Her satırı temizle
                        try:
                            chunk = line.decode('utf-8')
                            clean_chunk = self._clean_response(json.loads(chunk))
                            yield clean_chunk
                        except UnicodeError:
                            # Bozuk satırı base64 ile gönder
                            b64 = base64.b64encode(line).decode('ascii')
                            yield {"type": "binary", "data": f"base64:{b64}"}
                            
        except Exception as e:
            logger.error(f"❌ Stream hatası: {e}")
            raise

# Kullanımı kolaylaştırmak için fonksiyon
def create_gemini_client(api_key: str) -> GeminiCoderClient:
    """Gemini Coder client oluştur"""
    return GeminiCoderClient(api_key)