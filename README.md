# 高價值客戶變現業務力｜Regina

## 目前網站與管理（2026-10-27）

- 目前 Cloudflare 版：https://regina-atelier.massenlighten-company.workers.dev/
- 原 GitHub Pages 版：https://massenlight.github.io/regina-high-value/
- Cloudflare 管理：Eric 可管理的 Bless 帳戶 → Workers & Pages → `regina-atelier`。
- `dist/` 是原 GitHub Pages 版本；根目錄 `atelier*.css/js`、`photo-safe.css`、`webinar-form.html`、`webinar-preview.js` 與 `build-atelier.mjs` 是 Cloudflare 版本的來源。
- 執行 `node build-atelier.mjs` 產生 `../../04_交付與輸出/regina-atelier/`。獨立 checkout 也使用此相對位置；請在可寫的專案資料夾執行。`python3 check-preservation.py` 檢查原文、圖片與連結保留。
- `build-editorial.mjs` 是另一個敘事預覽版本，不是目前選定的主版本。
- 此版本報名表是介面預覽，實際報名／LINE 串接需另行驗證。

## 後續編輯規則

1. 從最新 `main` 開分支，修改並檢查產出。
2. 建立 PR，測試及人工檢查通過後合併 `main`。
3. 正式部署僅使用已合併的 `main`，部署訊息附完整 commit 編號。
4. 不直接上傳未進 Git 的檔案到 Cloudflare 正式站。緊急修正也須當天補入 repo 並合併。

目前 GitHub Actions 僅部署 `dist/` 至 GitHub Pages；合併本次來源不會自動更新 Cloudflare。Cloudflare 部署前須確認目標為 `regina-atelier`，並核對建置輸出與網站讀回。

靜態一頁式網站，完整 HTML、CSS、JavaScript 與圖片位於 `dist/`，不需安裝套件或建置。

## GitHub Pages

1. 將此專案上傳至儲存庫的 `main` 分支。
2. 在 Settings → Pages → Build and deployment 將 Source 設為 GitHub Actions。
3. 在 Actions 執行 Deploy website to GitHub Pages，成功後從部署結果取得網址。

之後推送至 main 將自動重新部署。

## 本機預覽

執行 `python3 -m http.server 8000 --directory dist`，再開啟 http://localhost:8000。

此匯出不包含原 Sites 專案的 Git 歷史、設定或任何部署憑證。
