import time, requests, json, os

WAVESPEED_KEY = "4a346261d0979fa80f4cfdf151449bfd404680a3264bb9024d73b6581d2988cc"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets")
os.makedirs(OUT, exist_ok=True)

def submit(prompt, width=1920, height=1080):
    r = requests.post("https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-dev",
        headers={"Authorization": f"Bearer {WAVESPEED_KEY}", "Content-Type": "application/json"},
        json={"prompt": prompt, "width": width, "height": height,
              "num_images": 1, "num_inference_steps": 28, "guidance_scale": 3.5,
              "seed": -1, "output_format": "jpeg", "enable_sync_mode": False})
    data = r.json()
    print(f"submit: {json.dumps(data)[:200]}")
    return data["data"]["id"]

def poll(pred_id, filename, timeout=180):
    deadline = time.time() + timeout
    while time.time() < deadline:
        r = requests.get(f"https://api.wavespeed.ai/api/v3/predictions/{pred_id}/result",
            headers={"Authorization": f"Bearer {WAVESPEED_KEY}"}).json()
        status = r.get("data", {}).get("status", "unknown")
        print(f"[{filename}] {status}")
        if status == "completed":
            url = r["data"]["outputs"][0]
            content = requests.get(url, timeout=60).content
            path = os.path.join(OUT, filename)
            with open(path, "wb") as f: f.write(content)
            print(f"[{filename}] saved {len(content)//1024}KB")
            return path
        if status == "failed":
            raise RuntimeError(f"failed: {r}")
        time.sleep(3)
    raise TimeoutError(filename)

jobs = [
    (
        "Bright airy abstract background, warm golden sunlight bursting through soft cream and white bokeh, "
        "luminous glowing particles, light rays, premium minimal aesthetic, no text, ultra-wide, "
        "very bright and vibrant, warm whites and gold tones",
        "v4-hero-bg.jpg", 1920, 1080
    ),
    (
        "Clean bright white SaaS dashboard UI, job scheduling timeline, colorful job status chips, "
        "white card surfaces, gold and amber accent colors, modern minimal design, "
        "professional app screenshot, crisp and bright",
        "v4-dashboard.jpg", 1280, 800
    ),
    (
        "Bright white minimal UI showing smart dispatch interface, glowing amber route lines on white map, "
        "clean cards, light mode, professional SaaS look, no text",
        "v4-feat-dispatch.jpg", 1280, 720
    ),
    (
        "Bright light-mode calendar UI with colorful event blocks, clean white background, "
        "gold accent highlights, minimal SaaS scheduling interface, crisp and modern",
        "v4-feat-conflict.jpg", 1280, 720
    ),
    (
        "Clean bright revenue analytics dashboard, upward trend chart, warm amber glow on white surface, "
        "light mode data visualization, professional and crisp, no text",
        "v4-feat-pricing.jpg", 1280, 720
    ),
    (
        "Bright phone notification UI mockup on white background, colorful notification cards, "
        "warm amber and gold accents, clean minimal illustration, light mode",
        "v4-feat-comms.jpg", 1280, 720
    ),
]

for prompt, fname, w, h in jobs:
    path = os.path.join(OUT, fname)
    if os.path.exists(path):
        print(f"[{fname}] exists, skip")
        continue
    try:
        pid = submit(prompt, w, h)
        poll(pid, fname)
    except Exception as e:
        print(f"[{fname}] ERROR: {e}")

print("\n=== Done ===")
