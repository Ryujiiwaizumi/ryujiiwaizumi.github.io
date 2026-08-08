# お名前 — Construction × Software Portfolio Site

PC橋梁上部工の施工管理をしながら、AIとソフトウェアで現場の書類業務を減らす取り組みを発信する個人プロフィールサイトです。

- コンテンツ・思想の正本: [`SITE_BRIEF.md`](./SITE_BRIEF.md)
- デザインの正本（変更不可の参照用オリジナル）: [`design-reference/`](./design-reference/)

## 1. これは何のサイトか

静的HTML / CSS / JavaScriptのみで作られた1ページ構成のサイトです。ビルド処理・Node.js・バックエンド・データベースを必要とせず、`index.html` をルートに置くだけで GitHub Pages から公開できます。

## 2. ファイル構成

```
/
├─ index.html          … サイト本体（1ページ、PC/SP共通）
├─ styles.css           … スタイル一式（現時点では分割せず1ファイル）
├─ main.js               … モバイルナビ・スクロールreveal・現在地ハイライト（依存ゼロ、約100行）
├─ assets/
│   └─ img/               … 将来のプロフィール写真置き場
├─ SITE_BRIEF.md         … コンテンツ・思想の正本
├─ design-reference/     … Claude Designで確定した元デザイン（削除・上書き禁止、比較用）
│   ├─ Profile Site.dc.html         … PC版デザイン確定稿
│   ├─ Profile Site SP.dc.html      … スマホ版デザイン確定稿
│   ├─ Profile Site Design.dc.html  … デザイン方針・検討資料
│   └─ support.js                    … Claude Design側の実行用ランタイム（サイト本体では未使用）
└─ uploads/               … ブリーフ元ファイル等（サイト本体では未使用）
```

## 3. PC / スマートフォンの統合方法

`Profile Site.dc.html`（PC確定稿）と `Profile Site SP.dc.html`（スマホ確定稿）は、セクションごとに構造そのものが異なります（例: Career StoryはPCが横レール・スマホが縦レール、Bridge WorksはPCが表組み・スマホがカード積み、FIELD × DEVELOPMENTは縦横で重なりの向きが変わる、Vision の情報フローは8列と2列で列数が違う 等）。

そのため `index.html` では、両方の確定デザインをそのまま再現するために、各セクション内に

```html
<div class="pc-view">…PC確定稿と同じ構造…</div>
<div class="sp-view">…スマホ確定稿と同じ構造…</div>
```

の2系統をそれぞれ用意し、`styles.css` の1つのブレークポイント（**880px**）で表示を切り替えています。

```css
.pc-view{display:none}
.sp-view{display:block}
@media (min-width:880px){
  .pc-view{display:block}
  .sp-view{display:none}
}
```

Hero・About・Software Projects・Development Philosophy・Connect など、PC/SPで構造差が小さい（グリッド列数が変わるだけの）セクションは、共通の1系統のマークアップに `@media` でスタイルを当てて自然にリフローさせています。

880pxという境界値はブリーフ内のデザイン検討資料（`design-reference/Profile Site Design.dc.html`）が示す breakpoint 案（1280 / 900 / 640）のうち、PC確定稿とSP確定稿の分岐点に近い値として採用しています。

## 4. コンテンツの更新方法

JSONやJSでの動的描画にはせず、**`index.html` に直接HTMLを書く方式**を採用しています（JS停止時にも内容が読めること、検索エンジンに内容が乗ることを優先）。

### 橋梁施工実績を追加する

`index.html` 内に、同じ内容を2箇所（PC用の表組み行 / SP用のカード）に追加する必要があります。

1. `id="bridge"` セクション内、`.pc-view` 側の `.bridge-table` に `.bridge-table__row` を1行追加
2. 同セクションの `.sp-view` 側の `.bridge-cards` に `.bridge-card` を1件追加

既存の行・カードをコピーして文言を書き換えるのが簡単です。構造形式のアイコン（`<svg class="bridge-glyph">`）も既存の中から近い形式のものを流用してください。

### ソフトウェアプロジェクトを追加する

`id="software"` セクション内の `.software-grid` に `.software-card` を1つ追加します（PC/SP共通、複製不要）。

### プロフィール写真を追加する

初期版は顔写真なしで固定されています（`id="about"` セクション内、PC/SPそれぞれの `.photo-frame` に橋梁の線画SVGを配置）。

写真を追加する場合:

1. `assets/img/` に写真ファイルを配置（例: `assets/img/portrait.jpg`、正方形または縦長のモノクロ写真を推奨）
2. `index.html` の `.photo-frame--pc` と `.photo-frame--sp` 内の `<svg>...</svg>` ブロックを、それぞれ

   ```html
   <img src="assets/img/portrait.jpg" alt="お名前" style="width:100%;height:100%;object-fit:cover;filter:grayscale(1)">
   ```

   に置き換えてください。`.photo-frame` の枠・コーナー装飾・キャプションはそのまま利用できます。

### 氏名・SNSリンクの設定状況

| 項目 | 状態 | 場所 |
|---|---|---|
| 氏名 | 反映済み（岩泉 竜司） | ヘッダー、About、フッター |
| GitHub URL | 反映済み（`https://github.com/RyujiIwaizumi`、個人プロフィール） | Connect |
| LinkedIn URL | 反映済み（`https://www.linkedin.com/in/竜司-岩泉-ac1979`） | Connect |
| X (旧Twitter) URL | 反映済み（`https://x.com/QuanLong38913`） | Connect |

すべて確定・反映済みです。今後URLが変わった場合は、`index.html` 内の該当する `.connect-card` の `href` とラベル文言を書き換えてください。

※「1級土木施工管理技士」という資格表記は `SITE_BRIEF.md` には明記がなく、Claude Design確定稿（design-reference）にすでに記載されていた内容をそのまま引き継いでいます（事実確認済み・変更不要とのことです）。

## 5. dc-runtime依存について

このサイトは `x-dc` / `sc-if` / `data-dc-script` などのClaude Design専用タグ、および `support.js`（React / ReactDOM / Babel を unpkg.com から動的読み込みするプレビュー用ランタイム）に一切依存していません。使用しているのは素のHTML / CSS / JavaScriptのみです。

外部ネットワーク依存は Google Fonts の `<link>` 読み込みのみです（初期版ではそのまま利用。フォントのローカル化は今回のスコープ外）。

## 6. GitHub Pagesでの公開

1. このリポジトリを GitHub にプッシュする
2. リポジトリの Settings → Pages で、公開ブランチを指定する（ルート直下に `index.html` があるため追加設定は不要）
3. `https://<username>.github.io/<repository>/` で公開される

Node.js / npm / ビルドコマンド / バックエンド / データベースは一切不要です。

## 7. 残っているTODO（今回の作業範囲外）

- プロフィール写真の追加（任意）
- OGP画像・favicon・SEOメタ情報の追加
- アクセス解析（Analytics）の追加
- 独自ドメインの設定
- お問い合わせフォームの追加
- Google Fontsのローカル化（外部依存をさらに減らしたい場合）
