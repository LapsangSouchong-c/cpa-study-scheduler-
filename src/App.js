import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Trash2, Plus, ChevronDown } from 'lucide-react';

// ── 財務会計論 全問題データ（zaimu_study.jsxから） ──────────────────────
const chaptersData = [
  { id: "ch1", num: "第1章", title: "現金預金", questions: ["現金の範囲に含まれるものは？","現金の貸借対照表価額はどういう金額？","現金の範囲に含めてはいけないものは？","外国通貨の貸借対照表価額の算定方法は？","雑損(雑益)の算定方法は？","当座借越の貸借対照表上の表示科目・表示区分は？","銀行勘定調整表において，企業側の修正項目には何がある？","銀行勘定調整表において，銀行側の修正項目には何がある？","当座預金の貸借対照表価額はどういう金額？","定期預金のうち「現金及び預金」として計上されるのはどういう金額？","定期預金について，決算日と利払日が異なる場合の処理は？","定額資金前渡制はどういう方法？"] },
  { id: "ch2", num: "第2章", title: "有形固定資産", questions: ["営業の用に供している有形固定資産の減価償却費の表示区分は？","投資の目的で所有する固定資産の減価償却費の表示区分は？","休止固定資産の減価償却費の表示区分は？","有形固定資産の取得時に生じた付随費用や値引を受けた場合の処理は？","建設仮勘定の処理は？","買換(値引を把握する方法)の処理は？","買換(値引を把握しない方法)の処理は？","異なる有形固定資産を一括購入した場合の処理は？","建物を新築する目的で建物付土地を取得した場合の処理は？","同種資産の交換の処理は？","異種資産の交換の処理は？","贈与の処理は？","現物出資の処理は？","自家建設の処理は？(原則法)","自家建設の処理は？(容認法)","減価償却を実施しない有形固定資産には何がある？","新定率法(200％定率法)の償却率の算定方法は？","新定率法における償却保証額の算定方法は？","新定率法において，どのような場合に償却方法を切り替える？","新定率法における改定償却額の算定方法は？","生産高比例法における減価償却費の算定方法は？","級数法における減価償却費の算定方法は？","総合償却における減価償却費の算定方法は？","期中売却(除却)時の減価償却費の算定方法は？","火災発生時の帳簿価額＜保険契約額となる場合の処理は？","火災発生時の帳簿価額＞保険契約額となる場合の処理は？","火災における保険金確定時の処理は？","火災における後片付け費用・廃材の処理は？","当期首に耐用年数を変更した場合の減価償却費の算定方法は？","当期末に耐用年数を変更した場合の減価償却費の算定方法は？","定額法から定率法に変更した場合の減価償却費の算定方法は？","定率法から定額法に変更した場合の減価償却費の算定方法は？","資本的支出・収益的支出それぞれの支出時の処理は？","修繕支出額を資本的支出部分と収益的支出部分に区分する計算方法は？","資本的支出がなされた場合の減価償却費の算定方法は？","圧縮記帳(直接減額方式)の処理は？","圧縮記帳の対象にはどういったものがある？"] },
  { id: "ch3", num: "第3章", title: "無形固定資産・繰延資産", questions: ["吸収合併の際，どのような金額で資産・負債を引き継ぐ？","無形固定資産の償却方法は？","償却を実施しない無形固定資産には何がある？","経過勘定のうち，一年基準で分類するのは何？","繰延資産として扱うことができる５項目とは？","繰延資産の支出時の処理は？","繰延資産として処理することが認められないものには何がある？","繰延資産の決算時の処理は？","支出の効果が期待されなくなった繰延資産の処理は？","株式交付費の償却期間と表示区分は？","社債発行費等の償却期間と表示区分は？","創立費の償却期間と表示区分は？","開業費の償却期間と表示区分は？","開発費の償却期間と表示区分は？"] },
  { id: "ch4", num: "第4章", title: "引当金", questions: ["負債の部に計上されない引当金とは？","賞与引当金の計上額の算定方法は？","賞与支給額が確定している場合の処理は？","どのような場合に債務保証損失引当金を計上できる？"] },
  { id: "ch5", num: "第5章", title: "商品売買・棚卸資産", questions: ["売上総利益の算定方法は？","売上原価の算定方法は？","商品の購入に係る付随費用(仕入諸掛)はどのように処理する？","商品の販売に係る付随費用(売上諸掛)はどのように処理する？","仕入戻し・仕入値引・仕入割戻・仕入割引はそれぞれどのように処理する？","先入先出法とは？","移動平均法とは？","総平均法とは？","最終仕入原価法とは？","棚卸減耗費・商品評価損の算定方法は？","正味売却価額の算定方法は？","棚卸減耗費の表示区分は？","商品評価損の表示区分は？","種類別を採用した場合の商品評価損の算定方法は？","グループ別を採用した場合の商品評価損の算定方法は？","見本品の提供など，販売以外の原因で商品が減少した場合の処理は？","売価還元法における期末帳簿棚卸高(売価)の算定方法は？","売価還元平均原価法の原価率の算定方法は？","売価還元平均原価法における期末帳簿棚卸高(原価)の算定方法は？","売価還元平均原価法における棚卸減耗費・商品評価損の算定方法は？","売価還元低価法の原価率の算定方法は？","売価還元低価法(商品評価損を認識する)における期末帳簿棚卸高(原価)の算定方法は？","売価還元低価法(商品評価損を認識しない)における期末帳簿棚卸高(原価)の算定方法は？"] },
  { id: "ch6", num: "第6章", title: "本支店会計", questions: ["未達事項の金額を推定する場合，どのように計算する？","合併損益計算書に計上される売上高・仕入高はどういう金額か？","決算整理前残高試算表の繰延内部利益はどういう金額を意味している？","合併損益計算書における期首商品棚卸高の算定方法は？","合併損益計算書における期末商品棚卸高の算定方法は？","利益率とは何か？","利益加算率とは何か？","本支店間で商品売買を行っている場合，棚卸減耗費・商品評価損はどのように算定する？","支店分散計算制度の場合，支店間の取引についてどのように処理する？","本店集中計算制度の場合，支店間の取引についてどのように処理する？"] },
  { id: "ch7", num: "第7章", title: "１株当たり情報", questions: ["１株当たり当期純利益の算定方法は？","普通株主に帰属しない金額とは？(EPS算定)","連結財務諸表におけるEPSの算定方法は？","期中平均株式数の算定方法は？","自己株式を期中で取得している場合の期中平均自己株式数の算定方法は？","「希薄化効果を有する場合」とはどのような場合か？","転換社債型新株予約権付社債：潜在株式調整後EPSの算定方法は？","新株予約権(ワラント)：潜在株式調整後EPSの算定方法は？","株式併合・株式分割が行われた場合のEPSの算定方法は？","１株当たり純資産額の算定方法は？"] },
  { id: "ch9a", num: "第9章Ⅰ", title: "有価証券Ⅰ", questions: ["約定日基準とはどのような処理？","修正受渡日基準とはどのような処理？","有価証券の売却原価の算定方法は？","受取配当金・有価証券利息の表示区分は？","売買目的有価証券の期末評価はどのように行う？","洗替方式とはどのような処理？","切放方式とはどのような処理？","満期保有目的の債券の期末評価はどのように行う？","償却原価法(利息法)の処理は？","償却原価法(定額法)の処理は？","子会社株式及び関連会社株式の期末評価はどのように行う？","その他有価証券(株式)の期末評価はどのように行う？","全部純資産直入法とはどのような処理？","部分純資産直入法とはどのような処理？","減損処理を適用する際の要件は？","裸相場・利付相場とは？","売買目的有価証券から他の保有目的に変更した場合の処理は？"] },
  { id: "ch9b", num: "第9章Ⅱ", title: "有価証券Ⅱ", questions: ["市場価格のない株式等の期末評価はどのように行う？","市場価格のない株式等の減損処理を適用する際の要件は？","実質価額の算定方法は？","その他資本剰余金からの配当を受け取った場合の処理は？(売買目的有価証券以外)","その他資本剰余金からの配当を受け取った場合の処理は？(売買目的有価証券)","未収配当金の処理は？(市場価格のある株式)","親会社株式の期末評価はどのように行う？","親会社株式の表示区分は？"] },
  { id: "ch10", num: "第10章", title: "手形取引", questions: ["手形を裏書した場合の処理は？","手形を割引した場合の処理は？","自己振出の約束手形を受け取った場合の処理は？","為替手形の振出時における振出人・受取人・支払人の処理は？","営業外手形の処理は？","金融手形の処理は？","営業活動から生じた手形・営業外手形・金融手形の表示区分は？","手許に保有している手形が不渡りとなった場合の処理は？","裏書を行っていた手形が不渡りとなった場合の処理は？","割引を行っていた手形が不渡りとなった場合の処理は？"] },
  { id: "ch11", num: "第11章", title: "債権債務", questions: ["電子記録債権の処理は？","金融資産(貸付金)を譲渡した場合の処理は？","買戻条件付現先取引の処理は？","売戻条件付現先取引の処理は？","ゴルフ会員権の期末評価はどのように行う？","ゴルフ会員権(株式方式)の減損処理はどのように行う？","ゴルフ会員権(預託保証金方式)の減損処理はどのように行う？"] },
  { id: "ch12a", num: "第12章Ⅰ", title: "貸倒引当金Ⅰ", questions: ["差額補充法とはどのような処理？","貸倒引当金繰入額の表示区分は？","貸倒引当金の表示区分は？","同一企業に対して債権と債務を有している場合の貸倒引当金の設定方法は？","当期に発生した債権が貸倒れた場合の処理は？","前期以前に発生した債権が貸倒れた場合の処理は？","貸倒損失の表示区分は？","前期以前に貸倒れた債権が回収された場合の処理は？"] },
  { id: "ch12b", num: "第12章Ⅱ", title: "貸倒引当金Ⅱ", questions: ["貸倒実績率の算定方法は？(回収期間：１年未満)","貸倒実績率の算定方法は？(回収期間：１年以上)","財務内容評価法における貸倒見積高の算定方法は？(貸倒懸念債権)","キャッシュ・フロー見積法における貸倒見積高の算定方法は？","キャッシュ・フロー見積法における受取利息の算定方法は？","財務内容評価法における貸倒見積高の算定方法は？(破産更生債権等)","破産更生債権等の表示区分は？"] },
  { id: "ch13", num: "第13章", title: "デリバティブ取引", questions: ["先物価格とは？","現物価格とは？","先物価格と現物価格は期日においてどうなるか？","売建において，どのような場合に利益(損失)が生じるか？","買建において，どのような場合に利益(損失)が生じるか？","決算時に生じる先物取引損益の算定方法は？","決済時に生じる先物取引損益の算定方法は？","取得したオプションの金額の算定方法は？","繰延ヘッジを適用した場合の決算時の処理は？","繰延ヘッジを適用した場合の決済時の処理は？","時価ヘッジを適用した場合の決算時・決済時の処理は？","金利スワップにおいて特例処理を適用した場合の処理は？"] },
  { id: "ch14a", num: "第14章Ⅰ", title: "リース会計Ⅰ(借手)", questions: ["オペレーティング・リース取引(借手)の処理は？","貸手の購入価額が明らかでない場合のリース資産及びリース債務の計上額は？","所有権移転ＦＬの場合のリース資産及びリース債務の計上額は？","所有権移転外ＦＬの場合のリース資産及びリース債務の計上額は？","割引現在価値の算定に用いる利子率は？(知り得る場合・知り得ない場合)","リース料に含まれる利息相当額と元本返済部分の算定方法は？","所有権移転ＦＬにおける減価償却費の算定方法は？","所有権移転外ＦＬにおける減価償却費の算定方法は？","リース債務の表示区分は？"] },
  { id: "ch14b", num: "第14章Ⅱ", title: "リース会計Ⅱ", questions: ["ファイナンス・リース取引の判定方法は？","リース料を前払いする場合の処理は？","維持管理費用相当額が含まれている場合の処理は？","割安購入選択権がある場合の割引現在価値の算定方法は？","残価保証がある場合の割引現在価値の算定方法は？","残価保証がある場合の減価償却費の算定方法は？","リース契約を中途解約した場合の処理は？","セール・アンド・リースバック取引の処理は？"] },
  { id: "ch14c", num: "第14章Ⅲ", title: "リース会計Ⅲ(貸手)", questions: ["各期の利息相当額の算定方法は？(貸手)","リース債権のＢ/Ｓ計上額の算定方法は？","リース取引開始日に売上高と売上原価を計上する方法の処理は？","売上高を計上せずに利息相当額を各期へ配分する方法の処理は？","転リース差益の算定方法は？"] },
  { id: "ch15", num: "第15章", title: "研究開発費・ソフトウェア", questions: ["研究開発費：支出時の処理は？","研究開発目的にのみ使用できない固定資産の処理は？","研究開発後に他の目的に転用できる固定資産の処理は？","研究開発費の表示区分は？","製品マスターが完成するまでに要した費用の処理は？","製品マスターの改良・強化に要した費用の処理は？","市場販売目的のソフトウェアの償却方法は？","各期末の未償却残高が翌期以降の見込販売収益を上回る場合の処理は？","自社利用ソフトウェア：収益獲得・費用削減が確実でない場合の処理は？"] },
  { id: "ch16a", num: "第16章Ⅰ", title: "減損会計Ⅰ", questions: ["減損処理のプロセスは？(３つ)","減損損失を認識するかどうかの判定はどのように行う？","減損損失の測定はどのように行う？","回収可能価額はどのように算定する？","減損処理後の翌期以降の減価償却費はどのように算定する？","使用価値の算定に際して用いる割引率は税引前・税引後のどちらか？","共用資産：原則法に基づき減損処理を行う場合の手順は？","共用資産：例外法に基づき減損処理を行う場合の手順は？","のれん：原則法・例外法における共用資産との違いは？"] },
  { id: "ch16b", num: "第16章Ⅱ", title: "減損会計Ⅱ", questions: ["経済的残存使用年数＞20年の場合，割引前将来ＣＦの総額はどのように算定する？","主要な資産の残存使用年数≧他の構成資産の場合の算定方法は？","主要な資産の残存使用年数＜他の構成資産の場合の算定方法は？(原則法・容認規定)","将来キャッシュ・フローの見積に含める項目は？","将来キャッシュ・フローの見積に含めない項目は？"] },
  { id: "ch17a", num: "第17章Ⅰ", title: "税効果会計Ⅰ", questions: ["永久差異として扱われる項目は？(４つ)","ＤＴＡ・ＤＴＬの表示区分は？","当期末にＤＴＡとＤＴＬの両方がある場合，Ｂ/Ｓ上どのように表示する？","法人税等調整額はＰ/Ｌ上，どのように表示する？","各時点のＤＴＡ及び法人税等調整額はどのように算定する？","その他有価証券に税効果を適用する場合の処理は？(全部純資産直入法)","その他有価証券に税効果を適用する場合の処理は？(部分純資産直入法)"] },
  { id: "ch17b", num: "第17章Ⅱ", title: "税効果会計Ⅱ", questions: ["圧縮記帳(積立金方式)の税効果はどのように算定する？","税率変更があった場合，ＤＴＡ(ＤＴＬ)はどのように算定する？","繰越欠損金がある場合，ＤＴＡはどのように算定する？","評価性引当額とはどういう金額？","資産除去債務がある場合の税効果はどのように算定する？"] },
  { id: "ch18a", num: "第18章Ⅰ", title: "外貨建取引Ⅰ", questions: ["前払金・前受金の換算方法は？","貨幣項目にはどのようなものがある？","非貨幣項目にはどのようなものがある？","貨幣項目・非貨幣項目それぞれの決算時の換算方法は？","為替差損益の表示区分は？","為替予約(振当処理)：取引発生以前の処理は？","為替予約(振当処理)：取引発生後の処理は？"] },
  { id: "ch18b", num: "第18章Ⅱ", title: "外貨建取引Ⅱ", questions: ["外貨建売買目的有価証券の処理は？","外貨建満期保有目的の債券の処理は？","外貨建子会社株式及び関連会社株式の処理は？","外貨建その他有価証券(株式の場合)の処理は？","外貨建その他有価証券(債券の場合)の処理は？(原則・容認)","外貨建有価証券(市場価格あり)の減損処理はどのように行う？","外貨建満期保有目的の債券に為替予約を付し振当処理を行った場合の処理は？"] },
  { id: "ch18c", num: "第18章Ⅲ", title: "外貨建取引Ⅲ", questions: ["為替予約(独立処理)の処理は？","予定取引(独立処理・振当処理)の処理は？","外貨建社債の処理は？","外貨建新株予約権の処理は？","外貨建新株予約権付社債の処理は？(一括法)"] },
  { id: "ch19", num: "第19章", title: "社債", questions: ["償却原価法(利息法)の処理は？(社債)","償却原価法(定額法)の処理は？(社債)","社債，社債利息の表示区分は？","満期償還の処理は？","買入償還の処理は？","抽選償還の処理は？(利息法・定額法)","繰上償還の処理は？","社債利息が未計上の場合の処理は？"] },
  { id: "ch20", num: "第20章", title: "新株予約権付社債", questions: ["付与割合とは？","転換社債型以外の新株予約権付社債の処理は？","権利行使時の交付株式数の算定方法は？","転換社債型新株予約権付社債の処理は？(区分法)","転換社債型新株予約権付社債の処理は？(一括法)","取得者側の処理は？"] },
  { id: "ch21a", num: "第21章Ⅰ", title: "退職給付会計Ⅰ", questions: ["退職給付債務の算定方法は？","勤務費用の算定方法は？","利息費用の算定方法は？","退職給付見込額のうち期末までに発生している金額の算定方法は？(期間定額基準)","退職給付見込額のうち期末までに発生している金額の算定方法は？(給付算定式基準)","期待運用収益の算定方法は？","退職給付引当金，退職給付費用の表示区分は？","従業員拠出があった場合の退職給付費用・退職給付引当金の算定方法は？"] },
  { id: "ch21b", num: "第21章Ⅱ", title: "退職給付会計Ⅱ", questions: ["予想昇給率＜実際昇給率：不利差異 or 有利差異？","期首割引率＜期末割引率：不利差異 or 有利差異？","長期期待運用収益率＜実際運用収益率：不利差異 or 有利差異？","退職給付債務の予測額＜実績額：不利差異 or 有利差異？","年金資産の予測額＜公正な評価額：不利差異 or 有利差異？","数理計算上の差異，過去勤務費用はどのように処理する？","未認識の差異がある場合の退職給付引当金の算定方法は？","未認識の差異がある場合の退職給付費用の算定方法は？","数理計算上の差異の費用処理開始時期は？","過去勤務費用の費用処理開始時期は？","退職給付信託へ拠出した場合の処理は？","前払年金費用の表示区分は？"] },
  { id: "ch22", num: "第22章", title: "資産除去債務", questions: ["資産除去債務の算定方法は？","資産除去債務を算定する際に用いる割引率は？","資産除去債務，除去費用の表示区分は？","賃借契約に関連する敷金について，容認法を適用した場合の処理は？","見積りの変更：キャッシュ・フローが増加・減少する場合に用いる割引率は？","資産除去債務が使用の都度発生する場合の処理は？(原則法・容認法)"] },
  { id: "ch23a", num: "第23章Ⅰ", title: "純資産Ⅰ", questions: ["新株発行時の処理は？(原則・例外)","配当時の準備金の積立額の算定方法は？","自己株式を有償取得した場合の処理は？","自己株式を処分した場合の処理は？","自己株式を消却した場合の処理は？","Ｂ/Ｓ上，自己株式はどのように表示する？","決算時にその他資本剰余金がマイナスの場合の処理は？","新株予約権の処理は？(発行時・権利行使時・権利行使期間終了時)","自己新株予約権の処理は？(取得時・処分時・消却時)","現物出資時の処理は？"] },
  { id: "ch23b", num: "第23章Ⅱ・Ⅲ", title: "純資産Ⅱ・Ⅲ", questions: ["新株予約権(売買目的有価証券)の処理は？(取得時・決算時・権利行使時・失効時)","新株予約権(その他有価証券)の処理は？(取得時・決算時・権利行使時・失効時)","自己新株予約権の減損処理における評価損の算定方法は？","その他有価証券の売却による増減の算定方法は？(株主資本等変動計算書)"] },
  { id: "ch24", num: "第24章", title: "分配可能額", questions: ["分配可能額の算定方法は？","剰余金とは？","分配時の剰余金の算定方法は？","分配時の自己株式の帳簿価額は，分配可能額の算定にどのように処理する？","その他有価証券評価差額金(借方残高)・土地再評価差額金(借方残高)の処理は？","繰延ヘッジ損益は，分配可能額の算定にどのように処理する？","のれん等調整額の減算額の算定方法は？","臨時決算がなされている場合の分配可能額の算定方法は？"] },
  { id: "ch25", num: "第25章", title: "ストック・オプション等", questions: ["各期の費用計上額の算定方法は？","権利確定条件の達成見込みに変更があった場合の処理は？","公正な評価単価を変動させる条件変更(付与日＜条件変更日)の処理は？","公正な評価単価を変動させる条件変更(付与日≧条件変更日)の処理は？","ストック・オプション数を変動させる条件変更の処理は？","段階的に権利行使が可能となる場合の処理は？(原則・容認)","権利確定日後になされた権利行使時の処理は？","株式の無償交付(事前交付型・事後交付型)の処理は？"] },
  { id: "ch26", num: "第26章", title: "会計上の変更及び誤謬の訂正", questions: ["会計方針の変更による累積的影響額の算定方法は？","誤謬による累積的影響額の算定方法は？"] },
  { id: "ch27", num: "第27章", title: "中間財務諸表", questions: ["見積実効税率の算定方法は？","原価差異を繰延処理する場合の仕訳は？"] },
  { id: "ch28a", num: "第28章Ⅰ", title: "収益認識Ⅰ", questions: ["どのような場合に契約資産が計上される？","どのような場合に契約負債が計上される？","合意された仕様に従った保証(基本保証)の処理は？","保証サービス(追加保証)の処理は？","顧客に付与したオプション(ポイント)の処理は？","本人・代理人に該当する場合の処理は？","消化仕入の処理は？","リベート：販売時の処理は？","返品権付販売：販売時の処理は？","重要な金融要素：販売時の売掛金の算定方法は？","顧客に支払われる対価がある場合の処理は？","取引価格が事後的に変動した場合の処理は？"] },
  { id: "ch28b", num: "第28章Ⅱ・Ⅲ", title: "収益認識Ⅱ・Ⅲ", questions: ["原価回収基準の処理は？","一定の期間にわたり履行義務が充足される場合の工事収益の算定方法は？","請負契約価額及び見積工事原価が変更された場合の処理は？","工事損失引当金の算定方法は？","契約変更を独立した契約として処理する場合の２要件は？","契約変更が独立した契約として処理されない場合の処理は？"] },
  { id: "ch29a", num: "第29章Ⅰ", title: "連結会計Ⅰ(基礎)", questions: ["連結Ｂ/Ｓの資本金はどういう金額？","連結Ｂ/Ｓののれんの算定方法は？","連結Ｐ/Ｌののれん償却額の算定方法は？","のれん償却額・負ののれん発生益の表示区分は？","土地について評価差額を計上した場合，連結Ｂ/Ｓの土地の算定方法は？","連結Ｐ/Ｌの親会社株主に帰属する当期純利益の算定方法は？","連結Ｂ/Ｓの利益剰余金の算定方法は？","連結Ｐ/Ｌの非支配株主に帰属する当期純利益の算定方法は？","連結Ｂ/Ｓの非支配株主持分の算定方法は？","連結Ｐ/Ｌに計上される受取配当金の算定方法は？"] },
  { id: "ch29b", num: "第29章Ⅱ", title: "連結会計Ⅱ(資本連結基礎)", questions: ["連結Ｐ/Ⅼの段階取得に係る差損益の算定方法は？","追加取得後の連結Ｂ/Ｓの資本剰余金の算定方法は？","一部売却(売却後も支配関係が継続)の連結Ｂ/Ｓの資本剰余金の算定方法は？","連結Ｂ/Ｓに計上されるその他有価証券評価差額金の算定方法は？","非償却性資産について，評価差額が実現した場合の処理は？","償却性資産について，減価償却により評価差額が実現した場合の処理は？","棚卸資産について，評価差額が実現した場合の処理は？"] },
  { id: "ch29c", num: "第29章Ⅲ", title: "連結会計Ⅲ(成果連結基礎)", questions: ["棚卸資産：期末未実現利益消去の仕訳は？","棚卸資産：期首未実現利益の消去及び実現の仕訳は？","固定資産(非償却性資産)：期末未実現利益の消去の仕訳は？","固定資産(償却性資産)：期末未実現利益の消去・実現の仕訳は？","貸倒引当金の修正の仕訳は？(債権債務の相殺消去)","当期末に商品未達がある場合の処理は？","当期末に決済未達がある場合の処理は？"] },
  { id: "ch29d", num: "第29章Ⅳ", title: "連結会計Ⅳ(連結税効果)", questions: ["連結財務諸表固有の一時差異の帰属先は？","繰延税金資産・繰延税金負債の相殺はどのように行う？","成果連結に対して税効果を適用する場合の仕訳は？","資本連結(評価差額)に対して税効果を適用する場合の仕訳は？","親会社と子会社の税率が異なる場合の処理は？"] },
  { id: "ch30", num: "第30章", title: "持分法会計", questions: ["連結Ｂ/Ｓの投資有価証券(持分法評価額)の算定方法は？","連結Ｐ/Ｌの持分法による投資利益(損失)の算定方法は？","持分法適用会社の資産及び負債の時価評価はどのように行う？","段階取得(原則法・簡便法)の処理は？(持分法)","一部売却の処理は？(持分法)","持分法適用会社が計上しているその他有価証券評価差額金の処理は？","期末未実現利益の消去の仕訳は？(ダウンストリーム・アップストリーム)"] },
  { id: "ch31", num: "第31章", title: "包括利益", questions: ["連結Ｃ/Ｉのその他の包括利益の算定方法は？","連結Ｃ/Ｉの包括利益の算定方法は？","連結Ｃ/Ｉの親会社株主に係る包括利益の算定方法は？","連結Ｃ/Ｉの非支配株主に係る包括利益の算定方法は？","連結Ｂ/Ｓのその他の包括利益累計額の算定方法は？","持分法適用会社に対する持分相当額の算定方法は？"] },
  { id: "ch32", num: "第32章", title: "連結退職給付", questions: ["連結Ｂ/Ｓの退職給付に係る負債の算定方法は？(親会社で未認識の差異)","連結Ｂ/Ｓの退職給付に係る調整累計額の算定方法は？","連結Ｐ/Ⅼの退職給付費用の算定方法は？(連結)","連結Ｃ/Ｉの退職給付に係る調整額の算定方法は？","連結Ｂ/Ｓの退職給付に係る負債の算定方法は？(子会社で未認識の差異)"] },
  { id: "ch33", num: "第33章", title: "在外支店", questions: ["在外支店の原則的な換算方法は？","在外支店の収益・費用の換算について，特例処理による場合の換算方法は？","在外支店の換算手順は？","在外支店の照合勘定(換算後)はどういう金額？","在外支店の売上原価・棚卸資産・減価償却費の換算方法は？","在外支店の期首・期末商品棚卸高に含まれる内部利益の算定方法は？"] },
  { id: "ch34", num: "第34章", title: "在外子会社", questions: ["収益・費用及び当期純利益の換算方法は？","資産及び負債の換算方法は？(在外子会社)","支配獲得時・獲得後の株主資本に属する項目の換算方法は？","損益計算書・貸借対照表において生じた換算差額はどのように処理する？","連結Ｂ/Ｓののれんの算定方法は？(在外子会社)","連結Ｂ/Ｓの為替換算調整勘定の算定方法は？","連結Ｃ/Ｉの為替換算調整勘定の算定方法は？"] },
  { id: "ch35", num: "第35章", title: "セグメント情報", questions: ["10％ルールとは？","75％ルールとは？"] },
  { id: "ch36a", num: "第36章Ⅰ", title: "個別ＣＦ計算書Ⅰ", questions: ["ＣＦ計算書が対象とする資金の範囲は？","営業収入の算定方法は？(直接法)","仕入支出の算定方法は？(直接法)","人件費の支出の算定方法は？","利息及び配当金の表示方法は？(２つ)","利息及び配当金の受取額の算定方法は？","利息の支払額の算定方法は？","法人税等の支払額の算定方法は？"] },
  { id: "ch36b", num: "第36章Ⅱ", title: "個別ＣＦ計算書Ⅱ", questions: ["有価証券・有形固定資産の取得による支出・売却による収入の算定方法は？","定期預金や貸付金等について為替差損益が生じている場合の処理は？","短期・長期借入れによる収入・返済による支出の算定方法は？","配当金の支払額の算定方法は？","間接法：小計の算定プロセスは？(３つ)","間接法における償却債権取立益の取扱いは？","間接法における為替差損益の取扱いは？","ファイナンス・リース取引に係るリース料の取扱いは？"] },
  { id: "ch39", num: "第39章", title: "企業結合会計", questions: ["パーチェス法とは？","取得企業の決定方法は？","取得原価の算定方法は？","合併：交付株式数の算定方法は？","繰延資産：引き継ぐ？or 引き継がない？(企業結合)","金銭債権はどのような金額で引き継ぐ？","退職給付引当金はどのような金額で引き継ぐ？","その他有価証券評価差額金：引き継ぐ？or 引き継がない？","取得関連費用の処理は？(企業結合)","合併比率の算定方法は？","株式市価法・簿価純資産額法・時価純資産額法・収益還元価値法とは？","株式交換：交付株式数の算定方法は？","株式移転：交付株式数の算定方法は？","共通支配下：親会社が子会社を吸収合併した場合の抱合せ株式消滅差益の算定方法は？","逆取得(吸収合併)：連結上の処理は？"] },
  { id: "ch40", num: "第40章", title: "事業分離会計", questions: ["投資の清算に該当する場合の処理は？","投資の継続に該当する場合の処理は？","投資の清算・投資の継続の判断基準は？","共通支配下の取引(対価：現金等の財産)に該当する場合の処理は？","共通支配下の取引(対価：分離先企業の株式のみ)に該当する場合の処理は？","分離先企業：取得に該当する場合の処理は？","対価が現金等の財産のみの場合：分離先企業が子会社である場合の連結上の処理は？","対価が現金等の財産のみの場合：分離先企業が関連会社である場合の連結上の処理は？"] },
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

export default function CPAIntegratedLearningSystem() {
  const [activeSubject, setActiveSubject] = useState('fin');
  const [activeLectureType, setActiveLectureType] = useState('calc');
  const [activeTab, setActiveTab] = useState('scheduler');

  // ── 財務会計論 計算講義 (全47回) ──
  const [finCalculusLectures] = useState([
    { id: 'fincalc1', num: 1, name: '現金預金', chapter: '第1章', textbook: '①', chapters: ['ch1'] },
    { id: 'fincalc2', num: 2, name: '有形固定資産', chapter: '第2章', textbook: '①', chapters: ['ch2'] },
    { id: 'fincalc3', num: 3, name: '有形固定資産、無形固定資産・投資その他の資産・繰延資産、引当金、経過勘定', chapter: '第3,4,8章', textbook: '①', chapters: ['ch2', 'ch3', 'ch4'] },
    { id: 'fincalc4', num: 4, name: '商品売買・棚卸資産', chapter: '第5章', textbook: '①', chapters: ['ch5'] },
    { id: 'fincalc5', num: 5, name: '有価証券Ⅰ', chapter: '第9章Ⅰ', textbook: '②', chapters: ['ch9a'] },
    { id: 'fincalc6', num: 6, name: '有価証券Ⅰ、手形取引、貸倒引当金Ⅰ', chapter: '第9,10,12章', textbook: '②', chapters: ['ch9a', 'ch10', 'ch12a'] },
    { id: 'fincalc7', num: 7, name: 'リース会計Ⅰ、研究開発費・ソフトウェア', chapter: '第14,15章', textbook: '③', chapters: ['ch14a', 'ch15'] },
    { id: 'fincalc8', num: 8, name: '減損会計Ⅰ、税金及び税効果会計Ⅰ', chapter: '第16,17章', textbook: '③', chapters: ['ch16a', 'ch17a'] },
    { id: 'fincalc9', num: 9, name: '税金及び税効果会計Ⅰ、外貨建取引Ⅰ', chapter: '第17,18章', textbook: '③④', chapters: ['ch17a', 'ch18a'] },
    { id: 'fincalc10', num: 10, name: '外貨建取引Ⅰ、社債', chapter: '第18,19章', textbook: '④', chapters: ['ch18a', 'ch19'] },
    { id: 'fincalc11', num: 11, name: '本支店会計', chapter: '第6章', textbook: '①', chapters: ['ch6'] },
    { id: 'fincalc12', num: 12, name: '退職給付会計Ⅰ', chapter: '第21章Ⅰ', textbook: '④', chapters: ['ch21a'] },
    { id: 'fincalc13', num: 13, name: '退職給付会計Ⅱ、資産除去債務', chapter: '第21,22章', textbook: '④', chapters: ['ch21a', 'ch22'] },
    { id: 'fincalc14', num: 14, name: '純資産Ⅰ', chapter: '第23章Ⅰ', textbook: '⑤', chapters: ['ch23a'] },
    { id: 'fincalc15', num: 15, name: 'ストック・オプション等', chapter: '第25章', textbook: '⑤', chapters: ['ch25'] },
    { id: 'fincalc16', num: 16, name: '外貨建取引Ⅱ、新株予約権付社債', chapter: '第18,20章', textbook: '④', chapters: ['ch18b', 'ch20'] },
    { id: 'fincalc17', num: 17, name: '税金及び税効果会計Ⅱ', chapter: '第17章Ⅱ', textbook: '③', chapters: ['ch17b'] },
    { id: 'fincalc18', num: 18, name: '収益認識Ⅰ', chapter: '第28章Ⅰ', textbook: '⑤', chapters: ['ch28a'] },
    { id: 'fincalc19', num: 19, name: '減損会計Ⅱ、収益認識Ⅱ～Ⅲ', chapter: '第16,28章', textbook: '③⑤', chapters: ['ch16b', 'ch28a'] },
    { id: 'fincalc20', num: 20, name: '貸倒引当金Ⅱ、リース会計Ⅱ', chapter: '第12,14章', textbook: '②③', chapters: ['ch12b', 'ch14b'] },
    { id: 'fincalc21', num: 21, name: 'リース会計Ⅲ', chapter: '第14章Ⅲ', textbook: '③', chapters: ['ch14c'] },
    { id: 'fincalc22', num: 22, name: '有価証券Ⅱ、債権債務、外貨建取引Ⅱ、期中財務諸表', chapter: '第9,11,18,27章', textbook: '②④⑤', chapters: ['ch9b', 'ch11', 'ch18b'] },
    { id: 'fincalc23', num: 23, name: 'デリバティブ', chapter: '第13章', textbook: '②', chapters: ['ch13'] },
    { id: 'fincalc24', num: 24, name: '外貨建取引Ⅲ、純資産Ⅱ、会計方針の変更', chapter: '第18,23,26章', textbook: '④⑤', chapters: ['ch18c', 'ch23b', 'ch26'] },
    { id: 'fincalc25', num: 25, name: '連結会計Ⅰ', chapter: '第29章Ⅰ', textbook: '⑥', chapters: ['ch29a'] },
    { id: 'fincalc26', num: 26, name: '連結会計Ⅰ～Ⅱ', chapter: '第29章Ⅱ', textbook: '⑥', chapters: ['ch29a', 'ch29b'] },
    { id: 'fincalc27', num: 27, name: '連結会計Ⅱ～Ⅲ', chapter: '第29章Ⅲ', textbook: '⑥', chapters: ['ch29b', 'ch29c'] },
    { id: 'fincalc28', num: 28, name: '連結会計Ⅱ～Ⅲ', chapter: '第29章', textbook: '⑥', chapters: ['ch29b', 'ch29c'] },
    { id: 'fincalc29', num: 29, name: '連結会計Ⅱ～Ⅲ', chapter: '第29章', textbook: '⑥', chapters: ['ch29b', 'ch29c'] },
    { id: 'fincalc30', num: 30, name: '連結会計Ⅳ', chapter: '第29章Ⅳ', textbook: '⑥', chapters: ['ch29d'] },
    { id: 'fincalc31', num: 31, name: '持分法会計', chapter: '第30章', textbook: '⑧', chapters: ['ch30'] },
    { id: 'fincalc32', num: 32, name: '包括利益', chapter: '第31章', textbook: '⑧', chapters: ['ch31'] },
    { id: 'fincalc33', num: 33, name: '純資産Ⅲ、連結退職給付、在外支店', chapter: '第23,32,33章', textbook: '⑤⑧', chapters: ['ch23b', 'ch32', 'ch33'] },
    { id: 'fincalc34', num: 34, name: '在外子会社', chapter: '第34章', textbook: '⑧', chapters: ['ch34'] },
    { id: 'fincalc35', num: 35, name: '個別キャッシュ・フロー計算書Ⅰ', chapter: '第36章Ⅰ', textbook: '⑨', chapters: ['ch36a'] },
    { id: 'fincalc36', num: 36, name: '個別キャッシュ・フロー計算書Ⅱ', chapter: '第36章Ⅱ', textbook: '⑨', chapters: ['ch36b'] },
    { id: 'fincalc37', num: 37, name: '企業結合会計', chapter: '第39章', textbook: '⑩', chapters: ['ch39'] },
    { id: 'fincalc38', num: 38, name: '企業結合会計', chapter: '第39章', textbook: '⑩', chapters: ['ch39'] },
    { id: 'fincalc39', num: 39, name: '事業分離会計', chapter: '第40章', textbook: '⑩', chapters: ['ch40'] },
    { id: 'fincalc40', num: 40, name: '企業結合会計、事業分離会計', chapter: '第39,40章', textbook: '⑩', chapters: ['ch39', 'ch40'] },
    { id: 'fincalc41', num: 41, name: '連結キャッシュ・フロー計算書Ⅰ', chapter: '第37章Ⅰ', textbook: '⑨', chapters: ['ch36a'] },
    { id: 'fincalc42', num: 42, name: '連結キャッシュ・フロー計算書Ⅱ、在外連結CF計算書', chapter: '第37,38章', textbook: '⑨', chapters: ['ch36b'] },
    { id: 'fincalc43', num: 43, name: '連結会計Ⅴ', chapter: '第29章Ⅴ', textbook: '⑦', chapters: ['ch29a'] },
    { id: 'fincalc44', num: 44, name: '連結会計Ⅴ', chapter: '第29章Ⅴ', textbook: '⑦', chapters: ['ch29a'] },
    { id: 'fincalc45', num: 45, name: '連結会計Ⅵ～Ⅶ、連結CF計算書Ⅱ', chapter: '第29,37章', textbook: '⑦⑨', chapters: ['ch29a', 'ch36b'] },
    { id: 'fincalc46', num: 46, name: '１株当たり情報、分配可能額', chapter: '第7,24章', textbook: '①⑤', chapters: ['ch7', 'ch24'] },
    { id: 'fincalc47', num: 47, name: '在外子会社、セグメント情報、企業結合会計、事業分離会計', chapter: '第35,34,39,40章', textbook: '⑧⑩', chapters: ['ch34', 'ch35', 'ch39', 'ch40'] },
  ]);

  // ── State ──
  const [learningRecords, setLearningRecords] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [expandedRecords, setExpandedRecords] = useState({});
  const [completedLectures, setCompletedLectures] = useState(new Set());
  const [todayItems, setTodayItems] = useState(null);
  const [todayLoading, setTodayLoading] = useState(false);
  const [todayRevealed, setTodayRevealed] = useState({});
  const [todayMastered, setTodayMastered] = useState({});

  // ── LocalStorage ──
  useEffect(() => {
    const saved = localStorage.getItem('cpa_learning_records_final');
    if (saved) setLearningRecords(JSON.parse(saved));
    
    const savedCompleted = localStorage.getItem('cpa_completed_lectures');
    if (savedCompleted) setCompletedLectures(new Set(JSON.parse(savedCompleted)));
  }, []);

  // ── 本日の問題を生成 ──
  const generateTodayAnswers = useCallback(async () => {
    if (todayLoading || todayItems) return;

    // 受講した講義から対応する章を抽出
    const completedLectureIds = Array.from(completedLectures).filter(id => id.startsWith('fincalc'));
    
    if (completedLectureIds.length === 0) {
      alert('受講した講義を記録してから出題できます');
      return;
    }

    const chapterIds = new Set();
    finCalculusLectures.forEach(lecture => {
      if (completedLectureIds.includes(lecture.id) && lecture.chapters) {
        lecture.chapters.forEach(ch => chapterIds.add(ch));
      }
    });

    const relevantChapters = chaptersData.filter(ch => chapterIds.has(ch.id));
    const flatList = buildFlatList(relevantChapters);

    if (flatList.length === 0) {
      alert('出題可能な問題がありません');
      return;
    }

    // 本日の問題を決定（1ヶ月サイクル）
    const dayNumber = getTodayDayNumber();
    const cycleDayIndex = dayNumber % Math.ceil(flatList.length / PER_DAY);
    const todayStart = cycleDayIndex * PER_DAY;
    const todaySlice = flatList.slice(todayStart, todayStart + PER_DAY);

    setTodayLoading(true);
    setTodayRevealed({});
    setTodayMastered({});

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
  }, [todayLoading, todayItems, completedLectures, finCalculusLectures]);

  // ── CSS ──
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
    },
    questionCard: {
      padding: '16px',
      background: '#f8f9fb',
      borderRadius: '8px',
      marginBottom: '12px',
      borderLeft: '4px solid #667eea',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      {/* ヘッダー */}
      <div style={styles.header}>
        <h1>📚 CPA試験 完全統合学習管理システム</h1>
        <p>財務会計論＆管理会計論＋毎日の問題</p>
      </div>

      {/* タブナビゲーション */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          style={{
            ...styles.tabButton,
            background: activeTab === 'scheduler' ? '#667eea' : '#ecf0f1',
            color: activeTab === 'scheduler' ? 'white' : '#2c3e50',
          }}
          onClick={() => setActiveTab('scheduler')}
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
        <button
          style={{
            ...styles.tabButton,
            background: activeTab === 'content' ? '#667eea' : '#ecf0f1',
            color: activeTab === 'content' ? 'white' : '#2c3e50',
          }}
          onClick={() => setActiveTab('content')}
        >
          📚 学習内容管理
        </button>
      </div>

      {/* 毎日の問題タブ */}
      {activeTab === 'daily' && (
        <div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>📝 本日の問題（財務会計論）</div>
            <p style={{ color: '#7f8c8d', marginBottom: '16px' }}>
              受講した講義の範囲から、1日15問出題されます。
              <br />
              1ヶ月で全受講範囲を1周できるように設計されています。
            </p>

            {!todayItems && (
              <button
                style={{ ...styles.button, width: '100%' }}
                onClick={generateTodayAnswers}
                disabled={todayLoading}
              >
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
                    onClick={() =>
                      setTodayRevealed({
                        ...todayRevealed,
                        [idx]: !todayRevealed[idx],
                      })
                    }
                  >
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                      問{idx + 1}: {item.q}
                    </div>
                    {todayRevealed[idx] && (
                      <div
                        style={{
                          background: '#e8f5e9',
                          padding: '12px',
                          borderRadius: '6px',
                          marginTop: '8px',
                          lineHeight: '1.6',
                          fontSize: '13px',
                        }}
                      >
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

      {/* その他のタブ */}
      {activeTab !== 'daily' && (
        <div style={styles.card}>
          <div style={styles.cardTitle}>準備中</div>
          <p>他のタブは元のバージョンを使用してください</p>
          <p style={{ fontSize: '12px', color: '#7f8c8d' }}>
            このバージョンは毎日の問題機能に特化しています。
            復習スケジューラーと学習内容管理は前のバージョンをご使用ください。
          </p>
        </div>
      )}
    </div>
  );
}
