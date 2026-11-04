# 高價值客戶成交攻略｜Regina

## 新版講座頁（2026-11-02）

正式部署入口為 `node build-sales-mindset.mjs`，預設輸出 `.build/atelier/`，也支援 `REGINA_OUTPUT_DIR`。GitHub Pages 使用相同入口。

`sales-mindset/` 匯入「網站部署與原始碼覆蓋」對話的 Sites 第 7 版（project `appgprj_6ae74fc962988191b84f3881da0c7b83`，source commit `90fce9a`）。包含原作品的圖片、三支學員影片、心得與講座報名。僅將分享圖片網址改為正式 Cloudflare 網址，以及將報名備援連結改為 `registration/index.html#enroll`。原 Atelier 建置保留在 `registration/`，避免 GitHub Pages 更新後備援連結回到同一頁。

Cloudflare 目標仍為 `regina-atelier`，正式部署須使用合併後的 main 並附完整 commit。GitHub Actions 僅更新 Pages，不能代表 Cloudflare 已更新。表單實際完成報名與 LINE 登入需另外驗證。
## 目前網站與管理（2026-11-01）

- 目前 Cloudflare 版：https://regina-atelier.massenlighten-company.workers.dev/
- GitHub Pages 正式版（Atelier）：https://massenlight.github.io/regina-high-value/
- Cloudflare 管理：Eric 可管理的 Bless 帳戶 → Workers & Pages → `regina-atelier`。
- `dist/` 是原 GitHub Pages 版本；根目錄 `atelier*.css/js`、`photo-safe.css`、`webinar-form.html`、`webinar-preview.js` 與 `build-atelier.mjs` 是 Cloudflare 版本的來源。
- 執行 `node build-atelier.mjs` 產生 `../../04_交付與輸出/regina-atelier/`。獨立 checkout 也使用此相對位置；請在可寫的專案資料夾執行。`python3 check-preservation.py` 檢查原文、圖片與連結保留。
- `build-editorial.mjs` 是另一個敘事預覽版本，不是目前選定的主版本。
- 2026-10-28：目前主版本改為講師照片開場，課程形式為一天實體課程＋完整線上課程；舊版首屏已移除。歷史學員心得原文保留。
- 可用 `REGINA_OUTPUT_DIR=.build/atelier node build-atelier.mjs` 在 repo 內乾淨建置；上傳 manifest／assets 時使用相同 `REGINA_OUTPUT_DIR`。舊 `check-preservation.py` 對應9月舊版文案，不適用新版首屏刪除；新版以瀏覽器檢查內容、圖片、手機排版與表單流程。
- 報名表從既有 recruitment API 取得場次，並導向 LINE 完成報名；跨網域部署須驗證場次載入，完整 LINE 登入與實際報名需另行驗證。

## 後續編輯規則

1. 從最新 `main` 開分支，修改並檢查產出。
2. 建立 PR，測試及人工檢查通過後合併 `main`。
3. 正式部署僅使用已合併的 `main`，部署訊息附完整 commit 編號。
4. 不直接上傳未進 Git 的檔案到 Cloudflare 正式站。緊急修正也須當天補入 repo 並合併。

GitHub Actions 使用 Node.js 22 執行 `REGINA_OUTPUT_DIR=.build/atelier node build-atelier.mjs`，將 `.build/atelier/` 發布至 GitHub Pages，以 Atelier 新版取代原版。`dist/` 保留為建置輸入。此流程不會更新 Cloudflare；Cloudflare 部署前仍須確認目標為 `regina-atelier`，並核對建置輸出與網站讀回。

靜態一頁式網站。Atelier 建置以 `dist/` 為基礎，套用根目錄的新版樣式、互動與報名表；僅需 Node.js，不需安裝套件。

## GitHub Pages

1. 將此專案上傳至儲存庫的 `main` 分支。
2. 在 Settings → Pages → Build and deployment 將 Source 設為 GitHub Actions。
3. 在 Actions 執行 Deploy website to GitHub Pages，成功後從部署結果取得網址。

之後推送至 main 將自動重新部署。

## 本機預覽

先執行 `REGINA_OUTPUT_DIR=.build/atelier node build-atelier.mjs`，再執行 `python3 -m http.server 8000 --directory .build/atelier`，開啟 http://localhost:8000。

此匯出不包含原 Sites 專案的 Git 歷史、設定或任何部署憑證。
