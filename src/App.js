import React, { useState, useEffect } from 'react';
import { Trash2, Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// ───────────────────────────────────────────
// 2027年5月短答合格目標：標準日程表（4月～6月）
// 予備校カリキュラムから自動生成された講義スケジュール
// ───────────────────────────────────────────
const curriculumData = {
  april: [
    // 4月第1週（4/1-4/5）
    { week: 1, dayOfWeek: 'Mon', lectureNum: 1, subject: 'finTheory', id: 'finTheory_9' },
    { week: 1, dayOfWeek: 'Tue', lectureNum: 2, subject: 'finCalc', id: 'finCalc_15' },
    { week: 1, dayOfWeek: 'Wed', lectureNum: 3, subject: 'finCalc', id: 'finCalc_16' },
    { week: 1, dayOfWeek: 'Thu', lectureNum: 4, subject: 'finCalc', id: 'finCalc_17' },
    // 4月第2週（4/8-4/12）
    { week: 2, dayOfWeek: 'Mon', lectureNum: 1, subject: 'finTheory', id: 'finTheory_10' },
    { week: 2, dayOfWeek: 'Tue', lectureNum: 2, subject: 'finCalc', id: 'finCalc_18' },
    { week: 2, dayOfWeek: 'Wed', lectureNum: 3, subject: 'finCalc', id: 'finCalc_19' },
    { week: 2, dayOfWeek: 'Thu', lectureNum: 4, subject: 'finTheory', id: 'finTheory_11' },
    // 4月第3週（4/15-4/19）
    { week: 3, dayOfWeek: 'Mon', lectureNum: 1, subject: 'finCalc', id: 'finCalc_20' },
    { week: 3, dayOfWeek: 'Tue', lectureNum: 2, subject: 'finCalc', id: 'finCalc_21' },
    { week: 3, dayOfWeek: 'Wed', lectureNum: 3, subject: 'finTheory', id: 'finTheory_12' },
    { week: 3, dayOfWeek: 'Thu', lectureNum: 4, subject: 'mgmt', id: 'mgmt_4' },
    // 4月第4週（4/22-4/26）
    { week: 4, dayOfWeek: 'Mon', lectureNum: 1, subject: 'finCalc', id: 'finCalc_22' },
    { week: 4, dayOfWeek: 'Tue', lectureNum: 2, subject: 'finCalc', id: 'finCalc_23' },
    { week: 4, dayOfWeek: 'Wed', lectureNum: 3, subject: 'finTheory', id: 'finTheory_13' },
    { week: 4, dayOfWeek: 'Thu', lectureNum: 4, subject: 'mgmt', id: 'mgmt_5' },
  ],
  may: [
    // 5月第1週（5/6-5/10）
    { week: 1, dayOfWeek: 'Mon', lectureNum: 1, subject: 'finCalc', id: 'finCalc_24' },
    { week: 1, dayOfWeek: 'Tue', lectureNum: 2, subject: 'finTheory', id: 'finTheory_14' },
    { week: 1, dayOfWeek: 'Wed', lectureNum: 3, subject: 'mgmt', id: 'mgmt_6' },
    { week: 1, dayOfWeek: 'Thu', lectureNum: 4, subject: 'finCalc', id: 'finCalc_25' },
  ],
};

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
// Weekly Schedule Tab コンポーネント
// ───────────────────────────────────────────
const WeeklyScheduleTab = ({ learningRecords }) => {
  const [currentMonth, setCurrentMonth] = useState('april');
  const [currentWeek, setCurrentWeek] = useState(1);
  
  const monthLabels = { april: '4月', may: '5月', june: '6月' };
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayLabels = { Mon: '月', Tue: '火', Wed: '水', Thu: '木', Fri: '金', Sat: '土', Sun: '日' };
  
  // 今週の4コマを取得
  const getWeekSchedule = () => {
    const schedule = curriculumData[currentMonth];
    if (!schedule) return [];
    return schedule.filter(item => item.week === currentWeek && ['Mon', 'Tue', 'Wed', 'Thu'].includes(item.dayOfWeek));
  };
  
  // 科目ごとの進捗を計算
  const getProgress = () => {
    const counts = {
      finCalc: learningRecords.filter(r => r.subjectId === 'finCalc').length,
      finTheory: learningRecords.filter(r => r.subjectId === 'finTheory').length,
      mgmt: learningRecords.filter(r => r.subjectId === 'mgmt').length,
    };
    const totals = {
      finCalc: 47,
      finTheory: 23,
      mgmt: 33,
    };
    return { counts, totals };
  };
  
  const schedule = getWeekSchedule();
  const { counts, totals } = getProgress();
  
  const styles = {
    card: {
      background: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '16px',
    },
    button: {
      padding: '10px 16px',
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
    },
    lectureItem: {
      background: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '12px',
      borderLeft: '4px solid #667eea',
    },
    progressBar: {
      background: '#e9ecef',
      borderRadius: '4px',
      height: '24px',
      marginBottom: '8px',
      overflow: 'hidden',
    },
    progressFill: (percent) => ({
      background: '#667eea',
      height: '100%',
      width: `${percent}%`,
      transition: 'width 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600',
    }),
  };
  
  return (
    <div style={{ padding: '16px 0' }}>
      {/* 月と週の選択 */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>📅 週間スケジュール</div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          {Object.entries(monthLabels).map(([month, label]) => (
            <button
              key={month}
              onClick={() => { setCurrentMonth(month); setCurrentWeek(1); }}
              style={{
                ...styles.button,
                background: currentMonth === month ? '#667eea' : '#e9ecef',
                color: currentMonth === month ? 'white' : '#2c3e50',
              }}
            >
              {label}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map(week => (
            <button
              key={week}
              onClick={() => setCurrentWeek(week)}
              style={{
                ...styles.button,
                padding: '8px 12px',
                background: currentWeek === week ? '#667eea' : '#e9ecef',
                color: currentWeek === week ? 'white' : '#2c3e50',
                fontSize: '12px',
              }}
            >
              第{week}週
            </button>
          ))}
        </div>
      </div>
      
      {/* 週4コマの時間割 */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>⏰ 今週の講義（月～木）</div>
        {schedule.length === 0 ? (
          <p style={{ color: '#7f8c8d' }}>この月週のデータはありません</p>
        ) : (
          <div>
            {schedule.map((item, idx) => {
              const subject = subjectsData[item.subject];
              const lecture = subject.lectures.find(l => l.id === item.id);
              return (
                <div key={idx} style={styles.lectureItem}>
                  <div style={{ fontSize: '12px', color: '#667eea', fontWeight: '600', marginBottom: '4px' }}>
                    {dayLabels[item.dayOfWeek]}曜 {item.dayOfWeek === 'Mon' ? '朝（往路）' : item.dayOfWeek === 'Tue' ? '朝（往路）' : item.dayOfWeek === 'Wed' ? '朝（往路）' : '朝（往路）'} / {item.dayOfWeek === 'Mon' ? '夜（帰路）' : item.dayOfWeek === 'Tue' ? '夜（帰路）' : item.dayOfWeek === 'Wed' ? '夜（帰路）' : '夜（帰路）'}
                  </div>
                  <strong>{subject.name}</strong>
                  <div style={{ fontSize: '13px', marginTop: '4px' }}>
                    {lecture ? `${lecture.num} ${lecture.title}` : item.id}
                  </div>
                  <div style={{ fontSize: '11px', color: '#7f8c8d', marginTop: '6px' }}>
                    ⏱ 片道30分 × 2コマ = 約60分で消化
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* 土日の復習ブロック */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>🛏️ 土日の復習ブロック（8時間）</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {['土曜', '日曜'].map((day, idx) => (
            <div key={idx} style={{ background: '#f8f9fa', borderRadius: '8px', padding: '12px' }}>
              <strong style={{ fontSize: '14px' }}>{day}</strong>
              <ul style={{ margin: '12px 0 0 0', paddingLeft: '16px', fontSize: '13px', color: '#555' }}>
                <li>午前（4時間）：今週の講義復習 + 基礎問題</li>
                <li>夜（2時間）：弱点補強 or 理論精読</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* 科目別進度バー */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>📊 科目別進捗</div>
        {Object.entries(subjectsData).map(([key, subject]) => {
          const percent = Math.round((counts[key] / totals[key]) * 100);
          return (
            <div key={key} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>{subject.name}</strong>
                <span style={{ color: '#667eea', fontWeight: '600' }}>{counts[key]} / {totals[key]}</span>
              </div>
              <div style={styles.progressBar}>
                <div style={styles.progressFill(percent)}>
                  {percent > 5 ? `${percent}%` : ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 学習予定情報 */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>📌 実行のヒント</div>
        <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#555' }}>
          <p><strong>🚆 電車での講義視聴（平日）</strong></p>
          <ul style={{ margin: '8px 0 16px 20px' }}>
            <li>1.5倍速で視聴 → 50分の講座が約33分に短縮</li>
            <li>往路30分 + 帰路30分で1コマ消化</li>
            <li>ダウンロード機能を使ってオフライン視聴</li>
          </ul>
          
          <p><strong>📚 机での復習（土日）</strong></p>
          <ul style={{ margin: '8px 0 16px 20px' }}>
            <li>当日〜翌日に復習1回目（Ebbinghaus）</li>
            <li>基礎問題をしっかり解く</li>
            <li>理論のスキマ時間学習はスマコアで</li>
          </ul>
          
          <p><strong>⚠️ 月間カリキュラム更新予定</strong></p>
          <ul style={{ margin: '8px 0 0 20px' }}>
            <li>7月版が出たら、このスケジュールを更新します</li>
            <li>予備校から新しい3ヶ月版を受け取ったら教えてください</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────
// 想起学習 問題バンク（元のデータから一部抜粋）
// ───────────────────────────────────────────
const questionBank = {
  finCalc: {
    1: [
      { q: "現金の範囲に含まれるものは？", a: "通貨（硬貨・紙幣）のほか、通貨代用証券（他人振出小切手・送金小切手・郵便為替証書・振替貯金払出証書・期限到来済み公社債利札など）が含まれる" },
      { q: "現金の貸借対照表価額はどういう金額？", a: "額面金額（帳簿価額＝額面金額）" },
    ],
  },
  finTheory: {},
  mgmt: {},
};

// ───────────────────────────────────────────
// Main App Component
// ───────────────────────────────────────────
export default function CpaPrepApp() {
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule', 'record', 'calendar', 'soki'
  const [learningRecords, setLearningRecords] = useState(() => {
    const saved = localStorage.getItem('cpa_learning_records_final');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedSubject, setSelectedSubject] = useState('finCalc');
  const [selectedLecture, setSelectedLecture] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('');
  const [expandedRecord, setExpandedRecord] = useState({});
  
  // localStorage に自動保存
  useEffect(() => {
    localStorage.setItem('cpa_learning_records_final', JSON.stringify(learningRecords));
  }, [learningRecords]);
  
  const currentSubject = subjectsData[selectedSubject];
  
  const addRecord = () => {
    if (!selectedLecture) return alert('講義を選択してください');
    
    const lecture = currentSubject.lectures.find(l => l.id === selectedLecture);
    const newRecord = {
      id: Date.now(),
      subjectId: selectedSubject,
      subjectName: currentSubject.name,
      lectureId: selectedLecture,
      lectureNum: lecture.num,
      lectureTitle: lecture.title,
      completedDate: selectedDate,
      reviewDates: [
        { label: '1日後', date: new Date(new Date(selectedDate).getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
        { label: '3日後', date: new Date(new Date(selectedDate).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
        { label: '1週間後', date: new Date(new Date(selectedDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
        { label: '2週間後', date: new Date(new Date(selectedDate).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
        { label: '1ヶ月後', date: new Date(new Date(selectedDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
        { label: '3ヶ月後', date: new Date(new Date(selectedDate).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
      ]
    };
    setLearningRecords([...learningRecords, newRecord]);
    setSelectedLecture('');
  };
  
  const deleteRecord = (id) => {
    setLearningRecords(learningRecords.filter(r => r.id !== id));
  };
  
  // カレンダー向け scheduleMap の生成
  const scheduleMap = {};
  learningRecords.forEach(record => {
    record.reviewDates.forEach(rd => {
      if (!scheduleMap[rd.date]) scheduleMap[rd.date] = [];
      scheduleMap[rd.date].push({
        subjectName: record.subjectName,
        lectureNum: record.lectureNum,
        lectureTitle: record.lectureTitle,
      });
    });
  });
  
  // Calendar View Component
  const CalendarView = ({ year, month, scheduleMap, onDateClick }) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '8px',
      }}>
        {['日', '月', '火', '水', '木', '金', '土'].map(d => (
          <div key={d} style={{
            textAlign: 'center',
            fontWeight: '700',
            color: '#667eea',
            padding: '8px',
            fontSize: '12px',
          }}>
            {d}
          </div>
        ))}
        {days.map((day, idx) => {
          const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
          const hasSchedule = dateStr && scheduleMap[dateStr];
          return (
            <div
              key={idx}
              onClick={() => day && onDateClick(dateStr)}
              style={{
                padding: '12px',
                background: hasSchedule ? '#e0e7ff' : day ? '#f8f9fa' : 'transparent',
                border: hasSchedule ? '2px solid #667eea' : '1px solid #e9ecef',
                borderRadius: '6px',
                cursor: day ? 'pointer' : 'default',
                minHeight: '60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {day && <div style={{ fontWeight: '600', color: '#2c3e50' }}>{day}</div>}
              {hasSchedule && <div style={{ fontSize: '10px', color: '#667eea', fontWeight: '600' }}>復習{hasSchedule.length}</div>}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      background: '#fafbfc',
      minHeight: '100vh',
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '24px 20px',
      borderRadius: '12px',
      marginBottom: '24px',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    },
    tabs: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      borderBottom: '2px solid #e9ecef',
      paddingBottom: '0',
    },
    tab: {
      padding: '12px 20px',
      background: 'transparent',
      border: 'none',
      borderBottom: '3px solid transparent',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      color: '#7f8c8d',
      transition: 'all 0.3s ease',
    },
    tabActive: {
      color: '#667eea',
      borderBottomColor: '#667eea',
    },
    card: {
      background: '#fff',
      border: '1px solid #e9ecef',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '16px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      marginBottom: '12px',
      boxSizing: 'border-box',
    },
    button: {
      padding: '10px 16px',
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'background 0.3s ease',
    },
    recordItem: {
      background: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      borderLeft: '4px solid #667eea',
    },
    reviewSchedule: {
      background: '#e0e7ff',
      borderRadius: '6px',
      padding: '12px',
      marginTop: '12px',
      fontSize: '13px',
    },
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '28px' }}>📊 CPA短答合格スケジューラー</h1>
        <p style={{ margin: '0', fontSize: '14px', opacity: 0.95 }}>2027年5月短答目標 | 電車で講義 × 土日で復習</p>
      </div>
      
      <div style={styles.tabs}>
        {[
          { id: 'schedule', label: '📅 週間スケジュール' },
          { id: 'record', label: '📚 受講記録' },
          { id: 'calendar', label: '📋 復習カレンダー' },
          { id: 'soki', label: '🎯 想起学習' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              ...styles.tab,
              ...(activeTab === t.id ? styles.tabActive : {}),
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      
      {activeTab === 'schedule' && <WeeklyScheduleTab learningRecords={learningRecords} />}
      
      {activeTab === 'record' && (
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
        <div style={styles.card}>
          <div style={styles.cardTitle}>🎯 想起学習</div>
          <p style={{ color: '#7f8c8d' }}>想起学習機能は別途実装予定です</p>
        </div>
      )}
    </div>
  );
}
