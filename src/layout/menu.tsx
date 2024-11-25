//menu.tsx
import './layout_less/menu.less'
import { Link } from "react-router-dom"
import { useAppDispatch } from '@/hooks/use_global.hooks';
import { setCollapsed } from "@/store/reducers/global";
interface AppSiderProps {
    collapsed: boolean;
}
const AppMenu : React.FC<AppSiderProps> = ({collapsed}) => {
    //处理点击具体二级菜单时跳转到详细页面要将菜单隐藏
    const dispatch = useAppDispatch();
    const handleCollapsed = () => {
        //更新全局状态  collapsed
        dispatch(setCollapsed());
    };
  return (
    // display 控制div的显示隐藏none,block
    <div className="ant-drawer-content-wrapper" style={{display:collapsed?'block':'none'}}>
        <div className="ant-drawer-content">
            <div style={{overflow: 'auto', height:'100%'}}>
                <div className="ant-drawer-body">
                    <div className="all-apps-layout">
                        <div className="sider domain-group-container">
                            <div className="result-group-list">
                                {/* collapsed样式 控制卡片显示和隐藏 */}
                                <div className='wb-card-item field-card'>
                                    <div className="wb-card-head">
                                        <div className="wb-card-head-wrapper">
                                            <div className="wb-card-head-title">
                                                <div className="field-title">
                                                    动态建模平台
                                                </div>
                                            </div>
                                            <div className="wb-card-extra"><i className="iconfont icon-jiantouxia1"></i></div>
                                        </div>
                                    </div>
                                    <div className="wb-card-body">
                                        <div className="field-app-list">
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>组织管理</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content active">
                                                        <div className="title"><span>基础数据</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>流程管理</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>会计平台</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>客户化配置</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>系统管理</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>开发配置</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>报表平台</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>企业绩效管理平台</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>条码配置</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>工程基础数据</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="result-group-list">
                                <div className="wb-card-item field-card">
                                    <div className="wb-card-head">
                                        <div className="wb-card-head-wrapper">
                                            <div className="wb-card-head-title">
                                                <div className="field-title">
                                                    集成平台
                                                </div>
                                            </div>
                                            <div className="wb-card-extra"><i className="iconfont icon-jiantouxia1"></i></div>
                                        </div>
                                    </div>
                                    <div className="wb-card-body">
                                        <div className="field-app-list">
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>数据交换管理</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="app-col">
                                                <div className="list-item">
                                                    <div className="list-item-content">
                                                        <div className="title"><span>标准接口</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="domain-apps-wrapper" id="domain-apps-wrapper" onClick={handleCollapsed}>
                            <div className="content domain-apps-container" id="domain-apps-container">
                                <div className="content-wrap" id="content-wrap">
                                    <div className="content-item">
                                        <div className="content-item-header">
                                            <span>财务基础数据</span>
                                        </div>
                                        <div className="content-item-content">
                                            <div className="item-app" grp-index="0" item-index="0" open-type="tab"><Link to="/currency">币制</Link><i className="iconfont icon-open app-open" grp-index="0" item-index="0" open-type="newtab"></i></div>
                                            <div className="item-app" grp-index="0" item-index="1" open-type="tab">费用科目<i className="iconfont icon-open app-open" grp-index="0" item-index="1" open-type="newtab"></i></div>
                                            <div className="item-app" grp-index="0" item-index="2" open-type="tab">科目账套<i className="iconfont icon-open app-open" grp-index="0" item-index="2" open-type="newtab"></i></div>
                                            <div className="item-app" grp-index="0" item-index="2" open-type="tab">税率管理<i className="iconfont icon-open app-open" grp-index="0" item-index="2" open-type="newtab"></i></div>
                                        </div>
                                    </div>
                                    <div className="content-item">
                                        <div className="content-item-header">
                                            <span>供应商管理</span>
                                        </div>
                                        <div className="content-item-content">
                                            <div className="item-app" grp-index="1" item-index="0" open-type="tab">合同管理<i className="iconfont icon-open app-open" grp-index="1" item-index="0" open-type="newtab"></i></div>
                                            <div className="item-app" grp-index="1" item-index="1" open-type="tab">基本信息<i className="iconfont icon-open app-open" grp-index="1" item-index="1" open-type="newtab"></i></div>
                                            <div className="item-app" grp-index="1" item-index="2" open-type="tab">商品管理<i className="iconfont icon-open app-open" grp-index="1" item-index="2" open-type="newtab"></i></div>
                                            <div className="item-app" grp-index="1" item-index="2" open-type="tab">商品价格<i className="iconfont icon-open app-open" grp-index="1" item-index="2" open-type="newtab"></i></div>
                                            <div className="item-app" grp-index="1" item-index="2" open-type="tab">绩效管理<i className="iconfont icon-open app-open" grp-index="1" item-index="2" open-type="newtab"></i></div>
                                        </div>
                                    </div>
                                    <div className="content-item">
                                        <div className="content-item-header">
                                            <span>客户管理</span>
                                        </div>
                                        <div className="content-item-content">
                                            <div className="item-app" grp-index="1" item-index="0" open-type="tab">合同管理<i className="iconfont icon-open app-open" grp-index="1" item-index="0" open-type="newtab"></i></div>
                                            <div className="item-app" grp-index="1" item-index="1" open-type="tab">基本信息<i className="iconfont icon-open app-open" grp-index="1" item-index="1" open-type="newtab"></i></div>
                                            <div className="item-app" grp-index="1" item-index="2" open-type="tab">绩效管理<i className="iconfont icon-open app-open" grp-index="1" item-index="2" open-type="newtab"></i></div>
                                        </div>
                                    </div>
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
export default AppMenu;