/* Form Builder demo recorder — scene A (admin builds form) + scene B (customer sees it).
 * Runs against the worktree dev server on :4100 (dev DB, Everneat tenant).
 * Output: vid/sceneA.webm + vid/sceneB.webm (1600x900), stitched later via ffmpeg. */
const path = require("path")
const fs = require("fs")

const WT = "C:/Users/Gg/Desktop/Passion/booking-fe/.claude/worktrees/fb-doc"
const { chromium } = require(path.join(WT, "node_modules", "@playwright/test"))
const { MongoClient, ObjectId } = require(path.join(WT, "node_modules", "mongodb"))

const BASE = "http://localhost:4100"
const EMAIL = "gerzon@everneat.co"
const TENANT = "687115b8379f46fa5c0d1960"
const VIEW = { width: 1600, height: 900 }
const OUT = path.join(__dirname, "vid")
const SHOTS = path.join(__dirname, "shots")
for (const d of [OUT, SHOTS]) fs.mkdirSync(d, { recursive: true })

const envFile = fs.readFileSync(path.join(WT, ".env.local"), "utf8")
const MONGO_URI = (envFile.match(/MONGODB_URI="?([^\r\n"]+)/) || [])[1]

let page = null
let shotN = 0
async function shot(name) {
  if (!page) return
  await page.screenshot({ path: path.join(SHOTS, `${String(++shotN).padStart(2, "0")}-${name}.png`) }).catch(() => {})
}
async function step(name, fn) {
  try {
    await fn()
    await shot(name)
    console.log("OK  " + name)
  } catch (err) {
    await shot("FAIL-" + name)
    console.error("FAIL " + name + ": " + err.message)
    throw err
  }
}

async function cleanup() {
  const c = new MongoClient(MONGO_URI)
  await c.connect()
  const db = c.db("dev")
  // Fresh form-version state so the video shows v1 -> publish -> v2
  await db.collection("form_definitions").deleteMany({ tenantId: TENANT })
  // Strip any leftover demo custom steps from the legacy config
  await db.collection("wizard_configs").updateMany(
    { tenantId: TENANT },
    { $pull: { steps: { type: "custom" } } },
  )
  // Dodge the 5/hr OTP cap (mirrors e2e fixture)
  await db.collection("verifications").deleteMany({ email: EMAIL, type: { $ne: "reset" } })
  await c.close()
  console.log("OK  cleanup")
}

