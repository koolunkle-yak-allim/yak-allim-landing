// 앱의 AlarmFormDefaultsTest.kt와 같은 사례를 그대로 옮겨, 웹 데모가 앱과 같은 값을 내는지 확인한다.
import { describe, expect, it } from 'vitest';
import {
  AMOUNT,
  FREQUENCY,
  DURATION,
  formatAmount,
  defaultTimes,
  resizeTimes,
  isAlarmReady,
  timeOfDay,
  dateRange,
} from './alarm.js';

describe('값 범위', () => {
  it('앱의 MIN/MAX 상수와 같다', () => {
    expect(AMOUNT).toEqual({ min: 0.5, max: 10, step: 0.5 });
    expect(FREQUENCY).toEqual({ min: 1, max: 8, step: 1 });
    expect(DURATION).toEqual({ min: 1, max: 120, step: 1 });
  });
});

describe('formatAmount', () => {
  it('정수면 소수점 없이 쓴다', () => {
    expect(formatAmount(1)).toBe('1');
    expect(formatAmount(0.5)).toBe('0.5');
    expect(formatAmount(2.5)).toBe('2.5');
  });
});

describe('defaultTimes', () => {
  it('하루 4회까지는 식사 시간을 따른다', () => {
    expect(defaultTimes(1)).toEqual(['08:00']);
    expect(defaultTimes(2)).toEqual(['08:00', '19:00']);
    expect(defaultTimes(3)).toEqual(['08:00', '12:30', '18:30']);
    expect(defaultTimes(4)).toEqual(['08:00', '12:30', '18:30', '22:00']);
  });

  it('5회 이상은 07시부터 22시까지 30분 단위로 나눈다', () => {
    for (let frequency = 5; frequency <= FREQUENCY.max; frequency++) {
      const times = defaultTimes(frequency);
      expect(times).toHaveLength(frequency);
      expect(times[0]).toBe('07:00');
      expect(times.at(-1)).toBe('22:00');
      times.forEach((time) => expect(Number(time.split(':')[1]) % 30).toBe(0));
      expect([...times].sort()).toEqual(times);
    }
  });
});

describe('resizeTimes', () => {
  it('횟수가 늘면 고친 시각은 남기고 나머지를 기본값으로 채운다', () => {
    expect(resizeTimes(['07:30'], 3)).toEqual(['07:30', '12:30', '18:30']);
  });

  it('횟수가 줄면 뒤쪽 시각을 뺀다', () => {
    expect(resizeTimes(['07:30', '13:00', '20:00'], 2)).toEqual(['07:30', '13:00']);
  });
});

describe('isAlarmReady', () => {
  it('복용량과 모든 시각을 정해야 켤 수 있다', () => {
    expect(isAlarmReady(1, ['08:00', '19:00'])).toBe(true);
    expect(isAlarmReady(null, ['08:00', '19:00'])).toBe(false);
  });

  it('time 입력을 지워 빈 시각이 있으면 켤 수 없다', () => {
    expect(isAlarmReady(1, ['08:00', ''])).toBe(false);
  });

  it('빈 시각은 횟수를 바꿔도 비어 있는 채로 남는다', () => {
    expect(resizeTimes(['', '19:00'], 3)).toEqual(['', '19:00', '18:30']);
  });
});

describe('timeOfDay', () => {
  it('시각을 하루 중 때로 나눈다', () => {
    expect(timeOfDay('08:00')).toBe('아침');
    expect(timeOfDay('12:30')).toBe('점심');
    expect(timeOfDay('18:30')).toBe('저녁');
    expect(timeOfDay('22:00')).toBe('취침 전');
    expect(timeOfDay('02:00')).toBe('취침 전');
  });
});

describe('dateRange', () => {
  it('오늘을 포함해 days일 동안의 범위를 쓴다', () => {
    const today = new Date(2026, 9, 20);
    expect(dateRange(1, today)).toBe('10월 20일 ~ 10월 20일');
    expect(dateRange(5, today)).toBe('10월 20일 ~ 10월 24일');
  });

  it('월이 바뀌어도 날짜를 이어서 센다', () => {
    expect(dateRange(3, new Date(2026, 9, 30))).toBe('10월 30일 ~ 11월 1일');
  });
});
