//header.tsx
import './layout_less/head.less'
import { useAppDispatch } from '@/hooks/use_global.hooks';
import { setCollapsed } from "@/store/reducers/global";
import { Breadcrumb,Dropdown,MenuProps,Badge,Avatar,Select } from 'antd';
import dayjs from 'dayjs';
import { InfoCircleOutlined,CrownOutlined,SettingOutlined,LogoutOutlined,MessageOutlined,BarsOutlined,TranslationOutlined } from '@ant-design/icons';
import { Location, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface AppSiderProps {
    collapsed: boolean;
}
const AppHeader  : React.FC<AppSiderProps> = ({collapsed}) => {
    const dispatch = useAppDispatch();
    const location:Location = useLocation();
    const { t, i18n } = useTranslation();
    console.log('当前路径:', location.pathname);
    const handleCollapsed = () => {
        //更新全局状态  collapsed
        dispatch(setCollapsed());
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleChangeLanguage = (value: string) => {
        console.log(`selected ${value}`);
        if(value === 'zh-CN'){
            i18n.changeLanguage('en-US');
        }else{
            i18n.changeLanguage('zh-CN');
        }
        window.location.reload();
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

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
              <span>天涯轩</span>
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
                                <div className="ant-select-selection ant-select-selection-single" tabIndex={0}>
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
                                        style={{height: 32, width: 120,textAlign:"left" }}
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
                                        <Avatar size={44} icon={<BarsOutlined />} />
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <div className="iconContainer">
                                    <TranslationOutlined style={{fontSize: "22px"}} onClick={() => handleChangeLanguage(i18n.language)} />
                                </div>
                            </div>
                        </div>
                        <span className="block-span"></span>
                        <span className="block-span2">
                            {currentDate}
                        </span>
                        <div className="avatar_container">
                            <div className="nc-workbench-hp margin-right-10 margin-left-10">
                                <Dropdown menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <img src="/man.png" alt="logo" />
                                    </a>
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
 