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

/** 횟수가 바뀌면, 사용자가 이미 고친 앞쪽 시각은 남기고 나머지는 기본값으로 채운다. */
export function resizeTimes(current, frequency) {
  const defaults = defaultTimes(frequency);
  return defaults.map((time, index) => current[index] ?? time);
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
