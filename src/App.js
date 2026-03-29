import React, { useState, useEffect } from 'react';
import { Trash2, Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// 科目ごとの講義データ
const subjectsData = {
  finCalc: {
    name: '財務会計論（計算）',
    lectures: [
      { id: "finCalc_1", num: "第1回", title: "現金預金" },
      { id: "finCalc_2", num: "第2回", title: "有形固定資産" },
      { id: "finCalc_3", num: "第3回", title: "有形固定資産、無形固定資産・投資その他の資産・繰延資産、引当金、経過勘定" },
      { id: "finCalc_4", num: "第4回", title: "商品売買・棚卸資産" },
      { id: "finCalc_5", num: "第5回", title: "有価証券Ⅰ" },
      { id: "finCalc_6", num: "第6回", title: "有価証券Ⅰ、手形取引、貸倒引当金Ⅰ" },
      { id: "finCalc_7", num: "第7回", title: "リース会計Ⅰ、研究開発費・ソフトウェア" },
      { id: "finCalc_8", num: "第8回", title: "減損会計Ⅰ、税金及び税効果会計Ⅰ" },
      { id: "finCalc_9", num: "第9回", title: "税金及び税効果会計Ⅰ、外貨建取引Ⅰ" },
      { id: "finCalc_10", num: "第10回", title: "外貨建取引Ⅰ、社債" },
      { id: "finCalc_11", num: "第11回", title: "本支店会計" },
      { id: "finCalc_12", num: "第12回", title: "退職給付会計Ⅰ" },
      { id: "finCalc_13", num: "第13回", title: "退職給付会計Ⅱ、資産除去債務" },
      { id: "finCalc_14", num: "第14回", title: "純資産Ⅰ" },
      { id: "finCalc_15", num: "第15回", title: "ストック・オプション等" },
      { id: "finCalc_16", num: "第16回", title: "外貨建取引Ⅱ、新株予約権付社債" },
      { id: "finCalc_17", num: "第17回", title: "税金及び税効果会計Ⅱ" },
      { id: "finCalc_18", num: "第18回", title: "収益認識Ⅰ" },
      { id: "finCalc_19", num: "第19回", title: "減損会計Ⅱ、収益認識Ⅱ、収益認識Ⅲ" },
      { id: "finCalc_20", num: "第20回", title: "貸倒引当金Ⅱ、リース会計Ⅱ" },
      { id: "finCalc_21", num: "第21回", title: "リース会計Ⅲ" },
      { id: "finCalc_22", num: "第22回", title: "有価証券Ⅱ、債権債務、外貨建取引Ⅱ、期中財務諸表" },
      { id: "finCalc_23", num: "第23回", title: "デリバティブ" },
      { id: "finCalc_24", num: "第24回", title: "外貨建取引Ⅲ、純資産Ⅱ、会計方針の変更" },
      { id: "finCalc_25", num: "第25回", title: "連結会計Ⅰ" },
      { id: "finCalc_26", num: "第26回", title: "連結会計Ⅰ～Ⅱ" },
      { id: "finCalc_27", num: "第27回", title: "連結会計Ⅱ～Ⅲ" },
      { id: "finCalc_28", num: "第28回", title: "連結会計Ⅱ～Ⅲ" },
      { id: "finCalc_29", num: "第29回", title: "連結会計Ⅱ～Ⅲ" },
      { id: "finCalc_30", num: "第30回", title: "連結会計Ⅳ" },
      { id: "finCalc_31", num: "第31回", title: "持分法会計" },
      { id: "finCalc_32", num: "第32回", title: "包括利益" },
      { id: "finCalc_33", num: "第33回", title: "純資産Ⅲ、連結退職給付、在外支店" },
      { id: "finCalc_34", num: "第34回", title: "在外子会社" },
      { id: "finCalc_35", num: "第35回", title: "個別キャッシュ・フロー計算書Ⅰ" },
      { id: "finCalc_36", num: "第36回", title: "個別キャッシュ・フロー計算書Ⅱ" },
      { id: "finCalc_37", num: "第37回", title: "企業結合会計" },
      { id: "finCalc_38", num: "第38回", title: "企業結合会計" },
      { id: "finCalc_39", num: "第39回", title: "事業分離会計" },
      { id: "finCalc_40", num: "第40回", title: "企業結合会計、事業分離会計" },
      { id: "finCalc_41", num: "第41回", title: "連結キャッシュ・フロー計算書Ⅰ" },
      { id: "finCalc_42", num: "第42回", title: "連結キャッシュ・フロー計算書Ⅱ、在外連結キャッシュ・フロー計算書Ⅰ～Ⅱ" },
      { id: "finCalc_43", num: "第43回", title: "連結会計Ⅴ" },
      { id: "finCalc_44", num: "第44回", title: "連結会計Ⅴ" },
      { id: "finCalc_45", num: "第45回", title: "連結会計Ⅵ～Ⅶ、連結キャッシュ・フロー計算書Ⅱ" },
      { id: "finCalc_46", num: "第46回", title: "１株当たり情報、分配可能額" },
      { id: "finCalc_47", num: "第47回", title: "在外子会社、セグメント情報、企業結合会計、事業分離会計" },
    ]
  },
  finTheory: {
    name: '財務会計論（理論）',
    lectures: [
      { id: "finTheory_1", num: "第1回", title: "財務会計における基礎概念、一般原則" },
      { id: "finTheory_2", num: "第2回", title: "一般原則、貸借対照表・損益計算書総論、収益費用アプローチと資産負債アプローチ" },
      { id: "finTheory_3", num: "第3回", title: "損益会計、貸借対照表総論、資産会計総論" },
      { id: "finTheory_4", num: "第4回", title: "流動資産・固定資産、繰延資産" },
      { id: "finTheory_5", num: "第5回", title: "負債会計、資本会計(伝統論)" },
      { id: "finTheory_6", num: "第6回", title: "棚卸資産の評価" },
      { id: "finTheory_7", num: "第7回", title: "研究開発費等、固定資産の減損" },
      { id: "finTheory_8", num: "第8回", title: "退職給付、資産除去債務" },
      { id: "finTheory_9", num: "第9回", title: "資本会計(会計基準論点)" },
      { id: "finTheory_10", num: "第10回", title: "ストック・オプション等" },
      { id: "finTheory_11", num: "第11回", title: "外貨建取引等、税効果会計" },
      { id: "finTheory_12", num: "第12回", title: "リース" },
      { id: "finTheory_13", num: "第13回", title: "金融商品、期中財務諸表" },
      { id: "finTheory_14", num: "第14回", title: "デリバティブ" },
      { id: "finTheory_15", num: "第15回", title: "外貨建取引等、金融商品、会計方針の開示、会計上の変更及び誤謬の訂正" },
      { id: "finTheory_16", num: "第16回", title: "連結財務諸表" },
      { id: "finTheory_17", num: "第17回", title: "持分法、包括利益" },
      { id: "finTheory_18", num: "第18回", title: "退職給付、外貨建取引等" },
      { id: "finTheory_19", num: "第19回", title: "企業結合" },
      { id: "finTheory_20", num: "第20回", title: "企業結合、事業分離等" },
      { id: "finTheory_21", num: "第21回", title: "連結キャッシュ・フロー計算書等、概念フレームワーク" },
      { id: "finTheory_22", num: "第22回", title: "概念フレームワーク、税効果会計(連結税効果)等" },
      { id: "finTheory_23", num: "第23回", title: "会計基準等、セグメント情報等の開示等" },
    ]
  },
  mgmt: {
    name: '管理会計論',
    lectures: [
      { id: "mgmt_1", num: "第1回", title: "原価計算総論、費目別計算総論、材料費" },
      { id: "mgmt_2", num: "第2回", title: "材料費" },
      { id: "mgmt_3", num: "第3回", title: "労務費" },
      { id: "mgmt_4", num: "第4回", title: "経費、製造間接費" },
      { id: "mgmt_5", num: "第5回", title: "製造間接費、部門別計算" },
      { id: "mgmt_6", num: "第6回", title: "部門別計算" },
      { id: "mgmt_7", num: "第7回", title: "部門別計算、製品別計算総論、個別原価計算" },
      { id: "mgmt_8", num: "第8回", title: "個別原価計算" },
      { id: "mgmt_9", num: "第9回", title: "単純総合原価計算" },
      { id: "mgmt_10", num: "第10回", title: "単純総合原価計算" },
      { id: "mgmt_11", num: "第11回", title: "工程別総合原価計算" },
      { id: "mgmt_12", num: "第12回", title: "組別総合原価計算、等級別総合原価計算" },
      { id: "mgmt_13", num: "第13回", title: "連産品" },
      { id: "mgmt_14", num: "第14回", title: "標準原価計算" },
      { id: "mgmt_15", num: "第15回", title: "標準原価計算" },
      { id: "mgmt_16", num: "第16回", title: "標準原価計算" },
      { id: "mgmt_17", num: "第17回", title: "標準原価計算" },
      { id: "mgmt_18", num: "第18回", title: "標準原価計算、製造業の財務諸表" },
      { id: "mgmt_19", num: "第19回", title: "直接原価計算、管理会計の基礎" },
      { id: "mgmt_20", num: "第20回", title: "短期利益計画のための管理会計" },
      { id: "mgmt_21", num: "第21回", title: "短期利益計画のための管理会計、予算管理" },
      { id: "mgmt_22", num: "第22回", title: "予算管理" },
      { id: "mgmt_23", num: "第23回", title: "財務情報分析" },
      { id: "mgmt_24", num: "第24回", title: "資金管理とキャッシュ・フロー管理" },
      { id: "mgmt_25", num: "第25回", title: "意思決定総論、戦術的意思決定（差額原価収益分析）" },
      { id: "mgmt_26", num: "第26回", title: "戦術的意思決定（差額原価収益分析）" },
      { id: "mgmt_27", num: "第27回", title: "戦略的意思決定（設備投資の経済性計算）" },
      { id: "mgmt_28", num: "第28回", title: "戦略的意思決定（設備投資の経済性計算）" },
      { id: "mgmt_29", num: "第29回", title: "分権組織とグループ経営の管理会計" },
      { id: "mgmt_30", num: "第30回", title: "分権組織とグループ経営の管理会計" },
      { id: "mgmt_31", num: "第31回", title: "分権組織とグループ経営の管理会計、管理会計の基礎" },
      { id: "mgmt_32", num: "第32回", title: "原価管理" },
      { id: "mgmt_33", num: "第33回", title: "活動基準原価計算（ＡＢＣ）" },
    ]
  }
};

// ───────────────────────────────────────────
// 想起学習 問題バンク
// キー: 科目ID → 講義番号(数字) → 問題配列
// 講義番号は subjectsData の id の末尾数字と対応
// ───────────────────────────────────────────
const questionBank = {
  finCalc: {
    1: [
      { q: "当座預金と普通預金の違いは？", a: "当座預金：利息なし・小切手/手形決済用\n普通預金：利息あり・自由に入出金可能" },
      { q: "銀行勘定調整表の作成目的は？", a: "帳簿残高と銀行残高の不一致原因（未渡小切手・未取立小切手・未達振込等）を明らかにし、正しい残高を確認するため" },
      { q: "定額補充法（インプレスト法）の特徴は？", a: "一定期間後に支払総額分を補充する方法。補充のつど各費用科目で仕訳し、小口現金残高を常に定額に保つ" },
    ],
    2: [
      { q: "定率法の減価償却費の計算式は？", a: "期首帳簿価額 × 定率法償却率" },
      { q: "修繕費と資本的支出の区別基準は？", a: "価値増加・耐用年数延長 → 資本的支出（固定資産に算入）\n原状回復のための支出 → 修繕費（費用処理）" },
      { q: "200%定率法の切り替えはいつ行うか？", a: "定率法償却額が「改定取得価額×改定償却率」を下回った年度から、改定償却率による定額償却に切り替える" },
    ],
    4: [
      { q: "先入先出法の特徴は？", a: "先に仕入れた商品から先に払い出す方法。\n期末棚卸高は最近の仕入価格で評価される（インフレ時は棚卸高↑・売上原価↓）" },
      { q: "棚卸資産の低価法における評価損の処理は？", a: "原価と正味売却価額を比較し低い方で評価。\n評価損は原則として売上原価に算入（洗替法 or 切放法）" },
      { q: "売価還元法の原価率の計算式は？", a: "(期首原価＋当期仕入原価) ÷ (期首売価＋当期仕入売価＋値上額－値下額)" },
    ],
    5: [
      { q: "売買目的有価証券の期末評価方法は？", a: "時価評価。評価差額は当期損益（有価証券評価損益）として計上" },
      { q: "満期保有目的債券の取得差額がある場合の評価方法は？", a: "償却原価法（定額法または利息法）。取得差額を残存期間にわたって利息調整差額として配分" },
      { q: "その他有価証券の全部純資産直入法とは？", a: "期末評価差額（益・損いずれも）を全額「その他有価証券評価差額金」として純資産に計上（税効果会計を適用）" },
    ],
    6: [
      { q: "手形の割引とはどのような取引か？", a: "受取手形を満期前に金融機関に売却して資金化。割引料を差し引いた金額を受取る。遡及義務がある場合は偶発債務として注記" },
      { q: "貸倒引当金の個別評価と一般評価の違いは？", a: "個別評価：特定の債権ごとに回収可能性を個別判断\n一般評価：債権全体に対して過去の貸倒実績率等を適用" },
    ],
    7: [
      { q: "ファイナンス・リースの判定基準は？", a: "①解約不能（中途解約不可）\n②フルペイアウト（現在価値が取得価額の概ね90%以上、またはリース期間が耐用年数の概ね75%以上）\n両方を満たす場合" },
      { q: "研究開発費の会計処理は？", a: "発生時に全額費用処理（資産計上不可）\n※ソフトウェア制作費は一部資産計上可能" },
      { q: "自社利用ソフトウェアの資産計上要件は？", a: "将来の費用削減効果が確実に見込まれる場合のみ無形固定資産として計上可能" },
    ],
    12: [
      { q: "退職給付債務（PBO）の計算方法は？", a: "「退職給付見込額」を勤務期間で按分した期末時点での割引現在価値（割引率は優良社債の市場利回り）" },
      { q: "数理計算上の差異の処理方法は？", a: "翌期以降の一定期間（平均残存勤務期間以内）にわたって費用処理（遅延認識）。または即時認識も可能" },
      { q: "退職給付費用の構成要素は？", a: "①勤務費用\n②利息費用（PBO×割引率）\n③期待運用収益（△）\n④数理計算上の差異の費用処理額\n⑤過去勤務費用の費用処理額" },
    ],
    23: [
      { q: "ヘッジ会計の3要件は？", a: "①ヘッジ目的・方針の文書化\n②ヘッジ有効性の事前評価（80〜125%の範囲）\n③実際に高い有効性の事後確認" },
      { q: "為替予約の振当処理における直先差額の処理は？", a: "直物レートと先物レートの差額（直先差額）をヘッジ対象の期間にわたって按分・配分する（前受収益または前払費用）" },
      { q: "金利スワップの特例処理の適用条件は？", a: "①変動金利↔固定金利の交換\n②ヘッジ対象と元本・利払日・期間が一致\n③高い有効性が明らかに認められること" },
    ],
  },
  finTheory: {
    1: [
      { q: "財務会計の2大機能は？", a: "①情報提供機能（投資家への意思決定情報の提供）\n②利害調整機能（企業と利害関係者間の契約の履行確保）" },
      { q: "真実性の原則とは？", a: "企業の財政状態および経営成績について真実な報告を提供しなければならないという原則（相対的真実を求める）" },
      { q: "継続性の原則の趣旨は？", a: "一度採用した会計方針を毎期継続して適用する原則。期間比較可能性の確保と利益操作防止が目的" },
    ],
    2: [
      { q: "保守主義の原則の内容と限界は？", a: "費用・損失は早めに計上し、確実でない収益は計上しない原則。\nただし過度の保守主義は真実性の原則に反する" },
      { q: "収益費用アプローチと資産負債アプローチの違いは？", a: "収費A：P/L中心。当期収益と費用の対応で利益測定\n資負A：B/S中心。期末・期首の純資産の変動で利益測定（IFRSはこちら）" },
      { q: "発生主義会計とは？", a: "現金の収支と無関係に、経済的事実の発生を基準として収益・費用を認識する原則（⇔現金主義）" },
    ],
  },
  mgmt: {
    1: [
      { q: "原価計算の3つの目的は？", a: "①財務諸表目的（製品原価の計算）\n②原価管理目的（標準との比較・改善）\n③意思決定目的（CVP分析・設備投資等）" },
      { q: "製造原価の3要素は？", a: "①材料費\n②労務費\n③製造経費" },
      { q: "直接費と間接費の区別は？", a: "直接費：特定製品に直接跡付け可能な原価（直接材料費・直接労務費等）\n間接費：複数製品に共通に発生する原価（製造間接費）" },
    ],
    2: [
      { q: "先入先出法と平均法（総合原価計算）の違いは？", a: "先入先出法：期首仕掛品を先に完成とみなし、期首材料費と加工費を別計算\n平均法：期首と当月投入を合算した平均単価で計算（計算が簡便）" },
      { q: "材料消費量差異の計算式は？", a: "(実際消費量 - 標準消費量) × 標準単価\n（プラスが不利差異＝消費オーバー）" },
    ],
    3: [
      { q: "直接工と間接工の区別は？", a: "直接工：製品の直接加工に従事（賃金は直接労務費）\n間接工：補助的作業（運搬・保全等）に従事（賃金は製造間接費）" },
      { q: "賃率差異の計算式は？", a: "(実際賃率 - 標準賃率) × 実際時間\n（プラスが不利差異＝賃率が高かった）" },
    ],
    4: [
      { q: "製造間接費を予定配賦する目的は？", a: "①迅速な原価計算の実施\n②季節変動の平準化\n③操業度変動による単位コストの変動を防ぐ" },
      { q: "製造間接費差異の3分法の内訳は？", a: "①予算差異（実際発生額と予算許容額の差）\n②操業度差異（実際操業度と基準操業度の差×固定費率）\n③能率差異（実際時間と標準時間の差×配賦率）" },
    ],
  },
};

const REVIEW_SCHEDULE = [1, 3, 7, 14, 30, 90];

function calculateNextReviewDates(completedDate) {
  const dates = [];
  const baseDate = new Date(completedDate);
  for (const days of REVIEW_SCHEDULE) {
    const nextDate = new Date(baseDate);
    nextDate.setDate(nextDate.getDate() + days);
    dates.push({
      days,
      date: nextDate.toISOString().split('T')[0],
      label: `${days}日後`
    });
  }
  return dates;
}

function getAllReviewSchedules(records) {
  const scheduleMap = {};
  records.forEach(record => {
    record.reviewDates.forEach(rd => {
      if (!scheduleMap[rd.date]) {
        scheduleMap[rd.date] = [];
      }
      scheduleMap[rd.date].push({
        subjectName: record.subjectName,
        lectureNum: record.lectureNum,
        lectureTitle: record.lectureTitle,
      });
    });
  });
  return scheduleMap;
}

function CalendarView({ year, month, scheduleMap, onDateClick }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            {['日', '月', '火', '水', '木', '金', '土'].map(day => (
              <th key={day} style={{
                padding: '12px',
                textAlign: 'center',
                fontWeight: '600',
                borderBottom: '2px solid #667eea',
                color: day === '日' ? '#e74c3c' : day === '土' ? '#3498db' : '#2c3e50',
              }}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIdx) => (
            <tr key={weekIdx}>
              {week.map((day, dayIdx) => {
                const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
                const schedules = dateStr ? (scheduleMap[dateStr] || []) : [];
                const today = new Date().toISOString().split('T')[0];
                const isToday = dateStr === today;

                return (
                  <td
                    key={dayIdx}
                    onClick={() => dateStr && onDateClick(dateStr)}
                    style={{
                      padding: '12px',
                      border: '1px solid #ecf0f1',
                      minHeight: '100px',
                      verticalAlign: 'top',
                      cursor: dateStr ? 'pointer' : 'default',
                      background: isToday ? '#e8f5e9' : dateStr ? (schedules.length > 0 ? '#f0f8ff' : 'white') : '#f5f5f5',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (dateStr && schedules.length > 0) e.currentTarget.style.background = '#fff3cd';
                    }}
                    onMouseLeave={(e) => {
                      if (isToday) e.currentTarget.style.background = '#e8f5e9';
                      else if (dateStr && schedules.length > 0) e.currentTarget.style.background = '#f0f8ff';
                      else e.currentTarget.style.background = dateStr ? 'white' : '#f5f5f5';
                    }}
                  >
                    {day && (
                      <div>
                        <div style={{
                          fontWeight: '600',
                          color: dayIdx === 0 ? '#e74c3c' : dayIdx === 6 ? '#3498db' : '#2c3e50',
                          marginBottom: '4px',
                        }}>
                          {day}
                        </div>
                        {schedules.length > 0 && (
                          <div style={{
                            fontSize: '11px',
                            color: '#667eea',
                            fontWeight: '600',
                            background: '#e8f0ff',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            display: 'inline-block',
                          }}>
                            {schedules.length}件
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ───────────────────────────────────────────
// 想起学習タブ コンポーネント
// ───────────────────────────────────────────
function SokiGakushuTab({ learningRecords }) {
  const studiedIds = new Set(learningRecords.map(r => r.lectureId));
  const hasRecords = studiedIds.size > 0;

  const [filterMode, setFilterMode] = useState(hasRecords ? 'studied' : 'all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // 受講済み講義IDが変わったときにカードをリセット
  useEffect(() => {
    setCardIdx(0);
    setFlipped(false);
  }, [learningRecords.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // 問題リスト構築（古い順 = 講義番号の昇順）
  const buildQuestions = () => {
    const out = [];
    // 科目の順番を固定
    const subjectOrder = ['finCalc', 'finTheory', 'mgmt'];
    subjectOrder.forEach(sid => {
      if (selectedSubject !== 'all' && selectedSubject !== sid) return;
      const lmap = questionBank[sid];
      if (!lmap) return;
      // 講義番号の昇順にソート
      const nums = Object.keys(lmap).map(Number).sort((a, b) => a - b);
      nums.forEach(n => {
        const lid = `${sid}_${n}`;
        if (filterMode === 'studied' && !studiedIds.has(lid)) return;
        lmap[n].forEach(q => out.push({ ...q, sid, n, lid }));
      });
    });
    return out;
  };

  const questions = buildQuestions();
  const safeIdx = Math.max(0, Math.min(cardIdx, Math.max(questions.length - 1, 0)));
  const q = questions[safeIdx];
  const pct = questions.length > 0 ? Math.round(((safeIdx + 1) / questions.length) * 100) : 0;

  const handleFilterChange = (mode) => {
    setFilterMode(mode);
    setCardIdx(0);
    setFlipped(false);
  };

  const handleSubjectChange = (subj) => {
    setSelectedSubject(subj);
    setCardIdx(0);
    setFlipped(false);
  };

  const goNext = () => {
    if (safeIdx < questions.length - 1) {
      setCardIdx(safeIdx + 1);
      setFlipped(false);
    }
  };

  const goPrev = () => {
    if (safeIdx > 0) {
      setCardIdx(safeIdx - 1);
      setFlipped(false);
    }
  };

  const totalBySubject = (sid) =>
    Object.values(questionBank[sid] || {}).reduce((s, a) => s + a.length, 0);

  const subjectBadgeStyle = {
    finCalc:   { background: '#ede9fe', color: '#5b21b6' },
    finTheory: { background: '#dbeafe', color: '#1e40af' },
    mgmt:      { background: '#d1fae5', color: '#065f46' },
  };

  const subjectNames = {
    finCalc: '財務会計（計算）',
    finTheory: '財務会計（理論）',
    mgmt: '管理会計論',
  };

  const styles = {
    card: {
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '16px',
      color: '#2c3e50',
    },
    input: {
      padding: '10px',
      border: '1px solid #bdc3c7',
      borderRadius: '6px',
      fontSize: '14px',
      marginBottom: '10px',
      width: '100%',
      boxSizing: 'border-box',
    },
    btn: {
      padding: '9px 20px',
      borderRadius: '8px',
      border: '1px solid #bdc3c7',
      background: 'white',
      color: '#2c3e50',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '600',
    },
    btnPrimary: {
      padding: '9px 20px',
      borderRadius: '8px',
      border: '1px solid #667eea',
      background: '#667eea',
      color: 'white',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '600',
    },
  };

  return (
    <div>
      {/* フィルタコントロール */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>🧠 想起学習カード</div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '4px' }}>
          {/* 科目フィルタ */}
          <select
            style={{ ...styles.input, marginBottom: 0, flex: 1, minWidth: '160px' }}
            value={selectedSubject}
            onChange={e => handleSubjectChange(e.target.value)}
          >
            <option value="all">全科目</option>
            <option value="finCalc">財務会計（計算）</option>
            <option value="finTheory">財務会計（理論）</option>
            <option value="mgmt">管理会計論</option>
          </select>

          {/* 受講済み / 全問 切り替え */}
          <div style={{ display: 'flex', border: '1px solid #bdc3c7', borderRadius: '8px', overflow: 'hidden' }}>
            <button
              style={{
                padding: '9px 14px', border: 'none', fontSize: '13px', cursor: 'pointer',
                background: filterMode === 'studied' ? '#667eea' : 'white',
                color: filterMode === 'studied' ? 'white' : '#2c3e50',
                fontWeight: '600',
              }}
              onClick={() => handleFilterChange('studied')}
            >
              受講済みのみ
            </button>
            <button
              style={{
                padding: '9px 14px', border: 'none', fontSize: '13px', cursor: 'pointer',
                background: filterMode === 'all' ? '#667eea' : 'white',
                color: filterMode === 'all' ? 'white' : '#2c3e50',
                fontWeight: '600',
              }}
              onClick={() => handleFilterChange('all')}
            >
              全問
            </button>
          </div>
        </div>

        {/* 受講記録ステータス */}
        <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '10px' }}>
          {hasRecords
            ? `受講記録：${studiedIds.size}講義 · 収録問題：計算${totalBySubject('finCalc')}問 / 理論${totalBySubject('finTheory')}問 / 管理会計${totalBySubject('mgmt')}問`
            : `受講記録なし（全問モード） · 収録問題：計算${totalBySubject('finCalc')}問 / 理論${totalBySubject('finTheory')}問 / 管理会計${totalBySubject('mgmt')}問`
          }
        </div>
      </div>

      {/* 問題がない場合 */}
      {questions.length === 0 ? (
        <div style={{ ...styles.card, textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>📭</div>
          <div style={{ fontSize: '14px', color: '#7f8c8d', lineHeight: '1.7' }}>
            受講済みの講義に対応する問題がありません。<br />
            「全問」モードに切り替えるか、先に受講記録を追加してください。
          </div>
          <button style={{ ...styles.btn, marginTop: '16px' }} onClick={() => handleFilterChange('all')}>
            全問モードで表示
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          {/* 進捗 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '13px', color: '#7f8c8d' }}>{safeIdx + 1} / {questions.length} 問</span>
            {q && (
              <span style={{
                fontSize: '11px', fontWeight: '600', padding: '2px 10px', borderRadius: '20px',
                ...subjectBadgeStyle[q.sid],
              }}>
                {subjectNames[q.sid]} 第{q.n}回
              </span>
            )}
          </div>
          <div style={{ height: '4px', background: '#ecf0f1', borderRadius: '2px', marginBottom: '20px' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: '#667eea', borderRadius: '2px', transition: 'width 0.3s' }} />
          </div>

          {/* フラッシュカード */}
          <div
            onClick={() => setFlipped(!flipped)}
            style={{
              perspective: '1200px',
              height: '200px',
              cursor: 'pointer',
              marginBottom: '20px',
              userSelect: 'none',
            }}
          >
            <div style={{
              position: 'relative', width: '100%', height: '100%',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s cubic-bezier(.4,0,.2,1)',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}>
              {/* 表：問題 */}
              <div style={{
                position: 'absolute', width: '100%', height: '100%',
                backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                borderRadius: '12px', border: '1px solid #ecf0f1',
                background: 'white',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '20px 28px', textAlign: 'center',
              }}>
                <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', background: '#ede9fe', color: '#5b21b6', marginBottom: '12px' }}>
                  問題
                </span>
                <div style={{ fontSize: '15px', lineHeight: '1.75', color: '#2c3e50', whiteSpace: 'pre-wrap' }}>
                  {q && q.q}
                </div>
                <div style={{ marginTop: '14px', fontSize: '12px', color: '#95a5a6' }}>
                  タップ / クリックで答えを見る
                </div>
              </div>

              {/* 裏：答え */}
              <div style={{
                position: 'absolute', width: '100%', height: '100%',
                backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                borderRadius: '12px', border: '1px solid #ecf0f1',
                background: '#f0f8ff',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '20px 28px', textAlign: 'center',
              }}>
                <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', background: '#d1fae5', color: '#065f46', marginBottom: '12px' }}>
                  答え
                </span>
                <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#2c3e50', whiteSpace: 'pre-wrap' }}>
                  {q && q.a}
                </div>
              </div>
            </div>
          </div>

          {/* ナビゲーション */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
            <button style={{ ...styles.btn, opacity: safeIdx === 0 ? 0.4 : 1 }} onClick={goPrev} disabled={safeIdx === 0}>
              ← 前へ
            </button>
            <button style={styles.btnPrimary} onClick={() => setFlipped(!flipped)}>
              {flipped ? '問題に戻る' : '答えを見る'}
            </button>
            <button style={{ ...styles.btn, opacity: safeIdx >= questions.length - 1 ? 0.4 : 1 }} onClick={goNext} disabled={safeIdx >= questions.length - 1}>
              次へ →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────
// メインアプリ
// ───────────────────────────────────────────
export default function CPALearningApp() {
  const [activeTab, setActiveTab] = useState('manage');
  const [learningRecords, setLearningRecords] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('finCalc');
  const [selectedLecture, setSelectedLecture] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [expandedRecord, setExpandedRecord] = useState({});
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('cpa_learning_records_final');
    if (saved) setLearningRecords(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cpa_learning_records_final', JSON.stringify(learningRecords));
  }, [learningRecords]);

  useEffect(() => {
    setSelectedLecture('');
  }, [selectedSubject]);

  const addRecord = () => {
    if (!selectedLecture) {
      alert('講義を選択してください');
      return;
    }
    const currentSubject = subjectsData[selectedSubject];
    const lecture = currentSubject.lectures.find(l => l.id === selectedLecture);
    const newRecord = {
      id: Date.now(),
      subjectId: selectedSubject,
      subjectName: currentSubject.name,
      lectureId: selectedLecture,
      lectureNum: lecture.num,
      lectureTitle: lecture.title,
      completedDate: selectedDate,
      reviewDates: calculateNextReviewDates(selectedDate),
    };
    setLearningRecords([...learningRecords, newRecord]);
    setSelectedLecture('');
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const deleteRecord = (id) => {
    setLearningRecords(learningRecords.filter(r => r.id !== id));
  };

  const scheduleMap = getAllReviewSchedules(learningRecords);
  const currentSubject = subjectsData[selectedSubject];

  // 想起学習タブに表示する問題数（受講済みのみ）
  const studiedIds = new Set(learningRecords.map(r => r.lectureId));
  const sokiQuestionCount = Object.entries(questionBank).reduce((total, [sid, lmap]) => {
    return total + Object.entries(lmap).reduce((s, [n, arr]) => {
      return s + (studiedIds.has(`${sid}_${n}`) ? arr.length : 0);
    }, 0);
  }, 0);

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      background: '#f5f7fa',
      minHeight: '100vh',
    },
    header: {
      background: '#2c3e50',
      color: 'white',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '24px',
      textAlign: 'center',
    },
    tabContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      flexWrap: 'wrap',
    },
    tabButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
    },
    card: {
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '16px',
      color: '#2c3e50',
    },
    input: {
      padding: '10px',
      border: '1px solid #bdc3c7',
      borderRadius: '6px',
      fontSize: '14px',
      marginBottom: '10px',
      width: '100%',
      boxSizing: 'border-box',
    },
    button: {
      padding: '10px 20px',
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
    },
    recordItem: {
      padding: '16px',
      background: '#f8f9fb',
      borderRadius: '8px',
      marginBottom: '12px',
      borderLeft: '4px solid #667eea',
    },
    reviewSchedule: {
      marginTop: '10px',
      padding: '10px',
      background: '#e8f5e9',
      borderRadius: '6px',
      fontSize: '13px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>📚 CPA試験 学習管理システム</h1>
        <p>復習スケジューラー</p>
      </div>

      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tabButton,
            background: activeTab === 'manage' ? '#667eea' : '#ecf0f1',
            color: activeTab === 'manage' ? 'white' : '#2c3e50',
          }}
          onClick={() => setActiveTab('manage')}
        >
          📚 受講状況管理
        </button>
        <button
          style={{
            ...styles.tabButton,
            background: activeTab === 'calendar' ? '#667eea' : '#ecf0f1',
            color: activeTab === 'calendar' ? 'white' : '#2c3e50',
          }}
          onClick={() => setActiveTab('calendar')}
        >
          📅 復習カレンダー
        </button>
        <button
          style={{
            ...styles.tabButton,
            background: activeTab === 'soki' ? '#667eea' : '#ecf0f1',
            color: activeTab === 'soki' ? 'white' : '#2c3e50',
          }}
          onClick={() => setActiveTab('soki')}
        >
          🧠 想起学習
          {sokiQuestionCount > 0 && (
            <span style={{
              marginLeft: '8px',
              background: activeTab === 'soki' ? 'rgba(255,255,255,0.3)' : '#667eea',
              color: 'white',
              fontSize: '11px',
              fontWeight: '700',
              padding: '2px 7px',
              borderRadius: '10px',
            }}>
              {sokiQuestionCount}問
            </span>
          )}
        </button>
      </div>

      {activeTab === 'manage' && (
        <div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>📚 受講記録を追加</div>

            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>科目を選択</label>
            <select
              style={styles.input}
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {Object.entries(subjectsData).map(([key, subject]) => (
                <option key={key} value={key}>{subject.name}</option>
              ))}
            </select>

            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>講義を選択</label>
            <select
              style={styles.input}
              value={selectedLecture}
              onChange={(e) => setSelectedLecture(e.target.value)}
            >
              <option value="">-- 講義を選択 --</option>
              {currentSubject.lectures.map(lec => (
                <option key={lec.id} value={lec.id}>{lec.num} {lec.title}</option>
              ))}
            </select>

            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>受講日</label>
            <input
              type="date"
              style={styles.input}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button style={styles.button} onClick={addRecord}>
              <Plus size={16} style={{ display: 'inline', marginRight: '5px' }} />
              記録を追加
            </button>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>📋 受講履歴（{learningRecords.length}件）</div>
            {learningRecords.length === 0 ? (
              <p style={{ color: '#7f8c8d' }}>まだ記録がありません</p>
            ) : (
              learningRecords.map(record => (
                <div key={record.id} style={styles.recordItem}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#667eea', fontWeight: '600', marginBottom: '4px' }}>
                        {record.subjectName}
                      </div>
                      <strong>{record.lectureNum} {record.lectureTitle}</strong>
                      <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '5px' }}>
                        受講日：{record.completedDate}
                      </div>
                    </div>
                    <button
                      style={{ padding: '8px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                      onClick={() => deleteRecord(record.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button
                    style={{
                      padding: '8px 12px', background: 'transparent', border: '1px solid #667eea',
                      color: '#667eea', borderRadius: '6px', cursor: 'pointer', marginTop: '10px', fontSize: '12px',
                    }}
                    onClick={() => setExpandedRecord(expandedRecord[record.id] ? {} : { [record.id]: true })}
                  >
                    {expandedRecord[record.id] ? '復習予定を隠す' : '復習予定を表示'}
                    <ChevronDown size={12} style={{ display: 'inline', marginLeft: '5px' }} />
                  </button>
                  {expandedRecord[record.id] && (
                    <div style={styles.reviewSchedule}>
                      <strong>復習予定日：</strong>
                      <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
                        {record.reviewDates.map((rd, idx) => (
                          <li key={idx}>{rd.label}：{rd.date}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div>
          <div style={styles.card}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',
            }}>
              <button
                style={{ ...styles.button, padding: '8px 12px', background: 'transparent', color: '#667eea', border: '1px solid #667eea' }}
                onClick={() => {
                  if (calendarMonth === 0) { setCalendarYear(calendarYear - 1); setCalendarMonth(11); }
                  else setCalendarMonth(calendarMonth - 1);
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#2c3e50' }}>
                {calendarYear}年 {calendarMonth + 1}月
              </div>
              <button
                style={{ ...styles.button, padding: '8px 12px', background: 'transparent', color: '#667eea', border: '1px solid #667eea' }}
                onClick={() => {
                  if (calendarMonth === 11) { setCalendarYear(calendarYear + 1); setCalendarMonth(0); }
                  else setCalendarMonth(calendarMonth + 1);
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <CalendarView
              year={calendarYear}
              month={calendarMonth}
              scheduleMap={scheduleMap}
              onDateClick={(date) => setSelectedCalendarDate(date)}
            />
          </div>

          {selectedCalendarDate && (
            <div style={styles.card}>
              <div style={styles.cardTitle}>📅 {selectedCalendarDate}の復習予定</div>
              {(scheduleMap[selectedCalendarDate] || []).length === 0 ? (
                <p style={{ color: '#7f8c8d' }}>この日の復習予定はありません</p>
              ) : (
                (scheduleMap[selectedCalendarDate] || []).map((schedule, idx) => (
                  <div key={idx} style={{
                    padding: '16px', background: '#f0f8ff', borderRadius: '8px',
                    marginBottom: '12px', borderLeft: '4px solid #3498db',
                  }}>
                    <div style={{ fontSize: '12px', color: '#667eea', fontWeight: '600', marginBottom: '4px' }}>
                      {schedule.subjectName}
                    </div>
                    <strong>{schedule.lectureNum} {schedule.lectureTitle}</strong>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'soki' && (
        <SokiGakushuTab learningRecords={learningRecords} />
      )}
    </div>
  );
}
