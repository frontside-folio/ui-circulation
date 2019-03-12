import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';

import NoticePolicyDetail from './NoticePolicyDetail';
import NoticePolicyForm from './NoticePolicyForm';
import { NoticePolicy } from '../Models/NoticePolicy';
import { NoticePolicy as validateNoticePolicy } from '../Validation';

class NoticePolicySettings extends React.Component {
  static manifest = Object.freeze({
    patronNoticePolicies: {
      type: 'okapi',
      records: 'patronNoticePolicies',
      path: 'patron-notice-policy-storage/patron-notice-policies',
    },
    templates: {
      type: 'okapi',
      records: 'templates',
      path: 'templates',
      params: {
        query: 'cql.allRecords=1 AND category=""',
      },
    },
  });

  static propTypes = {
    intl: intlShape.isRequired,
    resources: PropTypes.shape({
      patronNoticePolicies: PropTypes.object,
      templates: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      patronNoticePolicies: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
    }).isRequired,
  };

  render() {
    const {
      resources,
      mutator,
      intl: {
        formatMessage,
      },
    } = this.props;

    const permissions = {
      put: 'ui-circulation.settings.notice-policies',
      post: 'ui-circulation.settings.notice-policies',
      delete: 'ui-circulation.settings.notice-policies',
    };

    const entryList = sortBy((resources.patronNoticePolicies || {}).records, ['name']);

    return (
      <EntryManager
        {...this.props}
        parentMutator={mutator}
        parentResources={resources}
        entryList={entryList}
        resourceKey="patronNoticePolicies"
        detailComponent={NoticePolicyDetail}
        entryFormComponent={NoticePolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.noticePolicy.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.noticePolicy.entryLabel' })}
        nameKey="name"
        permissions={permissions}
        enableDetailsActionMenu
        validate={validateNoticePolicy}
        defaultEntry={NoticePolicy.defaultNoticePolicy()}
      />
    );
  }
}

export default injectIntl(NoticePolicySettings);
