import '../page_list.less'
const Home = ()=>{
    
    return (
        <div className="nc-bill-header-area">
            <div className="header-title-search-area">
                <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                    <span className="bill-info-title">
                    <i className="iconfont icon-logo1 page-title-Icon" style={{color:'red'}}></i>业务单元
                    </span>
                    <span className="bill-info-code">
                        
                    </span>
                </div>
                <span className="orgunit-customize-showOff" style={{marginLeft: "20px"}}>
                    <div style={{display: "inline"}}>
                        <label className="u-checkbox nc-checkbox">
                            <input type="checkbox" className='u-checkbox-middle' /><label className="u-checkbox-label u-checkbox-label-middle">显示停用</label>
                        </label>
                    </div>
                </span>
            </div>
            <div className="header-button-area">
                <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                <div style={{display: "flex"}}>
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <button type="button" className="u-button button-primary nc-button-wrapper button-weishabushezhiyigemoren">新增</button>
                            <button type="button" className="u-button null nc-button-wrapper button-weishabushezhiyigemoren" disabled={true}>修改</button>
                            <button type="button" className="u-button null nc-button-wrapper button-weishabushezhiyigemoren" disabled={true}>删除</button>
                            <button type="button" className="u-button null nc-button-wrapper button-weishabushezhiyigemoren" disabled={true}>复制</button>
                        </div>
                    </div> 
                    <div className="buttonGroup-component" style={{marginLeft: "0px"}}>
                        <div className="u-button-group"></div>
                    </div>
                    <div className="buttonGroup-component" style={{marginLeft: "0px"}}>
                        <div className="u-button-group"></div>
                    </div>
                    <div className="divider-button-wrapper">
                        <div className="sawadika">
                            <div className="hover-divider-btn-left-wrapper">
                                <div className="my-divider-icon-main-wrapper">
                                    <button type="button" className="u-button  nc-header-button-area-btn-enable   btn-left divider-main-button" disabled={true}>启用</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="u-button refresh-component nc-button-wrapper"><i className="iconfont icon-shuaxin1"></i></button>
                </div>
            </div>
        </div>
    )
}
export default Home;