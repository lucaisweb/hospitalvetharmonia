"""
Gera imagens para especialidades veterinárias via Gemini API.
Salva em src/assets/specialties/
"""
import os, sys, base64

GOOGLE_API_KEY = "AIzaSyCtjnJVOwrami_NF7AxHSv4SUNSMXdjZtI"

specialties = [
    {
        "key": "clinica-geral",
        "prompt": "Professional veterinary consultation, a skilled veterinarian in white lab coat performing a careful physical examination on a golden retriever dog lying on a stainless steel examination table in a modern, well-lit veterinary clinic. Clean clinical environment, medical equipment visible in background, natural window light from the left casting soft shadows. Shot on Sony A7IV, 50mm f/2.8, ISO 320. Sharp focus on the vet's hands and the dog's face. Photojournalism style, real clinical atmosphere. Do not stylize. No plastic look.",
        "negative_prompt": "illustration, cartoon, CGI, 3D render, beauty filters, stock photo look, fake smile, artificial lighting, oversaturated colors"
    },
    {
        "key": "cirurgia",
        "prompt": "Veterinary surgery in progress, a team of two veterinary surgeons in full surgical scrubs, masks, gloves and surgical caps operating on a small dog under bright surgical lights. State-of-the-art operating room, anesthesia machine visible, sterile blue drapes, surgical instruments on tray. Shot on Canon EOS R5, 35mm f/2.8, ISO 400. Dramatic overhead surgical lighting creating focused bright center. Documentary photography style, serious and professional atmosphere. Do not beautify.",
        "negative_prompt": "illustration, cartoon, CGI, blood visible, gore, stock photo, fake, oversaturated, beauty filter, plastic look"
    },
    {
        "key": "internacao-uti",
        "prompt": "Veterinary ICU ward, a nurse carefully monitoring a resting labrador retriever inside a modern intensive care unit cage with IV drip attached, vital signs monitor showing green waveforms, oxygen tubes, clean medical-grade stainless steel cages in background. Soft ambient LED lighting, blue and white clinical environment. Shot on Nikon Z6, 35mm f/2.0, ISO 500. Calm, professional documentary photography. No cartoon.",
        "negative_prompt": "illustration, cartoon, CGI, stock photo, oversaturated, fake, plastic look, beauty filter"
    },
    {
        "key": "vacinacao",
        "prompt": "Close-up of a veterinarian's gloved hands carefully administering a vaccine injection to a young orange tabby cat being held gently on an examination table. Blurred veterinary clinic background with shelves of medicine. Soft natural lighting from a window, medical syringe in sharp focus, cat's fur texture clearly visible. Shot on Canon 85mm f/1.8, ISO 250, shallow depth of field. Candid, professional documentary. Do not over-edit.",
        "negative_prompt": "illustration, cartoon, CGI, stock photo, oversaturated, fake, plastic look, beauty filter, blood"
    },
    {
        "key": "diagnostico-imagem",
        "prompt": "Veterinary radiologist examining a detailed X-ray scan of a dog's chest on a bright illuminated lightbox in a dark radiology room. Doctor in white coat pointing at the scan with concentration, modern CT scanner machine visible in background. Blue-tinted diagnostic lighting, professional clinical environment. Shot on Sony A7III, 35mm f/2.0, ISO 640. Medical documentary style. Serious and technical atmosphere.",
        "negative_prompt": "illustration, cartoon, CGI, stock photo, oversaturated, fake, plastic look, beauty filter"
    },
    {
        "key": "cardiologia",
        "prompt": "Veterinary cardiologist performing an echocardiogram on a medium-sized dog using an ultrasound probe on the dog's chest. Ultrasound screen showing heart imaging in the background glowing blue in a darkened exam room. Veterinarian wearing stethoscope and white coat, focused and professional expression. Hospital environment. Shot on Sony A7IV, 50mm f/2.0, ISO 500. Cinematic documentary medical photography.",
        "negative_prompt": "illustration, cartoon, CGI, stock photo, fake, plastic look, beauty filter, oversaturated"
    },
    {
        "key": "oftalmologia",
        "prompt": "Veterinary ophthalmologist examining the eye of a border collie dog using a slit lamp biomicroscope in a darkened examination room. The eye illuminated with a precise beam of light, vet wearing magnification loupes, specialized ophthalmic equipment visible. Dark clinical room with focused task lighting. Shot on Nikon Z7, 100mm macro f/2.8, ISO 400. Documentary medical photography, precise and detailed.",
        "negative_prompt": "illustration, cartoon, CGI, stock photo, fake, plastic look, beauty filter, oversaturated"
    },
    {
        "key": "ortopedia",
        "prompt": "Veterinary orthopedic surgeon examining the hind leg of a German Shepherd dog on an examination table, carefully palpating the joint. Digital X-ray of dog's hip displayed on backlit screen on the wall. Modern orthopedic clinic environment, anatomy charts visible. Bright clinical white lighting. Shot on Canon R6, 50mm f/2.2, ISO 320. Professional medical documentary photography.",
        "negative_prompt": "illustration, cartoon, CGI, stock photo, fake, plastic look, beauty filter, oversaturated"
    },
    {
        "key": "oncologia",
        "prompt": "Compassionate veterinary oncologist gently examining a senior beagle dog lying calmly on an examination table in a clean, modern oncology clinic. Vet in white coat with stethoscope, soft warm clinical lighting, medical equipment in the background. The scene conveys professionalism and care. Shot on Sony A7IV, 50mm f/2.0, ISO 400. Warm documentary medical photography.",
        "negative_prompt": "illustration, cartoon, CGI, stock photo, fake, plastic look, beauty filter, scary, blood"
    },
    {
        "key": "animais-silvestres",
        "prompt": "Exotic animal veterinarian carefully examining a green iguana on a specialized examination table in a clean veterinary clinic for exotic species. Vet wearing protective gloves and white coat, focused expression. Terrariums and exotic animal equipment visible in background. Bright natural lighting. Shot on Canon EOS R5, 50mm f/2.4, ISO 300. Documentary photography, professional and precise.",
        "negative_prompt": "illustration, cartoon, CGI, stock photo, fake, plastic look, beauty filter, oversaturated"
    },
    {
        "key": "dermatologia",
        "prompt": "Veterinary dermatologist carefully examining skin condition on a golden retriever using a medical dermatoscope, looking closely at a skin lesion on the dog's back. Modern clinical room with bright examination lights. Vet in white coat with professional tools, magnified view. Shot on Sony A7III, 85mm f/2.0, ISO 350. Clinical documentary medical photography.",
        "negative_prompt": "illustration, cartoon, CGI, stock photo, fake, plastic look, beauty filter, gross imagery"
    },
    {
        "key": "neurologia",
        "prompt": "Veterinary neurologist performing a careful neurological examination on a German Shepherd, checking reflexes and proprioception on a non-slip examination table. Doctor in white coat using a reflex hammer, focused and methodical. Modern neurology clinic with brain anatomy models visible. Bright clinical lighting. Shot on Canon R6, 50mm f/2.2, ISO 400. Professional documentary medical photography.",
        "negative_prompt": "illustration, cartoon, CGI, stock photo, fake, plastic look, beauty filter, oversaturated"
    },
]

