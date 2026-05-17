import time, requests, json, os

WAVESPEED_KEY = "4a346261d0979fa80f4cfdf151449bfd404680a3264bb9024d73b6581d2988cc"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets")
os.makedirs(OUT, exist_ok=True)

def wavespeed_submit(prompt, width=1920, height=1080):
    r = requests.post("https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-dev",
        headers={"Authorization": f"Bearer {WAVESPEED_KEY}", "Content-Type": "application/json"},
        json={"prompt": prompt, "width": width, "height": height,
              "num_images": 1, "num_inference_steps": 28, "guidance_scale": 3.5,
              "seed": -1, "output_format": "jpeg", "enable_sync_mode": False})
    data = r.json()
    print(f"[wavespeed] submit: {json.dumps(data)[:300]}")
    return data["data"]["id"]

def wavespeed_poll(pred_id, filename, timeout=180):
    deadline = time.time() + timeout
    while time.time() < deadline:
        r = requests.get(f"https://api.wavespeed.ai/api/v3/predictions/{pred_id}/result",
            headers={"Authorization": f"Bearer {WAVESPEED_KEY}"}).json()
        status = r.get("data", {}).get("status", "unknown")
        print(f"[{filename}] status: {status}")
        if status == "completed":
            url = r["data"]["outputs"][0]
            content = requests.get(url, timeout=60).content
            path = os.path.join(OUT, filename)
            with open(path, "wb") as f:
                f.write(content)
            print(f"[{filename}] saved {len(content)//1024}KB -> {path}")
            return path
        if status == "failed":
            raise RuntimeError(f"Image failed: {r}")
        time.sleep(3)
    raise TimeoutError(f"[{filename}] timed out")

jobs = [
    ("Cinematic dark luxury hero background, golden glowing particles streaming through deep space, "
     "bokeh light trails, subtle circuit-like mesh in darkness, premium tech aesthetic, "
     "no text, no UI elements, ultra-wide cinematic", "hero-bg.jpg", 1920, 1080),
    ("Ultra-clean dark SaaS dashboard mockup, booking management interface, "
     "calendar timeline view with colored job blocks, sidebar navigation, "
     "glowing gold accent colors, dark mode UI, professional, detailed, "
     "minimal chrome, realistic app screenshot style", "dashboard-mock.jpg", 1280, 800),
]

for prompt, fname, w, h in jobs:
    out_path = os.path.join(OUT, fname)
    if os.path.exists(out_path):
        print(f"[{fname}] already exists, skipping")
        continue
    try:
        pid = wavespeed_submit(prompt, w, h)
        wavespeed_poll(pid, fname)
    except Exception as e:
        print(f"[{fname}] FAILED: {e}")

print("\n=== Done ===")
