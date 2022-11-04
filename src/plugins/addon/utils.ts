/*
 * Copyright (c) 2022. TalexDreamSoul
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { formatDuration, formatDistance, getTime } from 'date-fns';

import zhCn from 'date-fns/locale/zh-CN'
import { isString } from 'lodash'
// import enAu from 'date-fns/locale/en-AU'

export const LANGUAGE_DATE_FNS_MAP = {
    'zh-cn': zhCn,
    // 'en-AU': import('date-fns/locale/en-AU')
}

declare namespace TimeDuration {
    type OptionType = {
        locale?: Locale;
        zero?: boolean;
        delimiter?: string;
        format?: Array<string>;
        lang?: keyof typeof LANGUAGE_DATE_FNS_MAP;
    };
}

declare namespace TimeDistance {
    type OptionType = {
        locale?: Locale;
        addSuffix?: boolean;
        lang?: keyof typeof LANGUAGE_DATE_FNS_MAP;
    };
}

/**
 * @desc 将指定秒转为‘H小时M分钟S秒’，H、M、S为0时，默认不展示；如果想更改格式可传入第二个扩展参数options
 * @param second - Number，多少秒
 * @param options - 扩展项，可以配置语言，有两种方式：传入语言类型lang；或者直接传入Locale；
 * @returns 返回描述“H小时M分钟S秒”的字符串，有多语言处理
 * @example
 * ```
 * formatDateDuration(71) // 1minute11seconds
 * formatDateDuration(71, { lang: 'zh-CN' }) // 1分钟11秒
 * formatDateDuration(3604, { lang: 'zh-CN' }) // 1小时4秒
 * formatDateDuration(80221, { lang: 'zh-CN' }) // 22小时17分钟1秒
 * formatDateDuration(80221, { locale: ko }) // 22시간17분1초
 * formatDateDuration(80221, { lang: 'zh-CN', delimiter: ',' }) // 22小时,17分钟,1秒
 * formatDateDuration(80221, { lang: 'zh-CN', format: ['hours', 'minutes'] }) // 22小时17分钟
 * formatDateDuration(80220, { lang: 'zh-CN' }) // 22小时17分钟
 * formatDateDuration(80220, { lang: 'zh-CN', zero: true }) // 22小时17分钟0秒
 * formatDateDuration(880220, { lang: 'zh-CN' }) // 244小时30分钟20秒
 * ```
 */
export function formatDateDuration (second: number, options?: TimeDuration.OptionType) {
    const hours = Math.floor(second / 3600);
    const minutes = Math.floor((second % 3600) / 60);
    const seconds = Math.floor(second % 60);

    return formatDuration(
        {
            hours,
            minutes,
            seconds,
        },
        {
            zero: options?.zero || false,
            locale: options?.locale || LANGUAGE_DATE_FNS_MAP[options?.lang || 'zh-cn'],
            ...options,
        },
    ).replace(/ /g, '');
}

/**
 * @desc 获取指定时间距离当前时间或者指定时间多远；
 * @param date - Date | Number
 * @param baseDate - Date | Number，默认为当前时间
 * @param options - 扩展项，可以配置语言，有两种方式：传入语言类型lang；或者直接传入Locale；
 * @returns 返回描述“指定时间距离当前时间或者指定时间多远”的字符串，有多语言处理
 * @example
 * ```
 * formatDateDistance(1658320372161, 1658717927699, { lang: 'zh-CN' }) // 5 天前
 * formatDateDistance(1658320372161, 1658717927699, { lang: 'zh-CN', addSuffix: 'false' }) // 5 天
 * formatDateDistance(1658320372, 1658717927) // 5 days ago'
 * formatDateDistance(new Date('2022-07-12'), new Date('2022-07-17')) // 5 days ago
 * formatDateDistance(new Date('2022-07-05'), new Date('2022-07-12')) // 7 days ago
 * formatDateDistance(new Date('2022-06-12'), new Date('2022-07-12')) // about 1 month ago
 * formatDateDistance(new Date('2021-07-12'), new Date('2022-07-12')) // about 1 year ago
 * formatDateDistance(1658320372, 1658717927, { locale: ko }) // 5일 전
 * ```
 */
export function formatDateDistance (
    date: string | Date | number = 0,
    baseDate: string | Date | number = new Date(),
    options?: TimeDistance.OptionType,
): string {
    const initOptions = {
        addSuffix: options?.addSuffix || true,
        locale: options?.locale || LANGUAGE_DATE_FNS_MAP[options?.lang || 'zh-cn'],
        ...options,
    };
    // console.log("original", date, baseDate)
    if (
        ( isString(date) ) || ( isString(baseDate) ) ||
        (typeof date === 'number' && date.toString().length === 10) ||
        (typeof baseDate === 'number' && baseDate.toString().length === 10)
    ) {
        // console.log("transform", date, baseDate)
        return formatDistance(getMilliTimestamp(date), getMilliTimestamp(baseDate), initOptions);
    }
    // console.log(date, baseDate)
    return formatDistance(date, baseDate, initOptions);
};

/**
 * @desc 获取当前时间或者某个时间的毫秒级时间戳；
 * 如果入参是秒级时间戳（10位），则乘以1000返回毫秒级（13位）时间戳；主要场景在server返回了秒级时间戳，前端先乘以1000转换成日期展示
 * TODO：这里传入了其他数字怎么处理？直接返回还是补齐13位返回？date-fns是直接返回，建议直接返回
 * @param date - Date | Number
 * @returns 返回格式化后的毫秒级时间戳 - Number
 * @example
 * ```
 * getMilliTimestamp() // 1658320372160
 * getMilliTimestamp(new Date()) // 1658320372160
 * getMilliTimestamp(new Date().getTime()) // 1658320372160
 * getMilliTimestamp(Date.parse(new Date())) // 1658320372000
 * getMilliTimestamp(1658312707) // 1658312707000
 * getMilliTimestamp(1) // 1
 * ```
 */
export const getMilliTimestamp = (date?: number | Date | string): number => {
    if (!date) {
        return getTime(new Date());
    } else {
        // console.log("get", date)
        if( isString(date) ) return getMilliTimestamp(new Date(date))
        else if (date instanceof Date) return getTime(date);
        else {
            if (date.toString().length === 10) {
                return getTime(date * 1000);
            } else {
                return date;
            }
        }
    }
};
