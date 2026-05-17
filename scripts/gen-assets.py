import time, requests, json, os

KIE_KEY = "76911f345932597f3dd028a113fc098e"
WAVESPEED_KEY = "4a346261d0979fa80f4cfdf151449bfd404680a3264bb9024d73b6581d2988cc"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets")
os.makedirs(OUT, exist_ok=True)

# ── Kie.ai (Kling 3.0 video) ─────────────────────────────────────────────────

def kie_submit_video(prompt, duration="5", aspect_ratio="16:9"):
    r = requests.post("https://api.kie.ai/api/v1/jobs/createTask",
        headers={"Authorization": f"Bearer {KIE_KEY}", "Content-Type": "application/json"},
        json={"model": "kling-3.0/video", "input": {
            "prompt": prompt, "duration": duration, "aspect_ratio": aspect_ratio,
            "mode": "pro", "sound": False, "multi_shots": False
        }})
    data = r.json()
    print(f"[kie video] submit: {json.dumps(data)[:300]}")
    return data["data"]["taskId"]

def kie_poll(task_id, filename, timeout=600):
    deadline = time.time() + timeout
    while time.time() < deadline:
        r = requests.get("https://api.kie.ai/api/v1/jobs/recordInfo",
            headers={"Authorization": f"Bearer {KIE_KEY}"},
            params={"taskId": task_id}).json()
        state = r.get("data", {}).get("state", "unknown")
        print(f"[{filename}] state: {state}")
        if state == "success":
            result = json.loads(r["data"]["resultJson"])
            url = result["resultUrls"][0]
            print(f"[{filename}] downloading {url[:80]}...")
            content = requests.get(url, timeout=120).content
            path = os.path.join(OUT, filename)
            with open(path, "wb") as f:
                f.write(content)
            print(f"[{filename}] saved {len(content)//1024}KB")
            return path
        if state == "fail":
            raise RuntimeError(f"Task failed: {r}")
        time.sleep(12)
    raise TimeoutError(f"[{filename}] timed out")

# ── Wavespeed (images) ────────────────────────────────────────────────────────

def wavespeed_submit(prompt, width=1920, height=1080):
    r = requests.post("https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-dev",
        headers={"Authorization": f"Bearer {WAVESPEED_KEY}", "Content-Type": "application/json"},
        json={"prompt": prompt, "width": width, "height": height,
              "num_images": 1, "num_inference_steps": 28, "guidance_scale": 3.5,
              "seed": -1, "output_format": "jpeg", "enable_sync_mode": False})
    data = r.json()
    print(f"[wavespeed] submit: {json.dumps(data)[:300]}")
    return data["data"]["id"]

def wavespeed_poll(pred_id, filename, timeout=120):
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
            print(f"[{filename}] saved {len(content)//1024}KB")
            return path
        if status == "failed":
            raise RuntimeError(f"Image failed: {r}")
        time.sleep(2)
    raise TimeoutError(f"[{filename}] timed out")

# ── Run ───────────────────────────────────────────────────────────────────────

print("=== Submitting jobs ===")

# Hero video
video_task = None
try:
    video_task = kie_submit_video(
        "Dark luxury background, golden glowing particles forming flowing network connections, "
        "abstract digital mesh, cinematic slow motion, no text, seamlessly looping, premium tech aesthetic"
    )
except Exception as e:
    print(f"[hero-video] submit failed: {e}")

# Feature images (submit all, then poll)
img_jobs = []
img_prompts = [
    ("Ultra-clean dark UI dashboard showing job dispatch timeline, glowing gold accents, minimal, "
     "professional SaaS interface, dark mode", "feat-dispatch.jpg", 1280, 720),
    ("Abstract calendar and routing visualization, dark background, emerald green connections, "
     "minimal tech illustration, no text", "feat-conflict.jpg", 1280, 720),
    ("Modern revenue chart with upward trend, dark theme, gold and amber glow, "
     "clean data visualization, professional", "feat-pricing.jpg", 1280, 720),
    ("Phone notification bubbles floating, dark background, purple glow, "
     "SMS and review notifications, minimal illustration", "feat-comms.jpg", 1280, 720),
]

for prompt, fname, w, h in img_prompts:
    try:
        pid = wavespeed_submit(prompt, w, h)
        img_jobs.append((pid, fname))
        # Poll immediately to stay within concurrency limit of 2
        try:
            wavespeed_poll(pid, fname)
        except Exception as e:
            print(f"[{fname}] poll failed: {e}")
    except Exception as e:
        print(f"[{fname}] submit failed: {e}")

print("\n=== Polling for video ===")

if video_task:
    try:
        kie_poll(video_task, "hero-video.mp4")
    except Exception as e:
        print(f"[hero-video.mp4] ERROR: {e}")

print("\n=== Done ===")
