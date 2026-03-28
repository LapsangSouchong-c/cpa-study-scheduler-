import React, { useState, useEffect, useCallback } from 'react';

// 財務会計論 全問題データ
const chaptersData = [
  { id: "ch1", num: "第1章", title: "現金預金", questions: ["現金の範囲に含まれるものは？","現金の貸借対照表価額はどういう金額？","現金の範囲に含めてはいけないものは？","外国通貨の貸借対照表価額の算定方法は？","雑損(雑益)の算定方法は？","当座借越の貸借対照表上の表示科目・表示区分は？","銀行勘定調整表において，企業側の修正項目には何がある？","銀行勘定調整表において，銀行側の修正項目には何がある？","当座預金の貸借対照表価額はどういう金額？","定期預金のうち「現金及び預金」として計上されるのはどういう金額？","定期預金について，決算日と利払日が異なる場合の処理は？","定額資金前渡制はどういう方法？"] },
  { id: "ch2", num: "第2章", title: "有形固定資産", questions: ["営業の用に供している有形固定資産の減価償却費の表示区分は？","投資の目的で所有する固定資産の減価償却費の表示区分は？","休止固定資産の減価償却費の表示区分は？","有形固定資産の取得時に生じた付随費用や値引を受けた場合の処理は？","建設仮勘定の処理は？","買換(値引を把握する方法)の処理は？","買換(値引を把握しない方法)の処理は？","異なる有形固定資産を一括購入した場合の処理は？","建物を新築する目的で建物付土地を取得した場合の処理は？","同種資産の交換の処理は？","異種資産の交換の処理は？","贈与の処理は？","現物出資の処理は？","自家建設の処理は？(原則法)","自家建設の処理は？(容認法)","減価償却を実施しない有形固定資産には何がある？","新定率法(200％定率法)の償却率の算定方法は？","新定率法における償却保証額の算定方法は？","新定率法において，どのような場合に償却方法を切り替える？","新定率法における改定償却額の算定方法は？","生産高比例法における減価償却費の算定方法は？","級数法における減価償却費の算定方法は？","総合償却における減価償却費の算定方法は？","期中売却(除却)時の減価償却費の算定方法は？","火災発生時の帳簿価額＜保険契約額となる場合の処理は？","火災発生時の帳簿価額＞保険契約額となる場合の処理は？","火災における保険金確定時の処理は？","火災における後片付け費用・廃材の処理は？","当期首に耐用年数を変更した場合の減価償却費の算定方法は？","当期末に耐用年数を変更した場合の減価償却費の算定方法は？","定額法から定率法に変更した場合の減価償却費の算定方法は？","定率法から定額法に変更した場合の減価償却費の算定方法は？","資本的支出・収益的支出それぞれの支出時の処理は？","修繕支出額を資本的支出部分と収益的支出部分に区分する計算方法は？","資本的支出がなされた場合の減価償却費の算定方法は？","圧縮記帳(直接減額方式)の処理は？","圧縮記帳の対象にはどういったものがある？"] },
  { id: "ch3", num: "第3章", title: "無形固定資産・繰延資産", questions: ["吸収合併の際，どのような金額で資産・負債を引き継ぐ？","無形固定資産の償却方法は？","償却を実施しない無形固定資産には何がある？","経過勘定のうち，一年基準で分類するのは何？","繰延資産として扱うことができる５項目とは？","繰延資産の支出時の処理は？","繰延資産として処理することが認められないものには何がある？","繰延資産の決算時の処理は？","支出の効果が期待されなくなった繰延資産の処理は？","株式交付費の償却期間と表示区分は？","社債発行費等の償却期間と表示区分は？","創立費の償却期間と表示区分は？","開業費の償却期間と表示区分は？","開発費の償却期間と表示区分は？"] },
  { id: "ch4", num: "第4章", title: "引当金", questions: ["負債の部に計上されない引当金とは？","賞与引当金の計上額の算定方法は？","賞与支給額が確定している場合の処理は？","どのような場合に債務保証損失引当金を計上できる？"] },
  { id: "ch5", num: "第5章", title: "商品売買・棚卸資産", questions: ["売上総利益の算定方法は？","売上原価の算定方法は？","商品の購入に係る付随費用(仕入諸掛)はどのように処理する？","商品の販売に係る付随費用(売上諸掛)はどのように処理する？","仕入戻し・仕入値引・仕入割戻・仕入割引はそれぞれどのように処理する？","先入先出法とは？","移動平均法とは？","総平均法とは？","最終仕入原価法とは？","棚卸減耗費・商品評価損の算定方法は？","正味売却価額の算定方法は？","棚卸減耗費の表示区分は？","商品評価損の表示区分は？","種類別を採用した場合の商品評価損の算定方法は？","グループ別を採用した場合の商品評価損の算定方法は？","見本品の提供など，販売以外の原因で商品が減少した場合の処理は？","売価還元法における期末帳簿棚卸高(売価)の算定方法は？","売価還元平均原価法の原価率の算定方法は？","売価還元平均原価法における期末帳簿棚卸高(原価)の算定方法は？","売価還元平均原価法における棚卸減耗費・商品評価損の算定方法は？","売価還元低価法の原価率の算定方法は？","売価還元低価法(商品評価損を認識する)における期末帳簿棚卸高(原価)の算定方法は？","売価還元低価法(商品評価損を認識しない)における期末帳簿棚卸高(原価)の算定方法は？"] },
  { id: "ch6", num: "第6章", title: "本支店会計", questions: ["未達事項の金額を推定する場合，どのように計算する？","合併損益計算書に計上される売上高・仕入高はどういう金額か？","決算整理前残高試算表の繰延内部利益はどういう金額を意味している？","合併損益計算書における期首商品棚卸高の算定方法は？","合併損益計算書における期末商品棚卸高の算定方法は？","利益率とは何か？","利益加算率とは何か？","本支店間で商品売買を行っている場合，棚卸減耗費・商品評価損はどのように算定する？","支店分散計算制度の場合，支店間の取引についてどのように処理する？","本店集中計算制度の場合，支店間の取引についてどのように処理する？"] },
  { id: "ch7", num: "第7章", title: "１株当たり情報", questions: ["１株当たり当期純利益の算定方法は？","普通株主に帰属しない金額とは？(EPS算定)","連結財務諸表におけるEPSの算定方法は？","期中平均株式数の算定方法は？","自己株式を期中で取得している場合の期中平均自己株式数の算定方法は？","「希薄化効果を有する場合」とはどのような場合か？","転換社債型新株予約権付社債：潜在株式調整後EPSの算定方法は？","新株予約権(ワラント)：潜在株式調整後EPSの算定方法は？","株式併合・株式分割が行われた場合のEPSの算定方法は？","１株当たり純資産額の算定方法は？"] },
];

