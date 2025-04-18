import React from 'react';
import { MenuProps,MenuGroup } from '@/types/menu/menu';
import { NavLink,useLocation } from 'react-router-dom';
interface AppSiderProps {
    collapsed: boolean;
    menudatas: MenuProps;
    selectkey?:string;
    activeMenudatas: MenuGroup[];
    onClick?: () => void;
    selectMenu?: (keyCode:string) => void;
}
const Menu: React.FC<AppSiderProps> = ({ menudatas,collapsed,activeMenudatas,onClick,selectMenu,selectkey }) => {
    const handleClick = (keyCode: string) => {
        if (selectMenu) {
            selectMenu(keyCode);
        }
    };
    const location = useLocation();
    return (
        <div className="ant-drawer-content-wrapper" style={{
            width: '100%',
            height: '100%',
            opacity: collapsed ? 1 : 0,
            transform: `translateX(${collapsed ? 0 : '-100%'})`,
            visibility: collapsed ? 'visible' : 'hidden',
            
          }}>
            <div className="ant-drawer-content">
                <div style={{ overflow: 'auto', height: '100%' }}>
                    <div className="ant-drawer-body">
                        <div className="all-apps-layout">
                            <div className="sider domain-group-container">
                                {menudatas.data.map((group, index) => (
                                    <div className="result-group-list" key={group.key + index}>
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
                                                            <div className="app-col" key={app.key+i}>
                                                                <div className="list-item">
                                                                    <div key={i} className={`list-item-content ${app.key === selectkey ? 'active' : ''}`}>
                                                                        <div className="title" onClick={() => handleClick(app.key)}>
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
                                    {activeMenudatas.map((item,i) => (
                                        <div className="content-item" key={item.key + i}>
                                            <div className="content-item-header">
                                                <span>{item.title}</span>
                                            </div>
                                            <div className="content-item-content">
                                            {item.apps.map((app,i) => {
                                                return (
                                                    <div className="item-app" grp-index="0" item-index="0" open-type="tab" key={app.key + i}>
                                                        {app.path ? (
                                                            // <a href={app.path}>{app.name}</a>
                                                            <NavLink to={app.path} 
                                                                style={{
                                                                fontWeight: location.pathname === app.path ? 'bold' : 'normal',
                                                                color: location.pathname === app.path ? '#ff1648' : 'black'
                                                              }}>{app.name}</NavLink>
                                                        ) : (
                                                            <span>{app.name}</span>
                                                        )}
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