import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Plus, ChevronDown } from 'lucide-react';

// 科目ごとの講義データ（PDFから抽出）
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

export default function CPALearningApp() {
  const [activeTab, setActiveTab] = useState('manage');
  const [learningRecords, setLearningRecords] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('finCalc');
  const [selectedLecture, setSelectedLecture] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [expandedRecord, setExpandedRecord] = useState({});

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

  const currentSubject = subjectsData[selectedSubject];

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
            background: activeTab === 'schedule' ? '#667eea' : '#ecf0f1',
            color: activeTab === 'schedule' ? 'white' : '#2c3e50',
          }}
          onClick={() => setActiveTab('schedule')}
        >
          📅 本日の復習予定
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
                    <strong>{record.lectureNum} {record.lectureTitle}</strong>
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
    </div>
  );
}
