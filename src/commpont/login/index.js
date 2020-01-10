import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../../less/login.less';
const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          };
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            if(values.password === '123'){
                this.props.history.push('/home');
            }
          }else{
              
          }

        });
    }   

    render() {
        const { getFieldDecorator } = this.props.form;
        return <div className='login'>
            <div className='login_wrap'>
            <div className="login_name">后台管理系统</div>

                <div className="login_inp">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名/手机号" />
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                        </FormItem>
                        <FormItem>
                        <div className='wuyou'>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <a className="login-form-forgot" href=":JavaScript">忘记密码?</a>
                        </div>
                        
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        </FormItem>
                    </Form>
                </div>
            
            </div>
        </div>;
        
    }
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm