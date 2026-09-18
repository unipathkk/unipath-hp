// ============================================================
// Google Analytics 4（GA4）計測用スクリプト
// ・GA4の測定IDは、このファイル冒頭の GA_MEASUREMENT_ID に設定してください
//   （GA4管理画面の「データストリート」詳細に表示される G-XXXXXXXXXX 形式のID）
// ・ユーザー数／セッション数／ページビュー数／流入元／デバイス／地域などの
//   基本的なアクセス解析は、GA4標準機能（gtag.js）により自動的に計測されます
// ・URLに utm_source / utm_medium / utm_campaign 等のUTMパラメータが付与されている場合、
//   GA4側で自動的に流入元として記録されます（追加設定不要）
// ・LINE / 電話番号 / お問い合わせフォーム / 体験申込フォーム / 料金ページへの
//   リンククリックは、コンバージョン計測用のイベントとして送信します
// ============================================================
(function () {
  "use strict";

  // ★★★ ここにGA4の測定IDを入れる（例: "G-XXXXXXXXXX"） ★★★
  var GA_MEASUREMENT_ID = "G-K53TKWYJFL";

  // 測定ID未設定の場合は誤送信防止のため何もしない
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf("G-") !== 0) {
    return;
  }

  // gtag.js を非同期読み込み（表示速度・SEOへの影響を最小化）
  var gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  // transport_type: "beacon" により、クリック直後にページ遷移してもイベント送信漏れを防ぐ
  gtag("config", GA_MEASUREMENT_ID, {
    transport_type: "beacon"
  });

  // ---- コンバージョン計測（リンククリックイベント） ----------------
  // お問い合わせフォーム／説明・体験申込フォームは、GoogleフォームのURL（末尾ID）で識別する
  var FORM_ID_CONTACT = "1FAIpQLSeA0THx3nYbGaUEWJ0mtEC1w00wYftr94neYpHtaqN86jtdHw"; // お問い合わせフォーム
  var FORM_ID_TRIAL = "1FAIpQLSeGSN4sP-YBVFEfOhBTq9WBfJu9nq_FtI9iZ2EwNpem51HQVQ"; // 説明・体験申し込みフォーム

  function classifyLink(href) {
    if (!href) return null;
    if (href.indexOf("tel:") === 0) return "phone_click";
    if (href.indexOf("line.me") !== -1) return "line_click";
    if (href.indexOf(FORM_ID_TRIAL) !== -1) return "trial_click";
    if (href.indexOf(FORM_ID_CONTACT) !== -1) return "contact_click";
    if (href.indexOf("price/") !== -1) return "pricing_click";
    return null;
  }

  document.addEventListener(
    "click",
    function (e) {
      var link = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!link) return;

      var eventName = classifyLink(link.getAttribute("href"));
      if (!eventName) return;

      gtag("event", eventName, {
        link_url: link.href,
        link_text: (link.textContent || "").trim(),
        page_path: window.location.pathname
      });
    },
    true
  );
})();
