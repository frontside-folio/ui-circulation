import {
  isUndefined,
  cloneDeep,
  forEach,
  values,
  unset,
} from 'lodash';

import { Notice } from '../../Models/NoticePolicy';

import {
  feeFineEventsIds,
  loanTimeBasedEventsIds,
  requestTimeBasedEventsIds
} from '../../../constants';

const setRealTimeFlag = (sectionKey, policy) => {
  const noticePolicy = cloneDeep(policy);
  const isTrueSet = value => value === 'true';
  const sendInRealTime = [
    ...Object.values(requestTimeBasedEventsIds),
    ...Object.values(feeFineEventsIds),
  ];

  forEach(noticePolicy[sectionKey], (notice) => {
    notice.realTime = isUndefined(notice.realTime)
      ? sendInRealTime.includes(notice?.sendOptions?.sendWhen)
      : isTrueSet(notice.realTime);
  });

  return noticePolicy;
};

const checkNoticeHiddenFields = (sectionKey, allowedIds, policy) => {
  const noticePolicy = cloneDeep(policy);

  forEach(noticePolicy[sectionKey], (item, index) => {
    const notice = new Notice(item);

    if (!notice.sendOptions.isSendOptionsAvailable(allowedIds)) {
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendEvery`);
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendBy`);
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendHow`);
      unset(noticePolicy, `[${sectionKey}][${index}].frequency`);
    }

    if (!notice.sendOptions.isBeforeOrAfter()) {
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendBy`);
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendEvery`);
      unset(noticePolicy, `[${sectionKey}][${index}].frequency`);
    }

    if (!notice.isRecurring()) {
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendEvery`);
    }

    if (!notice.sendOptions.isLoanDueDateTimeSelected()) {
      unset(noticePolicy, `[${sectionKey}][${index}].realTime`);
    }
  });

  return noticePolicy;
};

const filter = (entity, ...callbacks) => {
  let filteredEntity = cloneDeep(entity);

  forEach(callbacks, (callback) => {
    filteredEntity = callback(filteredEntity);
  });

  return filteredEntity;
};

export default (entity) => {
  const callbacks = [
    checkNoticeHiddenFields.bind(null, 'loanNotices', values(loanTimeBasedEventsIds)),
    setRealTimeFlag.bind(null, 'loanNotices'),
    checkNoticeHiddenFields.bind(null, 'requestNotices', values(requestTimeBasedEventsIds)),
    setRealTimeFlag.bind(null, 'requestNotices'),
    checkNoticeHiddenFields.bind(null, 'feeFineNotices', values(feeFineEventsIds)),
    setRealTimeFlag.bind(null, 'feeFineNotices'),
  ];

  return filter(entity, ...callbacks);
};
