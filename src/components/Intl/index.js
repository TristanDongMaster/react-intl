import React from 'react';
import {addLocaleData, IntlProvider} from 'react-intl';
import {connect} from 'react-redux';
import zh_CN from 'react-intl/locale-data/zh';
import en_US from 'react-intl/locale-data/en';
import th_TH from 'react-intl/locale-data/th';
import {chooseLocale} from 'LOCALES/util';

addLocaleData ([...zh_CN, ...en_US, ...th_TH]);

class Inter extends React.PureComponent {
  render () {
    const {locale, localeMessage, children} = this.props;
    let language = locale === 'en_US' ? 'en' : 'zh';
    return (
      <IntlProvider locale={language} messages={localeMessage}>
        {children}
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  locale: state.appReducers.language,
  localeMessage: chooseLocale (state.appReducers.language),
});

const Intl = connect (mapStateToProps) (Inter);

export default Intl;
