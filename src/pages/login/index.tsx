import { Button, Checkbox, Form, Input } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import { LockOutlined, UserOutlined  } from "@ant-design/icons";
import CustomIcon from "@/components/custom-icon";
import "./login.less";
import { getUserList,getAspireUserList } from "@/api/golbal/user_service";
import { UserLogin } from "@/types/user";
import { useAppDispatch } from '@/hooks/use_global.hooks';
import { setUserState} from "@/store/reducers/user";
import { console } from "inspector";
const UserSignIn = () => {
    const title = '登录';
    const bLogin = true;
    const dispatch = useAppDispatch();
    
    const [checked, setChecked] = useState<boolean>(false);
    const onCheckRememberMe = (e: CheckboxChangeEvent) => {
        setChecked(e.target.checked);
    };
    const onFinish = async (values: any) => {
        // const testAspire = await getAspireUserList();
        const userList = await getUserList();
        const userInfo = userList.find(item => item.UserEmail === values.useremail && item.UserPassword === values.password);
        if(userInfo) {
            sessionStorage.setItem('userlogin', JSON.stringify(userInfo));
            dispatch(setUserState(userInfo));
            window.location.href = '/';            
            return;
        }else {
            alert('账号或密码错误');
        }
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
                                <Form.Item name="useremail">
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="邮箱"
                                        style={{ minHeight: "35px",padding:"4px 11px",marginBottom:"10px" }}
                                    />
                                </Form.Item>
                                <Form.Item name="password">
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        style={{ minHeight: "35px",padding:"4px 11px",marginBottom:"10px" }}
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
                                        <CustomIcon type="icon-icon-oschina-circle" />
                                        <span>使用 OSChina 账号登录</span>
                                    </div>
                                </Form.Item>
                                <Form.Item className="other-login-mode">
                                    <h4>其他登录方式</h4>
                                </Form.Item>
                                <Form.Item>
                                    <div className="login-icon-list">
                                        <CustomIcon type="icon-aliyun" title="使用阿里云账号登录" href="#" />
                                        <CustomIcon type="icon-logo-gitlab" title="使用GitLab账号登录" />
                                        <CustomIcon type="icon-ic_login_huawei" title="使用华为账号登录" />
                                        <CustomIcon type="icon-GitHub" title="使用GitHub账号登录" />
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