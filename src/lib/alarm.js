// 앱의 알람 설정 규칙(yak-allim-android의 AlarmFormDefaults.kt)을 웹 데모용으로 옮긴 것.
// 화면과 분리한 보통 함수라, 같은 값을 넣으면 앱과 같은 결과가 나온다.

export const AMOUNT = { min: 0.5, max: 10, step: 0.5 };
export const FREQUENCY = { min: 1, max: 8, step: 1 };
export const DURATION = { min: 1, max: 120, step: 1 };

const pad = (n) => String(n).padStart(2, '0');

/** 0.5 단위 복용량을 "1", "0.5"처럼 짧게 쓴다. */
export function formatAmount(amount) {
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(1);
}

/**
 * 하루 횟수에 맞는 기본 복용 시각. 식사 시간을 기준으로 하고, 4회부터 취침 전을 넣는다.
 * 5회 이상은 07:00~22:00을 30분 단위로 나눈다.
 */
export function defaultTimes(frequency) {
  switch (frequency) {
    case 1:
      return ['08:00'];
    case 2:
      return ['08:00', '19:00'];
    case 3:
      return ['08:00', '12:30', '18:30'];
    case 4:
      return ['08:00', '12:30', '18:30', '22:00'];
    default: {
      const start = 7 * 60;
      const end = 22 * 60;
      return Array.from({ length: frequency }, (_, index) => {
        const minutes = start + Math.floor(((end - start) * index) / (frequency - 1));
        const rounded = Math.floor((minutes + 15) / 30) * 30;
        return `${pad(Math.floor(rounded / 60))}:${pad(rounded % 60)}`;
      });
    }
  }
}

// "HH:MM"은 글자 순서가 곧 시간 순서다. 지운 시각('')은 맨 뒤에 둔다.
const byTime = (a, b) => {
  if (a === '' || b === '') return Number(a === '') - Number(b === '');
  return a < b ? -1 : a > b ? 1 : 0;
};

const minutesOf = (time) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));

/**
 * 횟수가 바뀔 때의 복용 시각. 새 횟수의 기본값에서 시작해, 사용자가 고친 시각은 그대로 남긴다.
 * 고친 시각 하나가 가장 가까운 기본값 하나를 대신하고, 결과는 시간순이다.
 * 고친 시각이 새 횟수보다 많으면 이른 시각부터 남긴다.
 * 웹에서만 생기는 지운 시각('')도 고친 값으로 남기고, 원래 그 자리의 기본값과 가까운 기본값을 대신한다.
 */
export function resizeTimes(current, frequency) {
  const defaults = defaultTimes(frequency);
  if (current.length === 0) return defaults;
  // 시각은 고칠 때마다 정렬되어 자리가 바뀌므로, 자리가 아니라 값으로 이전 기본값과 비교해 고친 시각을 고른다.
  const unmatchedDefaults = defaultTimes(current.length);
  const matchesDefault = (time) => {
    const index = unmatchedDefaults.indexOf(time);
    if (index < 0) return false;
    unmatchedDefaults.splice(index, 1);
    return true;
  };
  const edited = current.filter((time) => time !== '' && !matchesDefault(time)).map((time) => ({ time, anchor: time }));
  // 지운 칸은 아무 시각과도 짝이 맞지 않은 이전 기본값을 기준으로 삼는다.
  const cleared = current
    .filter((time) => time === '')
    .map(() => ({ time: '', anchor: unmatchedDefaults.shift() ?? defaults[0] }));
  const kept = [...edited, ...cleared].sort((a, b) => byTime(a.time, b.time)).slice(0, frequency);
  const remaining = [...defaults];
  for (const { anchor } of kept) {
    const distance = (time) => Math.abs(minutesOf(time) - minutesOf(anchor));
    const nearest = remaining.reduce((best, time) => (distance(time) < distance(best) ? time : best));
    remaining.splice(remaining.indexOf(nearest), 1);
  }
  return [...kept.map(({ time }) => time), ...remaining].sort(byTime);
}

/** 시각을 시간순으로 놓는다. 지운 칸('')은 맨 뒤. 앱의 replaceTime처럼 시각을 고친 뒤에 쓴다. */
export function sortTimes(times) {
  return [...times].sort(byTime);
}

/**
 * 알람을 켤 수 있는지. 1회 복용량을 정했고 복용 시각이 하나도 비어 있지 않아야 한다.
 * 앱은 시각 선택기라 비지 않지만, 웹의 time 입력은 지울 수 있어 데모에서만 따로 막는다.
 */
export function isAlarmReady(amount, times) {
  return amount !== null && times.every((time) => time !== '');
}

/** "08:00"이 하루 중 언제인지. 시각 칩의 이름표에 쓴다. */
export function timeOfDay(time) {
  const hour = Number(time.split(':')[0]) || 0;
  if (hour >= 4 && hour <= 10) return '아침';
  if (hour >= 11 && hour <= 15) return '점심';
  if (hour >= 16 && hour <= 20) return '저녁';
  return '취침 전';
}

/** 오늘부터 days일 동안의 날짜 범위를 "10월 20일 ~ 10월 24일"로. */
export function dateRange(days, today = new Date()) {
  const end = new Date(today);
  end.setDate(today.getDate() + days - 1);
  const label = (d) => `${d.getMonth() + 1}월 ${d.getDate()}일`;
  return `${label(today)} ~ ${label(end)}`;
}