;(async () => {
  await cleanup()
  const browser = await chromium.launch({ headless: true })

  // ───────────────────────── Scene A: admin builds the form ─────────────────
  const ctxA = await browser.newContext({ viewport: VIEW, recordVideo: { dir: OUT, size: VIEW } })
  const a = await ctxA.newPage()
  page = a

  await step("api-login", async () => {
    const login = await a.request.post(BASE + "/api/v1/auth/email-login", {
      data: { email: EMAIL },
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
    const body = await login.json()
    if (!body.code) throw new Error("no OTP code: " + JSON.stringify(body))
    const codeResp = await a.request.post(BASE + "/api/v1/auth/email-code", {
      data: { email: EMAIL, code: body.code },
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
    if (!codeResp.ok()) throw new Error("email-code failed " + codeResp.status())
  })

  await step("open-builder", async () => {
    // Default tab = "Admin Wizard" — the config that actually drives the
    // public /booking flow (wizard B loads wizardType "admin").
    await a.goto(BASE + "/settings/booking-forms")
    await a.getByText("Scope of Work").first().waitFor({ timeout: 15000 })
    await a.waitForTimeout(2500) // viewer takes in the canvas
  })

  await step("add-custom-step", async () => {
    await a.getByRole("button", { name: /add custom step/i }).click()
    await a.getByPlaceholder("Step name...").pressSequentially("Special requests", { delay: 55 })
    await a.waitForTimeout(300)
    await a.getByRole("button", { name: "Add", exact: true }).click()
    await a.waitForTimeout(900)
  })

  await step("add-question", async () => {
    await a.getByRole("button", { name: /add field/i }).click()
    await a.waitForTimeout(500)
    const labelInput = a.getByPlaceholder("Enter label...").last()
    await labelInput.click()
    await labelInput.press("ControlOrMeta+a")
    await labelInput.pressSequentially("Anything we should know before we arrive?", { delay: 25 })
    // Type -> Long Text
    await a.getByRole("combobox").last().click()
    await a.waitForTimeout(400)
    await a.getByRole("option", { name: "Long Text" }).click()
    await a.waitForTimeout(300)
    await a.keyboard.press("Escape") // clear any lingering Radix overlay
    const ph = a.getByPlaceholder("Placeholder text (optional)...").last()
    await ph.click()
    await ph.pressSequentially("Gate code, parking, pets — anything helpful", { delay: 18 })
    await a.waitForTimeout(700)
  })

  await step("move-to-position-3", async () => {
    // dnd-kit keyboard sorting (deterministic, unlike synthetic mouse drags):
    // focus the handle, Space lifts, ArrowUp moves one slot, Space drops.
    const handle = a.locator("svg.lucide-grip-vertical").last().locator("xpath=ancestor::button[1]")
    await handle.focus()
    await a.keyboard.press("Space")
    await a.waitForTimeout(500)
    // 10 cards (9 admin defaults + custom at index 9) → 5 ArrowUps lands it at
    // index 4, right after Scope of Work.
    for (let i = 0; i < 5; i++) {
      await a.keyboard.press("ArrowUp")
      await a.waitForTimeout(300)
    }
    await a.keyboard.press("Space")
    await a.waitForTimeout(1000)
  })

  await step("save-and-publish", async () => {
    await a.getByRole("button", { name: /save draft/i }).click()
    await a.getByText(/draft saved/i).waitFor({ timeout: 10000 })
    await a.waitForTimeout(1200)
    await a.getByRole("button", { name: /^publish$/i }).click()
    await a.getByText(/published — this version is now live/i).waitFor({ timeout: 15000 })
    await a.waitForTimeout(2600) // linger on Live badge + toast
  })

  await step("verify-published-order", async () => {
    const resp = await a.request.get(BASE + "/api/v1/catalog/wizard-config/admin?tenantId=" + TENANT)
    const cfg = (await resp.json()).data
    const idx = cfg.steps.findIndex((s) => s.type === "custom")
    if (idx !== 4) throw new Error("custom step at index " + idx + ", expected 4 — reorder did not persist")
  })

  const vidA = await a.video().path()
  await ctxA.close()

  // ───────────────────────── Scene B: what the customer sees ────────────────
  const ctxB = await browser.newContext({ viewport: VIEW, recordVideo: { dir: OUT, size: VIEW } })
  const b = await ctxB.newPage()
  page = b

  await step("customer-open", async () => {
    await b.goto(BASE + "/booking?tenantId=" + TENANT)
    await b.getByPlaceholder("e.g. 90210").waitFor({ timeout: 20000 })
    await b.waitForTimeout(1500)
  })

  const QUESTION = "Anything we should know before we arrive?"

  await step("customer-qualification", async () => {
    await b.getByPlaceholder("e.g. 90210").pressSequentially("06824", { delay: 90 })
    await b.getByText(/within service area/i).first().waitFor({ timeout: 8000 })
    await b.waitForTimeout(700)
    await b.getByRole("button", { name: /residential/i }).first().click()
    await b.waitForTimeout(600)
    await b.getByText("Last month", { exact: true }).first().click()
    await b.waitForTimeout(900)
    await b.getByRole("button", { name: "Next →", exact: true }).first().click()
    await b.waitForTimeout(1800)
  })

  await step("customer-property", async () => {
    await b.getByText("Compose the floor plan.").waitFor({ timeout: 10000 })
    await b.waitForTimeout(900)
    await b.getByRole("button", { name: /residence - bedroom/i }).first().click()
    await b.waitForTimeout(900)
    await b.getByRole("button", { name: /residence - bathroom/i }).first().click()
    await b.waitForTimeout(1100) // allocated-area meter fills — let it land
    await b.getByRole("button", { name: "Next →", exact: true }).first().click()
    await b.waitForTimeout(1800)
  })

  await step("customer-scope", async () => {
    await b.getByText("Service Level").first().waitFor({ timeout: 10000 })
    await b.waitForTimeout(800)
    await b.getByRole("button", { name: "Regular", exact: true }).click()
    await b.waitForTimeout(1100)
    await b.getByRole("button", { name: "Next →", exact: true }).first().click()
    await b.waitForTimeout(1800)
  })

  await step("customer-custom-question", async () => {
    await b.getByText(QUESTION).first().waitFor({ timeout: 10000 })
    await b.waitForTimeout(900)
    const ta = b.locator("textarea").first()
    await ta.click()
    await ta.pressSequentially("We have a friendly dog — gate code is 4412.", { delay: 40 })
    await b.waitForTimeout(2200)
  })

  await step("customer-quote-finale", async () => {
    await b.getByRole("button", { name: "Next →", exact: true }).first().click()
    await b.getByText("Price Breakdown").first().waitFor({ timeout: 15000 })
    await b.waitForTimeout(3200) // linger on the live quote breakdown
  })

  const vidB = await b.video().path()
  await ctxB.close()
  await browser.close()

  fs.copyFileSync(vidA, path.join(OUT, "sceneA.webm"))
  fs.copyFileSync(vidB, path.join(OUT, "sceneB.webm"))
  console.log("DONE sceneA=" + vidA + " sceneB=" + vidB)
})().catch((e) => { console.error("ABORT:", e.message); process.exit(1) })
