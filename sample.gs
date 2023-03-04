function notyfyTakingOutTrash() {
  const url = 'https://api.line.me/v2/bot/message/push';
  // チャネルアクセストークン
  const token = 'Mif7641lvCzuosOkVo4hk2dhLsUkj2z7PXJ6ydo0XjKWe/t4C7bXcSyzcSOrI9eokCsgqYaknd5j0lm5scuPe5baMD1wbBbnzOMh8985WzGXWM6DTSltyxyx5wvPeNWJtKJm1gi43FRLIZQqB1d1nAdB04t89/1O/w1cDnyilFU='; 

  const date = new Date()
  const dayOfToday = getDayOfWeekStr_(date);
  var message = getMessageAboutTrash_(date);
  if (!message)
    message = '今日はゴミの日ではありません';

  const payload = {
    // ユーザーID
    to: 'U6616557a5378302e99c925ab5c5c85a2',　
    messages: [
      { 
        type: 'text',
        text: `今日は${dayOfToday}!` 
      },
      {
        type: 'text',
        text: message
      }
    ]
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    // オブジェクトをJSONに変換
    payload: JSON.stringify(payload)
  };
  
  // GASでHTTPリクエストを行う
  UrlFetchApp.fetch(url, params);
}

function getMessageAboutTrash_(date) {
  const weekOfMonth = getWeekOfMonth_(date);
  const dayOfWeek = getDayOfWeekStr_(date);
  
  if (['火曜日', '金曜日'].includes(dayOfWeek)) 
    return '燃えるゴミの日です！';
  else if (dayOfWeek == '月曜日')
    return '燃えないゴミの日です！';
}

// 何週間目か返す
function getWeekOfMonth_(date){
  return Math.floor((date.getDate() - 1) / 7) + 1;
}

// 曜日を返す
function getDayOfWeekStr_(date){
  const dayOfWeeks = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  const dayOfWeek = date.getDay();
  return dayOfWeeks[dayOfWeek];
}