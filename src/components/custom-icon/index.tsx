import { createFromIconfontCN } from "@ant-design/icons";

/** 外网模式(为了方便开发用外网) */
const icon = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/c/font_4108710_4qayguv5weh.js",
    "//at.alicdn.com/t/c/font_3804794_xvuw4re6azk.js"
  ],
});

/** 内网模式（内网发布，记得将iconfont项目中的图标js文件下载下来） */
// export const icon = createFromIconfontCN({
//   scriptUrl: "@/scripts/iconfont.js",
// });

const navigate = (e: any, url: string = "/") => {
  /** 阻止冒泡，防止页面加载时按钮被点击然后调走 */
  e.stopPropagation();
  window.location.href = url;
};

/** 装饰器包装一下icon组件，内置一个32px字体大小的样式 */
const CustomIcon = (Comp: React.FC<any>) => {
  return (props: any) => (
    <Comp
      onClick={(e: any) => navigate(e, props.url)}
      style={{ fontSize: "32px" }}
      className="custom-icon"
      {...props}
    />
  );
};

export default CustomIcon(icon);