def generate_image(spec, output_dir):
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("ERRO: pip install google-genai")
        sys.exit(1)

    client = genai.Client(api_key=GOOGLE_API_KEY)

    full_prompt = spec["prompt"]
    if spec.get("negative_prompt"):
        full_prompt += f"\n\nNEGATIVE (avoid all of these): {spec['negative_prompt']}"

    output_path = os.path.join(output_dir, f"{spec['key']}.jpg")

    print(f"  [GEN] Gerando: {spec['key']}...")
    try:
        response = client.models.generate_images(
            model="imagen-4.0-generate-001",
            prompt=full_prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio="16:9",
                output_mime_type="image/jpeg",
            ),
        )

        if response.generated_images:
            img = response.generated_images[0]
            image_bytes = img.image.image_bytes
            with open(output_path, "wb") as f:
                f.write(image_bytes)
            print(f"  [OK] Salvo: {output_path} ({len(image_bytes):,} bytes)")
            return True

        print(f"  [WARN] Sem imagem para: {spec['key']}")
        return False
    except Exception as e:
        print(f"  [ERR] Erro em {spec['key']}: {e}")
        return False

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, "src", "assets", "specialties")
    os.makedirs(output_dir, exist_ok=True)

    print(f"Gerando {len(specialties)} imagens em {output_dir}\n")

    ok = 0
    for spec in specialties:
        if generate_image(spec, output_dir):
            ok += 1

    print(f"\nConcluído: {ok}/{len(specialties)} imagens geradas.")

if __name__ == "__main__":
    main()
