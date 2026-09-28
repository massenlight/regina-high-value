# 高價值客戶變現業務力｜Regina

靜態一頁式網站，完整 HTML、CSS、JavaScript 與圖片位於 `dist/`，不需安裝套件或建置。

## GitHub Pages

1. 將此專案上傳至儲存庫的 `main` 分支。
2. 在 Settings → Pages → Build and deployment 將 Source 設為 GitHub Actions。
3. 在 Actions 執行 Deploy website to GitHub Pages，成功後從部署結果取得網址。

之後推送至 main 將自動重新部署。

## 本機預覽

執行 `python3 -m http.server 8000 --directory dist`，再開啟 http://localhost:8000。

此匯出不包含原 Sites 專案的 Git 歷史、設定或任何部署憑證。
