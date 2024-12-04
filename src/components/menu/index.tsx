import React from 'react';
import { MenuProps,MenuGroup } from '@/types/menu/menu';
interface AppSiderProps {
    collapsed: boolean;
    menudatas: MenuProps;
    activeMenudatas: MenuGroup[];
    onClick?: () => void;
}
const Menu: React.FC<AppSiderProps> = ({ menudatas,collapsed,activeMenudatas,onClick }) => {
    return (
        <div className="ant-drawer-content-wrapper" style={{ display: collapsed ? 'block' : 'none' }}>
            <div className="ant-drawer-content">
                <div style={{ overflow: 'auto', height: '100%' }}>
                    <div className="ant-drawer-body">
                        <div className="all-apps-layout">
                            <div className="sider domain-group-container">
                                {menudatas.data.map((group, index) => (
                                    <div className="result-group-list" key={index}>
                                        <div className="wb-card-item field-card">
                                            <div className="wb-card-head">
                                                <div className="wb-card-head-wrapper">
                                                    <div className="wb-card-head-title">
                                                        <div className="field-title">
                                                            {group.title}
                                                        </div>
                                                    </div>
                                                    <div className="wb-card-extra"><i className="iconfont icon-jiantouxia1"></i></div>
                                                </div>
                                            </div>
                                            <div className="wb-card-body">
                                                <div className="field-app-list">
                                                    {group.apps.map((app, i) => {
                                                        return (
                                                            <div className="app-col" key={i}>
                                                                <div className="list-item">
                                                                    <div className={`list-item-content ${app.active ? 'active' : ''}`}>
                                                                        <div className="title">
                                                                            <span>{app.name}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="domain-apps-wrapper" id="domain-apps-wrapper" onClick={onClick}>
                                <div className="content domain-apps-container" id="domain-apps-container">
                                    <div className="content-wrap" id="content-wrap">
                                    {activeMenudatas.map((item) => (
                                        <div className="content-item">
                                            <div className="content-item-header">
                                                <span>{item.title}</span>
                                            </div>
                                            <div className="content-item-content">
                                            {item.apps.map((app) => {
                                                return (
                                                    <div className="item-app" grp-index="0" item-index="0" open-type="tab">
                                                        {app.name}
                                                        <i className="iconfont icon-open app-open" grp-index="0" item-index="0" open-type="newtab"></i>
                                                    </div>
                                                )
                                            })}
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;