const SYSTEM_PROMPT = `あなたは日本の公認会計士試験(CPA試験)の財務会計論の専門家です。簡潔・正確に答えてください。回答はJSON配列のみで返してください。形式：[{"a":"答え1"},...]`;
const PER_DAY = 15;

function getTodayDayNumber() {
  const origin = new Date("2025-01-01T00:00:00");
  const now = new Date();
  return Math.floor((now - origin) / 86400000);
}

function buildFlatList(chapters) {
  const flat = [];
  for (const ch of chapters) {
    for (let i = 0; i < ch.questions.length; i++) {
      flat.push({ chId: ch.id, chNum: ch.num, chTitle: ch.title, qIndex: i, q: ch.questions[i] });
    }
  }
  return flat;
}

export default function CPALearningApp() {
  const [todayItems, setTodayItems] = useState(null);
  const [todayLoading, setTodayLoading] = useState(false);
  const [todayRevealed, setTodayRevealed] = useState({});
  const [completedLectures, setCompletedLectures] = useState(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('cpa_completed_lectures');
    if (saved) setCompletedLectures(new Set(JSON.parse(saved)));
  }, []);

  const generateTodayAnswers = useCallback(async () => {
    if (todayLoading || todayItems) return;

    const completedLectureIds = Array.from(completedLectures);
    if (completedLectureIds.length === 0) {
      alert('受講した講義を記録してから出題できます');
      return;
    }

    const flatList = buildFlatList(chaptersData);
    if (flatList.length === 0) {
      alert('出題可能な問題がありません');
      return;
    }

    const dayNumber = getTodayDayNumber();
    const cycleDayIndex = dayNumber % Math.ceil(flatList.length / PER_DAY);
    const todayStart = cycleDayIndex * PER_DAY;
    const todaySlice = flatList.slice(todayStart, todayStart + PER_DAY);

    setTodayLoading(true);
    setTodayRevealed({});

    const questionList = todaySlice.map((item, i) => `${i + 1}. ${item.q}`).join("\n");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: `財務会計論の以下の${todaySlice.length}問に答えてください。\n\n${questionList}\n\nJSON配列のみで返してください：[{"a":"答え1"},...]` }]
        })
      });

      const data = await response.json();
      const text = data.content?.find(b => b.type === "text")?.text || "[]";
      let answers = [];
      try { 
        answers = JSON.parse(text.replace(/```json|```/g, "").trim()); 
      } catch {}

      setTodayItems(todaySlice.map((item, i) => ({ 
        ...item, 
        a: answers[i]?.a || "（回答を再取得してください）" 
      })));
    } catch (err) {
      console.error(err);
      setTodayItems(todaySlice.map(item => ({ 
        ...item, 
        a: "エラーが発生しました" 
      })));
    } finally {
      setTodayLoading(false);
    }
  }, [todayLoading, todayItems, completedLectures]);

  const toggleCompletedLecture = (lectureId) => {
    const updated = new Set(completedLectures);
    updated.has(lectureId) ? updated.delete(lectureId) : updated.add(lectureId);
    setCompletedLectures(updated);
    localStorage.setItem('cpa_completed_lectures', JSON.stringify(Array.from(updated)));
  };

  const styles = {
    container: {
      maxWidth: '900px',
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
    button: {
      padding: '10px 20px',
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      width: '100%',
    },
    questionCard: {
      padding: '16px',
      background: '#f8f9fb',
      borderRadius: '8px',
      marginBottom: '12px',
      borderLeft: '4px solid #667eea',
      cursor: 'pointer',
    },
    lectureItem: {
      padding: '12px',
      background: '#f8f9fb',
      borderRadius: '8px',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>📚 CPA試験 毎日の問題</h1>
        <p>財務会計論：1日15問で1ヶ月1周</p>
      </div>

      {/* 学習内容管理 */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>📚 受講状況（チェックして記録）</div>
        <div>
          {chaptersData.map(chapter => (
            <div
              key={chapter.id}
              style={styles.lectureItem}
              onClick={() => toggleCompletedLecture(chapter.id)}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                border: `2px solid ${completedLectures.has(chapter.id) ? '#27ae60' : '#bdc3c7'}`,
                background: completedLectures.has(chapter.id) ? '#27ae60' : 'white',
                color: 'white',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {completedLectures.has(chapter.id) && '✓'}
              </div>
              <div>
                <strong>{chapter.num}</strong> {chapter.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 毎日の問題 */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>📝 本日の問題</div>
        <p style={{ color: '#7f8c8d', marginBottom: '16px' }}>
          受講した章から1日15問出題。1ヶ月で全範囲を1周できます。
        </p>

        {!todayItems && (
          <button style={styles.button} onClick={generateTodayAnswers} disabled={todayLoading}>
            {todayLoading ? '生成中...' : '本日の問題を生成'}
          </button>
        )}

        {todayItems && (
          <div>
            <div style={{ marginBottom: '16px', fontSize: '12px', color: '#7f8c8d' }}>
              全{todayItems.length}問
            </div>
            {todayItems.map((item, idx) => (
              <div
                key={idx}
                style={styles.questionCard}
                onClick={() => setTodayRevealed({ ...todayRevealed, [idx]: !todayRevealed[idx] })}
              >
                <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                  問{idx + 1}: {item.q}
                </div>
                {todayRevealed[idx] && (
                  <div style={{
                    background: '#e8f5e9',
                    padding: '12px',
                    borderRadius: '6px',
                    marginTop: '8px',
                    lineHeight: '1.6',
                    fontSize: '13px',
                  }}>
                    {item.a}
                  </div>
                )}
                <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '8px' }}>
                  {item.chTitle}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
