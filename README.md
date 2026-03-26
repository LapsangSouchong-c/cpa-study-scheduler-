# CPA試験 復習スケジューラー

Ebbinghaus忘却曲線に基づいた、CPA試験受験生向けの復習スケジューラーです。

**スマホからワンタップで開けます！** 📱

---

## 🚀 30秒でスマホから開ける方法

### **ステップ1: GitHub にアップロード**

1. https://github.com/new にアクセス
2. **Repository name:** `cpa-study-scheduler` と入力
3. **Description:** `CPA試験用復習スケジューラー` と入力
4. ✅ **Public** を選択
5. **Create repository** をクリック

```bash
# ターミナルで実行
cd /path/to/cpa-study-scheduler
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cpa-study-scheduler.git
git push -u origin main
```

### **ステップ2: Vercelに接続（自動デプロイ）**

1. https://vercel.com/new にアクセス
2. **GitHub アカウントでサインイン**
3. **Import Git Repository** をクリック
4. `cpa-study-scheduler` を選択
5. **Deploy** をクリック

**30秒後... デプロイ完了！** 🎉

### **ステップ3: スマホに追加**

**iPhone:**
```
Safari でアプリURL を開く
    ↓
下部メニューから「共有」
    ↓
「ホーム画面に追加」
    ↓
完了！ ホーム画面にアイコンが表示されます
```

**Android:**
```
Google Chrome でアプリURL を開く
    ↓
右上メニューから「アプリをインストール」
    ↓
完了！ ホーム画面にアイコンが表示されます
```

### **その後は...**

毎朝、ホーム画面のアイコンをタップするだけ！ ⚡

---

## 📚 使い方

1. **科目を選択**
   - 財務会計計算
   - 財務会計理論

2. **学習項目を追加**
   - タイトル入力
   - 詳細（オプション）
   - 学習日を指定

3. **自動で復習予定が生成**
   - 1日後
   - 3日後
   - 1週間後
   - 2週間後
   - 1ヶ月後
   - 3ヶ月後

4. **復習予定日に「完了」をクリック**
   - 自動でローカルストレージに保存

---

## 🛠️ 技術スタック

- **React 18.2.0**
- **Lucide React** (アイコン)
- **LocalStorage** (データ永続化)
- **Vercel** (無料デプロイ)

---

## 📋 ファイル構成

```
cpa-study-scheduler/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── App.js
├── package.json
├── .gitignore
└── README.md
```

---

## 💡 Tips

- **データは自動保存されます** → ローカルストレージ使用
- **オフラインでも動作します** ✅
- **スマホもPCも同じURLで使えます**
- **無料です（Vercel）** 🎉

---

## 🔗 Vercel URL

デプロイ完了後、以下の形式のURLが得られます：

```
https://cpa-study-scheduler-YOUR_USERNAME.vercel.app
```

このURLをブックマークまたはホーム画面に追加！

---

## 📞 問題が発生した場合

- **Vercelのダッシュボード** で Build Logs を確認
- **Node.js のバージョン** が 16 以上か確認
- キャッシュをクリアして再度訪問

---

**Happy Studying! 📚✨**
