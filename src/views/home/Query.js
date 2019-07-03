import React from 'react';
import {Form, Row, Col, Button, Input} from 'antd';
import {getValue} from 'LOCALES/util';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

const FormItem = Form.Item;
class Query extends React.PureComponent {
  render () {
    const {form: {getFieldDecorator}, onReset} = this.props;
    return (
      <Row>
        <Col>
          <FormItem label={getValue ('table.projectID')}>
            {getFieldDecorator ('prejectID', {
              initialValue: '',
            }) (<Input placeholder="" />)}
          </FormItem>
          <FormItem label={getValue ('table.projectName')}>
            {getFieldDecorator ('name') (<Input placeholder="" />)}
          </FormItem>
          <FormItem label={getValue ('table.creater')}>
            {getFieldDecorator ('creater') (<Input placeholder="" />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="common.search" />
            </Button>
          </FormItem>
          <FormItem>
            <Button onClick={onReset}>
              <FormattedMessage id="common.reset" />
            </Button>
          </FormItem>
        </Col>
      </Row>
    );
  }
}

Query.propTypes = {
  onReset: PropTypes.func.isRequired, // 重置方法
  form: PropTypes.object.isRequired, // 当前form表单
};

export default Query;
