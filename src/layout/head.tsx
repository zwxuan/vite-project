//header.tsx
import './layout_less/head.less'
import { useAppDispatch } from '@/hooks/use_global.hooks';
import { setCollapsed } from "@/store/reducers/global";
import { setUserState } from "@/store/reducers/user";
import { Breadcrumb } from 'antd';
import { Location, useLocation } from 'react-router-dom';
interface AppSiderProps {
    collapsed: boolean;
}
const AppHeader  : React.FC<AppSiderProps> = ({collapsed}) => {
    const dispatch = useAppDispatch();
    const location:Location = useLocation();
    console.log('当前路径:', location.pathname);
    const handleCollapsed = () => {
        //更新全局状态  collapsed
        dispatch(setCollapsed());
        //测试多redux的调用
        dispatch(setUserState());
    };
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
                        <div className="nc-workbench-allAppsBtn nc-workbenchRecent">
                            <div className="nc-workbench-icon">
                                <div className="iconContainer">
                                    <i className="iconfont icon-zuijinfangwen1"></i>
                                </div>
                            </div>
                        </div>
                        <div className="nc-workbench-group-switch">
                            <div className="fieldid_group ant-select" style={{display: "block"}}>
                                <div className="ant-select-selection ant-select-selection-single" tabIndex={0}>
                                    <div className="ant-select-selection-rendered">
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
                                    </span>
                                    
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
                        <div className="container">
                            <div className="margin-right-10 search-item">
                                <div className="ant-select-selection ant-select-selection-single">
                                    <div className="ant-select-selection-rendered">
                                        <div>
                                            <input className="ant-select-search-field" placeholder="请输入应用名称" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="iconContainer">
                                        <i className="iconfont icon-sousuo1"></i>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginRight: "10px" }}>
                                <div className="iconContainer">
                                    <i className="iconfont icon-xiaoxi2"></i>
                                </div>
                            </div>
                            <div>
                                <div className="iconContainer">
                                    <i className="iconfont icon-luzhi1"></i>
                                </div>
                            </div>
                        </div>
                        <span className="block-span"></span>
                        <span className="block-span2">2023-12-12</span>
                        <div className="avatar_container">
                            <div className="nc-workbench-hp margin-right-10 margin-left-10">
                                <img src="/红衣男子.png" alt="logo" />
                            </div>
                        </div>
                    </div>
                </div>
                
            </nav>
        </div>
    );
};
export default AppHeader;
 