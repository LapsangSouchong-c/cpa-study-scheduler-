import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Trash2, Plus, ChevronDown } from 'lucide-react';

// 科目ごとの章データ
const subjectsData = {
  finCalc: {
    name: '財務会計論（計算）',
    chapters: [
      { id: "fincalc_ch1", num: "第1章", title: "現金預金", questions: ["現金の範囲に含まれるものは？","現金の貸借対照表価額はどういう金額？","現金の範囲に含めてはいけないものは？","外国通貨の貸借対照表価額の算定方法は？","雑損(雑益)の算定方法は？"] },
      { id: "fincalc_ch2", num: "第2章", title: "有形固定資産", questions: ["営業の用に供している有形固定資産の減価償却費の表示区分は？","投資の目的で所有する固定資産の減価償却費の表示区分は？","休止固定資産の減価償却費の表示区分は？"] },
      { id: "fincalc_ch3", num: "第3章", title: "無形固定資産・繰延資産", questions: ["吸収合併の際，どのような金額で資産・負債を引き継ぐ？","無形固定資産の償却方法は？","償却を実施しない無形固定資産には何がある？"] },
      { id: "fincalc_ch4", num: "第4章", title: "引当金", questions: ["負債の部に計上されない引当金とは？","賞与引当金の計上額の算定方法は？","賞与支給額が確定している場合の処理は？"] },
      { id: "fincalc_ch5", num: "第5章", title: "商品売買・棚卸資産", questions: ["売上総利益の算定方法は？","売上原価の算定方法は？","商品の購入に係る付随費用(仕入諸掛)はどのように処理する？"] },
    ]
  },
  finTheory: {
    name: '財務会計論（理論）',
    chapters: [
      { id: "fintheory_ch1", num: "第1章", title: "概念フレームワーク", questions: ["会計目的とは何か？","財務報告の目的は？","有用性とは？"] },
      { id: "fintheory_ch2", num: "第2章", title: "資産の定義と認識", questions: ["資産の定義は？","資産の認識要件は？","当初測定と時点評価は？"] },
      { id: "fintheory_ch3", num: "第3章", title: "負債と純資産", questions: ["負債の定義は？","純資産の構成要素は？","資本剰余金と利益剰余金の違いは？"] },
    ]
  },
  mgmt: {
    name: '管理会計論',
    chapters: [
      { id: "mgmt_ch1", num: "第1章", title: "原価計算基礎", questions: ["原価計算の目的は？","製造原価と販売費・一般管理費の区別は？","直接費と間接費の違いは？"] },
      { id: "mgmt_ch2", num: "第2章", title: "標準原価計算", questions: ["標準原価とは？","予定価格と実際価格の差は？","標準数量と実績数量の差は？"] },
      { id: "mgmt_ch3", num: "第3章", title: "経営意思決定", questions: ["意思決定の種類は？","関連原価とは？","差額分析とは？"] },
    ]
  }
};

const REVIEW_SCHEDULE = [1, 3, 7, 14, 30, 90]; // 日数（忘却曲線）
const SYSTEM_PROMPT = `あなたは日本の公認会計士試験(CPA試験)の会計専門家です。簡潔・正確に答えてください。回答はJSON配列のみで返してください。形式：[{"a":"答え1"},...]`;
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

