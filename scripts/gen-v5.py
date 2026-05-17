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
        "Cinematic deep space AI neural network visualization, glowing electric blue and cyan nodes "
        "connected by luminous data streams, booking calendar grid dissolving into neural pathways, "
        "deep midnight navy background, volumetric light beams, ultra-wide cinematic, no text, "
        "photorealistic digital art, 8K quality",
        "v5-hero-bg.jpg", 1920, 1080
    ),
    (
        "Futuristic AI booking dispatch command center dashboard, dark navy UI with glowing cyan route "
        "lines on a city map, job cards with technician avatars, real-time timeline view, "
        "electric blue accent colors, neural network sidebar, professional dark SaaS interface, "
        "ultra-detailed, no text labels",
        "v5-dashboard.jpg", 1280, 800
    ),
    (
        "AI neural network routing visualization, glowing blue nodes representing service jobs on a "
        "dark map grid, optimal path lines pulsing with energy, deep space background, "
        "electric cyan and gold highlights, no text, abstract tech art",
        "v5-feat-dispatch.jpg", 1280, 720
    ),
    (
        "Futuristic AI calendar conflict detection interface, dark holographic calendar with glowing "
        "red conflict zones and green resolution paths, neural network overlay, deep navy background, "
        "electric glow effects, cinematic, no text",
        "v5-feat-conflict.jpg", 1280, 720
    ),
    (
        "AI dynamic pricing engine visualization, glowing revenue curves ascending on dark background, "
        "electric blue and gold price signal nodes, neural network price prediction matrix, "
        "holographic data streams, cinematic dark tech aesthetic, no text",
        "v5-feat-pricing.jpg", 1280, 720
    ),
    (
        "AI communication automation visualization, holographic message bubbles floating in deep space, "
        "glowing blue SMS and notification streams, neural network connecting customers to technicians, "
        "dark background with electric accent lights, cinematic, no text",
        "v5-feat-comms.jpg", 1280, 720
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
