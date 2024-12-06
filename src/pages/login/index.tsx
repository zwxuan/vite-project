import { Button, Checkbox, Form, Input } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import { LockOutlined, UserOutlined,createFromIconfontCN  } from "@ant-design/icons";
import "./login.less";
const UserSignIn = () => {
    const title = '登录';
    const bLogin = true;
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/c/font_4108710_4qayguv5weh.js',
    });
    const [checked, setChecked] = useState<boolean>(false);
    const onCheckRememberMe = (e: CheckboxChangeEvent) => {
        setChecked(e.target.checked);
    };
    const onFinish = async (values: any) => {
        console.log("Received values of form: ", values);
    };
    const [form] = Form.useForm();
    return (
        <div className="user-session-wrapper">
            <div className="wrapper-container">
                <div className="container-body">
                    <div className="session-left-box">
                        
                    </div>
                    <div className="session-right-form">
                        <div className="user-form">
                            <div className="form-header">
                                <span className="form-header-title">{title}</span>
                                <span className="form-header-title-tip">
                                    {bLogin ? "没有账号？" : "已有账号？"}
                                    {bLogin ? (
                                        <a href="#">点此注册</a>
                                    ) : (
                                        <a href="#">点此登录</a>
                                    )}
                                </span>
                            </div>
                            <Form
                                form={form}
                                name="normal_login"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item name="username">
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="用户名"
                                    />
                                </Form.Item>
                                <Form.Item name="password">
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="密码"
                                        autoComplete="off"
                                    />
                                </Form.Item>
                                {bLogin ? null : (
                                    <Form.Item name="repassword">
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="ConfirmPassword"
                                            autoComplete="off"
                                        />
                                    </Form.Item>
                                )}
                                <Form.Item>
                                    <Form.Item name="remember" noStyle>
                                        <div className="remember-checked">
                                            <Checkbox
                                                checked={checked}
                                                defaultChecked={checked}
                                                onChange={onCheckRememberMe}
                                            >
                                                记住我
                                            </Checkbox>
                                            <span>
                                                <a href="">短信验证登录</a>
                                            </span>
                                        </div>
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item style={{ marginBottom: "0px" }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        {title}
                                    </Button>
                                </Form.Item>
                                <Form.Item className="login-form-forgot">
                                    <a href="">已有账号, 忘记密码？</a>
                                </Form.Item>
                                <Form.Item>
                                    <div className="use-oschina-login">
                                        <IconFont type="icon-icon-oschina-circle" />
                                        <span>使用 OSChina 账号登录</span>
                                    </div>
                                </Form.Item>
                                <Form.Item className="other-login-mode">
                                    <h4>其他登录方式</h4>
                                </Form.Item>
                                <Form.Item>
                                    <div className="login-icon-list">
                                        <IconFont type="icon-aliyun" title="使用阿里云账号登录" href="#" />
                                        <IconFont type="icon-logo-gitlab" title="使用GitLab账号登录" />
                                        <IconFont type="icon-ic_login_huawei" title="使用华为账号登录" />
                                        <IconFont type="icon-GitHub" title="使用GitHub账号登录" />
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="container-footer">
                    <span className="user-footer-item"><a href='#'>@ Gitee.com</a></span>
                    <span className="user-footer-item"><a href='#'>关于我们</a></span>
                    <span className="user-footer-item"><a href='#'>使用条款</a></span>
                    <span className="user-footer-item"><a href='#'>帮助文档</a></span>
                    <span className="user-footer-item"><a href='#'>自助服务</a></span>
                </div>
            </div>
        </div>
    );
};

export default UserSignIn;