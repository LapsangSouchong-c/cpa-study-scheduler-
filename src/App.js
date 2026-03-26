import React, { useState, useEffect } from 'react';
import { Calendar, Trash2, Plus, ChevronDown } from 'lucide-react';

export default function CPAIntegratedLearningSystem() {
  const [activeSubject, setActiveSubject] = useState('fin');
  const [activeTab, setActiveTab] = useState('scheduler');

  // ── 財務会計論 講義データ ──────────────────────
  const finCalculusLectures = [
    { id: 'fincalc1', num: 1, name: '現金預金', chapter: '第1章', textbook: '①' },
    { id: 'fincalc2', num: 2, name: '有形固定資産', chapter: '第2章', textbook: '①' },
    { id: 'fincalc3', num: 3, name: '有形固定資産、無形固定資産・投資その他の資産・繰延資産、引当金、経過勘定', chapter: '第3,4,8章', textbook: '①' },
    { id: 'fincalc4', num: 4, name: '商品売買・棚卸資産', chapter: '第5章', textbook: '①' },
    { id: 'fincalc5', num: 5, name: '有価証券Ⅰ', chapter: '第9章Ⅰ', textbook: '②' },
    { id: 'fincalc6', num: 6, name: '有価証券Ⅰ、手形取引、貸倒引当金Ⅰ', chapter: '第9,10,12章', textbook: '②' },
    { id: 'fincalc7', num: 7, name: 'リース会計Ⅰ、研究開発費・ソフトウェア', chapter: '第14,15章', textbook: '③' },
    { id: 'fincalc8', num: 8, name: '減損会計Ⅰ、税金及び税効果会計Ⅰ', chapter: '第16,17章', textbook: '③' },
    { id: 'fincalc9', num: 9, name: '税金及び税効果会計Ⅰ、外貨建取引Ⅰ', chapter: '第17,18章', textbook: '③④' },
    { id: 'fincalc10', num: 10, name: '外貨建取引Ⅰ、社債', chapter: '第18,19章', textbook: '④' },
    { id: 'fincalc11', num: 11, name: '本支店会計', chapter: '第6章', textbook: '①' },
    { id: 'fincalc12', num: 12, name: '退職給付会計Ⅰ', chapter: '第21章Ⅰ', textbook: '④' },
    { id: 'fincalc13', num: 13, name: '退職給付会計Ⅱ、資産除去債務', chapter: '第21,22章', textbook: '④' },
    { id: 'fincalc14', num: 14, name: '純資産Ⅰ', chapter: '第23章Ⅰ', textbook: '⑤' },
    { id: 'fincalc15', num: 15, name: 'ストック・オプション等', chapter: '第25章', textbook: '⑤' },
    { id: 'fincalc16', num: 16, name: '外貨建取引Ⅱ、新株予約権付社債', chapter: '第18,20章', textbook: '④' },
    { id: 'fincalc17', num: 17, name: '税金及び税効果会計Ⅱ', chapter: '第17章Ⅱ', textbook: '③' },
    { id: 'fincalc18', num: 18, name: '収益認識Ⅰ', chapter: '第28章Ⅰ', textbook: '⑤' },
    { id: 'fincalc19', num: 19, name: '減損会計Ⅱ、収益認識Ⅱ～Ⅲ', chapter: '第16,28章', textbook: '③⑤' },
    { id: 'fincalc20', num: 20, name: '貸倒引当金Ⅱ、リース会計Ⅱ', chapter: '第12,14章', textbook: '②③' },
    { id: 'fincalc21', num: 21, name: 'リース会計Ⅲ', chapter: '第14章Ⅲ', textbook: '③' },
    { id: 'fincalc22', num: 22, name: '有価証券Ⅱ、債権債務、外貨建取引Ⅱ、期中財務諸表', chapter: '第9,11,18,27章', textbook: '②④⑤' },
    { id: 'fincalc23', num: 23, name: 'デリバティブ', chapter: '第13章', textbook: '②' },
    { id: 'fincalc24', num: 24, name: '外貨建取引Ⅲ、純資産Ⅱ、会計方針の変更', chapter: '第18,23,26章', textbook: '④⑤' },
    { id: 'fincalc25', num: 25, name: '連結会計Ⅰ', chapter: '第29章Ⅰ', textbook: '⑥' },
    { id: 'fincalc26', num: 26, name: '連結会計Ⅰ～Ⅱ', chapter: '第29章Ⅱ', textbook: '⑥' },
    { id: 'fincalc27', num: 27, name: '連結会計Ⅱ～Ⅲ', chapter: '第29章Ⅲ', textbook: '⑥' },
    { id: 'fincalc28', num: 28, name: '連結会計Ⅱ～Ⅲ', chapter: '第29章', textbook: '⑥' },
    { id: 'fincalc29', num: 29, name: '連結会計Ⅱ～Ⅲ', chapter: '第29章', textbook: '⑥' },
    { id: 'fincalc30', num: 30, name: '連結会計Ⅳ', chapter: '第29章Ⅳ', textbook: '⑥' },
    { id: 'fincalc31', num: 31, name: '持分法会計', chapter: '第30章', textbook: '⑧' },
    { id: 'fincalc32', num: 32, name: '包括利益', chapter: '第31章', textbook: '⑧' },
    { id: 'fincalc33', num: 33, name: '純資産Ⅲ、連結退職給付、在外支店', chapter: '第23,32,33章', textbook: '⑤⑧' },
    { id: 'fincalc34', num: 34, name: '在外子会社', chapter: '第34章', textbook: '⑧' },
    { id: 'fincalc35', num: 35, name: '個別キャッシュ・フロー計算書Ⅰ', chapter: '第36章Ⅰ', textbook: '⑨' },
    { id: 'fincalc36', num: 36, name: '個別キャッシュ・フロー計算書Ⅱ', chapter: '第36章Ⅱ', textbook: '⑨' },
    { id: 'fincalc37', num: 37, name: '企業結合会計', chapter: '第39章', textbook: '⑩' },
    { id: 'fincalc38', num: 38, name: '企業結合会計', chapter: '第39章', textbook: '⑩' },
    { id: 'fincalc39', num: 39, name: '事業分離会計', chapter: '第40章', textbook: '⑩' },
    { id: 'fincalc40', num: 40, name: '企業結合会計、事業分離会計', chapter: '第39,40章', textbook: '⑩' },
    { id: 'fincalc41', num: 41, name: '連結キャッシュ・フロー計算書Ⅰ', chapter: '第37章Ⅰ', textbook: '⑨' },
    { id: 'fincalc42', num: 42, name: '連結キャッシュ・フロー計算書Ⅱ、在外連結CF計算書', chapter: '第37,38章', textbook: '⑨' },
    { id: 'fincalc43', num: 43, name: '連結会計Ⅴ', chapter: '第29章Ⅴ', textbook: '⑦' },
    { id: 'fincalc44', num: 44, name: '連結会計Ⅴ', chapter: '第29章Ⅴ', textbook: '⑦' },
    { id: 'fincalc45', num: 45, name: '連結会計Ⅵ～Ⅶ、連結CF計算書Ⅱ', chapter: '第29,37章', textbook: '⑦⑨' },
    { id: 'fincalc46', num: 46, name: '１株当たり情報、分配可能額', chapter: '第7,24章', textbook: '①⑤' },
    { id: 'fincalc47', num: 47, name: '在外子会社、セグメント情報、企業結合会計、事業分離会計', chapter: '第35,34,39,40章', textbook: '⑧⑩' },
  ];

  // ── 管理会計論 講義データ ──────────────────────
  const mgmtLectures = [
    { id: 'mgmt1', num: 1, name: '原価計算総論、費目別計算総論、材料費', chapter: '第1,2,3章', textbook: '1' },
    { id: 'mgmt2', num: 2, name: '材料費', chapter: '第3章', textbook: '1' },
    { id: 'mgmt3', num: 3, name: '労務費', chapter: '第4章', textbook: '1' },
    { id: 'mgmt4', num: 4, name: '経費、製造間接費', chapter: '第5,6章', textbook: '1' },
    { id: 'mgmt5', num: 5, name: '製造間接費、部門別計算', chapter: '第6,7章', textbook: '1' },
    { id: 'mgmt6', num: 6, name: '部門別計算', chapter: '第7章', textbook: '1' },
    { id: 'mgmt7', num: 7, name: '部門別計算、製品別計算総論、個別原価計算', chapter: '第7,8,9章', textbook: '1' },
    { id: 'mgmt8', num: 8, name: '個別原価計算', chapter: '第9章', textbook: '1' },
    { id: 'mgmt9', num: 9, name: '単純総合原価計算', chapter: '第10章', textbook: '2' },
    { id: 'mgmt10', num: 10, name: '単純総合原価計算', chapter: '第10章', textbook: '2' },
    { id: 'mgmt11', num: 11, name: '工程別総合原価計算', chapter: '第11章', textbook: '2' },
    { id: 'mgmt12', num: 12, name: '組別総合原価計算、等級別総合原価計算', chapter: '第12章', textbook: '2' },
    { id: 'mgmt13', num: 13, name: '連産品', chapter: '第13章', textbook: '2' },
    { id: 'mgmt14', num: 14, name: '標準原価計算', chapter: '第14章', textbook: '2' },
    { id: 'mgmt15', num: 15, name: '標準原価計算', chapter: '第14章', textbook: '2' },
    { id: 'mgmt16', num: 16, name: '標準原価計算', chapter: '第14章', textbook: '2' },
    { id: 'mgmt17', num: 17, name: '標準原価計算', chapter: '第14章', textbook: '2' },
    { id: 'mgmt18', num: 18, name: '標準原価計算、製造業の財務諸表', chapter: '第14,15章', textbook: '2' },
    { id: 'mgmt19', num: 19, name: '直接原価計算、管理会計の基礎', chapter: '第16,17章', textbook: '3' },
    { id: 'mgmt20', num: 20, name: '短期利益計画のための管理会計', chapter: '第18章', textbook: '3' },
    { id: 'mgmt21', num: 21, name: '短期利益計画のための管理会計、予算管理', chapter: '第18,19章', textbook: '3' },
    { id: 'mgmt22', num: 22, name: '予算管理', chapter: '第19章', textbook: '3' },
    { id: 'mgmt23', num: 23, name: '財務情報分析', chapter: '第20章', textbook: '3' },
    { id: 'mgmt24', num: 24, name: '資金管理とキャッシュ・フロー管理', chapter: '第21章', textbook: '3' },
    { id: 'mgmt25', num: 25, name: '意思決定総論、戦術的意思決定（差額原価収益分析）', chapter: '第22,23章', textbook: '4' },
    { id: 'mgmt26', num: 26, name: '戦術的意思決定（差額原価収益分析）', chapter: '第23章', textbook: '4' },
    { id: 'mgmt27', num: 27, name: '戦略的意思決定（設備投資の経済性計算）', chapter: '第24章', textbook: '4' },
    { id: 'mgmt28', num: 28, name: '戦略的意思決定（設備投資の経済性計算）', chapter: '第24章', textbook: '4' },
    { id: 'mgmt29', num: 29, name: '分権組織とグループ経営の管理会計', chapter: '第25,26章', textbook: '4' },
    { id: 'mgmt30', num: 30, name: '分権組織とグループ経営の管理会計', chapter: '第25,26章', textbook: '4' },
    { id: 'mgmt31', num: 31, name: '分権組織とグループ経営の管理会計、管理会計の基礎', chapter: '第25,26,27章', textbook: '4' },
    { id: 'mgmt32', num: 32, name: '原価管理', chapter: '第28章', textbook: '4' },
    { id: 'mgmt33', num: 33, name: '活動基準原価計算（ABC）', chapter: '第29章', textbook: '4' },
  ];

  // ── State管理 ──────────────────────
  const [learningRecords, setLearningRecords] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [expandedRecords, setExpandedRecords] = useState({});
  const [completedLectures, setCompletedLectures] = useState(new Set());

  const lectures = activeSubject === 'fin' ? finCalculusLectures : mgmtLectures;
  const maxLectures = activeSubject === 'fin' ? 47 : 33;

  // ── LocalStorage ──────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('cpa_learning_records_integrated');
    if (saved) setLearningRecords(JSON.parse(saved));
    
    const savedCompleted = localStorage.getItem('cpa_completed_lectures_integrated');
    if (savedCompleted) setCompletedLectures(new Set(JSON.parse(savedCompleted)));
  }, []);

  // ── 復習スケジューラー ──────────────────────
  const REVIEW_SCHEDULE = [1, 3, 7, 14, 30, 90];

  const calculateReviewDates = (lectureDate) => {
    const startDate = new Date(lectureDate);
    return REVIEW_SCHEDULE.map((days, idx) => {
      const reviewDate = new Date(startDate);
      reviewDate.setDate(reviewDate.getDate() + days);
      return {
        days,
        date: reviewDate.toISOString().split('T')[0],
        label: `${days}日後の復習`,
        completed: false,
      };
    });
  };

  const addLearningRecord = () => {
    if (!selectedLecture) {
      alert('講義を選択してください');
      return;
    }
    const lecture = lectures.find(l => l.id === selectedLecture);
    const newRecord = {
      id: Date.now().toString(),
      subject: activeSubject,
      lectureName: lecture.name,
      lectureNum: lecture.num,
      lectureDate: selectedDate,
      reviewSchedule: calculateReviewDates(selectedDate),
    };
    const updated = [...learningRecords, newRecord];
    setLearningRecords(updated);
    localStorage.setItem('cpa_learning_records_integrated', JSON.stringify(updated));
    setSelectedLecture('');
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const deleteRecord = (id) => {
    const updated = learningRecords.filter(r => r.id !== id);
    setLearningRecords(updated);
    localStorage.setItem('cpa_learning_records_integrated', JSON.stringify(updated));
  };

  const markReviewComplete = (recordId, reviewIdx) => {
    const updated = learningRecords.map(r => {
      if (r.id === recordId) {
        r.reviewSchedule[reviewIdx].completed = true;
      }
      return r;
    });
    setLearningRecords(updated);
    localStorage.setItem('cpa_learning_records_integrated', JSON.stringify(updated));
  };

  const getTodayReviews = () => {
    const today = new Date().toISOString().split('T')[0];
    return learningRecords
      .filter(r => r.subject === activeSubject)
      .flatMap(record =>
        record.reviewSchedule
          .map((review, idx) => ({ ...review, recordId: record.id, reviewIdx: idx, lectureName: record.lectureName, lectureNum: record.lectureNum }))
      )
      .filter(review => review.date === today && !review.completed);
  };

  // ── 学習内容管理 ──────────────────────
  const toggleCompletedLecture = (lectureId) => {
    const updated = new Set(completedLectures);
    if (updated.has(lectureId)) {
      updated.delete(lectureId);
    } else {
      updated.add(lectureId);
    }
    setCompletedLectures(updated);
    localStorage.setItem('cpa_completed_lectures_integrated', JSON.stringify(Array.from(updated)));
  };

  const completedCount = Array.from(completedLectures).filter(id => {
    const lecture = lectures.find(l => l.id === id);
    return lecture && (
      (activeSubject === 'fin' && id.startsWith('fincalc')) ||
      (activeSubject === 'mgmt' && id.startsWith('mgmt'))
    );
  }).length;

  const progressPercentage = (completedCount / lectures.length) * 100;

  // ── CSS ──────────────────────
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
    subjectContainer: {
      display: 'flex',
      gap: '12px',
      marginBottom: '20px',
      justifyContent: 'center',
    },
    subjectButton: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s',
      background: '#ecf0f1',
      color: '#2c3e50',
    },
    subjectButtonActive: {
      background: '#667eea',
      color: 'white',
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
      background: '#ecf0f1',
      color: '#2c3e50',
    },
    tabButtonActive: {
      background: '#667eea',
      color: 'white',
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
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '12px',
      border: '1px solid #bdc3c7',
      borderRadius: '6px',
      fontSize: '14px',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '10px',
      marginBottom: '12px',
      border: '1px solid #bdc3c7',
      borderRadius: '6px',
      fontSize: '14px',
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
      transition: 'all 0.3s',
    },
    buttonDanger: {
      background: '#e74c3c',
    },
    recordItem: {
      padding: '16px',
      background: '#f8f9fb',
      borderRadius: '8px',
      marginBottom: '12px',
      borderLeft: '4px solid #667eea',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      {/* ヘッダー */}
      <div style={styles.header}>
        <h1>📚 CPA試験 統合学習管理システム</h1>
        <p>財務会計論＆管理会計論を効率的に学習</p>
      </div>

      {/* 科目選択 */}
      <div style={styles.subjectContainer}>
        <button
          style={{
            ...styles.subjectButton,
            ...(activeSubject === 'fin' && styles.subjectButtonActive),
          }}
          onClick={() => {
            setActiveSubject('fin');
            setActiveTab('scheduler');
          }}
        >
          📊 財務会計論
        </button>
        <button
          style={{
            ...styles.subjectButton,
            ...(activeSubject === 'mgmt' && styles.subjectButtonActive),
          }}
          onClick={() => {
            setActiveSubject('mgmt');
            setActiveTab('scheduler');
          }}
        >
          💰 管理会計論
        </button>
      </div>

      {/* タブナビゲーション */}
      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'scheduler' && styles.tabButtonActive),
          }}
          onClick={() => setActiveTab('scheduler')}
        >
          📅 復習スケジューラー
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'content' && styles.tabButtonActive),
          }}
          onClick={() => setActiveTab('content')}
        >
          📚 学習内容管理
        </button>
      </div>

      {/* タブコンテンツ */}
      <div>
        {/* 復習スケジューラータブ */}
        {activeTab === 'scheduler' && (
          <div>
            {/* 本日の復習 */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>
                <Calendar size={20} /> 本日の復習タスク
              </div>
              {getTodayReviews().length > 0 ? (
                <div>
                  {getTodayReviews().map((review, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px',
                        background: '#ffffcc',
                        borderRadius: '6px',
                        marginBottom: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '600' }}>
                          第{review.lectureNum}回: {review.lectureName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                          {review.label}
                        </div>
                      </div>
                      <button
                        style={styles.button}
                        onClick={() => markReviewComplete(review.recordId, review.reviewIdx)}
                      >
                        完了
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#7f8c8d', padding: '20px' }}>
                  本日の復習タスクはありません 🎉
                </div>
              )}
            </div>

            {/* 新規学習記録 */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>➕ 新規学習記録</div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  講義を選択 ({activeSubject === 'fin' ? '財務会計論' : '管理会計論'})
                </label>
                <select
                  style={styles.select}
                  value={selectedLecture}
                  onChange={(e) => setSelectedLecture(e.target.value)}
                >
                  <option value="">-- 講義を選択してください --</option>
                  {lectures.map(lecture => (
                    <option key={lecture.id} value={lecture.id}>
                      第{lecture.num}回: {lecture.name.substring(0, 50)}...
                    </option>
                  ))}
                </select>

                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  受講日
                </label>
                <input
                  type="date"
                  style={styles.input}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />

                <button
                  style={{ ...styles.button, width: '100%' }}
                  onClick={addLearningRecord}
                >
                  <Plus size={16} style={{ marginRight: '8px', display: 'inline' }} />
                  記録を追加
                </button>
              </div>
            </div>

            {/* 学習記録一覧 */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>📋 学習記録一覧</div>
              {learningRecords.filter(r => r.subject === activeSubject).length > 0 ? (
                learningRecords
                  .filter(r => r.subject === activeSubject)
                  .sort((a, b) => new Date(b.lectureDate) - new Date(a.lectureDate))
                  .map(record => (
                    <div
                      key={record.id}
                      style={styles.recordItem}
                      onClick={() =>
                        setExpandedRecords({
                          ...expandedRecords,
                          [record.id]: !expandedRecords[record.id],
                        })
                      }
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '14px' }}>
                            第{record.lectureNum}回: {record.lectureName}
                          </div>
                          <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '4px' }}>
                            受講日: {record.lectureDate}
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '12px',
                              padding: '4px 8px',
                              background: '#667eea',
                              color: 'white',
                              borderRadius: '4px',
                            }}
                          >
                            {record.reviewSchedule.filter(r => r.completed).length}/{record.reviewSchedule.length}
                          </span>
                          <ChevronDown
                            size={16}
                            style={{
                              transform: expandedRecords[record.id] ? 'rotate(180deg)' : '',
                              transition: 'all 0.3s',
                            }}
                          />
                          <button
                            style={{
                              ...styles.button,
                              ...styles.buttonDanger,
                              padding: '6px 12px',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteRecord(record.id);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {expandedRecords[record.id] && (
                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #ecf0f1' }}>
                          {record.reviewSchedule.map((review, idx) => {
                            const today = new Date().toISOString().split('T')[0];
                            const isToday = review.date === today;
                            const isOverdue = review.date < today && !review.completed;

                            return (
                              <div
                                key={idx}
                                style={{
                                  padding: '8px',
                                  background: isToday ? '#ffffcc' : '#f8f9fb',
                                  borderRadius: '6px',
                                  marginBottom: '8px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <div>
                                  <div style={{ fontWeight: '600', fontSize: '14px' }}>
                                    {review.label}
                                    {isToday && ' ← 本日！'}
                                    {isOverdue && ' ⚠️ 期限切れ'}
                                  </div>
                                  <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>
                                    {review.date}
                                  </div>
                                </div>
                                {!review.completed ? (
                                  <button
                                    style={styles.button}
                                    onClick={() => markReviewComplete(record.id, idx)}
                                  >
                                    完了
                                  </button>
                                ) : (
                                  <span style={{ fontWeight: '600', color: '#27ae60' }}>✓ 完了</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>
                  学習記録がありません。上記から講義を記録してください。
                </div>
              )}
            </div>

            {/* 統計情報 */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>📊 学習統計</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: '#f8f9fb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '8px' }}>総学習記録</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea' }}>
                    {learningRecords.filter(r => r.subject === activeSubject).length}件
                  </div>
                </div>
                <div style={{ padding: '16px', background: '#f8f9fb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '8px' }}>合計</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea' }}>
                    {learningRecords.filter(r => r.subject === activeSubject).length}/{maxLectures}
                  </div>
                </div>
                <div style={{ padding: '16px', background: '#f8f9fb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '8px' }}>完了した復習</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#27ae60' }}>
                    {learningRecords.filter(r => r.subject === activeSubject).reduce((sum, r) => sum + r.reviewSchedule.filter(rev => rev.completed).length, 0)}回
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 学習内容管理タブ */}
        {activeTab === 'content' && (
          <div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>
                📚 学習内容管理 ({activeSubject === 'fin' ? '財務会計論' : '管理会計論'})
              </div>
              
              {/* 進捗バー */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontWeight: '600' }}>受講状況</label>
                  <span style={{ fontWeight: '700', color: '#667eea' }}>
                    {completedCount} / {lectures.length}
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '24px',
                    background: '#ecf0f1',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${progressPercentage}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      transition: 'width 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {progressPercentage > 5 && `${Math.round(progressPercentage)}%`}
                  </div>
                </div>
              </div>

              {/* 講義一覧 */}
              <div>
                <div style={{ marginBottom: '16px', fontSize: '12px', color: '#7f8c8d' }}>
                  ✓をクリックして受講状況を管理してください
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
                  {lectures.map(lecture => (
                    <div
                      key={lecture.id}
                      style={{
                        padding: '12px',
                        background: completedLectures.has(lecture.id) ? '#e8f5e9' : '#f8f9fb',
                        borderRadius: '8px',
                        border: `2px solid ${completedLectures.has(lecture.id) ? '#27ae60' : '#ecf0f1'}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                      }}
                      onClick={() => toggleCompletedLecture(lecture.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            border: `2px solid ${completedLectures.has(lecture.id) ? '#27ae60' : '#bdc3c7'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: completedLectures.has(lecture.id) ? '#27ae60' : 'white',
                            color: 'white',
                            fontWeight: '700',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        >
                          {completedLectures.has(lecture.id) && '✓'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '14px', color: '#2c3e50' }}>
                            第{lecture.num}回
                          </div>
                          <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '2px', lineHeight: '1.4' }}>
                            {lecture.name}
                          </div>
                          <div style={{ fontSize: '11px', color: '#95a5a6', marginTop: '4px' }}>
                            テキスト: {lecture.textbook}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
