// ============================================================
// 共通ナビゲーション用スクリプト（ハンバーガーメニューの開閉のみ）
// ヘッダー自体のHTML／リンクは各ページに直接記述しています。
// メニュー項目やリンク先を変更する場合は、各ページの
// <div class="brand-bar"> 〜 </nav> の部分をまとめて書き換えてください。
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // メニュー内のリンクをクリックしたら閉じる（同ページ内遷移後も操作しやすいように）
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
});
