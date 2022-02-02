# CRA 環境

## やること

- jest を使ってみる
- react-testing-library を使ってみる

### jest の役割

- テスト環境の提供
- テストスイートやテストケース, アサーションのための関数を提供

### React Testing Library の役割

> React Testing Library: DOM Testing Library に React コンポーネントを操作するための API を追加して構築されたもの  
> [React Testing Library - 公式](https://testing-library.com/docs/guiding-principles)

- React のコンポーネントをテストするために用いる

**参考記事**

- [React Testing Library の使い方 - Qiita](https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f)

## 環境構築

```shell
$ npx create-react-app {appName} --template typescript
```

### 📕`npm test`が実行できない

以下を install することで解決

```shell
$ npm i -D --exact jest-watch-typeahead@0.6.5
```

#### 原因

最新の`jest-watch-typeahead`は`Native ESM`で書かれているためエラーが発生するらしい。  
0.6.5 は非 Native ESM と互換性があるため動作する。

#### 参考リンク

- [issue](https://github.com/facebook/create-react-app/issues/11043#issuecomment-942472592)
- [Native ESM 時代とはなにか - zenn](https://zenn.dev/uhyo/articles/what-is-native-esm-era)

<br />

---

<br />

## React Testing libarary でコンポーネントをテストする手順

1. コンポーネントの html を確認
2. テストする要素を選択

### 暗黙的なアサーションと明示的なアサーション

```js
/* 暗黙的 */
screen.getByText('Search:')
```

`get`クエリーはマッチしなかった場合
エラーをスローするので暗黙的なアサーションとして考えることができる  
`get`クエリーの挙動を理解している必要があるため暗黙的？

<br />

```js
/* 明示的 */
expect(screen.getByText('Search:')).toBeInTheDocument()
```

`expect`: 値をテストする際に毎回使用する関数  
`toBeInTheDocument`: 要素がドキュメントに存在するかをアサートする  
何故明示的と考えられるか  
expect は期待する, 予測する, 予想といった意味合い
expect, getByText, toBeInTheDocument を日本語にしてみると  
`テキスト（Search:）がドキュメントに存在することを予測する`
みたいな感じになる

## getBy, queryBy, findBy の使いどころ

- `getBy`： 値が存在することを検証する場合
- `queryBy`： 値が存在しないことを検証する場合
- `findBy`： まだ存在しないものの最終的に存在する値を検証する場合（非同期処理）

<br />

## エンドユーザーのインタラクションをテスト

- `fireEvent`
- `userEvent`

RTL(React Testing Library)を使用している場合は極力`userEvent`を用いてテストする。

### 何故？

`fireEvent`はあくまで Event のみに関心を持っているが、  
`userEvent`はユーザーのブラウザ上での振る舞いに関心を持っているため、  
`userEvent`の方がユーザーインタラクションをテストするのに適している。

#### fireEvent の場合

```js
// fireEvent.click(element, options)
fireEvent.click(element)
```

発火されるイベント

- `click`

#### userEvent の場合

```js
// userEvent.click(element, eventInit, options)
userEvent.click(element)
```

発火されるイベント

- `hover`
- `click`

[各要素のクリックで発火されるイベント - userEvent/src/click.js](https://github.com/testing-library/user-event/blob/5feaa942f46bb37d96c2f2fbeb4b33e8beff75ad/src/click.js)

<br />

## 調べた用語

- テストフレームワーク
  - スクリプトのテストをどのように記述して、実行し、検証するか」という仕組みを支援する一連の機能群と、それらを効果的に使用するためのガイドラインの総称です
