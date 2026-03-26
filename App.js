import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Check, Calendar, TrendingUp } from 'lucide-react';

const App = () => {
  const [subjects] = useState([
    { id: 'financial-calc', name: '財務会計計算', color: '#1e40af' },
    { id: 'financial-theory', name: '財務会計理論', color: '#7c2d12' }
  ]);

  const [activeSubject, setActiveSubject] = useState('financial-calc');
  const [learningItems, setLearningItems] = useState([]);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDetail, setNewItemDetail] = useState('');
  const [newItemDate, setNewItemDate] = useState(new Date().toISOString().split('T')[0]);

  // エビングハウス忘却曲線の復習タイミング（日数）
  const REVIEW_SCHEDULE = [1, 3, 7, 14, 30, 90];

  // ローカルストレージから読み込み
  useEffect(() => {
    const loadFromStorage = async () => {
      try {
        const result = await window.storage.get(`study-items-${activeSubject}`);
        if (result && result.value) {
          const items = JSON.parse(result.value);
          // 古いデータのクリーンアップ
          const validItems = items.filter(item => {
            const date = new Date(item.learnedDate);
            return !isNaN(date.getTime());
          });
          setLearningItems(validItems);
        } else {
          setLearningItems([]);
        }
      } catch (error) {
        console.error('Storage load error:', error);
        setLearningItems([]);
      }
    };
    loadFromStorage();
  }, [activeSubject]);

  // ローカルストレージに保存
  const saveToStorage = async (items) => {
    try {
      await window.storage.set(`study-items-${activeSubject}`, JSON.stringify(items));
    } catch (error) {
      console.error('Storage save error:', error);
    }
  };

  // 新しい学習項目を追加
  const handleAddItem = async () => {
    if (!newItemTitle.trim()) return;

    const specifiedDate = new Date(newItemDate);
    specifiedDate.setHours(0, 0, 0, 0);

    const newItem = {
      id: Date.now(),
      title: newItemTitle,
      detail: newItemDetail,
      learnedDate: specifiedDate.toISOString(),
      reviewHistory: [],
      completed: false
    };

    const updated = [...learningItems, newItem];
    setLearningItems(updated);
    await saveToStorage(updated);
    setNewItemTitle('');
    setNewItemDetail('');
    setNewItemDate(new Date().toISOString().split('T')[0]);
  };

  // 復習を完了
  const handleCompleteReview = async (itemId, reviewIndex) => {
    const updated = learningItems.map(item => {
      if (item.id === itemId) {
        const newHistory = [...(item.reviewHistory || [])];
        newHistory[reviewIndex] = { scheduledDate: newHistory[reviewIndex].scheduledDate, completed: true, completedDate: new Date().toISOString() };
        return { ...item, reviewHistory: newHistory };
      }
      return item;
    });
    setLearningItems(updated);
    await saveToStorage(updated);
  };

  // 学習項目を削除
  const handleDeleteItem = async (itemId) => {
    const updated = learningItems.filter(item => item.id !== itemId);
    setLearningItems(updated);
    await saveToStorage(updated);
  };

  // 復習予定日を計算
  const getReviewDates = (learnedDate) => {
    const base = new Date(learnedDate);
    base.setHours(0, 0, 0, 0);
    
    return REVIEW_SCHEDULE.map((days, index) => {
      const reviewDate = new Date(base);
      reviewDate.setDate(reviewDate.getDate() + days);
      return {
        daysDiff: days,
        scheduledDate: reviewDate.toISOString(),
        label: days === 1 ? '1日後' : days === 3 ? '3日後' : days === 7 ? '1週間後' : days === 14 ? '2週間後' : days === 30 ? '1ヶ月後' : '3ヶ月後'
      };
    });
  };

  // 復習状態を判定
  const getReviewStatus = (reviewDate, reviewHistory, index) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const scheduledDate = new Date(reviewDate);
    scheduledDate.setHours(0, 0, 0, 0);

    const historyItem = reviewHistory?.[index];
    if (historyItem?.completed) return 'completed';
    if (scheduledDate <= today) return 'overdue';
    if (scheduledDate.getTime() === today.getTime()) return 'today';
    return 'pending';
  };

  // 今日の復習を計算
  const getTodayReviews = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return learningItems.filter(item => {
      const reviews = getReviewDates(item.learnedDate);
      return reviews.some((review, index) => {
        const scheduledDate = new Date(review.scheduledDate);
        scheduledDate.setHours(0, 0, 0, 0);
        return scheduledDate.getTime() === today.getTime() && !item.reviewHistory?.[index]?.completed;
      });
    }).length;
  };

  const currentSubject = subjects.find(s => s.id === activeSubject);
  const todayReviews = getTodayReviews();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #faf9f7 100%)' }}>
      {/* ヘッダー */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              学習スケジューラー
            </h1>
            <div className="text-right">
              <div className="text-sm text-gray-500">本日の復習</div>
              <div className="text-3xl font-bold text-amber-600">{todayReviews}</div>
            </div>
          </div>

          {/* タブ */}
          <div className="flex gap-2">
            {subjects.map(subject => (
              <button
                key={subject.id}
                onClick={() => setActiveSubject(subject.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSubject === subject.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 bg-white hover:bg-gray-50'
                }`}
                style={{
                  backgroundColor: activeSubject === subject.id ? subject.color : 'white',
                  color: activeSubject === subject.id ? 'white' : '#666'
                }}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 入力フォーム */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Plus size={20} />
            学習内容を記録
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="例：第3章 資産の評価方法"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
              style={{ focusRingColor: currentSubject.color }}
            />
            <textarea
              placeholder="詳細（オプション）"
              value={newItemDetail}
              onChange={(e) => setNewItemDetail(e.target.value)}
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none"
            />
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  学習日
                </label>
                <input
                  type="date"
                  value={newItemDate}
                  onChange={(e) => setNewItemDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                />
              </div>
            </div>
            <button
              onClick={handleAddItem}
              className="w-full py-2 bg-gradient-to-r rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md active:scale-95"
              style={{
                backgroundImage: `linear-gradient(135deg, ${currentSubject.color}, ${currentSubject.color}dd)`
              }}
            >
              記録する
            </button>
          </div>
        </div>

        {/* 学習項目一覧 */}
        <div className="space-y-4">
          {learningItems.length === 0 ? (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-lg">まだ学習内容がありません</p>
              <p className="text-gray-400 text-sm">上のフォームから記録を始めましょう</p>
            </div>
          ) : (
            learningItems.map(item => {
              const reviews = getReviewDates(item.learnedDate);
              return (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                  {/* アイテムヘッダー */}
                  <div className="p-4 border-b border-gray-100" style={{ borderLeftColor: currentSubject.color, borderLeftWidth: '4px' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        {item.detail && <p className="text-sm text-gray-600 mt-1">{item.detail}</p>}
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="ml-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      学習日: {new Date(item.learnedDate).toLocaleDateString('ja-JP')}
                    </p>
                  </div>

                  {/* 復習スケジュール */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp size={16} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">復習スケジュール</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {reviews.map((review, index) => {
                        const status = getReviewStatus(review.scheduledDate, item.reviewHistory, index);
                        const scheduledDate = new Date(review.scheduledDate);
                        const isCompleted = item.reviewHistory?.[index]?.completed;

                        return (
                          <div
                            key={index}
                            className="relative rounded-lg p-3 border-2 transition-all duration-200 cursor-pointer"
                            style={{
                              borderColor: isCompleted ? '#10b981' : status === 'overdue' ? '#ef4444' : status === 'today' ? currentSubject.color : '#e5e7eb',
                              backgroundColor: isCompleted ? '#ecfdf5' : status === 'today' ? currentSubject.color + '10' : 'white'
                            }}
                            onClick={() => !isCompleted && handleCompleteReview(item.id, index)}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-xs font-medium text-gray-700">{review.label}</p>
                                <p className="text-xs text-gray-500 mt-1">{scheduledDate.toLocaleDateString('ja-JP')}</p>
                              </div>
                              {isCompleted && <Check size={16} className="text-green-600 flex-shrink-0 mt-0.5" />}
                              {status === 'overdue' && !isCompleted && (
                                <span className="text-xs font-bold text-red-600 mt-0.5">期限切れ</span>
                              )}
                              {status === 'today' && !isCompleted && (
                                <span className="text-xs font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: currentSubject.color }}>
                                  本日
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 統計情報 */}
        {learningItems.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">学習済み</p>
              <p className="text-2xl font-bold text-gray-900">{learningItems.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">期限切れ</p>
              <p className="text-2xl font-bold text-red-600">
                {learningItems.reduce((count, item) => {
                  const reviews = getReviewDates(item.learnedDate);
                  return count + reviews.filter((r, i) => getReviewStatus(r.scheduledDate, item.reviewHistory, i) === 'overdue').length;
                }, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">本日の復習</p>
              <p className="text-2xl font-bold text-amber-600">{todayReviews}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">復習完了</p>
              <p className="text-2xl font-bold text-green-600">
                {learningItems.reduce((count, item) => {
                  return count + (item.reviewHistory?.filter(r => r.completed).length || 0);
                }, 0)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;