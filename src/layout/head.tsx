//header.tsx
import './layout_less/head.less'
import { useAppDispatch,useAppSelector } from '@/hooks/use_global.hooks';
import { setCollapsed } from "@/store/reducers/global";
import { selectUserState } from "@/store/reducers/user";
import type { UserLoginState } from '@/store/reducers/global_state';
import { Breadcrumb,Dropdown,MenuProps,Badge,Avatar,Select } from 'antd';
import dayjs from 'dayjs';
import { InfoCircleOutlined,CrownOutlined,SettingOutlined,LogoutOutlined,MessageOutlined,BarsOutlined,TranslationOutlined } from '@ant-design/icons';
import { Location, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CustomIcon from "@/components/custom-icon";
import { Space } from 'antd/lib';
import React from 'react';
import { i18n } from 'i18next';
interface AppSiderProps {
    collapsed: boolean;
    i18n_page:i18n;
}
const AppHeader  : React.FC<AppSiderProps> = ({collapsed,i18n_page}) => {
    // 使用React.useMemo来缓存useTranslation的结果，避免在组件重新渲染时重复创建
    // 确保在组件挂载和更新时hooks的调用顺序保持一致
    // const {i18n, t } = React.useMemo(() => {
    //     return useTranslation(undefined, { useSuspense: false });
    // }, []);
    
    const userlogin:UserLoginState = useAppSelector(selectUserState);
    const dispatch = useAppDispatch();
    const location:Location = useLocation();
    
    const handleCollapsed = () => {
        //更新全局状态  collapsed
        dispatch(setCollapsed());
    };
    
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    
    // 优化语言切换函数，使用useCallback确保函数引用稳定
    const handleChangeLanguage = (value: string) => {
        // 只在语言真正变化时才进行切换
        
            i18n_page.changeLanguage(value);
            // 存储用户选择的语言到localStorage，避免刷新后丢失
        
            // 使用更温和的方式更新UI，避免整页刷新
            // 延迟执行以确保语言切换完成
            setTimeout(() => {
                window.location.reload();
            }, 100);
        };

    const exitSystem = () => {
        sessionStorage.removeItem('userlogin');
        window.location.href = '/login';
    };

    const currentDate = dayjs().format('YYYY-MM-DD');
    const breadcrumbItems =[
        {
            title: '首页',
        },
        {
            title: <a href="">动态建模平台</a>,
        },
        {
            title: <a href="">组织管理</a>,
        },
        {
            title: '业务单元',
        },
    ]

    const itemsMenu: MenuProps['items'] = [
        {
          key: '1',
          label: (
              <span>{userlogin.UserEmail}</span>
          ),
          icon:<CrownOutlined />
        },
        {
          key: '2',
          label: (
            <span>
              个人信息
            </span>
          ),
          icon: <InfoCircleOutlined />
        },
        {
          key: '3',
          label: (
            <span>
              设置中心
            </span>
          ),
          icon:<SettingOutlined />
        },
        {
          key: '4',
          danger: true,
          label: (
            <a rel="noopener noreferrer" href="#" onClick={exitSystem}>
              退出登录
            </a>
          ),
          icon:<LogoutOutlined />
        },
      ];
      
      const itemsLanguage: MenuProps['items'] = [
        {
          key: '1',
          danger: true,
          className:'ant-drowndown-custom',
          label:(
            <CustomIcon type="icon-ICON-297" style={{fontSize:'24px'}} onClick={() => handleChangeLanguage('zh-CN')} />
          )
        },
        {
          key: '2',
          danger: true,
          className:'ant-drowndown-custom',
          label:(
            <CustomIcon type="icon-English" style={{fontSize:'24px'}} onClick={() => handleChangeLanguage('en-US')} />
          )
        },
      ];

    return (
        <div className="nc-workbench-top-container height-72">
            <nav className="nc-workbench-nav">
                <div className="nav-left n-left n-v-middle flex-fixed">
                    <div className="n-v-middle">
                        <div className="nc-workbench-allAppsBtn nc-workbench-icon-close" onClick={handleCollapsed}>
                            {/* 处理左上角图标变化切换 nc-workbench-icon-new nc-workbench-icon-open */}
                            <div className={collapsed?'nc-workbench-icon-open':'nc-workbench-icon-new'}>
                                <i className="iconfont icon-logo1"></i>
                            </div>
                        </div>
                        {/* <div className="nc-workbench-allAppsBtn nc-workbenchRecent">
                            <div className="nc-workbench-icon">
                                <div className="iconContainer">
                                    <Badge dot size='small'>
                                        <i className="iconfont icon-luzhizhong"></i>
                                    </Badge>
                                </div>
                            </div>
                        </div> */}
                        <div className="nc-workbench-group-switch">
                            <div className="fieldid_group ant-select" style={{display: "block"}}>
                                <div id="headSelect" className="ant-select-selection ant-select-selection-single" tabIndex={0}>
                                    {/* <div className="ant-select-selection-rendered">
                                        <div className="ant-select-selection-selected-value" title="集团公司" style={{display: "block", opacity: 1}}>
                                            集团公司
                                        </div>
                                    </div>
                                    <span className="ant-select-arrow" unselectable="on" style={{userSelect: "none"}}>
                                        <i className="ant-select-arrow-icon">
                                            <svg viewBox="64 64 896 896" className="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
                                                <path
                                                    d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z">
                                                </path>
                                            </svg>
                                        </i>
                                    </span> */}
                                    <Select
                                        defaultValue="集团公司"
                                        style={{height: 32, width: 120,textAlign:"left",color:"#9aa1bc" }}
                                        onChange={handleChange}
                                        options={[
                                        {
                                            label: <span>集团公司一</span>,
                                            options: [
                                            { label: <span>分公司一</span>, value: 'Jack' },
                                            { label: <span>分公司二</span>, value: 'Lucy' },
                                            ],
                                        },
                                        {
                                            label: <span>集团公司二</span>,
                                            options: [
                                            { label: <span>分公司一</span>, value: 'Chloe' },
                                            { label: <span>分公司二</span>, value: 'Lucas' },
                                            ],
                                        },
                                        ]}
                                    />
                                    
                                </div>
                            </div>
                        </div>
                        <span className="block-span"></span>
                        <div className='nav-left-item'>
                            <Breadcrumb
                                separator=">"
                                items={breadcrumbItems}
                            />
                        </div>
                    </div>
                </div>
                <div className="nav-middle"></div>
                <div className="nav-right n-right n-v-middle">
                    <div className="n-v-middle n-right right-block">
                        <div>
                            <div style={{marginRight: "25px" }}>
                                <div className="iconContainer">
                                    {/* <i className="iconfont icon-xiaoxi2"></i> */}
                                    {/* <Badge dot size='small'>
                                        <i className="iconfont icon-xiaoxi2"></i> 
                                    </Badge> */}
                                    <Badge count={9} size="small" offset={[-10, 15]}>
                                        <Avatar shape="square" size={44}  icon={<MessageOutlined />} />
                                    </Badge>
                                </div>
                            </div>
                            <div style={{marginRight: "25px" }}>
                                <div className="iconContainer">
                                    <Badge count={9} size="small" offset={[-10, 15]}>
                                        <Avatar shape="square" size={44} icon={<BarsOutlined />} />
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <div className="iconContainer">
                                    <Dropdown menu={{ items:itemsLanguage }}>
                                        <TranslationOutlined style={{fontSize: "22px"}} />
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <span className="block-span"></span>
                        <span className="block-span2">
                            {currentDate}
                        </span>
                        <div className="avatar_container">
                            <div className="nc-workbench-hp margin-right-10 margin-left-10">
                                <Dropdown menu={{ items:itemsMenu }}>
                                    <Avatar size={28} src="/man.png" />
                                </Dropdown>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            </nav>
        </div>
    );
};
export default AppHeader;
 