export default function CPALearningApp() {
  const [activeTab, setActiveTab] = useState('manage');
  const [learningRecords, setLearningRecords] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('finCalc');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [expandedRecord, setExpandedRecord] = useState({});
  const [todayItems, setTodayItems] = useState(null);
  const [todayLoading, setTodayLoading] = useState(false);
  const [todayRevealed, setTodayRevealed] = useState({});
  const [completedLectures, setCompletedLectures] = useState(new Set());

  // LocalStorage 読み込み
  useEffect(() => {
    const saved = localStorage.getItem('cpa_learning_records_final');
    if (saved) setLearningRecords(JSON.parse(saved));
    
    const savedCompleted = localStorage.getItem('cpa_completed_lectures');
    if (savedCompleted) setCompletedLectures(new Set(JSON.parse(savedCompleted)));
  }, []);

  // LocalStorage 保存
  useEffect(() => {
    localStorage.setItem('cpa_learning_records_final', JSON.stringify(learningRecords));
  }, [learningRecords]);

  useEffect(() => {
    localStorage.setItem('cpa_completed_lectures', JSON.stringify(Array.from(completedLectures)));
  }, [completedLectures]);

  // 科目が変わったら章を初期化
  useEffect(() => {
    setSelectedChapter('');
  }, [selectedSubject]);

  // 受講記録を追加
  const addRecord = () => {
    if (!selectedChapter) {
      alert('章を選択してください');
      return;
    }
    
    const currentSubject = subjectsData[selectedSubject];
    const chapter = currentSubject.chapters.find(ch => ch.id === selectedChapter);
    
    const newRecord = {
      id: Date.now(),
      subjectId: selectedSubject,
      subjectName: currentSubject.name,
      chapterId: selectedChapter,
      chapterNum: chapter.num,
      chapterTitle: chapter.title,
      completedDate: selectedDate,
      reviewDates: calculateNextReviewDates(selectedDate),
    };
    
    setLearningRecords([...learningRecords, newRecord]);
    completedLectures.add(selectedChapter);
    setCompletedLectures(new Set(completedLectures));
    setSelectedChapter('');
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  // 受講記録を削除
  const deleteRecord = (id) => {
    setLearningRecords(learningRecords.filter(r => r.id !== id));
  };

  // 毎日の問題を生成
  const generateTodayAnswers = useCallback(async () => {
    if (todayLoading || todayItems) return;

    const completedLectureIds = Array.from(completedLectures);
    if (completedLectureIds.length === 0) {
      alert('受講した講義を記録してから出題できます');
      return;
    }

    // 全科目の章をまとめる
    const allChapters = Object.values(subjectsData).flatMap(subject => subject.chapters);
    const flatList = buildFlatList(allChapters);

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
          messages: [{ role: "user", content: `会計論の以下の${todaySlice.length}問に答えてください。\n\n${questionList}\n\nJSON配列のみで返してください：[{"a":"答え1"},...]` }]
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
      transition: 'all 0.3s',
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
      marginRight: '10px',
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
    questionCard: {
      padding: '16px',
      background: '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '12px',
      borderLeft: '4px solid #667eea',
      cursor: 'pointer',
    },
    answerBox: {
      background: '#e8f5e9',
      padding: '12px',
      borderRadius: '6px',
      marginTop: '8px',
      lineHeight: '1.6',
      fontSize: '13px',
      color: '#1b5e20',
    },
  };

  const currentSubject = subjectsData[selectedSubject];
  const currentChapters = currentSubject.chapters;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>📚 CPA試験 学習管理システム</h1>
        <p>復習スケジューラー + 毎日の問題</p>
      </div>

      {/* タブナビゲーション */}
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
            background: activeTab === 'schedule' ? '#667eea' : '#ecf0f1',
            color: activeTab === 'schedule' ? 'white' : '#2c3e50',
          }}
          onClick={() => setActiveTab('schedule')}
        >
          📅 復習スケジューラー
        </button>
        <button
          style={{
            ...styles.tabButton,
            background: activeTab === 'daily' ? '#667eea' : '#ecf0f1',
            color: activeTab === 'daily' ? 'white' : '#2c3e50',
          }}
          onClick={() => setActiveTab('daily')}
        >
          📝 毎日の問題
        </button>
      </div>

      {/* 受講状況管理タブ */}
      {activeTab === 'manage' && (
        <div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>📚 受講記録を追加</div>
            <div>
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

              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>章を選択</label>
              <select
                style={styles.input}
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
              >
                <option value="">-- 章を選択 --</option>
                {currentChapters.map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.num} {ch.title}</option>
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
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>📋 受講履歴</div>
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
                      <strong>{record.chapterNum} {record.chapterTitle}</strong>
                      <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '5px' }}>
                        受講日：{record.completedDate}
                      </div>
                    </div>
                    <button
                      style={{
                        padding: '8px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                      onClick={() => deleteRecord(record.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button
                    style={{
                      padding: '8px 12px',
                      background: 'transparent',
                      border: '1px solid #667eea',
                      color: '#667eea',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginTop: '10px',
                      fontSize: '12px',
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

      {/* 復習スケジューラータブ */}
      {activeTab === 'schedule' && (
        <div style={styles.card}>
          <div style={styles.cardTitle}>📅 本日の復習予定</div>
          <p style={{ color: '#7f8c8d', marginBottom: '16px' }}>
            受講日から忘却曲線に基づいた復習スケジュール
          </p>
          {learningRecords.length === 0 ? (
            <p style={{ color: '#7f8c8d' }}>受講記録がありません</p>
          ) : (
            <div>
              {learningRecords.map(record => {
                const today = new Date().toISOString().split('T')[0];
                const todayReview = record.reviewDates.filter(rd => rd.date === today);
                return todayReview.length > 0 ? (
                  <div key={record.id} style={{
                    padding: '16px',
                    background: '#fff3cd',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    borderLeft: '4px solid #ffc107',
                  }}>
                    <div style={{ fontSize: '12px', color: '#666', fontWeight: '600', marginBottom: '4px' }}>
                      {record.subjectName}
                    </div>
                    <strong>{record.chapterNum} {record.chapterTitle}</strong>
                    <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '5px' }}>
                      本日復習対象！
                    </div>
                  </div>
                ) : null;
              })}
              {learningRecords.every(r => r.reviewDates.every(rd => rd.date !== new Date().toISOString().split('T')[0])) && (
                <p style={{ color: '#7f8c8d' }}>本日の復習予定はありません</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 毎日の問題タブ */}
      {activeTab === 'daily' && (
        <div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>📝 本日の問題</div>
            <p style={{ color: '#7f8c8d', marginBottom: '16px' }}>
              受講した範囲から1日15問出題。1ヶ月で全範囲を1周できます。
            </p>

            {!todayItems && (
              <button
                style={{ 
                  ...styles.button, 
                  width: '100%',
                  background: '#27ae60',
                  fontSize: '16px',
                  padding: '12px',
                }}
                onClick={generateTodayAnswers}
                disabled={todayLoading}
              >
                {todayLoading ? '生成中...' : '本日の問題を生成'}
              </button>
            )}

            {todayItems && (
              <div>
                <div style={{ marginBottom: '16px', fontSize: '12px', color: '#2c3e50', fontWeight: '600' }}>
                  全{todayItems.length}問
                </div>
                {todayItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={styles.questionCard}
                    onClick={() => setTodayRevealed({ ...todayRevealed, [idx]: !todayRevealed[idx] })}
                  >
                    <div style={{ fontWeight: '600', marginBottom: '8px', color: '#2c3e50' }}>
                      問{idx + 1}: {item.q}
                    </div>
                    {todayRevealed[idx] && (
                      <div style={styles.answerBox}>
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
      )}
    </div>
  );
}
